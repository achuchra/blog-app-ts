export const parseDate = (date: Date | string): string => {
  const parsedString: Date = new Date(date);
  const year = parsedString.getFullYear();
  const month = parsedString.getMonth();
  const day = parsedString.getDate();

  return `${year}-${month}-${day}`;
};
