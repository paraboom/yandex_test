/* Fixed header */
$(function(){
	var header = $('#header'),
		headerHeight = header.outerHeight(true),
		headerOffset = header.offset(),
		content = $('#content');

	$(window).on('scroll', function(evt){
		var scrl = $(this).scrollTop();
		if ((scrl > 0) && (scrl > headerOffset.top)) {
			header.toggleClass('fixed', true);
			content.css('paddingTop', headerHeight);
			header.css('background-position-y', -scrl);
		} else {
			header.toggleClass('fixed', false);
			content.removeAttr('style');
		}
	});
});

/* Navigation */
$(function(){
	var currentSection,
		sections = $('.section'),
		navigation = $('.navigation-item');

	if (!Modernizr.hashchange) {
		var tmpHash = window.location.hash,
			hashInterval = setInterval(function(){
			if (tmpHash != window.location.hash) {
				tmpHash = window.location.hash;
				$(window).trigger('hashchange');
			}
		}, 200);
	}
	
	$(window).on('hashchange', function(){
		currentSection = window.location.hash ? window.location.hash.substring(1) : 'about';
		sections.hide().filter('[data-content=' + currentSection + ']').show();
		navigation.removeClass('active').find('a[href=#' + currentSection + ']').parent().addClass('active');
	});

	$(window).trigger('hashchange');

});

/* Loading js tech file */
$(function(){
	$.get('js/cars.js', function(data){
		data = data.replace(/</g,'&lt;');
		var div = $('<code data-language="javascript">' + data + '</code>');
		Rainbow.color(div, function(){
			$('#js_code').html(div);
		});
	}, 'text');
})