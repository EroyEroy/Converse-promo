const mask = document.querySelector('.mask');
window.addEventListener('load', () => {
	setTimeout(() => {
		mask.classList.add('hide');
		document.body.style.overflowY = 'auto';
		mask.remove();
	}, 1000);
});
const draggable = document.querySelectorAll('a, img');
draggable.forEach(el => {
	el.setAttribute('draggable', 'false');
});
// 3d эффект карточек
const cards = document.querySelectorAll('.everyone__card');
for (let i = 0; i < cards.length; i++) {
	const card = cards[i];
	card.addEventListener('mousemove', startRotate);
	card.addEventListener('mouseout', stopRotate);
};
function startRotate(event) {
	const cardContent = this.querySelector('.everyone__card-content'),
		halfHeight = cardContent.offsetHeight / 2,
		halfWidth = cardContent.offsetWidth / 2;

	cardContent.style.transform = 'rotateX(' + - (event.offsetY - halfHeight) / 10 + 'deg) rotateY(' + (event.offsetX - halfWidth) / 10 + 'deg)';
};
function stopRotate() {
	const cardContent = this.querySelector('.everyone__card-content');
	setTimeout(() => {
		cardContent.style.transform = 'rotate(0)';
	}, 1000);
};
$(function () {
	$('.slider__products').slick({
		arrows: true,
		dots: true,
		autoplay: true,
		fade: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 601,
				settings: {
					dots: false,
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					dots: false,
				}
			},
		]
	});
	$('.slider__outfit').slick({
		dots: false,
		infinite: true,
		speed: 700,
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					dots: false,
				}
			},
		]
	});
	$('.slider__recommend').slick({
		dots: false,
		infinite: true,
		speed: 700,
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true
	});
});

const popupBtn = document.querySelector('.burger-open'),
	popupClose = document.querySelector('.burger-close'),
	popupContent = document.querySelector('.burger-menu'),
	popupLinks = document.querySelectorAll('.burger-menu__link'),
	burgerBackground = document.querySelector('.burger-menu__bg'),
	anchors = document.querySelectorAll('a[href*="#"]'),
	header = document.querySelector('.header');
function OpenPopup() {
	popupBtn.addEventListener('click', () => {
		if (!popupContent.classList.contains('active')) {
			popupBtn.classList.add('open');
			popupContent.classList.add('active');
			document.body.style.overflowY = 'hidden';
			burgerBackground.classList.add('active');
		} else {
			popupBtn.classList.remove('open');
			popupContent.classList.remove('active');
			document.body.style.overflowY = 'auto';
			burgerBackground.classList.remove('active');
		};
	});
	document.addEventListener('click', (e) => {
		const withinBoundariesBtn = e.composedPath().includes(popupBtn);
		const withinBoundariesContent = e.composedPath().includes(popupContent);

		if (!withinBoundariesBtn && !withinBoundariesContent) {
			popupBtn.classList.remove('open');
			popupContent.classList.remove('active');
			document.body.style.overflowY = 'auto';
			burgerBackground.classList.remove('active');
		}
	});
	popupLinks.forEach(link => {
		link.addEventListener('click', () => {
			popupBtn.classList.remove('open');
			popupContent.classList.remove('active');
			document.body.style.overflowY = 'auto';
			burgerBackground.classList.remove('active');
		});
	});
}
function closePopup() {
	popupClose.addEventListener('click', () => {
		popupBtn.classList.remove('open');
		popupContent.classList.remove('active');
		document.body.style.overflowY = 'auto';
		burgerBackground.classList.remove('active');
	});
}

function closePopupEsc() {
	// Закрытие окна по нажатию клавиши Escape.
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			popupBtn.classList.remove('open');
			popupContent.classList.remove('active');
			document.body.style.overflowY = 'auto';
			burgerBackground.classList.remove('active');
		}
	});
}
OpenPopup();
closePopupEsc();
closePopup();
if (!window.matchMedia("(max-width: 860px)").matches && popupContent.classList.contains('active')) {
	popupBtn.classList.remove('open');
	popupContent.classList.remove('active');
	document.body.style.overflowY = 'auto';
	burgerBackground.classList.remove('active');
}
window.addEventListener('resize', () => {
	if (window.innerWidth > 860 && popupContent.classList.contains('active')) {
		popupBtn.classList.remove('open');
		popupContent.classList.remove('active');
		document.body.style.overflowY = 'auto';
		burgerBackground.classList.remove('active');
	};
});
// анимация
const animItems = document.querySelectorAll('.animate');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItemHeight = animItem.offsetHeight;
			const animeItemOffset = offset(animItem).top;
			const animStart = 10;

			// настройка
			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			// если объект выше окна браузера
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			// добавление класса
			if ((window.pageYOffset > animeItemOffset - animItemPoint) && window.pageYOffset < (animeItemOffset + animItemHeight)) {
				animItem.classList.add('active');
			}
		};
	};
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageXOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	// для элементов, которые находятся сразу в поле зрения
	setTimeout(() => {
		animOnScroll();
	}, 1000);
};