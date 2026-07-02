export const languageIcons: Record<string, string> = {
  // Web
  html: "devicon-html5-plain ",
  css: "devicon-css3-plain ",
  js: "devicon-javascript-plain ",
  javascript: "devicon-javascript-plain ",
  ts: "devicon-typescript-plain ",
  typescript: "devicon-typescript-plain ",
  jsx: "devicon-react-original ",
  tsx: "devicon-react-original ",
  react: "devicon-react-original ",

  // Backend
  node: "devicon-nodejs-plain ",
  nodejs: "devicon-nodejs-plain ",
  express: "devicon-express-original",
  next: "devicon-nextjs-original",
  nextjs: "devicon-nextjs-original",

  // Languages
  python: "devicon-python-plain ",
  java: "devicon-java-plain ",
  kotlin: "devicon-kotlin-plain ",
  cpp: "devicon-cplusplus-plain ",
  c: "devicon-c-plain ",
  go: "devicon-go-plain ",
  rust: "devicon-rust-plain ",
  php: "devicon-php-plain ",
  ruby: "devicon-ruby-plain ",
  swift: "devicon-swift-plain ",

  // Config
  json: "devicon-json-plain",
  yaml: "devicon-yaml-plain ",
  yml: "devicon-yaml-plain ",
  toml: "devicon-toml-plain",
  docker: "devicon-docker-plain ",
  dockerfile: "devicon-docker-plain ",
  prisma: "devicon-prisma-original ",
  sql: "devicon-azuresqldatabase-plain ",

  // Shell
  bash: "devicon-bash-plain ",
  shell: "devicon-bash-plain ",
  sh: "devicon-bash-plain ",
  zsh: "devicon-bash-plain ",

  // Others
  markdown: "devicon-markdown-original",
  md: "devicon-markdown-original",
  git: "devicon-git-plain ",
};
export const languageAliases: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  md: "markdown",
  yml: "yaml",
  cxx: "cpp",
  "c++": "cpp",
};

export function getLanguage(language?: string) {
  if (!language) return "text";

  const lower = language.toLowerCase();

  return languageAliases[lower] ?? lower;
}

export function getLanguageIcon(language?: string) {
  return languageIcons[getLanguage(language)];
}