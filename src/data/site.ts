export const site = {
  name: "Ojilong Yusuf",
  tagline: "Biology & Chemistry teacher trainee · Builder of practical tools",
  email: "TODO: replace",
  university: "Kyambogo University · Soroti Learning Centre",
  year: "Year 2",
  location: "Uganda",
  social: {
    github: "https://github.com/ojilon",
    x: "https://twitter.com/OJI_OJI_00",
  },
};

export const siteLinks = [
  { label: "GitHub", url: site.social.github },
  { label: "X · @OJI_OJI_00", url: site.social.x },
  { label: "Email", url: site.email.startsWith("TODO:") ? site.email : `mailto:${site.email}` },
];

export const footerYear = new Date().getFullYear();
