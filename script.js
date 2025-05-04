const colorSelect = document.getElementById("colorSelect");
const animateBtn = document.getElementById("animateBtn");
const box = document.getElementById("box");

// Function: Save selected color in localStorage
function saveColorPreference(color) {
  localStorage.setItem("preferredColor", color);
}

// Function: Load color from localStorage on page load
function loadColorPreference() {
  const savedColor = localStorage.getItem("preferredColor");
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
    colorSelect.value = savedColor;
  }
}

// Function: Animate the box when button is clicked
function animateBox() {
  box.classList.add("animated");
  setTimeout(() => {
    box.classList.remove("animated");
  }, 1000);
}

// Event: When user selects a new color
colorSelect.addEventListener("change", () => {
  const chosenColor = colorSelect.value;
  document.body.style.backgroundColor = chosenColor;
  saveColorPreference(chosenColor);
});

// Event: When animate button is clicked
animateBtn.addEventListener("click", animateBox);

// Load user’s saved color when page starts
loadColorPreference();
