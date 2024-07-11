function toProperCase(word: string): string {

  const lowercaseWord = word.toLowerCase();

  const firstLetterUppercase = lowercaseWord.charAt(0).toUpperCase();

  return firstLetterUppercase + lowercaseWord.slice(1);
}
export { toProperCase };
