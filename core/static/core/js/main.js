(function ($) {

	"use strict";
	

	let rShow = function (e) {
		e.preventDefault();
		const idR = $(this).data('fade');
		const prevCountReply = $(this).children().text()
		$(this).prev().children(':hidden').slice(-3).show();
		if ($(this).children().text() > parseInt(0)) {
			if ($(this).children().text() == parseInt(1) || $(this).children().text() == parseInt(2)) {
				$(this).children().text(parseInt(0))
			}
			else { $(this).children().text(parseInt(prevCountReply)-3)	
			}	
		}
		if ($(this).children().text() == parseInt(0)) {
			$('.rb-id-'+idR).fadeTo('slow', 0.3);
		}
	};
	$('.rply-btn').on('click', rShow);


	let initFade = function (index, value) {
		if ($(value).children().text() == parseInt(0)) {
			$(value).addClass('r-opacity');
		}
		else {	$(value).removeClass('r-opacity');	
		}
	  };
	  $('.rply-btn').each(initFade);
  

	$('#index-more').click(function () {
		$(document).scrollTop(910)
	});


	if (window.location.href.includes('mapa')) {
		$(document).scrollTop(420);
	}


	history.replaceState(null, null, ' ');

	hljs.highlightAll();


	const alertBox = document.getElementById('alert-box')
	const name = document.getElementById('id_name')
	const email = document.getElementById('id_email')
	const service = document.getElementById('id_service')
	const message = document.getElementById('id_message')
	const csrf = document.getElementsByName('csrfmiddlewaretoken')
	const url = ''

	const handleAlerts = (type, text) => {
		alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">
                            ${text}
                        	</div>`
	}

	$('#confirmform').submit(function (e) {
		e.preventDefault()

		const fd = new FormData()
		fd.append('csrfmiddlewaretoken', csrf[0].value)
		fd.append('name', name.value)
		fd.append('email', email.value)
		fd.append('service', service.value)
		fd.append('message', message.value)

		$.ajax({
			type: 'POST',
			url: url,
			enctype: 'multipart/form-data',
			data: fd,
			success: function (response) {
				console.log(response)
				const sText = `Vaša správa bola úspešne odoslaná.`
				handleAlerts('success', sText)
				setTimeout(() => {
					alertBox.innerHTML = ''
					name.value = ''
					email.value = ''
					message.value = ''
				}, 6000)
			},
			error: function (error) {
				console.log(error)
				handleAlerts('danger', 'ups..something went wrong')
			},
			cache: false,
			contentType: false,
			processData: false,
		})
	})

	
	$('.rply-form').submit(function (event) {
		event.preventDefault()

		const idR = $(this).data('reply');
		const rply_form = $(this);

	  $.ajax({
	    type: 'POST',
	    url: rply_form.attr('action'),
			data: rply_form.serialize(),
			dataType:'json',
		beforeSend: function() {
			$('.save-comment').addClass('disabled').text('ukladá sa...');
		},
	    success: function(response) {

			//	$('.rb-id-'+idR).prev().children(':hidden').slice(-3).show()
			
			$('.rply-name').val('');
			$('.rply-message').val('');
			const jsonName = JSON.parse(response);
			const date = 'pridané pred chvíľou ...';
			const _html='<div style="display:block;" class="rply-none row">\
				<div class="vcard-r">\
					<img src="/media/avatar.png" alt="Avatar">\
				</div>\
				<div class="rply-msg">\
					<h3>'+jsonName[0].fields.name+'</h3>\
					<div class="meta">'+date+'</div>\
					<p>'+jsonName[0].fields.message+'</p>\
				</div>\
			</div>';
			$('.comment-wrapper-'+idR).append(_html);
			const prevCountComment=$('.comment-count').text();
			$('.comment-count').text(parseInt(prevCountComment)+1);
			$('.save-comment').removeClass('disabled').text('Odoslať');
	    },
	    error: function(error) {
	          console.log(error)
	    },
	  })
	})


	//$(document).ready(function() {
	//	$('#modal-btn').click(function() {
	//		$('.modal').modal('show');
	//	})
	//})

	//	$("#confirmform").validate({
	//    submitHandler: function (form) {
	//			$(".modal").modal('show');
	//			$('#SubForm').click(function () {
	//				form.submit();
	//			});
	//		}
	//	});


	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});


	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ic-loader').length > 0) {
				$('#ic-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function () {
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			autoplay: true,
			autoplaySpeed: 2000,
			items: 1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function () {
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function () {
		var $this = $(this);
		// timer;
		// timer = setTimeout(function(){
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
		console.log('show');
	});

	// scroll
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ic_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function () {

		$('#section-counter, .hero-wrap, .ic-counter').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ic-animated')) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function () {
					var $this = $(this),
						num = $this.data('number');
					//console.log(num);
					$this.animateNumber({
						number: num,
						numberStep: comma_separator_number_step
					}, 7000);
				});

			}

		}, {
			offset: '95%'
		});

	}
	counter();


	var contentWayPoint = function () {
		var i = 0;
		$('.ic-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ic-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .ic-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ic-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ic-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ic-animated');
							} else {
								el.addClass('fadeInUp ic-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, {
			offset: '95%'
		});
	};
	contentWayPoint();


	// magnific popup
	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	$('[data-toggle="popover"]').popover()
	$('[data-toggle="tooltip"]').tooltip()

})(jQuery);