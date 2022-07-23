export default function getNextFriday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextFridayDate = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7)
    )
  );

  const nextFriday = {
    ...nextFridayDate,
    day: nextFridayDate.getDate(),
    month: nextFridayDate.toLocaleString("default", { month: "long" }),
    year: nextFridayDate.getFullYear,
  };

  return nextFriday;
}
