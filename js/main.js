$(window).on('load',function(){
	
	//alert("loaded")
	window.location.hash="";
});



//we need to know wether we;'re mobile or not.
// Lets use scren width for this.
var screenWidth = $(window).width();
if ( screenWidth <= 640) {
	$('body').addClass('mobile');
}
else {
	$('body').removeClass('mobile');
}
var isMobile = $('body').hasClass('mobile');
//alert(isMobile);





 //only do this is not mobile. 
function resizeFirstSection(){
	var winheight = $(window).height();
	var winWidth = $(window).width();
	var firstSection = $('.inner');
	var firstSectionOnly = $('#intro .inner');
	var cocktails = $('.cocktails .inner');
	
		if ( isMobile == false ) {
			firstSection.css({
			    'min-width': winWidth+'px',
			    'height': winheight+'px'
			  });
			 cocktails.css({
			    'min-width': winWidth+'px',
			    'height': winheight+'px'
			  });	
	
		}
		if ( isMobile == true ) {
			firstSectionOnly.css({
			    'min-width': winWidth+'px',
			    'height': winheight+'px'
			  });	
		}
}
resizeFirstSection();









// Do Fitvids.
$('.video-wrapper').fitVids();





$('.menu a[href*=#]:not([href=#])').click(function(e) {

	var newUrl = $(this).data('url');
	
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {

      $('html,body').stop().animate({

        scrollTop: target.offset().top

      }, 300, 'easeInOutCubic', function(){

        $('.menu').removeClass('open');
        
        
        history.pushState("hello", "foo", '#'+newUrl);

      });
      return false;
    }
  }
});






// Main toggle menu fucntion.
$('.menu-toggle-button-wrapper, .menu-closer').click(function() {

    $('.menu').toggleClass('open');

});



/*
$.waitForImages.hasImgProperties = ['backgroundImage']
$('body').waitForImages(function() {
	$(this).addClass('loaded');
	$('#page-loader').hide();
    //alert('images loaded');
    // This *does* work
  }, $.noop, true);


$('#contact-row').waitForImages(function() {
	$(this).addClass('loaded');
    //alert('Background image done loading');
    // This *does* work
  }, $.noop, true);
*/
  





$(document).ready(function(){

	//resizeFirstSection();

	//USe the wait for image plugin.
	$.waitForImages.hasImgProperties = ['backgroundImage']
	$('#intro').waitForImages(function() {
	$(this).addClass('loaded');
	}, $.noop, true);


	$(".royalSlider").royalSlider({
        // options go here
        // as an example, enable keyboard arrows nav
        keyboardNavEnabled: true,
        navigateByClick: false,
        arrowsNav: false
    });
    
    

	
	

 


}); //end dom ready




$(window).on('resize', function(){

		resizeFirstSection();
		var screenWidth = $(window).width();
		var isMobile = $('body').hasClass('mobile');
		
		if ( screenWidth <= 640) {
			$('body').addClass('mobile');
		}
		else {
			$('body').removeClass('mobile');
		}



}); 


/* ########################### AGE GATE ########################### */
function isChecked() {
	if (!this.form.checkbox.checked) {
		alert('You must agree to the terms and conditions to continue.');
		return false;
	}
}

$('#age-gate-form').validate({
	rules: {
		"Month_form": "required",
		"Day_form": "required",
		"Year_form": "required",
		"checkbox": "required"
	},
	submitHandler: function(form) {
			// do other things for a valid form
			ageGateValidation();
		}
});

function ageGateValidation () {
	var a = $('#Country_form').val(); // put what ever age you want to be verified, and it will work!
	var d = $('#Day_form').val(); // d = day
	var m = $('#Month_form').val(); // m = month
	var y = $('#Year_form').val(); //y = year
	var t = new Date(); // t = “today"
	var td = t.getDate(); // td = “today's date"
	var tm = t.getMonth()+1; // tm = “this month" / remember January starts at 0, like arrays!
	var ty = t.getFullYear()-a; //ty = “this year" / remember to subtract 18 from this year

	if (y > ty) {
		alert('Give it a couple years');
		return false;
	}
	else {
		alert('You can drink');
		$.cookie('the_cookie', 'the_value', { expires: 7 });
		$('.age-gate-background').addClass('gate-hidden');
		//$('body').addClass('cookie-set');
	}
	return true;
}

//alert(the_cookie);

if($.cookie('the_cookie') != null) {
	//cookie exists - hide modal
	$('.age-gate-background').addClass('gate-hidden');
	//$('body').addClass('cookie-set');
	//alert('cookie set');
	//var ageGateDiv = $('.age-gate-background');
	//console.log(ageGateDiv);
}
else {
	//alert('cookie not set');
}


/*
var t = $(".section").offset().top;
$(".section").each(function(){
  $(window).scroll(function(){
if($(this).scrollTop() > t )
{   
location.hash = $(this).attr('id');
console.log( $(this).attr('id') )
}
});
});
              
*/

		
		