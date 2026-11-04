import { getCollection, type CollectionEntry } from "astro:content";

export type Letter = CollectionEntry<"letters">;

export function parseLetterDate(value: string): Date {
  const parsed = new Date(`${value} UTC`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Unparseable letter date: ${value}`);
  }
  return parsed;
}

export async function getLettersNewestFirst(): Promise<Letter[]> {
  const letters = await getCollection("letters");
  return letters.sort(
    (a, b) =>
      parseLetterDate(b.data.date).getTime() -
      parseLetterDate(a.data.date).getTime(),
  );
}

export async function getLettersOldestFirst(): Promise<Letter[]> {
  const letters = await getCollection("letters");
  return letters.sort(
    (a, b) =>
      parseLetterDate(a.data.date).getTime() -
      parseLetterDate(b.data.date).getTime(),
  );
}

export function letterNeighbors(letters: Letter[], slug: string) {
  const index = letters.findIndex((letter) => letter.data.slug === slug);
  return {
    previous: index > 0 ? letters[index - 1] : undefined,
    next: index >= 0 && index < letters.length - 1 ? letters[index + 1] : undefined,
  };
}
