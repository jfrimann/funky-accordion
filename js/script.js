var main = function() {
	$('a').click(function() {
		$('a').removeClass('selected');
		$(this).addClass('selected');
		console.log('selection and deselction done');
		if($(this).parent().children().length > 1) {
			$(this).parent().children('.funky-accordion-submenu').toggleClass('submenu-show');
			//alert('hello again');
		}else{
			$('.funky-accordion-submenu').removeClass('submenu-show');
		}
	});
}

$(document).ready(main);