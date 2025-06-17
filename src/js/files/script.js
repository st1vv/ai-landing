import { _slideUp, _slideToggle} from "./functions.js";
import { flsModules } from "./modules.js";

window.addEventListener("scroll", () => {
  const bottomHeaderHeight =
    document.querySelector(".bottom-header").clientHeight;
  // console.log(bottomHeaderHeight);
  if (window.scrollY >= 300) {
    document.body.classList.add("show-menu");
    if (window.innerWidth < 992) {
      document.body.style.paddingTop = `${bottomHeaderHeight}px`;
    }
  } else {
    document.body.classList.remove("show-menu");
    if (window.innerWidth < 992) {
      document.body.style.paddingTop = `0px`;
    }
  }
});

if (document.querySelector(".menu__link") && window.innerWidth < 992) {
  const menuLinks = document.querySelectorAll(".menu__link");
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", () => {
      document
        .querySelector(".bottom-header__icon")
        .classList.remove("_spoller-active");
      _slideUp(document.querySelector(".bottom-header__menu"), 500);
    });
  });
}

if (document.querySelector(".form-offer")) {
  const sendForm = document.querySelector(".form-offer");
  sendForm.addEventListener("submit", async function sendFormFunc(e) {
    e.preventDefault();
    const formData = new FormData(sendForm);
    let response = await fetch("files/sendmail.php", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      sendForm.reset();
      setTimeout(() => flsModules.popup.open("#thanks"), 100);
    } else {
      setTimeout(() => flsModules.popup.open("#error"), 100);
    }
  });
}

if (document.querySelector('.left-help-spollers__title')) {
  const spollerLinks = document.querySelectorAll('.left-help-spollers__title')
  spollerLinks.forEach(spollerLink => {
    spollerLink.addEventListener('click', () => {
      const link = spollerLink.getAttribute('href')
      setTimeout(() => window.location.replace(link), 300)
    })
  })
}
// setSpollerAction(document.querySelector('.right-help-spollers__title'))
if (document.querySelector('.left-help-spollers__body button')) {
  const leftHelpBtns = document.querySelectorAll('.left-help-spollers__body button')
  leftHelpBtns.forEach(leftHelpBtn => {
    leftHelpBtn.addEventListener('click', () => {
      const spollerTargetName = leftHelpBtn.dataset.targetSpoller
      const spollerTarget = document?.querySelector(spollerTargetName)
      spollerTarget.classList.toggle('_spoller-active')
      _slideToggle(spollerTarget.nextElementSibling)
    })

  })
}

if (document.getElementById("fullYear")) {
  document.getElementById("fullYear").textContent = new Date().getFullYear();
}
