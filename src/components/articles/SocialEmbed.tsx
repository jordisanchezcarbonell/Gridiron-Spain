"use client";

import { useState } from "react";

const INSTAGRAM_POST = /^https:\/\/www\.instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)\/?$/;

/** Instagram's official iframe embed URL for a post, or null if the URL is not a post. */
export function instagramEmbedUrl(url: string): string | null {
  const match = url.match(INSTAGRAM_POST);
  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/` : null;
}

/**
 * A public social post shown as our own card first. The Instagram iframe (and
 * Meta's cookies) only load after the reader clicks, so the page stays fast and
 * nothing third-party runs without consent.
 */
export function SocialEmbed({
  url,
  account,
  description,
  postedAt,
  labels,
}: {
  url: string;
  account: string;
  description: string;
  postedAt?: string;
  labels: { load: string; open: string; note: string };
}) {
  const [loaded, setLoaded] = useState(false);
  const embed = instagramEmbedUrl(url);

  if (loaded && embed) {
    return (
      <figure className="my-8 flex justify-center">
        <iframe
          src={embed}
          title={`Instagram · @${account}`}
          className="w-full max-w-[540px] rounded-card border border-line bg-white"
          style={{ height: 720 }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </figure>
    );
  }

  return (
    <aside className="card my-8 p-5">
      <p className="kicker mb-2">
        Instagram · @{account}
        {postedAt ? ` · ${postedAt}` : ""}
      </p>
      <p className="text-paper-2">{description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 font-sans text-sm">
        {embed && (
          <button type="button" onClick={() => setLoaded(true)} className="rounded-full border border-gold px-4 py-2 text-gold hover:bg-gold hover:text-ink">
            {labels.load}
          </button>
        )}
        <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
          {labels.open} ↗
        </a>
      </div>
      {embed && <p className="mt-3 text-xs text-muted">{labels.note}</p>}
    </aside>
  );
}
