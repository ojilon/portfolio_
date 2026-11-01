export type ProjectStatus = "released" | "in-progress" | "idea";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  status: ProjectStatus;
  previewKind:
    | "phone-pc"
    | "browser"
    | "terminal"
    | "code"
    | "shortcut";
  screenshot?: string;
  gallery?: string[];
  releaseUrl?: string;
  docsUrl?: string;
  repoUrl: string;
  reasonTitle: [string, string];
  reasonBody: [string, string];
  featured?: boolean;
  updated: string;
};

export const projects: Project[] = [
  {
    slug: "wayer",
    name: "Wayer",
    summary: "Move files between a phone and a PC without the cable dance.",
    tags: ["Android", "Local network", "File transfer"],
    status: "released", // TODO: verify
    previewKind: "phone-pc",
    repoUrl: "https://github.com/ojilon/Wayer",
    reasonTitle: ["A little less friction.", "A little more room to focus."],
    reasonBody: [
      "Moving a document should not interrupt the work. Wayer is shaped around a small promise: make the phone-to-PC handoff feel obvious, fast and calm, even when the connection is local.",
      "Move files between a phone and a PC without the cable dance. That is the practical question this project is here to explore.",
    ],
    featured: true,
    updated: "2026-10-20",
  },
  {
    slug: "zlanpiko",
    name: "zlanpiko",
    summary: "An offline academic manager for the everyday work of studying.",
    tags: ["Offline-first", "Academic tools", "Student workflow"],
    status: "in-progress",
    previewKind: "browser",
    repoUrl: "https://github.com/ojilon/zlanpiko",
    reasonTitle: ["Study without the network.", "Keep your work in your hands."],
    reasonBody: [
      "An offline academic manager for the everyday work of studying.",
      "Built so a learner can keep track of notes, assignments and progress without depending on a connection that comes and goes.",
    ],
    updated: "2026-10-15",
  },
  {
    slug: "conductino",
    name: "Conductino",
    summary: "A browser concept tuned for focused, study-oriented browsing.",
    tags: ["Browser", "Study workflow", "Focus"],
    status: "in-progress",
    previewKind: "browser",
    repoUrl: "https://github.com/ojilon/Conductino",
    reasonTitle: ["A browser for focus.", "Designed around study, not distraction."],
    reasonBody: [
      "A browser concept tuned for focused, study-oriented browsing.",
      "Reducing the frictions that pull attention away from learning.",
    ],
    updated: "2026-10-10",
  },
  {
    slug: "android-scaffold-studio",
    name: "Android-Scaffold-Studio",
    summary: "Generate a clean Android project scaffold and get to the useful part sooner.",
    tags: ["Android", "Code generation", "Developer tools"],
    status: "in-progress",
    previewKind: "code",
    repoUrl: "https://github.com/ojilon/Android-Scaffold-Studio",
    reasonTitle: ["Less setup, more building.", "Start from a clean scaffold."],
    reasonBody: [
      "Generate a clean Android project scaffold and get to the useful part sooner.",
      "Removing the repetitive start-up work of a new Android project.",
    ],
    updated: "2026-10-08",
  },
  {
    slug: "releaseforge",
    name: "releaseforge",
    summary: "A terminal workspace for building and shipping releases with confidence.",
    tags: ["Terminal", "Build tooling", "Release workflow"],
    status: "released", // TODO: verify
    previewKind: "terminal",
    repoUrl: "https://github.com/ojilon/releaseforge",
    reasonTitle: ["Ship with confidence.", "Build, check, release."],
    reasonBody: [
      "A terminal workspace for building and shipping releases with confidence.",
      "A place where tests pass, versions are tagged, and releases are ready to publish.",
    ],
    updated: "2026-10-05",
  },
  {
    slug: "perspecta-see",
    name: "perspecta_see",
    summary: "Visualize how browser code fits together while you explore a page.",
    tags: ["Browser", "Code visualization", "Learning tools"],
    status: "in-progress",
    previewKind: "shortcut",
    repoUrl: "https://github.com/ojilon/perspecta_see",
    reasonTitle: ["See how the code fits.", "Explore a page, understand its structure."],
    reasonBody: [
      "Visualize how browser code fits together while you explore a page.",
      "Helping learners read the structure behind the sites they use every day.",
    ],
    updated: "2026-10-03",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
