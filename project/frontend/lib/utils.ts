import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMoreThan6MonthsOrLessThan1Day = (
  dateString: string
): boolean => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  // Calculate the difference in milliseconds
  const timeDifference = currentDate.getTime() - targetDate.getTime();

  // Check if the date is more than 6 months ago or less than 1 day ago
  const isMoreThan6Months = timeDifference > 6 * 30 * 24 * 60 * 60 * 1000;
  const isLessThan1Day = timeDifference < 24 * 60 * 60 * 1000;

  return isMoreThan6Months || isLessThan1Day;
};
