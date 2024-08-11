function formatISODateToDDMMYYYY(isoDateString: string): string {
  // Create a new Date object from the ISO 8601 string
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}
export { formatISODateToDDMMYYYY };
