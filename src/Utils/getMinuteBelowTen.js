export const getMinuteBelowTen = () => {
  const minutes = new Date().getMinutes();
  if (minutes >= 0 && minutes <= 9) {
    return "0" + minutes.toString();
  } else {
    return minutes;
  }
};
