$(function () {

	$('.switch label.switch-label ').click(function(){
		if($(this).prop("for") == "mark"){
		//if($("#mark").prop("checked", true)){
			$('.mark_catalog_slider').addClass('visible-s');
			$('.params_catalog_slider').removeClass('visible-s');
			console.log('mark');
		}
		else{
			$('.mark_catalog_slider').removeClass('visible-s');
			$('.params_catalog_slider').addClass('visible-s');
			console.log('param');
		}
	});


	//modal_card_more

	var galleryThumbs = new Swiper('.g-modal-thumb-more', {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	var galleryTop = new Swiper('.g-modal-more', {
		spaceBetween: 10,
		thumbs: {
			swiper: galleryThumbs
		}
	});

	//modal_card

	var galleryThumbs = new Swiper('.g-modal-thumb-card', {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	var galleryTop = new Swiper('.g-modal-card', {
		spaceBetween: 10,
		thumbs: {
			swiper: galleryThumbs
		}
	});

	// catalog items
	function init_sliders() {
		var galleryTop = [];
		var galleryThumbs = [];

		$(".gallery-thumbs").each(function (index, element) {
			var $this = $(this);
			$this.addClass("ith-" + index);
			galleryThumbs.push(
				new Swiper(this, {
					allowTouchMove: false,
					spaceBetween: 10,
					slidesPerView: 4,
					freeMode: true,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					draggable: false
				})
			);
		});

		$(".gallery-top").each(function (index, element) {
			var $this = $(this);
			$this.addClass("isl-" + index);
			galleryTop.push(
				new Swiper(this, {
					spaceBetween: 10
				})
			);
		});

		for (var i = 0; i < galleryTop.length; i++) {
			console.log(i);
			galleryTop[i].thumbs.swiper = galleryThumbs[i];
			galleryThumbs[i].params.control = galleryTop[i];
		}
	}

	// catalog mark
	var mark_slider = new Swiper('#mark_slider', {
		loop: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 9,
		autoHeight: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			768: {
				spaceBetweenSlides: 10
			}
		}
	});

	var mark_slider2 = new Swiper('#mark_slider_filter', {
		loop: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 9,
		autoHeight: true,
		navigation: {
			nextEl: '.swiper-button-next_buy',
			prevEl: '.swiper-button-prev_buy',
		},
		breakpoints: {
			768: {
				spaceBetweenSlides: 10
			}
		}
	});

	var mark_slider3 = new Swiper('#mark_slider_filter_more', {
		loop: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 9,
		autoHeight: true,
		navigation: {
			nextEl: '.swiper-button-next_more',
			prevEl: '.swiper-button-prev_more',
		},
		breakpoints: {
			768: {
				spaceBetweenSlides: 10
			}
		}
	});




	// init
	init_sliders();

});