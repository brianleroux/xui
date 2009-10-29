var initFxExample = function() {
	x$('#stage').html(this.responseText);
	
	x$('#fx-button').click(function(){
		x$('#fx').tween([
		{
			background:'red',
			by:[600,0], // X,Y
			duration:2.5
		},
		{
			background:'blue',
			by:[0,0], // X,Y
			duration:.5
		}
		]);

        // x$('#fx').tween({
        //  background:'red',
        //  duration:.5
        // });
	});
/// ---	
}