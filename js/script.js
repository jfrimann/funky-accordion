var main = function() {
	$('a').click(function() {
		$('a').removeClass('child-selected');
		$('a').removeClass('parent-selected');
		
		if($(this).parent().parent().hasClass('funky-accordion-submenu') === true){
			$(this).addClass('child-selected');
		}else {
			$(this).addClass('parent-selected');
		}
		
		var parentTab = $(this).parent().parent();
		if($(this).parent().children().length > 1 | parentTab.hasClass('funky-accordion-submenu')) {
			$(this).parent().children('.funky-accordion-submenu').toggleClass('submenu-show');
			//alert('hello again');
		}else {
			$('.funky-accordion-submenu').removeClass('submenu-show');
		}
	});
	
	$('a').hover(function() {
		if($(this).parent().parent().hasClass('funky-accordion-submenu') === true){
			$(this).toggleClass('child-hover');
		}else {
			$(this).toggleClass('parent-hover');
		}
	});
}

$(document).ready(main);