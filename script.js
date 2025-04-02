const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const image = document.querySelector('.image');
let currentPosition = 0;
const imageSources = [
  './images/nature/alex-padurariu-qJmfb_wWXhw-unsplash.jpg',
  './images/nature/augustine-wong-IkkMQi-MZws-unsplash.jpg',
  './images/nature//karel-mistrik-QDGIPs8BKZs-unsplash.jpg',
  './images/nature/nils-leonhardt-3xFgRt1y7rs-unsplash.jpg',
];

const circles = [
  document.querySelector('.circle1'),
  document.querySelector('.circle2'),
  document.querySelector('.circle3'),
  document.querySelector('.circle4'),
];

function hightLight() {
  circles[currentPosition].style.borderColor = 'white';
}

function lowLightForward() {
  circles[currentPosition - 1].style.borderColor = '';
}
function lowLightBackward() {
  circles[currentPosition + 1].style.borderColor = '';
}

function removeArrow(elem) {
  elem.style.display = 'none';
}

function displayArrow(elem) {
  elem.style.display = 'block';
}

function switchImageForward() {
  currentPosition++;
  if (currentPosition > 2) {
    removeArrow(rightArrow);
  }
  image.setAttribute('src', imageSources[currentPosition]);
  hightLight();
  lowLightForward();
  displayArrow(leftArrow);
}

function switchImageBackward() {
  currentPosition--;
  displayArrow(rightArrow);
  if (currentPosition === 0) {
    removeArrow(leftArrow);
  }
  image.setAttribute('src', imageSources[currentPosition]);
  hightLight();
  lowLightBackward();
  displayArrow(rightArrow);
}

function revealImageOnClick(e) {
  let index = parseInt(e.target.className.at(-1), 10);
  currentPosition = index - 1;
  currentPosition === 0 ? removeArrow(leftArrow) : displayArrow(leftArrow);
  currentPosition > 2 ? removeArrow(rightArrow) : displayArrow(rightArrow);
  image.setAttribute('src', imageSources[currentPosition]);
  hightLight();
  for (let i = 0; i < circles.length; i++) {
    if (i === currentPosition) continue;
    circles[i].style.borderColor = '';
  }
}

function autoSwitch() {
  currentPosition++;
  currentPosition > 3 || currentPosition == 0
    ? removeArrow(leftArrow)
    : displayArrow(leftArrow);
  currentPosition > 2 ? removeArrow(rightArrow) : displayArrow(rightArrow);
  if (currentPosition > 3) {
    circles[currentPosition - 1].style.borderColor = '';
    currentPosition = 0;
    displayArrow(rightArrow);
  }
  image.setAttribute('src', imageSources[currentPosition]);
  hightLight();
  if (currentPosition != 0) {
    lowLightForward();
  }
}

circles.forEach((circle) =>
  circle.addEventListener('click', revealImageOnClick)
);

rightArrow.addEventListener('click', switchImageForward);
leftArrow.addEventListener('click', switchImageBackward);
hightLight();
removeArrow(leftArrow);

setInterval(autoSwitch, 5000);
