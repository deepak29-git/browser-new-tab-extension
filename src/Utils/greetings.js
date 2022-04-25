import { getMinuteBelowTen } from "./getMinuteBelowTen";

export const greetings = () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  if (hours >= 5 && hours < 11 && minutes < 59) {
    return "Good Morning";
  } else if (hours >= 12 && hours <= 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
