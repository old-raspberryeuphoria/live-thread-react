/**
 * Return time elapsed between a timestamp and the current date
 * Thanks to https://stackoverflow.com/a/6109105
*/
export default timestamp => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = new Date() - new Date(timestamp * 1000);

  if (elapsed < msPerMinute) {
    if (Math.round(elapsed / 1000) > 0) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    return 'just now';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  }

  else if (elapsed < msPerDay ) {
    return Math.round(elapsed / msPerHour ) + ' hours ago';
  }

  else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  }

  else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  }

  else {
    return Math.round(elapsed / msPerYear ) + ' years ago';
  }
};
