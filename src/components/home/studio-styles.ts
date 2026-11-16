import layout from "./studio-home.module.css";
import previews from "./studio-previews.module.css";
import sections from "./studio-sections.module.css";
import showcase from "./studio-showcase.module.css";

// A few context rules live beside their section. Keep every scoped class when a
// base style and a contextual style share a name across the focused modules.
const modules = [layout, previews, sections, showcase];
export const studioStyles: Record<string, string> = Object.fromEntries(
  [...new Set(modules.flatMap((module) => Object.keys(module)))].map((key) => [
    key,
    modules
      .map((module) => module[key])
      .filter(Boolean)
      .join(" "),
  ]),
);
