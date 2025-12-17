export const formatDate = (date: Date, locale: 'sk' | 'en' = 'sk'): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Intl.DateTimeFormat(locale === 'sk' ? 'sk-SK' : 'en-US', options).format(date);
};

export const getNights = (from: Date, to: Date): number => {
  const diffTime = Math.abs(to.getTime() - from.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isDateInRange = (date: Date, from: Date, to: Date): boolean => {
  return date >= from && date <= to;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};