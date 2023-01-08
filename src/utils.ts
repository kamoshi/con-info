const REGEX = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

export function extractIds(urls: string[]): string[] {
  return urls.map(url => url.match(REGEX)[1]);
}
