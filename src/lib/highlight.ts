import type { FileLang } from "./bundle-catalog";

type Tok = { t: string; c: string };

const KW_PY = new Set([
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "False",
  "finally",
  "for",
  "from",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "None",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "True",
  "try",
  "while",
  "with",
  "yield",
]);

function pushPlain(out: Tok[], s: string) {
  if (s) out.push({ t: "plain", c: s });
}

export function tokenize(source: string, lang: FileLang): Tok[] {
  if (lang === "python") return tokPython(source);
  if (lang === "yaml" || lang === "gitignore") return tokYaml(source);
  if (lang === "bash") return tokBash(source);
  if (lang === "toml") return tokToml(source);
  if (lang === "md") return tokMd(source);
  return [{ t: "plain", c: source }];
}

function tokPython(src: string): Tok[] {
  const out: Tok[] = [];
  const re =
    /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b([A-Za-z_][\w]*)\b|(\d+\.?\d*)/gm;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    pushPlain(out, src.slice(last, m.index));
    if (m[1]) out.push({ t: "cmt", c: m[1] });
    else if (m[2]) out.push({ t: "str", c: m[2] });
    else if (m[3]) out.push({ t: KW_PY.has(m[3]) ? "kw" : "id", c: m[3] });
    else if (m[4]) out.push({ t: "num", c: m[4] });
    last = m.index + m[0].length;
  }
  pushPlain(out, src.slice(last));
  return out;
}

function tokYaml(src: string): Tok[] {
  const out: Tok[] = [];
  const lines = src.split(/(\n)/);
  for (const line of lines) {
    if (line === "\n") {
      out.push({ t: "plain", c: "\n" });
      continue;
    }
    const cmt = line.match(/^(.*?)(\s#.*)$/);
    const body = cmt ? cmt[1] : line;
    const comment = cmt ? cmt[2] : "";
    const key = body.match(/^(\s*)([\w./-]+)(:\s?)(.*)$/);
    if (key) {
      pushPlain(out, key[1]);
      out.push({ t: "key", c: key[2] });
      out.push({ t: "plain", c: key[3] });
      const rest = key[4];
      if (/^["'].*["']$/.test(rest.trim()) || rest.includes("${")) {
        out.push({ t: "str", c: rest });
      } else if (/^(true|false|null|\d+)\s*$/.test(rest)) {
        out.push({ t: "num", c: rest });
      } else {
        pushPlain(out, rest);
      }
    } else if (body.trim().startsWith("- ")) {
      const idx = body.indexOf("- ");
      pushPlain(out, body.slice(0, idx));
      out.push({ t: "kw", c: "-" });
      pushPlain(out, body.slice(idx + 1));
    } else {
      pushPlain(out, body);
    }
    if (comment) out.push({ t: "cmt", c: comment });
  }
  return out;
}

function tokBash(src: string): Tok[] {
  const out: Tok[] = [];
  const re = /(#.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\$\{?[A-Za-z_][\w]*\}?)|\b(if|then|fi|for|do|done|in|export|set|echo|cd)\b/gm;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    pushPlain(out, src.slice(last, m.index));
    if (m[1]) out.push({ t: "cmt", c: m[1] });
    else if (m[2]) out.push({ t: "str", c: m[2] });
    else if (m[3]) out.push({ t: "num", c: m[3] });
    else if (m[4]) out.push({ t: "kw", c: m[4] });
    last = m.index + m[0].length;
  }
  pushPlain(out, src.slice(last));
  return out;
}

function tokToml(src: string): Tok[] {
  return tokYaml(src);
}

function tokMd(src: string): Tok[] {
  const out: Tok[] = [];
  const lines = src.split(/(\n)/);
  for (const line of lines) {
    if (line === "\n") {
      out.push({ t: "plain", c: "\n" });
      continue;
    }
    if (/^#{1,6} /.test(line)) out.push({ t: "kw", c: line });
    else if (line.startsWith("```")) out.push({ t: "cmt", c: line });
    else if (line.startsWith("> ")) out.push({ t: "str", c: line });
    else if (/^\s*[-*] /.test(line)) {
      const i = line.search(/[-*]/);
      pushPlain(out, line.slice(0, i));
      out.push({ t: "kw", c: line[i] ?? "-" });
      pushPlain(out, line.slice(i + 1));
    } else pushPlain(out, line);
  }
  return out;
}

export const TOKEN_CLASS: Record<string, string> = {
  plain: "text-fg",
  kw: "text-brick",
  key: "text-[#b9c4ce]",
  str: "text-[#c4b59a]",
  cmt: "text-fg-subtle italic",
  num: "text-ok",
  id: "text-fg",
};
