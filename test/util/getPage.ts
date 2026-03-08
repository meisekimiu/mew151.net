import { readFileSync } from "fs";

function getSitePath(path: string): string {
  return __dirname + "/../../src/" + path.replace(/\/$/, "/index.html");
}

export function getPage(
  url: string,
  type: DOMParserSupportedType = "text/html",
): Document {
  const file = readFileSync(getSitePath(url)).toString();
  const parser = new DOMParser();
  return parser.parseFromString(file, type);
}
