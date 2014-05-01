





  


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
  

function resizeFirstSection(){
	var winheight = $(window).height();
	var winWidth = $(window).width();
	var firstSection = $('.section');

	firstSection.css({
		'width': winWidth+'px',
		'height': winheight+'px'
	});
}
  




 // $('nav a').click(function (e) {

 // 		//alert("fufuf");
 // 		var newUrl = $(this).data('url');
 // 		var newTitle = $(this).data('title');
 // 		var target = $(this.hash);
 // 		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

 //        //overwrite current entry in history to store the scroll position:
 //        stateData = {
 //            path: window.location.href,
 //            scrollTop: $(window).scrollTop()
 //        };
 //        window.history.replaceState(stateData, newTitle, newUrl);

         
      
 //      if (target.length) {
        
 //        $('html,body').animate({ scrollTop: target.offset().top }, 300, function(){
 //        	setTimeout(closer, 100);
 //        });

 //    }
    
 //    function closer(){
 //    	$('.main-nav').animate({
 //    		'left':'-280px'
 //    	}, 300)
 //    }


       

 //        //load new page:
 //        stateData = {
 //            path: window.location.href,
 //            scrollTop: 0
 //        };
 //        window.history.pushState(stateData, newTitle, newUrl);
 //        e.preventDefault();

 //    });




$(window).on('resize', function(){

	resizeFirstSection();

});


$(document).ready(function(){

	resizeFirstSection();

  //USe the wait for image plugin.
$.waitForImages.hasImgProperties = ['backgroundImage']
$('#intro').waitForImages(function() {
    $(this).addClass('loaded');
}, $.noop, true);


var $menu = $('nav#menu'), $html = $('html, body');

  $menu.mmenu();
  $menu.find( 'li > a' ).on(
    'click',
    function()
    {
      var href = $(this).attr( 'href' );

      //  if the clicked link is linked to an anchor, scroll the page to that anchor 
      if ( href.slice( 0, 1 ) == '#' )
      {
        $menu.one(
          'closed.mm',
          function()
          {
            setTimeout(
              function()
              {
                $html.animate({
                  scrollTop: $( href ).offset().top
                } , 500 , 'easeInOutCubic');  
              }, 10);  
          });            
      }
    });


}); //end dom ready