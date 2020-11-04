export function preventReservedKeywords(key: any): void {
  if (key === 'resources') {
    throw new Error(
      `Key "resources" is a reserved keyword and cannot be assigned to.`
    );
  }
}
