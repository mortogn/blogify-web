export const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return formatter.format(new Date(date));
};
