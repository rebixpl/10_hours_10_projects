const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const ctx = canvas.getContext("2d");
const sizeIndicatorEl = document.getElementById("size-indicator");

let size = 20;
let isPressed = false;

updateSizeIndicator();

canvas.addEventListener("mousedown", () => {
  isPressed = true;
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x = e.offsetX;
    const y = e.offsetY;

    drawCircle(x, y);
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  updateSizeIndicator();
});
decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeIndicator();
});

function updateSizeIndicator() {
  sizeIndicatorEl.innerText = size;
}

// function draw() {
//   //ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

//   drawCircle(x++, y);

//   requestAnimationFrame(draw);
// }

// draw();
