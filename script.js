const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideCount = document.getElementById("slideCount");
const progressBar = document.getElementById("progressBar");
let currentSlide = 0;

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
  slideCount.textContent = `${currentSlide + 1} / ${slides.length}`;
  progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
}
prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showSlide(currentSlide + 1);
  if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
});

document.getElementById("quizForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const answers = { q1: "b", q2: "a", q3: "a" };
  const formData = new FormData(event.currentTarget);
  let score = 0;
  for (const [question, correct] of Object.entries(answers)) {
    if (formData.get(question) === correct) score++;
  }
  const result = document.getElementById("quizResult");
  result.textContent = `Таны оноо: ${score} / 3`;
  result.style.color = score === 3 ? "#16834b" : "#4668f5";
});

showSlide(0);
