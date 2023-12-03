const colorLabels = [...document.querySelectorAll(".input-group label")];
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")];
const rangeLabelValue = document.querySelector(".orientation-value");

const gradientData = {
  angle: 90,
  colors: ["#FF5F6D", "#FFC371", "#835A20"],
};

function populateUI() {
  colorLabels[0].textContent = gradientData.colors[0];
  colorLabels[1].textContent = gradientData.colors[1];
  colorLabels[2].textContent = gradientData.colors[2];

  colorPickerInputs[0].value = gradientData.colors[0];
  colorPickerInputs[1].value = gradientData.colors[1];
  colorPickerInputs[2].value = gradientData.colors[2];

  colorLabels[0].style.background = gradientData.colors[0];
  colorLabels[1].style.background = gradientData.colors[1];
  colorLabels[2].style.background = gradientData.colors[2];

  document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]}, ${gradientData.colors[2]})`;

  rangeLabelValue.textContent = `${gradientData.angle}°`;
  let colorsToUse = gradientData.isThirdColorActive
    ? gradientData.colors
    : gradientData.colors.slice(0, 2);
  document.body.style.background = `linear-gradient(${
    gradientData.angle
  }deg, ${colorsToUse.join(", ")})`;

  adaptInputsColor();
}
populateUI();

const toggleColor3Btn = document.getElementById("toggleColor3");
toggleColor3Btn.addEventListener("click", function () {
  gradientData.isThirdColorActive = !gradientData.isThirdColorActive;
  toggleColor3Btn.textContent = gradientData.isThirdColorActive
    ? "Désactiver Couleur 3"
    : "Activer Couleur 3";
  populateUI();
});

function adaptInputsColor() {
  colorLabels.forEach((label) => {
    const hexColor = label.textContent.replace("#", "");
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);

    const yiq = (red * 299 + green * 587 + blue * 144) / 1000;
    console.log(yiq);

    if (yiq >= 128) {
      label.style.color = "#111";
    } else {
      label.style.color = "#f1f1f1";
    }
  });
}

const rangeInput = document.querySelector(".inp-range");
rangeInput.addEventListener("input", handleInclination);

function handleInclination() {
  gradientData.angle = rangeInput.value;
  rangeLabelValue.textContent = `${gradientData.angle}°`;
  populateUI();
}

colorPickerInputs.forEach((input) =>
  input.addEventListener("input", colorInputModification)
);

function colorInputModification(e) {
  const currentIndex = colorPickerInputs.indexOf(e.target);
  gradientData.colors[currentIndex] = e.target.value.toUpperCase();
  populateUI();
}

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", handleGradientCopy);

let lock = false;

function handleGradientCopy() {
  const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]},${gradientData.colors[2]})`;

  navigator.clipboard.writeText(gradient);

  if (lock) return;

  lock = true;
  copyBtn.classList.add("active");

  setTimeout(() => {
    copyBtn.classList.remove("active");
    lock = false;
  }, 1000);
}

const randomGradientBtn = document.querySelector(".random-btn");
randomGradientBtn.addEventListener("click", createRandomGradient);

function createRandomGradient() {
  for (let i = 0; i < colorLabels.length; i++) {
    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    console.log(randomColor);
    gradientData.colors[i] = randomColor.toUpperCase();
  }
  console.log(Math.round(Math.random() * 360));
  gradientData.angle = Math.round(Math.random() * 360);

  populateUI();
}
