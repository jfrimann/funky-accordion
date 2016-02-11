var main = function() {
	
	setupAccordion();
	var activeMenuItem; //Used to keep track on clicked- and previously clicked menu item
	
	$('#funky-accordion a').click(function() {
		$('a').removeClass('selected');
		activeMenuItem = $(this);	
		
		//Folds all open submenus if new parent menu item is clicked
		if($(this).parent().parent().hasClass('submenu') === false) {
			$('.submenu').removeClass('show');
		}
		
		//Folds/unfolds a submenu
		if($(this).parent().hasClass('hasChildren')){
			$(this).next().toggleClass('show');
			$(this).children('.submenu-indicator').toggleClass('open');
		}
		activeMenuItem.addClass('selected');
	})
};

var setupAccordion = function() {
	var listItems = $('#funky-accordion li');
	listItems.each(function(i) {
		if(listItems[i].children.length > 1) {
			console.log('I have children');
			$(this).children('a').append('<span class="submenu-indicator">+</span>');
		}
	})
};

$(document).ready(main);