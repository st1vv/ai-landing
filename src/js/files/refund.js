const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Появление блоков при прокрутке ([data-reveal], стили в refund.scss)
if (document.documentElement.classList.contains("_reveal-ready")) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, index) => {
          // Элементы, попавшие в экран одновременно, появляются друг за другом
          entry.target.style.setProperty(
            "--reveal-delay",
            `${Math.min(index, 5) * 0.12}s`
          );
          entry.target.classList.add("_revealed");
          observer.unobserve(entry.target);
        });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  const pending = new Set(document.querySelectorAll("[data-reveal]"));
  pending.forEach((el) => observer.observe(el));

  // При быстрой прокрутке (якорь "Watch demo") блоки могут проскочить экран
  // незамеченными — показываем все, что уже остались выше
  let ticking = false;
  const revealPassed = () => {
    ticking = false;
    pending.forEach((el) => {
      if (el.classList.contains("_revealed")) {
        pending.delete(el);
      } else if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add("_revealed");
        observer.unobserve(el);
        pending.delete(el);
      }
    });
    if (!pending.size) window.removeEventListener("scroll", onScroll);
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(revealPassed);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // Переход по якорю: блоки на пути к цели показываем сразу, без анимации,
  // чтобы во время прокрутки страница не выглядела пустой
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.getElementById(link.getAttribute("href").slice(1));
      if (!target) return;
      const targetTop = target.getBoundingClientRect().top;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < targetTop) {
          el.classList.add("_revealed", "_reveal-instant");
          observer.unobserve(el);
          pending.delete(el);
        }
      });
    });
  });
}

// Плавная смена числа: значение непрерывно "догоняет" цель, поэтому
// при перетаскивании ползунка цифры бегут вслед без остановок
const createCounter = (el, format, smoothing = 120) => {
  let current = 0;
  let target = 0;
  let lastTime = null;
  let frame = null;

  const step = (now) => {
    const dt = lastTime === null ? 16 : Math.max(now - lastTime, 0);
    lastTime = now;
    current += (target - current) * (1 - Math.exp(-dt / smoothing));
    if (Math.abs(target - current) < 0.5) {
      current = target;
      frame = null;
    } else {
      frame = requestAnimationFrame(step);
    }
    el.textContent = format(current);
  };

  return (value) => {
    target = value;
    if (reduceMotion) {
      current = target;
      el.textContent = format(current);
      return;
    }
    if (frame === null) {
      lastTime = null;
      frame = requestAnimationFrame(step);
    }
  };
};

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

  const setSpend = createCounter(spendEl, formatUSD);
  const setLoss = createCounter(lossEl, formatUSD);

  resultCard.style.setProperty("--rate", `${rate * 100}%`);

  const update = () => {
    const value = Number(range.value);
    const min = Number(range.min);
    const max = Number(range.max);
    const progress = ((value - min) / (max - min)) * 100;

    range.style.setProperty("--progress", `${progress}%`);
    setSpend(value);
    setLoss(value * rate);
  };

  range.addEventListener("input", update);

  // Первый расчет — когда калькулятор появится на экране, цифры "набегают" с нуля
  if ("IntersectionObserver" in window && !reduceMotion) {
    spendEl.textContent = formatUSD(0);
    lossEl.textContent = formatUSD(0);
    const calcObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          update();
          calcObserver.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    calcObserver.observe(calc.querySelector(".refund-calc__cards"));
  } else {
    update();
  }
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
