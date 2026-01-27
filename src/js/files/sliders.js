/* Документация слайдера: https://swiperjs.com/ */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, EffectFade, Lazy, Manipulation
*/

function initSliders() {
	if (document.querySelector('.libs__slider')) {
		new Swiper('.libs__slider', {
			modules: [Autoplay],
			spaceBetween: 40,
			loop: true,
			speed: 700,
			autoplay: {
				delay: 1,
				disableOnInteraction: true
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				390: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 4,
				},
				992: {
					slidesPerView: 5,
				},
				1261: {
					slidesPerView: 'auto',
				},
			},
		})
	}
	if (document.querySelector('.hero__slider')) {
		new Swiper('.hero__slider', {
			modules: [Navigation, Pagination, Autoplay],
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,

			//loop: true,

			autoplay: {
				delay: 5000,
				disableOnInteraction: true
			},
			pagination: {
				el: '.hero__pagination',
				clickable: true,
			},

			// scrollbar: {
			// 	el: '.swiper-scrollbar',
			// 	draggable: true,
			// },

			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// breakpoints: {
			// 	320: {
			// 		slidesPerView: 1,
			// 		spaceBetween: 0,
			// 		autoHeight: true,
			// 	},
			// 	768: {
			// 		slidesPerView: 2,
			// 		spaceBetween: 20,
			// 	},
			// 	992: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 20,
			// 	},
			// 	1268: {
			// 		slidesPerView: 4,
			// 		spaceBetween: 30,
			// 	},
			// },

			// on: {}
		})
	}
	if (window.innerWidth <= 992 && document.querySelector('.hero-solutions__slider')) {
		new Swiper('.hero-solutions__slider', {
			nested: true,
			resistanceRatio: 0,
			slidesPerView: 'auto',
			spaceBetween: 0,
			speed: 300,
		})
	}
}

window.addEventListener("load", () => initSliders())