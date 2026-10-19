"""
Forced alignment helper.

Reads a JSON job on stdin, writes a JSON result on stdout. Invoked by
`automation/src/align/torchaudio.ts`; never run by hand in normal use.

It performs *forced alignment*, not recognition: the word sequence is given
and the model only decides where each one falls in the audio. Nothing it
returns can change what the subtitles say.

Job:    {"audio": "<wav path>", "words": ["florida", "salta", ...]}
Result: {"ok": true, "audioSec": 22.4, "words": [{"start","end","score"}, ...]}
        {"ok": false, "error": "..."}

The word list must already be in the model's alphabet: lowercase a-z plus
apostrophe and hyphen, with numbers spelled out as they are spoken. The
caller owns that conversion, because only the caller knows the written form
the subtitles must keep showing.
"""

import json
import sys


def fail(message: str) -> None:
    sys.stdout.write(json.dumps({"ok": False, "error": message}))
    sys.exit(0)


def main() -> None:
    try:
        job = json.loads(sys.stdin.read())
    except Exception as exc:  # noqa: BLE001 - report, never raise, to the caller
        fail(f"could not read the job: {exc}")

    audio_path = job.get("audio")
    words = job.get("words") or []
    if not audio_path:
        fail("no audio path given")
    if not words:
        fail("no words given")

    try:
        import torch
        import torchaudio
        import soundfile as sf
        from torchaudio.pipelines import MMS_FA as bundle
    except Exception as exc:  # noqa: BLE001
        fail(f"alignment dependencies are missing: {exc}")

    try:
        model = bundle.get_model()
        tokenizer = bundle.get_tokenizer()
        aligner = bundle.get_aligner()
    except Exception as exc:  # noqa: BLE001
        fail(f"could not load the alignment model: {exc}")

    try:
        # torchaudio 2.11 routes `load` through torchcodec, which is a separate
        # install; soundfile reads the PCM wavs this pipeline produces.
        data, sample_rate = sf.read(audio_path, dtype="float32", always_2d=True)
        waveform = torch.from_numpy(data.mean(axis=1)).unsqueeze(0)
        if sample_rate != bundle.sample_rate:
            waveform = torchaudio.functional.resample(waveform, sample_rate, bundle.sample_rate)
            sample_rate = bundle.sample_rate
    except Exception as exc:  # noqa: BLE001
        fail(f"could not read the audio: {exc}")

    audio_sec = waveform.shape[1] / sample_rate

    try:
        with torch.inference_mode():
            emission, _ = model(waveform)
            spans = aligner(emission[0], tokenizer(words))
    except Exception as exc:  # noqa: BLE001
        fail(f"alignment failed: {exc}")

    # Emission frames are coarser than samples; this maps frames to seconds.
    ratio = waveform.shape[1] / emission.shape[1] / sample_rate

    out = []
    for span in spans:
        scores = [token.score for token in span]
        out.append(
            {
                "start": round(span[0].start * ratio, 4),
                "end": round(span[-1].end * ratio, 4),
                "score": round(sum(scores) / len(scores), 4),
            }
        )

    sys.stdout.write(
        json.dumps(
            {
                "ok": True,
                "audioSec": round(audio_sec, 4),
                "model": "torchaudio.pipelines.MMS_FA",
                "words": out,
            }
        )
    )


if __name__ == "__main__":
    main()
