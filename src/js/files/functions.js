// Подключение списка активных модулей
import { flsModules } from "./modules.js"

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export const isWebp = () => {
	// Проверка поддержки webp
	const testWebP = callback => {
		let webP = new Image()
		webP.onload = webP.onerror = () => callback(webP.height == 2)
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
	}
	// Добавление класса webp или no-webp для HTML
	testWebP(support => {
		let className = support ? 'webp' : 'no-webp'
		document.documentElement.classList.add(className)
	})
}

/* Проверка мобильного браузера */
export const isMobile = {
	Android: () => navigator.userAgent.match(/Android/i),
	BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
	iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
	Opera: () => navigator.userAgent.match(/Opera Mini/i),
	Windows: () => navigator.userAgent.match(/IEMobile/i),
	any: () => (isMobile.Android() || isMobile.BlackBerry() ||
		isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
}

/* Добавление класса touch для HTML если браузер мобильный */
export const addTouchClass = () => isMobile.any() ?
	document.documentElement.classList.add('touch') : null

// Добавление loaded для HTML после полной загрузки страницы
export const addLoadedClass = () => {
	window.addEventListener("load", () => {
		setTimeout(() => document.documentElement.classList.add('loaded'), 0)
	})
}

// Получение хеша в адресе сайта
export const getHash = () => location.hash ? location.hash.replace('#', '') : null

// Указание хеша в адресе сайта
export const setHash = hash => {
	hash = hash ? `#${hash}` : window.location.href.split('#')[0]
	history.pushState('', '', hash)
}

// Учет плавающей панели на мобильных устройствах при 100vh
export const fullVHfix = () => {
	const fullScreen = document.querySelector('[data-fullscreen]')
	if (fullScreen && isMobile.any()) {
		const fixHeight = () => {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}
		window.addEventListener('resize', fixHeight)
		fixHeight()
	}
}

// Плавная прокрутка к якорям
// export const anchors = () => {
// 	const anchors = document.querySelectorAll('a[href*="#"]')
// 	if (anchors.length) {
// 		anchors.forEach(anchor => {
// 			anchor.addEventListener('click', e => {
// 				e.preventDefault()
// 				const blockID = anchor.getAttribute('href')
// 				const headerBottomHeight = document.querySelector('.bottom-header').clientHeight
// 				let topPos = document.querySelector(blockID).getBoundingClientRect().top + window.pageYOffset - headerBottomHeight - 20
// 				if (window.innerWidth < 992) {
// 					topPos = document.querySelector(blockID).getBoundingClientRect().top + window.pageYOffset - 60
// 				}


// 				// menuClose()
// 				window.scrollTo({
// 					top: topPos, // scroll so that the element is at the top of the view
// 					behavior: 'smooth' // smooth scroll
// 				})
// 				// document.querySelector(blockID).scrollIntoView({ behavior: 'smooth' })
// 			})
// 		})
// 	}
// }

// Плавная прокрутка к якорям + переход между страницами
export const anchors = () => {
	const anchors = document.querySelectorAll('a[href*="#"]');
	if (anchors.length) {
	  anchors.forEach(anchor => {
		anchor.addEventListener('click', e => {
		  const href = anchor.getAttribute('href'); // Получаем href ссылки
		  const [targetPage, blockID] = href.split('#'); // Разделяем на страницу и хэш
		  const currentPage = window.location.pathname; // Текущий путь страницы
  
		  if (!blockID) return; // Если нет хэша, ничего не делаем
  
		  if (!targetPage || targetPage === currentPage || targetPage === '') {
			// Если якорь на текущей странице
			e.preventDefault(); // Отменяем переход по ссылке
			scrollToAnchor(`#${blockID}`); // Плавно скроллим к элементу
		  } else {
			// Если якорь на другой странице
			// Сохраняем хэш в location.href, чтобы новая страница обработала его
			return; // Разрешаем стандартный переход
		  }
		});
	  });
	}
  
	// Если страница загружена с хэшем, скроллим к элементу
	if (window.location.hash) {
		scrollToAnchor(window.location.hash);
	}
};
  
// Функция плавного скролла
const scrollToAnchor = hash => {
	const targetElement = document.querySelector(hash);
	const headerBottomHeight = document.querySelector('.bottom-header').clientHeight;
	
	if (targetElement) {
	  let topPos =
		targetElement.getBoundingClientRect().top + window.pageYOffset - headerBottomHeight - 20;
  
	  if (window.innerWidth < 992) {
		topPos = targetElement.getBoundingClientRect().top + window.pageYOffset - 60;
	  }
  
	  // Плавно скроллим к элементу
	  window.scrollTo({
		top: topPos,
		behavior: 'smooth',
	  });
	}
};


// Плавное раскрытие блока
export let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide')
		target.style.transitionProperty = 'height, margin, padding'
		target.style.transitionDuration = duration + 'ms'
		target.style.height = `${target.offsetHeight}px`
		target.offsetHeight
		target.style.overflow = 'hidden'
		target.style.height = showmore ? `${showmore}px` : `0px`
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false
			!showmore ? target.style.removeProperty('height') : null
			target.style.removeProperty('padding-top')
			target.style.removeProperty('padding-bottom')
			target.style.removeProperty('margin-top')
			target.style.removeProperty('margin-bottom')
			!showmore ? target.style.removeProperty('overflow') : null
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('_slide')
			// Создаем событие
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: { target: target }
			}))
		}, duration)
	}
}

// Плавное закрытие блока
export let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide')
		target.hidden = target.hidden ? false : null
		showmore ? target.style.removeProperty('height') : null
		let height = target.offsetHeight
		target.style.overflow = 'hidden'
		target.style.height = showmore ? `${showmore}px` : `0px`
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		target.offsetHeight
		target.style.transitionProperty = "height, margin, padding"
		target.style.transitionDuration = duration + 'ms'
		target.style.height = height + 'px'
		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-top')
		target.style.removeProperty('margin-bottom')
		window.setTimeout(() => {
			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('_slide')
			// Создаем событие 
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: { target: target }
			}))
		}, duration)
	}
}

export let _slideToggle = (target, duration = 500) =>
	target.hidden ? _slideDown(target, duration) : _slideUp(target, duration)

export let bodyLockStatus = true

// Блокировать прокрутку
export let bodyLock = (delay = 500) => {
	const body = document.body
	if (bodyLockStatus) {
		let locksPadding = document.querySelectorAll("[data-lp]")
		locksPadding.forEach(lockPadding => lockPadding.style.paddingRight =
			window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		)
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		document.documentElement.classList.add("lock")
		bodyLockStatus = false
		setTimeout(() => bodyLockStatus = true, delay)
	}
}

// Разблокировать прокрутку
export let bodyUnlock = (delay = 500) => {
	const body = document.body
	if (bodyLockStatus) {
		let locksPadding = document.querySelectorAll("[data-lp]")
		setTimeout(() => {
			locksPadding.forEach(lockPadding => lockPadding.style.paddingRight = '0')
			body.style.paddingRight = '0'
			document.documentElement.classList.remove("lock")
		}, delay)
		bodyLockStatus = false
		setTimeout(() => bodyLockStatus = true, delay)
	}
}

export let bodyLockToggle = (delay = 500) =>
	document.documentElement.classList.contains('lock') ?
		bodyUnlock(delay) : bodyLock(delay)

/* Спойлеры
[data-spollers] для родителя
[data-spoller] для заголовков
Спойлеры с медиа-запросами: [data-spollers="992,max"], [data-spollers="768,min"]
[data-spollers-speed] скорость открытия
Если нужен аккордион [data-one-spoller] для родителя
*/
export const spollers = () => {
	const spollersArray = document.querySelectorAll('[data-spollers]')
	if (spollersArray.length) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter((item, index, self) => !item.dataset.spollers.split(",")[0])
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init')
					initSpollerBody(spollersBlock)
					spollersBlock.addEventListener("click", setSpollerAction)
				} else {
					spollersBlock.classList.remove('_spoller-init')
					initSpollerBody(spollersBlock, false)
					spollersBlock.removeEventListener("click", setSpollerAction)
				}
			})
		}
		// Инициализация обычных слойлеров
		spollersRegular.length ? initSpollers(spollersRegular) : null
		// Получение слойлеров с медиа запросами
		let mdQueriesArray = dataMediaQueries(spollersArray, "spollers")
		if (mdQueriesArray?.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Событие
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
				})
				initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
			})
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
			if (spollerTitles.length) {
				spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock)
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex')
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.nextElementSibling.hidden = true
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1')
						spollerTitle.nextElementSibling.hidden = false
					}
				})
			}
		}

		function setSpollerAction(e) {
			const el = e.target
			if (el.closest('[data-spoller]')) {
				const spollerTitle = el.closest('[data-spoller]')
				const spollersBlock = spollerTitle.closest('[data-spollers]')
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
				const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) hideSpollersBody(spollersBlock)
					spollerTitle.classList.toggle('_spoller-active')
					_slideToggle(spollerTitle.nextElementSibling, spollerSpeed)
				}
				e.preventDefault()
			}
		}

		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active')
			const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500
			if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
				spollerActiveTitle.classList.remove('_spoller-active')
				_slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed)
			}
		}

		const spollersClose = document.querySelectorAll('[data-spoller-close]')

		if (spollersClose.length) {
			document.addEventListener("click", function (e) {
				const el = e.target;
				if (!el.closest('[data-spollers]')) {
					spollersClose.forEach(spollerClose => {
						const spollersBlock = spollerClose.closest('[data-spollers]')
						const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500
						if (!spollersBlock.querySelectorAll('._slide').length) {
							spollerClose.classList.remove('_spoller-active')
							_slideUp(spollerClose.nextElementSibling, spollerSpeed)
						}
					});
				}
			});
		}
	}
}

/* Табы
[data-tabs] для родителя
[data-tabs-titles] для родителя заголовков
[data-tabs-body] для родителя блоков
Если нужно добавление хеша, [data-tabs-hash] для родителя
Открытие табов с анимаеций, [data-tabs-animate], скорость [data-tabs-animate="1000"]
Превращение табов в спойлеры [data-tabs="992"]
*/
export const tabs = () => {
	const tabs = document.querySelectorAll('[data-tabs]')
	let tabsActiveHash = []

	if (tabs.length) {
		const hash = getHash()
		if (hash && hash.startsWith('tab-')) tabsActiveHash = hash.replace('tab-', '').split('-')
		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init')
			tabsBlock.setAttribute('data-tabs-index', index)
			tabsBlock.addEventListener("click", setTabsAction)
			initTabs(tabsBlock)
		})
		// Получение слойлеров с медиа запросами
		let mdQueriesArray = dataMediaQueries(tabs, "tabs")
		if (mdQueriesArray?.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Событие
				mdQueriesItem.matchMedia.addEventListener("change", () =>
					setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia))
				setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
			})
		}
	}

	// Установка позиций заголовков
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item
			let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]')
			let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]')
			let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]')
			let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]')
			tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem)
			tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem)
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index])
					tabsContent.append(tabsContentItem)
					tabsMediaItem.classList.add('_tab-spoller')
				} else {
					tabsTitles.append(tabsTitleItems[index])
					tabsMediaItem.classList.remove('_tab-spoller')
				}
			})
		})
	}
	// Работа с контентом
	function initTabs(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*')
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*')
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex

		if (tabsActiveHashBlock) {
			const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active')
			tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null
		}
		if (tabsContent.length) {
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock)
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock)
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '')
				tabsContentItem.setAttribute('data-tabs-item', '')
				if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add('_tab-active')
				tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active')
			})
		}
	}
	function setTabsStatus(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]')
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]')
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex
		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500
		}
		const tabsBlockAnimate = isTabsAnamate(tabsBlock)
		if (tabsContent.length > 0) {
			const isHash = tabsBlock.hasAttribute('data-tabs-hash')
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock)
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock)
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('_tab-active')) {
					if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate)
					else tabsContentItem.hidden = false
					if (isHash && !tabsContentItem.closest('.popup')) setHash(`tab-${tabsBlockIndex}-${index}`)
				} else {
					if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate)
					else tabsContentItem.hidden = true
				}
			})
		}
	}
	function setTabsAction(e) {
		const el = e.target
		if (el.closest('[data-tabs-title]')) {
			const tabTitle = el.closest('[data-tabs-title]')
			const tabsBlock = tabTitle.closest('[data-tabs]')
			if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
				let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active')
				tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item =>
					item.closest('[data-tabs]') === tabsBlock) : null
				tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null
				tabTitle.classList.add('_tab-active')
				setTabsStatus(tabsBlock)
			}
			e.preventDefault()
		}
	}
}

// Меню бургер
export const menuInit = () => {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", e => {
			if (bodyLockStatus && e.target.closest('.icon-menu')) {
				bodyLockToggle()
				document.documentElement.classList.toggle("menu-open")
			}
		})
	}
}

export function menuOpen() {
	bodyLock()
	document.documentElement.classList.add("menu-open")
}

export function menuClose() {
	bodyUnlock()
	document.documentElement.classList.remove("menu-open")
}

export function closeMenuWithSwipe() {
	if (window.innerWidth < 768 && isMobile.any()) {
		const menu = document.querySelector('.menu__body')

		menu.addEventListener('touchstart', handleTouchStart, false)
		menu.addEventListener('touchmove', handleTouchMove, false)

		let x1 = null

		function handleTouchStart(e) {
			const firstTouch = e.touches[0]
			x1 = firstTouch.clientX
		}

		function handleTouchMove(e) {
			if (!x1) return false

			let x2 = e.touches[0].clientX
			let xDiff = x2 - x1

			if (xDiff < -40) menuClose()
		}
	}
}


// Модуль "показать еще" =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне:
data-showmore-media = "768,min"
data-showmore="size/items"
data-showmore-content="размер/кол-во"
data-showmore-button="скорость"
Сниппет (HTML): showmore
*/

export function showMore() {
	window.addEventListener("load", function (e) {
		const showMoreBlocks = document.querySelectorAll('[data-showmore]');
		let showMoreBlocksRegular;
		let mdQueriesArray;
		if (showMoreBlocks.length) {
			// Получение обычных объектов
			showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
				return !item.dataset.showmoreMedia;
			});
			// Инициализация обычных объектов
			showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

			document.addEventListener("click", showMoreActions);
			window.addEventListener("resize", showMoreActions);

			// Получение объектов с медиа запросами
			mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
			if (mdQueriesArray && mdQueriesArray.length) {
				mdQueriesArray.forEach(mdQueriesItem => {
					// Событие
					mdQueriesItem.matchMedia.addEventListener("change", function () {
						initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
					});
				});
				initItemsMedia(mdQueriesArray);
			}
		}
		function initItemsMedia(mdQueriesArray) {
			mdQueriesArray.forEach(mdQueriesItem => {
				initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		function initItems(showMoreBlocks, matchMedia) {
			showMoreBlocks.forEach(showMoreBlock => {
				initItem(showMoreBlock, matchMedia);
			});
		}
		function initItem(showMoreBlock, matchMedia = false) {
			showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
			let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
			let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
			showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
			if (matchMedia.matches || !matchMedia) {
				if (hiddenHeight < getOriginalHeight(showMoreContent)) {
					_slideUp(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = false;
				} else {
					_slideDown(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = true;
				}
			} else {
				_slideDown(showMoreContent, 0, hiddenHeight);
				showMoreButton.hidden = true;
			}
		}
		function getHeight(showMoreBlock, showMoreContent) {
			let hiddenHeight = 0;
			const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
			if (showMoreType === 'items') {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
				const showMoreItems = showMoreContent.children;
				for (let index = 1; index < showMoreItems.length; index++) {
					const showMoreItem = showMoreItems[index - 1];
					hiddenHeight += showMoreItem.offsetHeight;
					if (index == showMoreTypeValue) break
				}
			} else {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
				hiddenHeight = showMoreTypeValue;
			}
			return hiddenHeight;
		}
		function getOriginalHeight(showMoreContent) {
			let parentHidden;
			let hiddenHeight = showMoreContent.offsetHeight;
			showMoreContent.style.removeProperty('height');
			if (showMoreContent.closest(`[hidden]`)) {
				parentHidden = showMoreContent.closest(`[hidden]`);
				parentHidden.hidden = false;
			}
			let originalHeight = showMoreContent.offsetHeight;
			parentHidden ? parentHidden.hidden = true : null;
			showMoreContent.style.height = `${hiddenHeight}px`;
			return originalHeight;
		}
		function showMoreActions(e) {
			const targetEvent = e.target;
			const targetType = e.type;
			if (targetType === 'click') {
				if (targetEvent.closest('[data-showmore-button]')) {
					const showMoreButton = targetEvent.closest('[data-showmore-button]');
					const showMoreBlock = showMoreButton.closest('[data-showmore]');
					const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
					const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
					const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
					if (!showMoreContent.classList.contains('_slide')) {
						showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
						showMoreBlock.classList.toggle('_showmore-active');
					}
				}
			} else if (targetType === 'resize') {
				showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
				mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
			}
		}
	});
}

// Получить цифры из строки
export const getDigFromString = item => parseInt(item.replace(/[^\d]/g, ''))

// Форматирование цифр типа 100 000 000
export const getDigFormat = item => item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")

// Убрать класс из всех элементов массива
export const removeClasses = (array, className) => {
	for (var i = 0; i < array.length; i++) array[i].classList.remove(className)
}

// Уникализация массива
export const uniqArray = array => {
	return array.filter((item, index, self) => {
		return self.indexOf(item) === index
	})
}

// Функция получения индекса внутри родителя
export const indexInParent = (parent, element) => {
	const array = Array.prototype.slice.call(parent.children)
	return Array.prototype.indexOf.call(array, element)
}

// Обработа медиа запросов из атрибутов 

export function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}