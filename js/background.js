const images = ["circle.jpg", "mt.jpg", "sky.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

bgImage.classList.add("background");

document.body.appendChild(bgImage);
