export const checkExtraZero = (num: number): string => {
  if (num <= 9) {
    return `0${num}`;
  } else return `${num}`;
};

export const parseDate = (date: Date | string): string => {
  const parsedString: Date = new Date(date);
  const year = parsedString.getFullYear();
  const month = parsedString.getMonth() + 1;
  const day = parsedString.getDate();

  return `${year}-${checkExtraZero(month)}-${checkExtraZero(day)}`;
};
