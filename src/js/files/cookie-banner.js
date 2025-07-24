import { deleteCookie, getCookie, setCookie } from "./cookie.js";
import { flsModules } from "./modules.js";

// one week = 7 * 24 * 60 * 60
const cookieMaxAge = 604800;

if (document.querySelector(".cookie-banner")) {

  const cookieBanner = document.querySelector(".cookie-banner");
  const cookieBannerAcceptBtn = document.querySelector("#banner-accept");
  const cookieBannerRejectBtn = document.querySelector("#banner-reject");
  const cookieBannerSettingBtn = document.querySelector("#banner-setting");

  const cookieWidget = document.querySelector(".cookie-widget-container");
  const cookieWidgetBtn = document.querySelector("#cookie-widget");

  const cookiePopupAcceptBtn = document.querySelector("#popup-accept");
  const cookiePopupRejectBtn = document.querySelector("#popup-reject");
  const cookiePopupUserChoicesBtn = document.querySelector("#popup-user-choices");

  const cookiePopupCloseBtn = document.querySelector("#popup-cookie-close-btn");

  const cookiePopupPerformanceBtn = document.querySelector(
    "#popup-performance-cookie-toggle"
  );
  const cookiePopupTargetingBtn = document.querySelector(
    "#popup-targeting-cookie-toggle"
  );
  const cookiePopupFunctionalBtn = document.querySelector(
    "#popup-functional-cookie-toggle"
  );

  const getVisitedCookie = () => {
    return getCookie("visited");
  };

  const setVisitedCookie = () => {
    setCookie("visited", "true", { secure: true, "max-age": cookieMaxAge });
  };

  const acceptAllCookies = () => {
    setCookie("performanceCookie", "true", { secure: true, "max-age": cookieMaxAge });
    setCookie("targetingCookie", "true", { secure: true, "max-age": cookieMaxAge });
    setCookie("functionalCookie", "true", { secure: true, "max-age": cookieMaxAge });
    cookiePopupPerformanceBtn.checked = true;
    cookiePopupTargetingBtn.checked = true;
    cookiePopupFunctionalBtn.checked = true;
  };

  const rejectAllCookies = () => {
    deleteCookie("performanceCookie");
    deleteCookie("targetingCookie");
    deleteCookie("functionalCookie");
    cookiePopupPerformanceBtn.checked = false;
    cookiePopupTargetingBtn.checked = false;
    cookiePopupFunctionalBtn.checked = false;
  };

  const hideBannerAndShowWidget = () => {
    cookieBanner.classList.add("cookie-hidden");
    cookieWidget.classList.remove("cookie-hidden");
  };

  const setPopupToggleBtnsStateFromCookie = () => {
    const performanceCookie = getCookie("performanceCookie");
    const targetingCookie = getCookie("targetingCookie");
    const functionalCookie = getCookie("functionalCookie");

    if (performanceCookie) {
      cookiePopupPerformanceBtn.checked = true;
    } else {
      cookiePopupPerformanceBtn.checked = false;
    }

    if (targetingCookie) {
      cookiePopupTargetingBtn.checked = true;
    } else {
      cookiePopupTargetingBtn.checked = false;
    }

    if (functionalCookie) {
      cookiePopupFunctionalBtn.checked = true;
    } else {
      cookiePopupFunctionalBtn.checked = false;
    }
  };

  // banner

  const onClickBannerAcceptBtn = (e) => {
    e.preventDefault();
    setVisitedCookie();
    acceptAllCookies();
    hideBannerAndShowWidget();
  };

  const onClickBannerRejectBtn = (e) => {
    e.preventDefault();
    setVisitedCookie();
    rejectAllCookies();
    hideBannerAndShowWidget();
  };

  const onClickBannerSettingBtn = (e) => {
    e.preventDefault();
    flsModules.popup.open("#cookie");
  };

  // widget

  const onClickWidgetBtn = (e) => {
    e.preventDefault();
    flsModules.popup.open("#cookie");
  };

  // popup

  const onClickPopupAcceptBtn = (e) => {
    e.preventDefault();
    acceptAllCookies();
    flsModules.popup.close("#cookie");

    if (!cookieBanner.classList.contains("cookie-hidden")) {
      hideBannerAndShowWidget();
      setVisitedCookie();
    }
  };

  const onClickPopupRejectBtn = (e) => {
    e.preventDefault();
    rejectAllCookies();
    flsModules.popup.close("#cookie");

    if (!cookieBanner.classList.contains("cookie-hidden")) {
      hideBannerAndShowWidget();
      setVisitedCookie();
    }
  };

  const onClickPopupConfirmUserBtn = (e) => {
    e.preventDefault();
    flsModules.popup.close("#cookie");

    if (cookiePopupPerformanceBtn.checked === true) {
      setCookie("performanceCookie", "true", { secure: true, "max-age": cookieMaxAge });
    } else {
      deleteCookie("performanceCookie");
    }

    if (cookiePopupTargetingBtn.checked === true) {
      setCookie("targetingCookie", "true", { secure: true, "max-age": cookieMaxAge });
    } else {
      deleteCookie("targetingCookie");
    }

    if (cookiePopupFunctionalBtn.checked === true) {
      setCookie("functionalCookie", "true", { secure: true, "max-age": cookieMaxAge });
    } else {
      deleteCookie("functionalCookie");
    }

    if (!cookieBanner.classList.contains("cookie-hidden")) {
      hideBannerAndShowWidget();
      setVisitedCookie();
    }
  };

  const init = () => {
    cookieBannerAcceptBtn.addEventListener("click", onClickBannerAcceptBtn);
    cookieBannerRejectBtn.addEventListener("click", onClickBannerRejectBtn);
    cookieBannerSettingBtn.addEventListener("click", onClickBannerSettingBtn);

    cookieWidgetBtn.addEventListener("click", onClickWidgetBtn);

    cookiePopupAcceptBtn.addEventListener("click", onClickPopupAcceptBtn);
    cookiePopupRejectBtn.addEventListener("click", onClickPopupRejectBtn);
    cookiePopupUserChoicesBtn.addEventListener(
      "click",
      onClickPopupConfirmUserBtn
    );

    if (getVisitedCookie()) {
      cookieWidget.classList.remove("cookie-hidden");
      setPopupToggleBtnsStateFromCookie();
    } else {
      cookiePopupCloseBtn.addEventListener("click", onClickPopupRejectBtn);
      cookieBanner.classList.remove("cookie-hidden");
      setTimeout(() => {
        cookieBanner.classList.add("cookie-banner-show");
      }, 50);
    }
  };

  init();

}