import { getMinuteBelowTen } from "./getMinuteBelowTen";

export const greetings = () => {
  const hours = new Date().getHours();
  const minutes = getMinuteBelowTen();
  console.log(hours,minutes)
  if (hours >= 5 && hours < 11 && minutes < 59) {
    return "Good Morning";
  } else if (hours >= 12 && hours <= 17) {
    return "Good Afternoon";
  } else if (hours > 17 && hours <= 19) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};
