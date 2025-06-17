const apiUrl = "https://ai.scroogefrog.com/files/faq.php";

if (document.querySelector(".spinner")) {

  const spinner = document.querySelector(".spinner");
  const placeholder = document.querySelector(".placeholder");
  const faqWrapper = document.querySelector(".faq__wrapper");

  const createElement = (tag, className, textContent = "") => {
    const element = document.createElement(tag);
    element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  };

  const handleMenuClick = (id) => {
    const params = new URLSearchParams(window.location.search);
    params.set("id", id);
    window.history.pushState({}, "", `${window.location.pathname}?${params}`);

    clearActiveStates();

    const activeLink = document.querySelector(`[data-id="${id}"]`);
    if (activeLink) activeLink.classList.add("active");

    loadAnswerById(id);
  };

  const generateMenu = (data, container) => {
    data.forEach((item) => {
      const menuItem = createElement("div", "faq-menu__item");

      const title = createElement("div", "faq-menu__title", item.q);

      menuItem.appendChild(title);
      container.appendChild(menuItem);

      if (item.cat && item.child) {
        title.classList.add("faq-menu__arrow");

        const list = createElement("ul", "faq-menu__list");

        item.child.forEach((child) => {
          const listItem = createElement("li", "faq-menu__list-item");

          if (child.cat && child.child) {
            const childTitle = createElement(
              "div",
              "faq-menu__sub-list-item",
              child.q
            );

            childTitle.classList.add("faq-menu__arrow");

            const childList = createElement("ul", "faq-menu__sub-list");

            child.child.forEach((subChild) => {
              const childListItem = createElement(
                "li",
                "faq-menu__sub-list-item"
              );

              if (subChild.cat && subChild.child) {
                const subChildTitle = createElement(
                  "div",
                  "faq-menu__sub-child-list-item",
                  subChild.q
                );

                subChildTitle.classList.add("faq-menu__arrow");

                const subChildList = createElement(
                  "ul",
                  "faq-menu__sub-child-list"
                );

                subChild.child.forEach((item) => {
                  const subChildListItem = createElement(
                    "li",
                    "faq-menu__sub-child-list-item"
                  );

                  const subChildLinkItem = createElement(
                    "div",
                    "faq-menu__list-link",
                    item.q
                  );

                  subChildLinkItem.setAttribute("data-id", item.id);

                  subChildLinkItem.addEventListener("click", () => {
                    handleMenuClick(item.id);
                  });

                  subChildListItem.appendChild(subChildLinkItem);
                  subChildList.appendChild(subChildListItem);
                });

                childListItem.appendChild(subChildTitle);
                childListItem.appendChild(subChildList);

                subChildTitle.addEventListener("click", () => {
                  subChildTitle.classList.toggle("faq-menu__arrow_active");
                  if (
                    subChildList &&
                    subChildList.classList.contains("faq-menu__sub-child-list")
                  ) {
                    subChildList.classList.toggle(
                      "faq-menu__sub-child-list_active"
                    );
                  }
                });
              } else {
                const childListItemLink = createElement(
                  "div",
                  "faq-menu__list-link",
                  subChild.q
                );

                childListItemLink.setAttribute("data-id", subChild.id);

                childListItemLink.addEventListener("click", () => {
                  handleMenuClick(subChild.id);
                });

                childListItem.appendChild(childListItemLink);
              }

              childList.appendChild(childListItem);
            });

            listItem.appendChild(childTitle);
            listItem.appendChild(childList);
            list.appendChild(listItem);

            childTitle.addEventListener("click", () => {
              childTitle.classList.toggle("faq-menu__arrow_active");
              if (
                childList &&
                childList.classList.contains("faq-menu__sub-list")
              ) {
                childList.classList.toggle("faq-menu__sub-list_active");
              }
            });
          } else {
            const link = createElement("div", "faq-menu__list-link", child.q);

            link.setAttribute("data-id", child.id);

            link.addEventListener("click", () => {
              handleMenuClick(child.id);
            });

            listItem.appendChild(link);
            list.appendChild(listItem);
          }
        });

        title.addEventListener("click", () => {
          title.classList.toggle("faq-menu__arrow_active");
          if (list && list.classList.contains("faq-menu__list")) {
            list.classList.toggle("faq-menu__list_active");
          }
        });

        menuItem.appendChild(list);
      }
    });
  };

  const displayedAnswer = (q, a) => {
    const contentContainer = document.getElementById("faq-content");

    contentContainer.innerHTML = "";

    const title = createElement("h3", "faq-right__title", q);
    const text = createElement("div", "faq-right__text");

    text.innerHTML = a;

    contentContainer.appendChild(title);
    contentContainer.appendChild(text);
  };

  const showElement = (element) => {
    [spinner, placeholder, faqWrapper].forEach((el) =>
      el.classList.remove("shown")
    );
    element.classList.add("shown");
  };

  const clearActiveStates = () => {
    document.querySelectorAll(".faq-menu__list-link.active").forEach((el) => {
      el.classList.remove("active");
    });
  };

  const loadAnswerById = async (id) => {
    try {
      showElement(spinner);

      const response = await fetch(`${apiUrl}?id=${id}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      displayedAnswer(data.q, data.a);
      showElement(faqWrapper);
    } catch (error) {
      showElement(placeholder);
      console.error("Error loading answer:", error);
    }
  };

  const fetchData = async () => {
    try {
      showElement(spinner);

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      const menuContainer = document.getElementById("faq-menu");
      generateMenu(data, menuContainer);

      console.log(data)

      const currentId = new URLSearchParams(window.location.search).get("id");
      if (currentId) {
        await loadAnswerById(currentId);
      } else {
        showElement(faqWrapper);
      }
    } catch (error) {
      showElement(placeholder);
      console.error("Error fetching faq data:", error);
    }
  };

  window.addEventListener("popstate", () => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) {
      loadAnswerById(id);
    } else {
      document.getElementById("faq-content").innerHTML = "";
      showElement(faqWrapper);
    }
  });

  fetchData();
}