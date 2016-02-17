var main = function(xml) {
	setupAccordion(xml);
	var activeMenuItem; //Used to keep track on clicked- and previously clicked menu item
	var previousMenuItem;
	
	$('#funky-accordion a').click(function() {
		previousMenuItem = activeMenuItem;
		$('a').removeClass('selected');
		activeMenuItem = $(this);	
		
		//Collapse all open submenus if new parent menu item is clicked
		if($(this).parent().parent().hasClass('submenu') === false) {
			$('.submenu').css('height', '0px');
			$('#funky-accordion span').removeClass('open');
		}
		
		//collapses/expands a submenu
		if($(this).parent().hasClass('hasChildren')){
			var activeMenu = $(this).next();
			var newParentHeight;
			//console.log(activeMenu.height());
			
			if(activeMenu.height() > 0){
				if(activeMenu.parent().parent().hasClass('submenu')) {
					newParentHeight = activeMenu.parent().parent().outerHeight() - caluclateHeight(activeMenu);
					activeMenu.parent().parent().css('height', newParentHeight + 'px');
					console.log('calculated Height = ' + caluclateHeight(activeMenu));
				}
				activeMenu.css('height', '0px');	
			}else{
				if(activeMenu.parent().parent().hasClass('submenu')) {
					newParentHeight = activeMenu.parent().parent().height() + caluclateHeight(activeMenu);
					activeMenu.parent().parent().css('height', newParentHeight + 'px');
				} 
				activeMenu.css('height', caluclateHeight(activeMenu) + 'px');
			}
			
			$(this).children('.submenu-indicator').toggleClass('open');
		}
		activeMenuItem.addClass('selected');
	})
};

var setupAccordion = function(xml) {
	
	$('#content').append('<div id="funky-accordion"><div id="menu-header">my header</div><ul></ul></div>');
	$(xml).find('menuItem').each(function(i) {
		$('#content>#funky-accordion>ul').append('<li><a href="#"><i class="fa ' + $(this).find('icon').text() + '"></i>' + $(this).children('title').text() + '</a></li>');
		if($(this).children().length > 3){ //First level of submenus
			console.log(i);
			$('#content>#funky-accordion>ul>li:eq(' + i + ')').append('<ul class="submenu">');
			$(this).find('submenu>submenuItem').each(function(a) {
				console.log('helo ' + a);
			})
			
		}
	})
	/*//
$(xml).find("Book").each(function () {

    $(".main").append('<div class="book"><div class="title">' + $(this).find("Title").text() +   '</div><div class="description">' + $(this).find("Description").text() + '</div><div   class="date">Published ' + $(this).find("Date").text() + '</div></div>');
    $(".book").fadeIn(1000);

 });
*/
	//Adds a "+" to all menu items that have a submenu
	var listItems = $('#funky-accordion li');
	listItems.each(function(i) {
		if(listItems[i].children.length > 1) {
			$(this).children('a').append('<span class="submenu-indicator">+</span>');
		}
	})
};

//Takes a UL element and calculates the total height of all "first-level" a tags
var caluclateHeight = function(ul) {	
	var itemHeight = 0;
	console.log(itemHeight);
	var menuItems = $(ul).children('li');
	
	menuItems.each(function(a) {
		itemHeight += $(this).children('li>a').outerHeight();	
	})
	
	return itemHeight;
};

$(document).ready(function () {
$.ajax({
    type: "GET",
    url: "xml/funkyaccordion.xml",
    dataType: "xml",
    success: main
   });
});
