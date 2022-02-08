// Parallax
var image = document.getElementsByClassName('parallax');
new simpleParallax(image, {
  delay: .6,
  transition: 'cubic-bezier(0,0,0,1)'
});

// Load in viewport
var isInViewPort = function (checkForThis) {
  var bounding = checkForThis.getBoundingClientRect();
  return (
    bounding.top >= 0 && bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Flash website on load
window.onload = function() {
  document.body.className += ' loaded'
};

// Add active class to current button
$(document).on('click', '.btn', function() {
  $(this).siblings().removeClass('active')
  $(this).addClass('active');
});


// Change color of navbar upon scrolling
$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  if(scroll < 20)
  {
      $('.fixed-top').css('background', 'transparent');
  } else{
      $('.fixed-top').css('background', 'rgb(25, 25, 25, 0.95)');
  }
});

// Set nav backround color on mobile view
if (window.matchMedia('(max-width: 991px)').matches)
{
  $('.fixed-top').css('background', 'rgb(25, 25, 25, 0.95)');
}

// add padding top to show content behind navbar
// $('body').css('padding-top', $('.navbar').outerHeight() + 'px')

// detect scroll top or down
if ($('.smart-scroll').length > 0) { // check if element exists
    var last_scroll_top = 0;
    $(window).on('scroll', function() {
        scroll_top = $(this).scrollTop();
        if(scroll_top < last_scroll_top) {
            $('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
        }
        else {
            $('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
        }
        last_scroll_top = scroll_top;
    });
}

// Scroll to top
$(document).ready(function(){
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		// scroll body to 0px on click
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modalNewclose")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}