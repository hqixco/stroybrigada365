// Preloader
jQuery(window).on('load', function () {
	if (jQuery('.sp-loader-with-logo').length > 0) {
		move();
	}
	jQuery('.sp-pre-loader').fadeOut(500, function () {
		jQuery(this).remove();
	});
});
function uniAutoHeight(div) {
        	const block_height = () => {
        		$(div).css({height: ''});
        		
        		let maxheight = 0;
        		
        		$(div).each(function(){
        			if($(this).height() > maxheight) {
        				maxheight = $(this).height();
        			}
        		});
        		
        		if(maxheight > 0) $(div).height(maxheight);
        	};
        	
        	block_height();
        	$(window).resize(block_height);
        }
/**
 * Move the progress bar
 */
function move() {
	var elem = document.getElementById('line-load');
	var width = 1;
	var id = setInterval(frame, 10);
	function frame() {
		if (width >= 100) {
			clearInterval(id);
		} else {
			width++;
			elem.style.width = width + '%';
		}
	}
}


 $('.reviews-thumbs__more-text a').click(function(e){
            var fullt = $(this).closest('.testimonials-section__item').html();
            $("#full_comment .testimonials-section__item").html(fullt);
    });


$('.site-header__contacts').mouseleave(function (event) {
    
    $(this).find('.site-header__contacts-bottom').removeClass('active')
});




$(document).ready(function(){
    var referenceContacts = {
        phoneText: '+7 (977) 779-87-77',
        phoneHref: 'tel:+79777798777',
        emailText: 'Stroydvor7788@mail.ru',
        emailHref: 'mailto:Stroydvor7788@mail.ru',
        addressText: 'Силикатная ул., 35, Мытищи'
    };

    function setLinkText($link, text) {
        if (!$link.length) {
            return;
        }

        if ($link.children().length) {
            var firstChild = $link.children().first();
            var iconMarkup = firstChild.prop('outerHTML') || '';
            if (iconMarkup) {
                $link.html(iconMarkup + text);
                return;
            }
        }

        $link.text(text);
    }

    function applyReferenceContacts() {
        $('a[href^="tel:"]').attr('href', referenceContacts.phoneHref);
        $('a[href^="mailto:"]').attr('href', referenceContacts.emailHref);

        setLinkText($('.site-header__phone-value a').first(), referenceContacts.phoneText);
        setLinkText($('.footer__col .title-sm.fw700 a[href^="tel:"]').first(), referenceContacts.phoneText);
        setLinkText($('.footer__col .title-sm.fw700 a[href^="mailto:"]').first(), referenceContacts.emailText);
        setLinkText($('.bottom__phone.mobile a[href^="tel:"]').first(), referenceContacts.phoneText);

        $('.footer__col .footer__text').filter(function () {
            return $(this).find('a[href^="tel:"]').length && $(this).find('a[href^="mailto:"]').length;
        }).find('> div').first().text(referenceContacts.addressText);
    }

    applyReferenceContacts();
    
    
     $('.last-step-form ul.tab-control > li > a').on('click', function(){
			

			var thisHold = $(this).closest(".last-step-form");
			var _ind = $(this).closest('li').index();

			thisHold.children('.tab-body').children(".tab").removeClass('active').find('input').removeAttr('required');
			thisHold.children('.tab-body').children("div.tab:eq("+_ind+")").addClass('active').find('input').attr('required', true);
			$(this).closest("ul").find(".active").removeClass("active");
			$(this).parent().addClass("active");
            $(this).closest(".last-step-form").find(".contact-input").val($(this).attr('title'));
			return false;
		});

    
    $('.time_choose_radio input').click(function(){
        console.log('111');
    if ($('.time_choose_radio .wpcf7-list-item.last input').is(":checked")) {
        $('.time_choose').show();
        console.log('112');
    } 
    
    else {
        $('.time_choose').hide();
        console.log('113');
        
    }
        
    });
    
    



	 $('.scrollto').on('click', function() {
			let href = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(href).offset().top
			}, {
				duration: 500,   // по умолчанию «400» 
				easing: "linear" // по умолчанию «swing» 
			});
			return false;
	});

	$(window).scroll(function() {
		
    });
    
 
    var scrollVal = $(window).scrollTop();
    var scrollPos = 0; 
    var stickyHeader = function () {
			    
                

        		
        		if ($(this).scrollTop() > 300) {
        			$('.sp-scroll-up').fadeIn();
        		} else {
        			$('.sp-scroll-up').fadeOut(400);
        		}
	};

			stickyHeader();
			$(window).scroll(function () {
				stickyHeader();
				
				
				  
				
			});
    


	$('.sp-scroll-up').click(function () {
		$('html, body').animate(
			{
				scrollTop: -60,
			},
			100
		);
		return false;
	});

    $(".forms__upload input[type=file]").on("change", function () {
            var t = $(this);
            $(this).closest(".forms__upload").addClass("uploaded"),
                $(this)
                    .closest(".forms__upload")
                    .find(".forms__uploadinput")
                    .html($(this).val().replace("C:\\fakepath\\", "") + '&nbsp;<a class="forms__delete"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="svg-icon" id="Capa_1" enable-background="new 0 0 413.348 413.348" viewBox="0 0 413.348 413.348" xmlns="http://www.w3.org/2000/svg"><path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"/></svg></a>'),
                $(".forms__upload .forms__delete").on("click", function () {
                    var e = $(this).closest(".forms__upload").find(".forms__uploadinput");
                    return (
                        t.replaceWith(t.val("").clone(!0)), $(".forms__upload").removeClass("uploaded"), void 0 !== $(".forms__uploadinput").attr("data-text") ? e.html(e.attr("data-text")) : e.html("Приложите файл, чертеж, эскиз или ТЗ"), !1
                    );
                });
        });
    

  
  
  
  
  

	
	$('.site-header__more-phones').click(function(){
		if ($(this).closest('.site-header__contacts').find('.site-header__contacts-bottom').hasClass('active')) {
			$(this).closest('.site-header__contacts').find('.site-header__contacts-bottom').removeClass('active')
		} else {
		  
		    $('.site-header__contacts-bottom').removeClass('active');
			$(this).closest('.site-header__contacts').find('.site-header__contacts-bottom').addClass('active');
		}
	});
	
	
	
	$(".site-header__contacts-bottom").mouseleave(function (event) {
	   event.preventDefault();
	        if ($(this).hasClass('active')){
			$(this).closest('.site-header__contacts').find('.site-header__contacts-bottom').removeClass('active');
	        }
	});
	
	

	

	$('.site-header__submenu').hide();

	$('.site-header__menu-toggle').click(function() {
	    
		if ($(this).parents('.site-header__menu-item').find('.site-header__submenu').hasClass('hidden')) {
			$(this).parents('.site-header__menu-item').find('.site-header__submenu').show(300);
			
		
			
			$(this).parents('.site-header__menu-item').find('.site-header__submenu').removeClass("hidden");
			$(this).parents('.site-header__menu-item').find('i').addClass('rotated');
		}
		else {
			$(this).parents('.site-header__menu-item').find('.site-header__submenu').hide(300);
			$(this).parents('.site-header__menu-item').find('.site-header__submenu').addClass("hidden");
			$(this).parents('.site-header__menu-item').find('i').removeClass('rotated');
		}
	});

	
	$('.site-header__menu-close, .offcanvas-overlay').on('click', function (event) {
	   event.preventDefault();
		//$('.site-header__menu').removeClass('active');
		$('.site-header--offcanvas-ready').removeClass('site-header--offcanvas-open');
		
	});
	
	jQuery(".site-header__menu").mouseleave(function (event) {
	   event.preventDefault();
		//$('.site-header__menu').removeClass('active');
		$('.site-header--offcanvas-ready').removeClass('site-header--offcanvas-open');
		
	});

	$('.site-header__burger').click(function(){
		//$('.site-header__menu').addClass('active');
		$('.site-header--offcanvas-ready').addClass('site-header--offcanvas-open');
	})
	
	
    const bannerslider = new Swiper('.banner-slider', {
		slidesPerView: 1,
		loop:true,
        spaceBetween: 0,
        autoplay: {
            delay: 5000,
          },
        disableOnInteraction: true,
        navigation: {
			nextEl: '.slider-next',
			prevEl: '.slider-prev',
		},
        pagination: {
			el: '.dotsc-slider',
			clickable: true,
		},
          
		
	});





    const servicesSlider = new Swiper('.services-slider', {
		slidesPerView: 3,
		loop:true,
        spaceBetween: 20,
       
        navigation: {
			nextEl: '.js-swiper-centered-auto-button-next',
			prevEl: '.js-swiper-centered-auto-button-prev',
		},
        pagination: {
			el: '.dotsc-services-slider',
			clickable: true,
		},
		breakpoints: {
			// when window width is >= 320px
			1: {
				slidesPerView: 1.2,
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 2,
			},
			// when window width is >= 640px
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 3,
			},
		}
          
		
	});


      const testimonialsSlider = new Swiper('.review-text__slider', {
		// Optional parameters
		direction: 'horizontal',
		autoplay: {
    delay: 2000,
  },
		loop: true,
		spaceBetween: 15,
		slidesPerView: 4,
		// If we need pagination
		pagination: {
			el: '.dotsc2',
			clickable: true,
		},
		navigation: {
			nextEl: '.reviews-next',
			prevEl: '.reviews-prev',
		},
		breakpoints: {
			// when window width is >= 320px
			1: {
				slidesPerView: 1.2,
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 2.2,
			},
			// when window width is >= 640px
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		}
	});

	
	    

	const salesSlider = new Swiper('.sales-slider', {
		// Optional parameters
		direction: 'horizontal',
		loop: false,
		spaceBetween: 15,
		slidesPerView: 4,
		// If we need pagination
		pagination: {
			el: '.dotsc',
			clickable: true,
		},
		navigation: {
			nextEl: '.sales-next',
			prevEl: '.sales-prev',
		},
		breakpoints: {
			// when window width is >= 320px
			0: {
				slidesPerView: 1.2,
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 2.2,
			},
            768: {
				slidesPerView: 2.2,
			},
			// when window width is >= 640px
			992: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 3,
			},
		}
	});



const gallery4Slider = new Swiper('.gallery4-slider', {
		  slidesPerView: 1,
		loop:true,
        spaceBetween: 20,
       
        navigation: {
			nextEl: '.gallery-next',
			prevEl: '.gallery-prev',
		},
        pagination: {
			el: '.dotsc-testimonials-slider',
			clickable: true,
		},
		breakpoints: {
			// when window width is >= 320px
			1: {
				slidesPerView: 1.2,
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 2,
			},
			// when window width is >= 640px
			768: {
				slidesPerView:  2,
			},
			992: {
				slidesPerView:  3,
			},
		}
          
		
	});




uniAutoHeight($('.aheight'));
uniAutoHeight($('.aheight-sales'));
uniAutoHeight($('.aheight2'));
       
window.onresize = function() {
  
    uniAutoHeight($('.aheight'));
    uniAutoHeight($('.aheight2'));
    uniAutoHeight($('.aheight-sales'));
};        
    
});




    





function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}



$(document).ready(function() {
     


	for (var i = 0; i < $('.step-slide').length - 1; i++) {
		$('.step__extender').append('<div class="step__extender-item"></div>');
	};

	var progress = {
		current: ( 100 / ($('.step-slide').length - 1) ),
		total: $('.step-slide').length,
		width: ( 100 / ($('.step-slide').length + 1) ),
		process: doProgress
	};



	function doProgress () {}

	var testSlider = $('.test-slider').bxSlider({
		mode: 'fade',
		infiniteLoop: false,
		speed: 0,
		adaptiveHeight: true,
		adaptiveHeightSpeed: 0,
		touchEnabled: false,
		pager: false,
		nextSelector: '.btn-next-container',
		prevSelector: '.bt-back',
		prevText: '<div class="btn-back"><span>Предыдущий вопрос</span> </div>',
		nextText: '<div class="btn-next"><span>Следующий вопрос</span></div> ',
		onSliderLoad: function (currentIndex) {
			// первоначальные стили
			$('.main-progress__text').eq(currentIndex).addClass('main-progress__text_active');
			$('.step__extender-item').eq(currentIndex).addClass('step__extender-item_active');
			$('.quiz-form__progress-fill').css('width', progress.width + '%');
		},
		onSlideNext: function (slideElement, oldIndex, newIndex) {

			// активация кнопок
			$('.btn-next-container').removeClass('btn-next-container_active');
			$('.btn-next').removeClass('btn-next_active btn-shine');

			// изменение полосы загрузки
			progress.current += progress.width;
			$('.quiz-form__progress-fill').css('width', progress.current + '%');

			// изменение шага
			$('.step__extender-item').eq(newIndex).addClass('step__extender-item_active');
			$('.step__text span').html(newIndex + 1);

			// изменение заголовка в полосе загрузки
			if ( $('.main-progress__text').eq(newIndex).length != 0 ) {
				$('.main-progress__text').eq(oldIndex).removeClass('main-progress__text_active');
				$('.main-progress__text').eq(newIndex).addClass('main-progress__text_active');
			};
			//$('.last_dn').hide(); 
		
			    
			  
			//console.log(newIndex);  
			    
			//if (newIndex==4) {
              
           // window.setTimeout(function () {
           //     $('.last_dn').show();   
            //    $('.quiz__load').fadeOut();
                
            //  }, 2000);    
                
            //}
            

			
			

		},
		onSlidePrev: function(slideElement, oldIndex, newIndex) {
		    
		    $('.step-slide').eq(oldIndex).find("input:radio").removeAttr("checked");
		    $('.step-slide').eq(oldIndex).find("input:checkbox").removeAttr("checked");
		    
		    // изменение полосы загрузки
			progress.current -= progress.width;
			$('.quiz-form__progress-fill').css('width', progress.current + '%');
        	slideElement.find('.btn-next-container').addClass('btn-next-container_active');
			slideElement.find('.btn-next').addClass('btn-next_active btn-shine');
			
		
        },
        onSlideAfter: function (slideElement, oldIndex, newIndex) {
            //progress.current += progress.width; 
            //$('.quiz-form__progress-fill').css('width', progress.current + '%');
            
            
            slideElement.find('.btn-next-container').addClass('btn-next-container_active');
			slideElement.find('.btn-next').addClass('btn-next_active btn-shine');
           
            
            
            var toTopDoc = $('.quiz-section');

			// console.log(toTopDoc);

			$('html, body').animate({scrollTop: parseInt($('.quiz').offset().top)}, 200);
			//$('body').scrollTo('#quiz-section');
            
            
            
        }
		
		
		
		
		
	});
	
	
$('.pick-item__input.radio').on('change', function(event) {
    	    $(this).closest('.step-slide').find('.pick-item__img').removeClass('active');  
    		
    		if ($(this).prop("checked") === true) {
    	
            $(this).closest('.pick-item').find('.pick-item__img').addClass('active');
            } else {
             $(this).closest('.pick-item').find('.pick-item__img').removeClass('active');  
            }
    		
    	
    	});
    	
    	$('.pick-item__input.checkbox').on('change', function(event) {
    	   // $(this).closest('.step-slide').find('.pick-item__img').removeClass('active');  
    		
    		if ($(this).prop("checked") === true) {
    	
            $(this).closest('.pick-item').find('.pick-item__img').addClass('active');
            } else {
             $(this).closest('.pick-item').find('.pick-item__img').removeClass('active');  
            }
    		
    	
    	});


	$('.pick-item__input').on('change', function(event) {
		event.preventDefault();
		$('.btn-next-container').addClass('btn-next-container_active');
		$('.btn-next').addClass('btn-next_active btn-shine');
	
	});
	$('#testForm .pick-item__input[type="radio"] ').on('change', function(event) {
		event.preventDefault();
		setTimeout(function(){
            testSlider.goToNextSlide();
            },500);
		
	});
$('input[type="file"]').on('change', function(){
      let countFiles = '';
      if (this.files && this.files.length >= 1)
        countFiles = this.files.length;
	  var box = $(this).closest('.quiz__file-label');
	  var filesText = $(box).find('.quiz__file__text');
	  console.log(box)
	  console.log(filesText)
      if (countFiles)
        $(filesText).html('Выбрано файлов: ' + countFiles)
      else {
		$(filesText).html('Загрузите файл');
	  }
    });	


$("#testForm").submit(function(e) {
    e.preventDefault();
    
}).validate({
    rules:{"phone":{ required:true }
    },
    submitHandler: function() {
    
        $('.quiz__final__btn__text').hide();
        $('.btn__load').show();
        $('.btn quiz__final__btn').prop('disabled', true);
        $('.btn quiz__final__btn').addClass('loading');
           
            $.ajax({
            url: myajax.url,
            data: new FormData($('#testForm')[0]),
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (response) {
                
              	testSlider.goToSlide( $('.step-slide').length - 1 );
						$('.site-strip').slideUp(300);
						$('.quiz-form__progress').slideUp(300);
            }
        });
        return false;  //This doesn't prevent the form from submitting.
    }
});

});


    var x = document.getElementsByClassName("agree");
var i;
for (i = 0; i < x.length; i++) {
x[i].checked = false;
}

    function bindPhoneMask(selector) {
        var $fields = $(selector);

        $fields.each(function () {
            var $field = $(this);
            var input = this;
            var prefixLength = 4;

            function formatPhoneValue(rawValue) {
                var digits = String(rawValue || "").replace(/\D/g, "");

                if (digits.charAt(0) === "7" || digits.charAt(0) === "8") {
                    digits = digits.substring(1);
                }

                digits = digits.substring(0, 10);

                if (!digits.length) {
                    return "";
                }

                var parts = [];
                parts.push("+7 (");
                parts.push(digits.substring(0, 3));

                if (digits.length > 3) {
                    parts.push(") " + digits.substring(3, 6));
                }

                if (digits.length > 6) {
                    parts.push("-" + digits.substring(6, 8));
                }

                if (digits.length > 8) {
                    parts.push("-" + digits.substring(8, 10));
                }

                return parts.join("");
            }

            function placeCaretAtInputStart() {
                if (input.selectionStart !== undefined && input.setSelectionRange) {
                    input.setSelectionRange(prefixLength, prefixLength);
                }
            }

            function syncValue() {
                var start = input.selectionStart;
                var end = input.selectionEnd;

                input.value = formatPhoneValue(input.value);

                if (input.value === "") {
                    return;
                }

                if (typeof start === "number" && typeof end === "number" && input.setSelectionRange) {
                    var caret = Math.max(prefixLength, input.value.length);
                    input.setSelectionRange(caret, caret);
                }
            }

            $field.attr("placeholder", "+7 (___) ___-__-__");

            $field.on("focus click", function () {
                if (!this.value) {
                    setTimeout(placeCaretAtInputStart, 0);
                }
            });

            $field.on("keydown", function (event) {
                var key = event.key;
                var caret = typeof this.selectionStart === "number" ? this.selectionStart : prefixLength;
                var isDigit = /^[0-9]$/.test(key);

                if (isDigit && caret <= prefixLength && (key === "7" || key === "8")) {
                    event.preventDefault();
                    return;
                }

                if (key === "Backspace" && caret <= prefixLength) {
                    event.preventDefault();
                }
            });

            $field.on("input", syncValue);

            $field.on("paste", function () {
                var self = this;
                setTimeout(function () {
                    self.value = formatPhoneValue(self.value);
                }, 0);
            });
        });
    }

    bindPhoneMask('input[type="tel"], input[name="phone"]');
  
  $('.form-callback__form_o').submit(function(e){
        e.preventDefault();
        var form=new FormData(this);
        var data =  $('.form-callback__form_o').serialize();
        data += '&id=' + myajax.id;
        var action = 'form';
        data += '&action=' + action;
        form.append('action', 'form');
        form.append('id', myajax.id);
        $submit_btn = $('.form-callback__form_o .form-button__button'),


        $.ajax({
            url: myajax.url,
            data: form,
            type: 'POST',
            processData:!1,
            contentType:!1,
            beforeSubmit: function (xhr) {
            // При отправке формы меняем надпись на кнопке
            $submit_btn.val('Отправляем...');
            },
            success: function (response) {
               
           
               var inst = $.remodal.lookup[$('[data-remodal-id=sent]').data('remodal')];
                inst.open();
            $('.form-callback__form_o')[0].reset();
            },
            error: function (request, status, error) {
                $submit_btn.val('Что-то пошло не так...');
            }
        });
    });
    $('.form-callback__form').submit(function(e){
        e.preventDefault();
        var form=new FormData(this);
        var data =  $('.form-callback__form').serialize();
        data += '&id=' + myajax.id;
        var action = 'form';
        data += '&action=' + action;
        form.append('action', 'form');
        form.append('id', myajax.id);
        $submit_btn = $('.form-callback__form .form-button__button'),


        $.ajax({
            url: myajax.url,
            data: form,
            type: 'POST',
            processData:!1,
            contentType:!1,
            beforeSubmit: function (xhr) {
            // При отправке формы меняем надпись на кнопке
            $submit_btn.val('Отправляем...');
            },
            success: function (response) {
               
           
               var inst = $.remodal.lookup[$('[data-remodal-id=sent]').data('remodal')];
                inst.open();
            $('.form-callback__form')[0].reset();
            },
            error: function (request, status, error) {
                $submit_btn.val('Что-то пошло не так...');
            }
        });
    });
    
    $('.form-callback__form_h').submit(function(e){
        e.preventDefault();
      
        var data =  $(this).closest('.form-callback__form_h').serialize();
                    data += '&id=' + myajax.id;
                    var action = 'form';
                    data += '&action=' + action;
		  
        $.ajax({
            url: myajax.url,
            data: data,
            type: 'POST',
            success: function (response) {
               
                var inst = $.remodal.lookup[$('[data-remodal-id=sent]').data('remodal')];
                inst.open();
            }
        });
    });
    
    
    $('.form-callback__form_v').submit(function(e){
        e.preventDefault();
      
        var data =  $(this).closest('.form-callback__form_v').serialize();
                    data += '&id=' + myajax.id;
                    var action = 'form';
                    data += '&action=' + action;
		  
        $.ajax({
            url: myajax.url,
            data: data,
            type: 'POST',
            success: function (response) {
               
                var inst = $.remodal.lookup[$('[data-remodal-id=sent]').data('remodal')];
                inst.open();
            }
        });
    });
    
     $('.form-callback__form_v1').submit(function(e){
        e.preventDefault();
      
        var data =  $(this).closest('.form-callback__form_v1').serialize();
                    data += '&id=' + myajax.id;
                    var action = 'form';
                    data += '&action=' + action;
		  
        $.ajax({
            url: myajax.url,
            data: data,
            type: 'POST',
            success: function (response) {
               
                var inst = $.remodal.lookup[$('[data-remodal-id=sent]').data('remodal')];
                inst.open();
            }
        });
    });
    

    
    
    
