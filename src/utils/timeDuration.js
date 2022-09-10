export default function timeDuration(start, end) {
  let time = end - start;
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return `${hours ? hours + "h " : ""}${minutes ? minutes + "m " : ""}${
    seconds + "s"
  }`;
}
