export function preventReservedKeywords(key: any): void {
  const reservedKeywords = ['resources'];
  reservedKeywords.forEach((reservedKeyword) => {
    if (key === reservedKeyword) {
      throw new Error(
        `Key "resources" is a reserved keyword and cannot be used.`
      );
    }
  });
}
