// Плавне прокручування (для старих браузерів)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Місце під майбутні фічі (напр. zmiana koloru, tryb nocny itd.)
console.log("KawaTu – gotowe do działania!");
