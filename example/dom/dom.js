var initDomExample = function() {
	
	x$('#stage').html(this.responseText);
	
	x$('#button1').click(function(){
	  	var d = document.createElement('div');
	  	d.innerHTML = "Some new test";
	  	x$('#div1').html("<p>Some Test</p>");
	});  
        
	x$('#button2').click(function(){
		x$('#list1').html('top',"New Content Added to Top");
	});
   
	x$('#button3').click(function(){
		x$('#list1').html('bottom',"New Content Added to Bottom");
	});   

	x$('#button4').click(function(){
		x$('#p1').html("top","New Content Added to Top");
	});

	x$('#button5').click(function(){
		x$('#p1').html('bottom',"New Content Added to Bottom");
	});

	x$('#button6').click(function(){
		x$('#para2').html('outer',"<div id='para2' style='border:1px solid blue'>New Content and <b>DIV Container</b> Added to Outer</div>");
	});

	x$('#button7').click(function(){
		x$('#para2').html('outer',"<p id='para2' style='border:1px solid red'>New Content and <b>P Container</b> Added to Outer</p>");
	});

	x$('#button8').click(function(){
		x$('#para2').html('remove');
	});
};