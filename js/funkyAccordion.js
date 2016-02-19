$(document).ready(function () {
// Loads in the xml and runs the "main" function when loaded
$.ajax({
    type: "GET",
    url: "xml/funkyaccordion.xml",
    dataType: "xml",
    success: setupAccordion
   });
});

function setupAccordion(xml) {
	
	// Runs through the xml and sets up the HTML accordingly
	$('#content').append('<div id="funky-accordion"><div id="menu-header">' + $(xml).find('funkyAccordion').attr('header') + '</div><ul></ul></div>');
	$(xml).find('menuItem').each(function(i) {
		$('#funky-accordion>ul').append('<li><a href="' + $(this).children('link').text() + '"><i class="fa ' + $(this).children('icon').text() + '"></i>' + $(this).children('title').text() + '</a></li>');
		if($(this).children().length > 3){ // Adds first level of submenus if any
			$('#funky-accordion>ul>li:eq(' + i + ')').addClass('hasChildren');
			$('#funky-accordion>ul>li:eq(' + i + ')').append('<ul class="submenu">');
			$(this).find('menuItem>submenu>submenuItem').each(function(a) {
				$('#funky-accordion>ul>li:eq(' + i + ')>ul.submenu').append('<li><a href="' + $(this).children('link').text() + '">' + $(this).children('title').text() + '</a></li>');
				if($(this).children().length > 2){ // Adds second level of submenus if any
					$('#funky-accordion>ul>li:eq(' + i + ')>ul.submenu>li:eq(' + a + ')').addClass('hasChildren');
					$('#funky-accordion>ul>li:eq(' + i + ')>ul.submenu>li:eq(' + a + ')').append('<ul class="submenu">')
					$(this).find('submenu>submenuItem').each(function(o) {
						$('#funky-accordion>ul>li:eq(' + i + ')>ul.submenu>li:eq(' + a + ')>ul.submenu').append('<li><a href="' + $(this).children('link').text() + '">' + $(this).children('title').text() + '</a></li>');
					})
					$('#funky-accordion>ul>li:eq(' + i + ')>ul.submenu>li:eq(' + a + ')').append('</ul>');
				}
			})
			
		}
	})
	
	// Runs throug all <li> elements in the processed HTML and checks if it has a submenu. Adds a "+" if "True"
	var listItems = $('#funky-accordion li');
	listItems.each(function(i) {
		if(listItems[i].children.length > 1) {
			$(this).children('a').append('<span class="submenu-indicator">+</span>');
		}
	})
	addBehavior();
};

function addBehavior() {
	var activeMenuItem; //Used to keep track on clicked- and previously clicked menu item.
	
	$('#funky-accordion a').click(function() {
		// Sets up some handy variables.
		previousMenuItem = activeMenuItem;
		activeMenuItem = $(this);	
		var myParentUL = $(activeMenuItem.parent().parent());
		var mySubmenuUL = $(activeMenuItem.next());
		var myChildUL = $(mySubmenuUL.children().children('ul.submenu'));
		
		// Selects the clicked item and removes selection for previously clicked item.
		$('a').removeClass('selected');
		$(this).toggleClass('selected');
		
		if(mySubmenuUL.html()){ // Clicked menu item has a submenu.
			if(mySubmenuUL.outerHeight() === 0) { // Submenu of clicked menu item is closed and should open.
				var totalHeight = myChildUL.outerHeight() + caluclateHeight(mySubmenuUL);
				mySubmenuUL.css('height', totalHeight + 'px');
				if(myParentUL.hasClass('submenu')) { // Clicked menu item is a 2nd level submenu item and should also expand the height of the parent submenu.
					var newHeight = myParentUL.outerHeight() + caluclateHeight(mySubmenuUL);
					myParentUL.css('height', newHeight + 'px');
				}
			}else{ // Submenu of clicked menu item is closed and should open
				mySubmenuUL.css('height', 0);
				if(myParentUL.hasClass('submenu')) {
					var newHeight = myParentUL.outerHeight() - caluclateHeight(mySubmenuUL);
					myParentUL.css('height', newHeight);	
				}
			}
			activeMenuItem.children('.submenu-indicator').toggleClass('open') // Rotates the "+" 45 degrees indicating open and closed state.
		}
	})
};

//Takes a UL element and calculates the total height of all "first-level" a tags
function caluclateHeight(ul) {	
	var itemHeight = 0;
	var menuItems = $(ul).children('li');
	
	menuItems.each(function(a) {
		itemHeight += $(this).children('li>a').outerHeight();	
	})
	
	return itemHeight;
};