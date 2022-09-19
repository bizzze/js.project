const clock = document.querySelector("h2.clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

//   if (date.getSeconds() < 10) {
//     clock.innerHTML = `${date.getHours()}:${date.getMinutes()}:0${date.getSeconds()}`;
//   } else if (date.getMinutes() < 10) {
//     clock.innerHTML = `${date.getHours()}:0${date.getMinutes()}:${date.getSeconds()}`;
//   } else if (date.getHours() < 10) {
//     clock.innerHTML = `0${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//   } else {
//     clock.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//   }
// }

getClock();
setInterval(getClock, 1000);
