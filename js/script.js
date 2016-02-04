var main = function() {
	setupAccordion();
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
			if($(this).hasClass('parent-selected')) {
				$('.funky-accordion-submenu').removeClass('submenu-show');
			}
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

var setupAccordion = function() {
		
		//adds "+" to all parent level menu items that have has submenu items
		var listItem = $('#funky-accordion-menu>ul>li');
		listItem.each(function(li) {
			if(listItem[li].children.length > 1) {
				var currentLI = $(listItem[li]);
				var newLI = $(currentLI.children('a'));
				newLI.append('<span class="submenu-indicator">+</span>');			
			}
		});
		
		//adds "+" to all first level submenu items that have second level submenu items
		var subListItems = $('#funky-accordion-menu>ul>li ul>li');
		
		subListItems.each(function(li) {
			if(subListItems[li].children.length > 1){
				var currentSubLI = $(subListItems[li]).children('a');
				currentSubLI.append('<span class="submenu-indicator" style="padding-right: 10px">+</span>');
			}
		});
}

$(document).ready(main);