export interface CustomPR {
  id: string;
  title: string;
  description: string;
  url: string;
  repoOwner: string;
  repoName: string;
  state: "Merged" | "Open" | "Closed";
  createdAt: string;
  mergedAt: string | null;
  language?: {
    name: string;
    color: string;
  } | null;
}

export const CUSTOM_PRS: CustomPR[] = [
  {
    id: "custom-zitadel",
    title: "fix(login): keep submit button disabled/loading during password reset",
    description:
      "Prevents users from submitting the password reset form multiple times while the request is already in progress. The submit button now remains disabled and continues showing its loading state until the operation completes, avoiding duplicate requests and improving the overall login UX.",
    url: "https://github.com/zitadel/zitadel/pull/12429",
    repoOwner: "zitadel",
    repoName: "zitadel",
    state: "Merged",
    createdAt: "2026-07-13T00:00:00Z",
    mergedAt: "2026-07-13T00:00:00Z",
    language: {
      name: "TypeScript",
      color: "#3178C6",
    },
  },
];
