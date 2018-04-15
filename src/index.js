$(function () {
	//顶部轮播
	var BSwiper = $('.qw-home-banner-view-wrapper .swiper-container').swiper({
		direction: 'horizontal',
		loop: true,
		speed: 1000,
		autoplay: 3500,
		autoplayDisableOnInteraction: false,
		pagination: '.swiper-pagination',
		paginationClickable: true,
	})

	//问题轮播
	// var QASwiper = $('.qw-emotion-qa .swiper-container').swiper({
	// 	direction: 'horizontal',
	// 	loop: true,
	// 	speed: 1000,
	// 	autoplay: 3500,
	// 	autoplayDisableOnInteraction: false,
	// 	pagination: '.swiper-pagination',
	// 	paginationClickable: true,
	// });

	//导师团队
	var TSwiper = $('.qw-tutor-team .swiper-container').swiper({
		direction: 'horizontal',
		speed: 2000,
		width:400,
		slidesPerView: 2,
	});

})