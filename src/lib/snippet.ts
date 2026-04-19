/**
 * Get a short text snippet from a markdown body.
 * Skips image lines and frontmatter. Returns the first paragraph of prose.
 */
export function snippetFromBody(body: string | undefined, maxLen = 240): string {
  if (!body) return '';
  const lines = body.split('\n');
  const paragraphs: string[] = [];
  let current: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      if (current.length) {
        paragraphs.push(current.join(' '));
        current = [];
      }
      continue;
    }
    // skip image-only lines and markdown image syntax
    if (/^!\[.*?\]\(.*?\)\s*$/.test(line)) continue;
    // skip headings
    if (/^#{1,6}\s/.test(line)) continue;
    current.push(line);
  }
  if (current.length) paragraphs.push(current.join(' '));
  const first = paragraphs[0] ?? '';
  if (first.length <= maxLen) return first;
  return first.slice(0, maxLen).trimEnd() + '…';
}
