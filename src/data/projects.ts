export type ProjectStatus = "released" | "in-progress" | "idea";
export type PreviewKind = "phone-pc" | "browser" | "terminal" | "code" | "shortcut";
export type PreviewTone = "sage" | "sand" | "lavender";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  status: ProjectStatus;
  previewKind: PreviewKind;
  tone: PreviewTone;
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
    tone: "sage",
    repoUrl: "https://github.com/ojilon/Wayer",
    reasonTitle: ["A little less friction.", "A little more room to focus."],
    reasonBody: [
      "Moving a document should not interrupt the work. Wayer is shaped around a small promise: make the phone-to-PC handoff feel obvious, fast and calm, even when the connection is local.",
      "Move files between a phone and a PC without the cable dance. That is the practical question this project is here to explore.",
    ],
    featured: true,
    updated: "2026-11-01",
  },
  {
    slug: "zlanpiko",
    name: "zlanpiko",
    summary: "An offline academic manager for the everyday work of studying.",
    tags: ["Offline-first", "Academic tools", "Student workflow"],
    status: "in-progress",
    previewKind: "browser",
    tone: "sand",
    repoUrl: "https://github.com/ojilon/zlanpiko",
    reasonTitle: ["Study without the network.", "Keep your work in your hands."],
    reasonBody: [
      "zlanpiko is an offline academic manager for the everyday work of studying.",
      "The project is being shaped around a simple need: study tools should remain useful when a connection is unreliable.",
    ],
    featured: true,
    updated: "2026-11-01",
  },
  {
    slug: "conductino",
    name: "Conductino",
    summary: "A browser concept tuned for focused, study-oriented browsing.",
    tags: ["Browser", "Study workflow", "Focus"],
    status: "in-progress",
    previewKind: "browser",
    tone: "lavender",
    repoUrl: "https://github.com/ojilon/Conductino",
    reasonTitle: ["A browser for focus.", "Designed around study, not distraction."],
    reasonBody: [
      "Conductino explores what a browser could feel like when study is the main use case.",
      "The concept is focused on making study-oriented browsing feel more intentional.",
    ],
    updated: "2026-11-01",
  },
  {
    slug: "android-scaffold-studio",
    name: "Android-Scaffold-Studio",
    summary: "Generate a clean Android project scaffold and get to the useful part sooner.",
    tags: ["Android", "Code generation", "Developer tools"],
    status: "in-progress",
    previewKind: "code",
    tone: "sage",
    repoUrl: "https://github.com/ojilon/Android-Scaffold-Studio",
    reasonTitle: ["Less setup, more building.", "Start from a clean scaffold."],
    reasonBody: [
      "Android-Scaffold-Studio focuses on generating a clean starting point for an Android project.",
      "The aim is to make the repetitive setup step smaller, so a developer can get to the useful part sooner.",
    ],
    updated: "2026-11-01",
  },
  {
    slug: "releaseforge",
    name: "releaseforge",
    summary: "A terminal workspace for building and shipping releases with confidence.",
    tags: ["Terminal", "Build tooling", "Release workflow"],
    status: "released", // TODO: verify
    previewKind: "terminal",
    tone: "sand",
    repoUrl: "https://github.com/ojilon/releaseforge",
    reasonTitle: ["Ship with confidence.", "Build, check, release."],
    reasonBody: [
      "releaseforge is a terminal workspace for building and shipping releases.",
      "Its focus is a more deliberate release workflow, presented in a place developers already use: the terminal.",
    ],
    featured: true,
    updated: "2026-11-01",
  },
  {
    slug: "perspecta-see",
    name: "perspecta_see",
    summary: "Visualize how browser code fits together while you explore a page.",
    tags: ["Browser", "Code visualization", "Learning tools"],
    status: "in-progress",
    previewKind: "shortcut",
    tone: "sage",
    repoUrl: "https://github.com/ojilon/perspecta_see",
    reasonTitle: ["See how the code fits.", "Explore a page, understand its structure."],
    reasonBody: [
      "perspecta_see explores ways to make the structure behind a browser page easier to see.",
      "The project connects everyday browsing with a closer look at the code that shapes a page.",
    ],
    updated: "2026-11-01",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
