const KEYWORDS = new Set(
  (
    "abstract and as async await break case catch class comptime const continue declare def " +
    "defer delete do elif else end enum errdefer except export extends extern false final " +
    "finally fn for from func function goto if impl implements import in include inline " +
    "interface internal is lambda let loop match module mut namespace new nil none not null of " +
    "or override package panic pass private protected pub public raise readonly record require " +
    "rescue return self static struct super switch then this throw throws trait true try type " +
    "typedef undefined union unsafe use using var virtual void when while with yield"
  ).split(" "),
);

const ENTITIES = new Map([
  ["&", "&amp;"],
  ["<", "&lt;"],
  [">", "&gt;"],
]);

const WORD = /[A-Za-z0-9_$]/;
const WORD_START = /[A-Za-z_$]/;
const DIGIT = /[0-9]/;
const SIGN = /[^\sA-Za-z0-9_$]/;

function escape(text: string): string {
  return text.replace(/[&<>]/g, (character) => ENTITIES.get(character) ?? character);
}

/** A `#` opens a comment only when spaced, which spares `#fff` and `#include`. */
function isHashComment(code: string, index: number): boolean {
  const after = code.charAt(index + 1);
  return after === " " || after === "!" || after === "\n" || after === "";
}

function isQuote(character: string): boolean {
  return character === '"' || character === "'" || character === "`";
}

/** Where a run of punctuation has to stop, or it would eat the token that follows. */
function startsToken(code: string, index: number): boolean {
  return isQuote(code.charAt(index)) || isCommentStart(code, index);
}

function isCommentStart(code: string, index: number): boolean {
  const character = code.charAt(index);
  const after = code.charAt(index + 1);
  if (character === "/" && (after === "/" || after === "*")) {
    return true;
  }
  return character === "#" && isHashComment(code, index);
}

/** Quotes close on their own mark, on an unescaped newline, or at the end. */
function endOfString(code: string, start: number, quote: string): number {
  let index = start + 1;
  while (index < code.length) {
    const character = code.charAt(index);
    if (character === "\\") {
      index += 2;
      continue;
    }
    if (character === quote) {
      return index + 1;
    }
    if (character === "\n" && quote !== "`") {
      return index;
    }
    index += 1;
  }
  return code.length;
}

/** Numbers keep their dots, so `1.5` and `0x1f.2` stay one token. */
function endOfNumber(code: string, start: number): number {
  let index = start;
  while (index < code.length) {
    const character = code.charAt(index);
    if (WORD.test(character)) {
      index += 1;
      continue;
    }
    if (character === "." && DIGIT.test(code.charAt(index + 1))) {
      index += 1;
      continue;
    }
    return index;
  }
  return index;
}

function endOfRun(code: string, start: number, pattern: RegExp): number {
  let index = start;
  while (index < code.length && pattern.test(code.charAt(index))) {
    index += 1;
  }
  return index;
}

export function highlight(code: string): string {
  const parts: string[] = [];
  let plain = "";
  let index = 0;

  const flush = () => {
    if (plain) {
      parts.push(escape(plain));
      plain = "";
    }
  };

  const token = (name: string, value: string) => {
    flush();
    parts.push(`<span class="code-${name}">${escape(value)}</span>`);
  };

  while (index < code.length) {
    const character = code.charAt(index);
    const after = code.charAt(index + 1);

    if (character === "/" && after === "*") {
      const close = code.indexOf("*/", index + 2);
      const end = close === -1 ? code.length : close + 2;
      token("comment", code.slice(index, end));
      index = end;
      continue;
    }

    if ((character === "/" && after === "/") || (character === "#" && isHashComment(code, index))) {
      const newline = code.indexOf("\n", index);
      const end = newline === -1 ? code.length : newline;
      token("comment", code.slice(index, end));
      index = end;
      continue;
    }

    if (isQuote(character)) {
      const end = endOfString(code, index, character);
      token("string", code.slice(index, end));
      index = end;
      continue;
    }

    if (DIGIT.test(character) && !WORD.test(code.charAt(index - 1))) {
      const end = endOfNumber(code, index);
      token("number", code.slice(index, end));
      index = end;
      continue;
    }

    if (WORD_START.test(character)) {
      const end = endOfRun(code, index, WORD);
      const word = code.slice(index, end);
      if (KEYWORDS.has(word)) {
        token("keyword", word);
      } else {
        plain += word;
      }
      index = end;
      continue;
    }

    if (SIGN.test(character)) {
      let end = index;
      while (end < code.length && SIGN.test(code.charAt(end)) && !startsToken(code, end)) {
        end += 1;
      }
      token("sign", code.slice(index, end));
      index = end;
      continue;
    }

    plain += character;
    index += 1;
  }

  flush();
  return parts.join("");
}
