import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  format,
  isSameMonth,
  isWeekend,
  endOfMonth,
  addDays,
  startOfMonth,
} from "date-fns";

/**
 * Generates week labels and calculates the number of working days (Monday to Friday)
 * within each week for the given date range.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Object} - A map of week labels to their respective number of working days.
 */
const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generateLabels = (startDate, endDate) => {
  let current = startDate;
  //   startOfWeek(startDate, { weekStartsOn: 1 }); // Start week on Monday
  let weekNumber = 1;
  const weekLabels = {},
    monthLabels = {},
    yearLabels = {};

  while (current <= endDate) {
    const start = current;
    let end = endOfWeek(current, { weekEndsOn: 5 });
    // console.log(current, end);

    // Adjust end date if it exceeds the endDate
    if (end > endDate) {
      end = endDate;
    }

    //  if (endOfMonth(current) < end) {
    //   end = endOfMonth(current);
    // }

    if (!isSameMonth(endOfMonth(start), end)) {
      end = endOfMonth(start);
    }
    const weekLabel = `Week ${weekNumber}`;

    weekLabels[weekLabel] = {};
    weekLabels[weekLabel] = {
      month: end.getMonth() + 1,
      year: end.getFullYear(),
      start: current,
      end: end,
    };

    // console.log(start, end);

    const workingDays = calculateWorkingDays(start, end);
    if (workingDays === 0) continue;
    // console.log(start, end);
    weekLabels[weekLabel].workingDays = workingDays;

    // console.log(start , current, workingDays)

    // current = startOfWeek(addWeeks(end, 1), { weekStartsOn: 1 });
    if (end.getDate() === endOfMonth(end).getDate()) {
      current = startOfMonth(addDays(end, 1));
    } else {
      current = addDays(end, 1);
    }

    // addWeeks(end, 1); // Move to the next week
    weekNumber++;
  }

  // if (
  //   monthLabels.hasOwnProperty(
  //     `${monthsList[weekLabels[weekLabel].month - 1]}-${
  //       weekLabels[weekLabel].year
  //     }`
  //   )
  // ) {
  //   monthLabels[
  //     `${monthsList[weekLabels[weekLabel].month - 1]}-${
  //       weekLabels[weekLabel].year
  //     }`
  //   ].workingDays =
  //     monthLabels[
  //       `${monthsList[weekLabels[weekLabel].month - 1]}-${
  //         weekLabels[weekLabel].year
  //       }`
  //     ].workingDays + weekLabels[weekLabel].workingDays;
  // } else {
  //   monthLabels[
  //     `${monthsList[weekLabels[weekLabel].month - 1]}-${
  //       weekLabels[weekLabel].year
  //     }`
  //   ] = {
  //     workingDays: weekLabels[weekLabel].workingDays,
  //     year: weekLabels[weekLabel].year,
  //   };
  // }

  // console.log({ weekLabels });

  Object.keys(weekLabels).forEach((i) => {
    if (
      monthLabels.hasOwnProperty(
        `${monthsList[weekLabels[i].month - 1]}-${weekLabels[i].year}`
      )
    ) {
      monthLabels[
        `${monthsList[weekLabels[i].month - 1]}-${weekLabels[i].year}`
      ].workingDays =
        monthLabels[
          `${monthsList[weekLabels[i].month - 1]}-${weekLabels[i].year}`
        ].workingDays + weekLabels[i].workingDays;
    } else {
      monthLabels[
        `${monthsList[weekLabels[i].month - 1]}-${weekLabels[i].year}`
      ] = {
        workingDays: weekLabels[i].workingDays,
        year: weekLabels[i].year,
      };
    }
  });

  Object.keys(monthLabels).forEach((i) => {
    if (yearLabels.hasOwnProperty(monthLabels[i].year)) {
      yearLabels[monthLabels[i].year].workingDays =
        yearLabels[monthLabels[i].year].workingDays +
        monthLabels[i].workingDays;
    } else {
      yearLabels[monthLabels[i].year] = {
        workingDays: monthLabels[i].workingDays,
      };
    }
  });

  return { weekLabels, monthLabels, yearLabels };
};

/**
 * Calculates the number of working days (Monday to Friday) between two dates.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {number} - The number of working days.
 */
export const calculateWorkingDays = (startDate, endDate) => {
  let current = startDate;
  let workingDays = 0;

  while (current <= endDate) {
    // Check if current day is Monday to Friday and not a weekend
    if (current.getDay() >= 1 && current.getDay() <= 5 && !isWeekend(current)) {
      workingDays++;
    }
    current.setDate(current.getDate() + 1); // Move to the next day
  }

  return workingDays;
};

// // Example usage:
// const startDate = new Date('2023-12-01');
// const endDate = new Date('2024-01-02');

// const weekLabels = generateWeekLabels(startDate, endDate);
// console.log(weekLabels);
