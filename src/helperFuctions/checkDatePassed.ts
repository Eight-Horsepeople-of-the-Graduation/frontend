const checkDatePassed = (date: string) => {
  const givenDate = new Date(date);
  const currentDate = new Date();
  givenDate.setHours(23, 59, 59, 59);
  currentDate.setHours(23, 59, 59, 59);

  return givenDate < currentDate;
};

export default checkDatePassed;
