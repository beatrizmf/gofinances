const formatDate = (date: Date): string =>
  Intl.DateTimeFormat('en-US').format(new Date(date));

export default formatDate;
