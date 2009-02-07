var initFxExample = function() {
	x$('#stage').html(this.responseText);
	
	x$('#fx-button').click(function(e){
		x$('#fx').tween([
			{
				background:'red',
				right:'0px',
				duration:2.5
			},
			{
				background:'blue',
				bottom:'0px',
				duration:2.5
			}
		]);
	});
/// ---	
}