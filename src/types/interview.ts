import type { LocalizedString, VerificationStatus } from "./common";
import type { ContentBlock } from "./article";

/** Reserved for the /entrevistas section (post-MVP). */
export type Person = {
  id: string;
  slug: string;
  name: string;
  roles: LocalizedString[];
  teamIds: string[];
  biography?: LocalizedString;
  sourceIds: string[];
};

export type Interview = {
  id: string;
  slug: string;
  personId: string;
  title: LocalizedString;
  teamIds: string[];
  seasons?: string[];
  recordedAt: string;
  content: ContentBlock[];
  sourceIds: string[];
  verificationStatus: VerificationStatus;
};
