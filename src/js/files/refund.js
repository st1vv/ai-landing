// Калькулятор возврата Google Ads (страница google-ads-refund.html)
if (document.querySelector("[data-refund-calc]")) {
  const calc = document.querySelector("[data-refund-calc]");
  const range = calc.querySelector("[data-refund-calc-range]");
  const spendEl = calc.querySelector("[data-refund-calc-spend]");
  const lossEl = calc.querySelector("[data-refund-calc-loss]");
  const resultCard = calc.querySelector("[data-refund-calc-rate]");
  const rate = parseFloat(resultCard.dataset.refundCalcRate) || 0.14;

  const formatUSD = (value) =>
    "$" + Math.round(value).toLocaleString("en-US");

  resultCard.style.setProperty("--rate", `${rate * 100}%`);

  const update = () => {
    const value = Number(range.value);
    const min = Number(range.min);
    const max = Number(range.max);
    const progress = ((value - min) / (max - min)) * 100;

    range.style.setProperty("--progress", `${progress}%`);
    spendEl.textContent = formatUSD(value);
    lossEl.textContent = formatUSD(value * rate);
  };

  range.addEventListener("input", update);
  update();
}

// Видео "See how it works"
if (document.querySelector("[data-refund-video]")) {
  const frame = document.querySelector("[data-refund-video]");
  const video = frame.querySelector("video");
  const playBtn = frame.querySelector(".refund-demo__play");

  const play = () => {
    frame.classList.add("_playing");
    video.controls = true;
    video.play().catch(() => {
      frame.classList.remove("_playing");
    });
  };

  playBtn.addEventListener("click", play);

  // Без контекстного меню с пунктом "Сохранить видео как..."
  video.addEventListener("contextmenu", (e) => e.preventDefault());

  video.addEventListener("ended", () => {
    frame.classList.remove("_playing");
    video.controls = false;
    video.load(); // возвращаем постер
  });

  // Кнопка "Watch demo" в hero: скролл к видео и запуск
  document.querySelectorAll('a[href="#demo"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      frame.scrollIntoView({ behavior: "smooth", block: "center" });
      play();
    });
  });
}
