# automation/ — TikTok clip pipeline

Generates vertical 1080x1920 MP4s with narration, subtitles and Primer Down
branding from material that already exists in this repo. It is a **read-only
consumer** of the content radar: it adds no new research corpus and changes
nothing about how the radar runs.

**Publishing to Buffer is disabled.** The pipeline writes a draft JSON next to
each clip and stops there. See [Buffer](#buffer-prepared-not-enabled).

---

## 1. What the radar actually is

There is no radar service, daemon, feed or cron job in this repository. The
"content radar" is a **Claude Code skill executed by hand or by a scheduled
routine**, and its output is Markdown committed to `research/`.

| Question | Answer |
|---|---|
| How is it run? | `/football-daily` (`.claude/skills/football-daily.md`), invoked manually or by a scheduled routine. There is no npm script, no server, no queue. |
| Where does the data come from? | Web search of external sources (ESPN, FBSchedules, CBS Sports, Yahoo, FEFA, DraftKings via NBC) plus the repo's own `src/data/**`. Nothing is fetched at build time. |
| What is the output format? | Markdown with YAML front matter, one file per day: `research/daily/YYYY-MM-DD.md`. |
| How are duplicates avoided? | **It has no programmatic dedup.** The only mechanisms are the date-keyed filename (one file per day cannot overwrite another) and a prose instruction in the skill: *"NO incluir contenido de días anteriores como nuevo"*. Enforcement is the model's judgement plus editorial review. `scripts/check-content.ts` does enforce unique slugs/ids, but only for production data in `src/data/**`, never for `research/**`. |

Because the radar has no dedup of its own, **this module keeps its own ledger**
(`automation/state/produced.json`). That is the single piece of state it owns.

### Briefing shapes it parses

Two shapes exist in the repo and both are supported:

- **Full skill template** (`research/daily/2026-10-02.md`): `## 🔥 TOP STORIES`
  with `### N. Title (CONFIDENCE)` and `- **Source:** …` / `- **Content
  potential:** …` bullets; a `### TikTok / Reels Ideas` hook table inside
  `## 💡 CONTENT OPPORTUNITIES`; and `## 📊 DETECTED STORIES` with explicit
  `- **Priority:**` and `- **Confidence:**` bullets.
- **Condensed** (`research/daily/2026-10-14.md`): per-league `### Storylines`
  numbered lists carrying `(Priority: N/5)` and `*Content: …, TikTok.*`, with
  prose wrapped across indented continuation lines.

### Other reusable systems found during the audit

| System | Reused? |
|---|---|
| `scripts/check-content.ts` (`npm run content:check`) | Not reused — it validates `src/data/**` entities, a different corpus. Left untouched. |
| `src/lib/repositories` | Not reused — the UI data layer; the pipeline never touches the web app. |
| `research/**` front matter (`id`, `type`, `name`, `confidence`, `url`, `last_researched`) | **Reused** as the contract for the curiosities format. |
| `src/data/sources/*` + `[[src:ID]]` citations | Not reused yet — see [Pending](#pending). |
| Any existing feed, cron, queue or anti-duplicate code | **None exists.** |

---

## 2. Architecture

```
automation/
  src/
    config.ts            paths, safe areas, branding, timing, audio, motion
    types.ts             shared types
    radar/
      parse.ts           briefings  -> RadarItem[]   (read-only)
      research.ts        research/** -> RadarItem[]  (read-only)
      select.ts          ranking + dedup gate
    formats/index.ts     NEWS and EXPLAINER specs
    script/
      build.ts           RadarItem -> hook/beats/conclusion (never invents)
      layout.ts          word wrap and shrink-to-fit type sizing
      srt.ts             measured durations -> cues -> SRT
    validate/
      index.ts           sources · duplicates · rights · duration ·
                         legibility · audio · codecs · blank frames
      language.ts        Spanish/English detection
    tts/
      say.ts             macOS `say` (default; local, offline, no key)
      elevenlabs.ts      optional hosted voice, inert without credentials
      silent.ts          deterministic stub for tests and non-macOS
    render/
      svg.ts             NEWS / EXPLAINER frame templates -> PNG
      ffmpeg.ts          motion, transitions, mastering -> MP4
      probe.ts           ffprobe / ffmpeg measurements
    publish/buffer.ts    draft builder + hard-disabled publish seam
    pipeline.ts          end-to-end orchestration
    cli.ts               entry point
  assets/manifest.json   licence manifest for any non-generated media
  state/produced.json    dedup ledger (COMMITTED)
out/tiktok/              generated artefacts (gitignored)
```

### Why it does not disturb Next.js

- Lives outside `src/`, so it is not part of any route or bundle.
- Nothing in `src/` imports it; `next build` never pulls it in (verified: build
  compiles and prerenders 327 pages unchanged).
- It is covered by the root `tsconfig.json`, so `npm run typecheck` and the
  build's type pass do check it — intentional, and it is type-clean.
- Only three files outside `automation/` changed: `package.json` (two new
  scripts), `.gitignore` (one entry) and `tests/` (new test files).

### The two formats and templates

| | **NEWS** | **EXPLAINER** |
|---|---|---|
| Material | `research/daily/*.md` | `research/**/*.md` except `daily/` |
| Target band | 30–60s (36s aim) | 30–60s (48s aim) |
| Max body beats | 4 | 5 |
| Kicker / accent | `AHORA`, red `#C8102E` | `HISTORIA`, teal `#1D7A8C` |
| Beat numbering | no | yes (`2/5`) |

A format decides **shape only** — beat count, length, kicker, accent. Every
factual sentence comes verbatim from the briefing or research document.

`--format=curiosity` still resolves to `explainer`, so older ledgers keep working.

### Frame anatomy

Both templates share one grid, built from the TikTok safe areas:

```
y=0     ============ accent bar + progress  <- fills left-to-right across the clip
y=240   +--------------------------+  top of the safe box
        | [ AHORA ]   2/5          |  kicker chip, beat counter
        | 2026-10-02               |  briefing date
        |                          |
        |      CAPTION BLOCK       |  hook: 86px, left-aligned, accent rule
        |   (readability panel)    |  beat: 62px, centred on a panel
        |   Fuente: yahoo.com      |  source credit, always on screen
        |                          |
        | --                       |
        | PRIMER DOWN              |  wordmark
        | por Gridiron Spain       |  editorial byline
        | primerdown.jordi...      |  handle
y=1480  +--------------------------+  bottom of the safe box
          440px below is reserved for TikTok's caption, username and ticker
          220px on the right is reserved for the like/comment/share rail
```

Everything is generated geometry: a gradient ground, a faint **yard-line
motif**, the accent rule, the progress bar and the type. No third-party media.

### Script shape: hook -> beats -> conclusion

- **hook** — the headline alone, set large; the card is up before the voice
  starts and held after it finishes;
- **beats** — the sourced detail, one breath each, numbered on EXPLAINER;
- **conclusion** — restates the headline and lands on the fixed CTA, so the clip
  ends instead of stopping. It asserts nothing new: the headline is already
  sourced and the CTA is fact-free.

### Motion, transitions and audio

- a slow **push-in** on each card (`zoompan` over an oversized frame, so type is
  never upscaled);
- cards **slide up** between cues rather than cross-dissolving — a dissolve
  double-exposes two blocks of text and reads as a smear;
- open and close **fades**;
- narration mastered with `loudnorm` to **-14 LUFS / -1.5 dBTP**, the level the
  platforms normalise to, with short in/out fades. Raw `say` output sits near
  -17 dB mean and sounds thin in the feed.

### Narration providers

`say` is the default: local, offline, no credentials. `--voice=elevenlabs` opts
into a hosted voice and **falls back to `say`** when `ELEVENLABS_API_KEY` /
`ELEVENLABS_VOICE_ID` are absent, so no test or CI run ever needs a credential.
`--voice=silent` uses a deterministic stub for machines without a speech engine.

---

## 3. Commands

```bash
# nvm Node 24 is required (the shell default here is 18, which Next 16 rejects)
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"

npm run tiktok:plan                               # dry run: candidates + why things were skipped
npm run tiktok:plan -- --format=all --limit=5
npm run tiktok:generate                           # render the top news candidate
npm run tiktok:generate -- --format=curiosity --limit=2
npm test                                          # full suite, including a real render
```

| Flag | Default | Meaning |
|---|---|---|
| `--format=news\|curiosity\|all` | `news` | which corpus to read |
| `--limit=N` | `1` | maximum clips to render |
| `--date=YYYY-MM-DD` | — | restrict news to one briefing |
| `--dry-run` | off | validate and report, render nothing |
| `--allow-updates` | off | re-cut a story whose content hash changed |
| `--require-video-tag` | off | only items the radar flagged for TikTok/Reels |
| `--silent-voice` | off | use the silent stub instead of macOS `say` |
| `--voice=say\|elevenlabs\|silent` | `say` | narration provider |
| `--out=DIR` | `out/tiktok` | output directory |

### Outputs per clip

`out/tiktok/<slug>.mp4` · `.srt` · `.script.json` (full provenance) ·
`.buffer-draft.json` (**never sent anywhere**).

---

## 4. Environment variables

**The pipeline currently reads none.** This is deliberate: narration is local
(macOS `say`), visuals are generated, and publishing is off, so there are no
credentials to hold. Nothing was added to `.env.example`.

Variables that will be needed only when the pending items below are approved:

| Variable | Needed for | Status |
|---|---|---|
| `BUFFER_ACCESS_TOKEN` | Buffer publishing | **Not read.** Do not add until publishing is approved. |
| `BUFFER_PROFILE_IDS` | target Buffer profiles | **Not read.** |
| `ANTHROPIC_API_KEY` | the `claude` script engine | Required only for `--generator=claude`. **Not needed for `claude-cli`.** Unset ⇒ falls back to `template`. |
| `CLAUDE_CLI_MODEL` | model for `claude-cli` | Optional, defaults to `opus`. |
| `PRIMERDOWN_ALLOW_NESTED_CLAUDE` | override the recursion guard | **Unsupported**, for diagnosis only. Set to `1` to let `claude-cli` run inside a session. |
| `ANTHROPIC_MODEL` | model override for the `claude` engine | Optional, defaults to `claude-opus-5`. |
| `ELEVENLABS_API_KEY` | hosted narration voice | Optional. Unset means `say` is used. |
| `ELEVENLABS_VOICE_ID` | which hosted voice | Optional. Must come from the account, never guessed. |
| `ELEVENLABS_MODEL_ID` | hosted model | Optional, defaults to `eleven_multilingual_v2`. |

`BUFFER_PUBLISHING_ENABLED` is **not** an environment variable — it is a
compile-time constant in `automation/src/config.ts`, so no `.env`, CLI flag or
scheduled routine can switch publishing on by accident. A test asserts this.

### System dependencies

| Tool | Used for | Install |
|---|---|---|
| `ffmpeg` / `ffprobe` | compositing, muxing, duration measurement | `brew install ffmpeg` |
| `rsvg-convert` | rasterising text cards | `brew install librsvg` |
| `say` | narration (macOS only) | built in |

> **Note on this machine's ffmpeg:** the installed build (9.0.2) has **no
> `drawtext`, `subtitles` or `ass` filter** — it was compiled without
> freetype/libass. Verified by attempting a render, not by `ffmpeg -h filter=…`,
> which falsely reports those filters as present.
>
> So text is drawn outside ffmpeg. Each subtitle cue is rendered as one
> **complete, opaque frame** (background + branding + caption) by `rsvg-convert`,
> and the clip is assembled from those stills with the **concat demuxer**. ffmpeg
> composites nothing per frame. An earlier version looped a transparent PNG per
> cue across the whole clip and gated each with `enable=`, which made ffmpeg
> alpha-blend every card over every frame — minutes per clip; the current path
> renders the same picture in seconds. It also needs no libass, so it is
> portable to any ffmpeg build rather than being a workaround for this one.

---

## 5. Validations

Run before anything is rendered; an `error` stops the clip, a `warning` is
reported and the clip proceeds.

| Rule | Behaviour |
|---|---|
| **confidence** | Only `CONFIRMED` / `REPORTED` may be rendered. `UNKNOWN` and `RUMOR` never are. An item with no stated confidence stays `UNKNOWN` — it is never guessed. Compound values (`REPORTED (fundación) / CONFIRMED (competición)`) resolve to the **weakest** stated value. |
| **sources** | A `news` clip with no source link is an error; a `curiosity` clip is a warning (research docs carry a front-matter `url`). |
| **duplicates** | A slug already in the ledger with the same content hash is an error. A changed hash is a warning and re-cuts only with `--allow-updates`. |
| **media rights** | Every media asset needs an explicit licence **and** rights holder. `generated` / `own work` / `public domain` / `cc0` pass; anything else requires `writtenPermission: true`. Unattributable media is refused. |
| **duration** | Target band 30–60s, measured on the finished file. Over 60s is always an error. Under 30s is an error for EXPLAINER but a reported **warning** for NEWS — see below. Under 20s is always an error. |
| **legibility** | No caption line may overflow the safe box at the size it was set in, no card may exceed its line budget, cues may not overlap, and none may be on screen under 1.2s. |
| **audio** | Mean level must clear -24 dBFS and peaks must stay under -0.5 dBFS, so a clip is neither silent nor clipped. |
| **dimensions / codecs** | Exactly 1080x1920 at 30fps, h264 + aac, with a `mov_text` subtitle track. |
| **blank frames** | `blackdetect` over the clip, excluding the deliberate opening and closing fades; more than 2% blank picture fails. |
| **language** | The narration must be in the clip's locale. A Spanish voice reading an English research document is rejected before rendering. |

Plus one guard that is not a validator but a hard refusal: **`narrationIsGrounded`**
re-checks that every narrated sentence (other than the fixed CTA) appears
verbatim in the source item. If narration ever drifted from the source, the clip
is refused. This is what makes *"never invent"* mechanically checkable.

### Media rights posture

A default render touches **no third-party media at all**. Background, branding
frame and subtitle cards are generated by ffmpeg and SVG. No broadcast footage,
club photography or music is downloaded or embedded. `automation/assets/manifest.json`
is empty by design; any future asset must be listed there with a licence before
the validator will allow it.

---

## 6. Buffer (prepared, not enabled)

`automation/src/publish/buffer.ts` contains:

- `BufferDraft` — the typed payload a Buffer MCP `create_post` would receive,
  carrying provenance (briefing path, line, confidence, source URLs);
- `buildDraft()` / `writeDraft()` — pure; write a reviewable JSON to disk;
- `publish()` — **always throws `PublishingDisabledError`**.

The file performs **no network I/O**, reads **no credentials**, and contains no
HTTP client and no MCP call. Tests assert that it contains no `process.env` and
no `fetch`/`axios`/`http.request`.

To enable later, in this order:

1. record the editor's written approval in `AGENTS.md`;
2. flip `BUFFER_PUBLISHING_ENABLED` in `automation/src/config.ts`;
3. replace the `publish()` body with a real Buffer MCP call;
4. add `BUFFER_ACCESS_TOKEN` / `BUFFER_PROFILE_IDS` to `.env.example`.

---

## 7. Tests

`npm test` runs the whole suite (`tsx --test tests/*.test.ts`).

| File | Covers |
|---|---|
| `tests/tiktok-radar.test.ts` | both briefing shapes, the hook table, confidence resolution, absolute provenance line numbers, research-doc prose extraction, and a smoke parse of every real briefing |
| `tests/tiktok-script.test.ts` | beat grouping, format differences, the never-invent guard, word wrap, SRT timestamps, cue contiguity |
| `tests/tiktok-guardrails.test.ts` | ledger round-trip, dedup, all four validators, the Buffer-disabled guarantee, CLI flag parsing |
| `tests/tiktok-numeric-claims.test.ts` | contextual claim validation against the **real** Florida briefing item: role classification, the live-run regression (`Top 10` accepted), documented rankings and results inside inferences, and negative cases for unbacked rankings, invented scores/percentages/records/dates, and relations manufactured by reusing a real digit in a different role |
| `tests/tiktok-claude-cli.test.ts` | the CLI provider, driven entirely by a **mocked subprocess** (no `claude` process spawned, no quota used): exact argv, the sandbox flags, the forbidden-flag absences, the recursion guard and its override, env scrubbing, log redaction, concurrency, timeout and SIGTERM, the turn ceiling, retry classification, refusal handling, and response parsing |
| `tests/tiktok-generator.test.ts` | the generator seam and fallback, grounding (figures, inferences, lexical overlap), structural validation, duration bands, material gates, budget/retry/timeout, the Claude adapter driven by an **injected client** (schema, refusal, retry, timeout, budget, usage), the editorial package round-trip, event + similarity dedup, and the independent evaluator |
| `tests/tiktok-quality.test.ts` | safe areas and that no drawn element leaves them, template distinctness, type fitting and shrink-to-fit, cue-time allocation, language detection, every output validator, source credits, and the ElevenLabs seam with and without credentials |
| `tests/tiktok-render.test.ts` | **renders a real MP4** and asserts 1080x1920, h264 + aac + `mov_text`, duration tracking narration, accents in the SRT, hook/conclusion structure, no card ending mid-phrase, and that narration traces back to the source. Skips itself if ffmpeg/rsvg-convert are missing. |

---
## 8. Script engines

Scripts come from a **ScriptGenerator**: one interface, three implementations,
chosen per run with `--generator`. The pipeline knows only the interface.

| Engine | What it does | Needs |
|---|---|---|
| `template` (**default**) | Reuses source sentences verbatim. Cannot invent, reads like a document being read aloud. | nothing |
| `claude-cli` | Shells out to `claude -p` and uses **your existing Claude Code login**. No API key. | a normal terminal (see §8b) |
| `claude` | Writes original prose through the Messages API. | `ANTHROPIC_API_KEY` |
| `mock` | Deterministic, free, offline. Runs the *real* assembly, grounding and duration checks — not a canned stub. | nothing |

The default is unchanged, so this layer alters nothing until a run opts in.
`--generator=claude` **falls back to `template`** when no key is present and says
so in the report, rather than failing a scheduled job.

```bash
npm run tiktok:plan     -- --generator=mock --format=news
npm run tiktok:generate -- --generator=claude --budget=2 --log-json
```

| Flag | Default | Meaning |
|---|---|---|
| `--generator=template\|claude\|mock` | `template` | which engine writes the script |
| `--budget=USD` | `5` | run spend ceiling; generation stops when reached |
| `--timeout=MS` | `90000` | per-generation wall clock |
| `--model=ID` | `claude-opus-5` | model for provider-backed engines |
| `--log-json` | off | one structured JSON log line per step, to stderr |

### 8b. The `claude-cli` provider — run it from a normal terminal

**It will not run from inside a Claude Code session, by design.** Spawning
`claude -p` from a session nests one agent inside another. The provider detects
`CLAUDECODE` / `CLAUDE_CODE_SESSION_ID`, refuses, and the pipeline falls back to
`template` saying exactly why.

So: **open Terminal.app (or iTerm) directly — not the terminal inside a Claude
Code session** — and run:

```bash
cd "/Users/jordisanchez/Desktop/All PROJECTS/Proyectos/Gridiron-Spain"
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"

# 1. Confirm you are NOT inside a session (must print nothing)
echo "$CLAUDECODE"

# 2. Confirm the login the subprocess will use
claude auth status

# 3. Dry run — ONE provider call, renders nothing, keeps the raw response
npm run tiktok:plan -- --generator=claude-cli --format=news \
  --limit=1 --max-generations=1 --log-json \
  --dump-cli-response=out/tiktok/.cli-debug

# 4. Render for real, still one call at a time
npm run tiktok:generate -- --generator=claude-cli --format=news --limit=1 --max-generations=2
npm run tiktok:generate -- --generator=claude-cli --format=explainer --limit=1 --max-generations=2
```

| Flag | Default | Why it matters |
|---|---|---|
| `--max-generations=N` | `limit × 2` | **Hard cap on provider calls.** Without it a run keeps calling until `limit` clips *succeed*, so eight candidates with `--limit=1` meant eight subscription calls. Set it to 1 for a first probe. |
| `--concurrency=N` | `1` | Parallel `claude -p` processes. Keep at 1 on a subscription. |
| `--max-turns=N` | `4` | Runaway ceiling. A healthy one-shot reports **2**. |
| `--timeout=MS` | `180000` | Per generation. |
| `--dump-cli-response=DIR` | off | Saves the raw (redacted) response when parsing fails. |
| `--max-budget-usd=N` | off | Forwarded to `claude -p`. Only meaningful on an API-key login. |
| `--model=opus\|sonnet\|…` | `opus` | |
| `--log-json` | off | One JSON line per step, to stderr. |

The run report prints `Generations: N of M allowed` so you can see exactly how
many calls were spent.

#### What the subprocess is allowed to do: nothing but answer

| Flag passed | Effect |
|---|---|
| `--tools ""` | **The entire built-in tool set is disabled.** No file read or write, no command execution, no network fetch. |
| `--permission-mode dontAsk` | Anything that would prompt is denied instead of hanging an unattended run. |
| `--strict-mcp-config` | Only MCP servers named on the command line load — and none are. |
| `--no-session-persistence` | No transcript is written to disk. |
| `--output-format json` + `--json-schema` | The answer is a schema-validated object, not prose to be scraped. |
| `--append-system-prompt` | The editorial system prompt rides along; Claude Code's default is kept. |

Never passed: `--dangerously-skip-permissions`, `--allowedTools`, `--add-dir`,
`--mcp-config`, `--bare`. Tests assert each of those absences.

The child's environment is scrubbed of `CLAUDECODE`, `CLAUDE_CODE_SESSION_ID`,
`CLAUDE_CODE_MESSAGING_SOCKET`, `CLAUDE_CODE_MESSAGING_TOKEN` and siblings, so
the parent session's live credentials never reach it. Logs redact anything
key-shaped and never print the prompt body — only its size.

#### Verified against this installation — do not assume API parity

Checked on **Claude Code 2.1.231**, `claude auth status`:

```json
{ "loggedIn": true, "authMethod": "claude.ai",
  "apiProvider": "firstParty", "subscriptionType": "max" }
```

| Finding | Consequence |
|---|---|
| Auth is **OAuth via claude.ai on a Max subscription**, not an API key | Runs draw on **plan quota**, not per-token API billing. No `ANTHROPIC_API_KEY` is set or needed. |
| Limits are **subscription session/weekly limits** | They are *not* the API's RPM/TPM. A burst of parallel generations can exhaust a session window; this is why `--concurrency` defaults to **1**. |
| `total_cost_usd` in the JSON is a **client-side estimate of the API-equivalent price** | The package therefore records `estimatedCostUsd: null` for this provider and keeps token counts instead. Quoting a dollar figure for a subscription run would be wrong. |
| **`--max-turns` does not exist** in 2.1.231 | The ceiling is enforced by checking the reported `num_turns`. **A healthy one-shot reports 2**, not 1 — the user turn plus the assistant answer. The default ceiling is 4; an earlier default of 1 rejected every valid run. |
| **`--permission-prompts none` needs v2.1.259+** | Omitted; `--permission-mode dontAsk` is this version's equivalent. |
| **`--bare` must not be used** | It never reads OAuth credentials, so on a claude.ai login it would fail for want of an API key. |

Re-check with `claude --version` and `claude auth status` after any CLI upgrade;
these findings are version-specific.

### The Claude adapter

Runs on the official SDK against the Messages API, so a cron job needs only an
API key — it never depends on an interactive Claude Code session. The answer is
constrained by a **JSON schema** (`output_config.format`) rather than parsed out
of prose, then put through the same assembly as every other engine.

- **Timeout** per request, **bounded retries** (3 attempts, exponential backoff)
  that stop early on a non-retryable error — a bad key is never retried.
- **Refusals** (`stop_reason: "refusal"`) are a typed rejection, not a crash.
- **Budget** is checked before each call; an exhausted budget rejects with
  `budget-exhausted` without issuing a request.

### Never invent — how it is enforced

Not a promise in a prompt; two mechanical gates:

1. **Every number must appear in the evidence playing the same role.** Not the
   same digits — the same *role*. Numbers are classified from their context:

   | Role | Example | Backed by |
   |---|---|---|
   | `rank` | `Top 10`, `#8`, `División 1`, `Jornada 5` | the same denomination in the source |
   | `score` | `52-28` | the same result |
   | `date` | `2026`, `13 de diciembre`, `2026-27` | the same date |
   | `percentage` | `45%` | the same percentage |
   | `count` | `13 puestos`, `2 títulos` | the same count **of the same unit** |
   | `quantity` | a number with no stated role | the same roleless number |

2. **Lexical overlap.** A `verified` claim with almost no wording in common with
   the evidence it cites is refused.

This is **not a whitelist of allowed numbers**: nothing passes for being small
or common. `Top 1` is refused as readily as `Top 97` when the source does not
say it.

#### Why the role matters

Two failures the earlier digit-string rule produced, in opposite directions:

- **False positive.** A live run had Opus write *"Estar en el Top 10 cambia el
  peso de cada partido que les queda."* It was refused with *"an inference may
  not state figures (10)"* — but `10` is part of a denomination the evidence
  already states (*"entra en el Top 10"*), not a measurement. The blanket ban on
  figures inside inferences is gone; backing is the gate.
- **False negative, worse.** *"Ganaron por 8 puntos de ventaja"* was **accepted**
  because the evidence contained `#8` — a league position. A fabricated winning
  margin passed as sourced fact. Role matching closes it: a `rank` never backs a
  `count of puntos`.

A roleless `quantity` is tolerated only inside a `verified` claim, which is
separately required to share wording with the evidence it cites. An inference
offering a number with no stated role must match a roleless number in the source.

Spanish names a ranking with a bare article, so **"el 8 del AP Poll" is read as
`rank:8`**, the same as "el #8" — but only when what follows names a ranking or
is a proper noun, so "a 13 de la cima" stays the fabricated relation it is.

#### One rule, two gates

Generation and the quality gate run **the same function on the same inputs**
(the declared claims and the evidence, both carried in the package). The gate's
independence is that it does not trust the generator's self-report, not that it
applies a different contract — a live clip was lost to exactly that
disagreement, with generation accepting a roleless number inside a `verified`
claim and the gate refusing it at `inference` strictness.

On top of the shared rule the gate adds one check generation cannot make: a
figure spoken in the narration but never declared as a claim must still be
supported by the evidence, so a beat the model forgot to declare cannot reach
the render unchecked.

#### When a clip is refused

The script is written to `out/tiktok/.rejected/<slug>.rejected.json` with the
findings, the scenes as written, the claims and the evidence. Nothing is
published; it exists so a rejection can be read rather than guessed at.
(`--dump-cli-response` only fires when the provider's response cannot be
*parsed*, which is a different failure.)

#### Optional single-pass repair

`--repair` allows **one** extra generation to rewrite a script the quality gate
refused for a wording problem. Deliberately narrow:

- one attempt, never a loop — a failed repair is a rejection;
- it costs a generation, counted against `--max-generations`;
- only for `grounding` / `language` / `structure` errors, and at most four of
  them: a missing source or a wholly broken script is not a rewrite;
- the evidence is unchanged, so a repair cannot introduce new facts;
- the repaired script is **revalidated from scratch** by the same gates, and is
  flagged in the run report so a person reads it before publishing;
- off by default.

Each claim is declared `verified` (the source says it) or `inference` (the
generator's reading of it) and stored in the editorial package, so an editor can
see exactly which sentences are sourced.

### Rejection states

Explicit and reported, never silent: `insufficient-material`,
`insufficient-sources`, `malformed-output`, `ungrounded-claim`,
`duration-out-of-band`, `budget-exhausted`, `provider-timeout`,
`provider-error`, `provider-refusal`.

## 8c. Rendering without calling the LLM

A script that clears both gates is persisted the moment it is approved — in a
dry run too. Approval is the expensive step; it is no longer thrown away.

```bash
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"

# 1. Approve a script (one provider call; writes out/tiktok/.approved/<slug>.approved.json)
npm run tiktok:plan -- --generator=claude-cli --format=news --limit=1 --max-generations=1

# 2. Render it — ZERO provider calls. Repeat as often as you like.
npm run tiktok:render -- --from-approved=<slug>

# EXPLAINER is identical
npm run tiktok:plan   -- --generator=claude-cli --format=explainer --limit=1 --max-generations=1
npm run tiktok:render -- --from-approved=<slug>

# Re-render after a visual or pacing change
npm run tiktok:render -- --from-approved=<slug> --allow-updates
```

The run report prints `Generations: 0 of 0 allowed` on a replay — the proof
that nothing was generated. `--from-approved` accepts a slug, a file or a
directory.

**What a replay reuses, and what it refreshes.** The facts, claims and evidence
are replayed verbatim. Three things are *production* settings and follow today's
config, so a fix reaches scripts approved before it: scene padding, the closing
CTA (our own template text, which names the brand), and the media-rights
manifest, which must describe what this render draws. A stored file is
re-validated by both gates before anything is encoded, and is refused outright
if its schema is stale, its evidence is missing or it records a failed
evaluation.

## 8d. Actuality

A clip built from a 16-day-old briefing was shipping with an `AHORA` chip. The
facts were sourced and true; the framing was not. The kicker now follows the
source's age:

| Age | Kicker | Urgency words allowed |
|---|---|---|
| ≤ 1 day | `AHORA` | yes |
| ≤ 4 days | `ESTA SEMANA` | yes |
| ≤ 21 days | `EL DATO` | **no** |
| older | `ARCHIVO` | **no** |

Outside the first two bands the date and the age are printed under the kicker
(`2026-10-02 · hace 16 días`), and `ahora` / `hoy` / `última hora` in narration
are reported as violations. Old material can be framed as a fact or as history;
it is never framed as news.

## 8e. Sports graphics

Drawn from figures the grounding check has already tied to the source: a
**scoreboard** when a card states a result, a **ranking ladder** when it states
a position. Both are our own geometry — no photography, no club marks, no
broadcast stills — so the rights manifest stays `generated` with zero external
assets. A card with no figures gets no decoration; the ladder draws a climb
only when the evidence states one.

## 9. Editorial package

One `<slug>.editorial.json` per clip, next to the MP4 — the record an editor
reads to approve a clip, and the audit trail afterwards. It carries the script,
the type, the original source path and date, the generation date, confidence,
the **claims** split verified/inference with evidence indices, the verbatim
**evidence**, the **references**, the **media rights** of every asset, the
**generator and model**, the **prompt version**, token usage and estimated cost,
plus the `eventKey` and `scriptFingerprint` used for dedup — and the independent
quality report.

## 10. Quality evaluation

`automation/src/script/evaluate.ts` runs **after** generation and never sees the
prompt or the model, so no engine can talk its way past its own grader. Four
dimensions — structure, language, editorial, grounding — scored 0-100; any error
rejects the clip.

It catches: a missing hook or conclusion, a hook over 6s, two beats that say the
same thing, marketing filler, research apparatus (URLs, confidence markers, file
paths) in narration, cards that open mid-sentence, sentences too long to say
aloud, a news clip with no reference, a clip that states nothing verifiable, and
any figure not present in the evidence.

## 11. Duplicate detection

Three layers, because a model rewriting a story defeats a slug check:

1. **Slug** — the original ledger gate.
2. **Event** — `eventKey` is a date plus a sorted digest of the headline's
   content words, so two wordings of one game collide even with different slugs.
3. **Script similarity** — narration is fingerprinted and compared against every
   past clip; above 55% content-word overlap it is refused, which catches an
   engine that settles into a formula.

## 12. Duration bands

NEWS **20-45s**, EXPLAINER **30-75s**, enforced on the estimate before rendering
and on the measured file after. The NEWS band replaces the old 30s floor that
produced a standing warning on every clip: a radar briefing carries ~40 words per
story, and 20-45s is what that material honestly supports.

EXPLAINER additionally demands **2 source links and 4 narratable sentences**. A
research document that is only a fact table fails that gate and is rejected with
`insufficient-material` rather than paraphrased into something that looks
finished.

## 13. Known limitations

1. **The `claude-cli` provider has had one real run, which failed.** It
   rejected every clip on `num_turns: 2` because the ceiling assumed a one-shot
   reports 1. That assumption is now corrected (default ceiling 4) and pinned by
   a regression test, along with precise diagnostics for an unusable
   `structured_output` and a hard cap on provider calls. **The prose it produces
   is still unproven** — re-run the supervised procedure in §8b, starting with
   `--max-generations=1`.
2. **The Claude *API* adapter has never run against the live API.** There is no
   `ANTHROPIC_API_KEY`, no `ant` credential and no network key on this machine.
   The adapter is fully implemented and exercised by tests through an injected
   client — request shape, schema, refusal, retry, timeout, budget, usage
   accounting — but **no real generation has happened**, so the prose quality of
   the `claude` engine is unproven and **cost per generation is an estimate from
   list prices, not a measurement**. Rough order: ~1.5-2.5k input + ~0.5k output
   tokens per script, i.e. **$0.02-0.03 per clip on Claude Opus 5**.
3. **The mock engine is not an AI.** It is a deterministic packer that reuses
   source sentences. The comparison in this run therefore proves the *plumbing*
   works end to end, not that generated writing is better than the template's.
4. **Grounding checks numbers in context, not meaning.** Role matching catches
   a fabricated relation whenever it is *expressed numerically* — a rank reused
   as a margin, half a score reused as an average. A purely qualitative causal
   claim ("ganaron porque cambiaron de quarterback") carries no figure and is
   **not** mechanically checkable; the evaluator and a human reading the
   editorial package are the backstop there.
5. **Similarity is lexical, not semantic.** Jaccard overlap of content words
   catches rewrites and formulaic output; a genuine paraphrase with different
   vocabulary would slip through.
6. **Spanish only.** English research documents are rejected by the language
   validator.
7. **Still nothing is scheduled and Buffer stays disabled** — both need the
   editor's decision, per `AGENTS.md`.
8. **`@anthropic-ai/sdk` is now a runtime dependency** of the repo, imported only
   by `automation/`. The Next.js build does not pull it in.
9. **No music, no photography.** Frames remain generated type and geometry.
10. **`src/data/sources` is still not linked** to clip references.
