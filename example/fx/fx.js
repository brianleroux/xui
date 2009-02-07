var initFxExample = function() {
	x$('#stage').html(this.responseText);
	
	x$('.box').click(function(e){
		x$('.box').tween({rotate:{Z:90}});
	});
}