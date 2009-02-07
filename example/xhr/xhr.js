var initXhrExample = function() {
	 x$('#button1').click(function(){
	  x$('#content').xhr('data.html');
	});
   
	x$('#button2').click(function(){

	  var options = {};
	  options.map = {'fname':'#fname','lname':'#lname','noun':'#noun'};
  
	  x$('#content2').xhrjson('data.json',options);
	});           
        
	x$('#button3').click(function(){

	  var options = {};
	  options.map = {'fname':'#fname1','lname':'#lname1','noun':'#noun1'};
	  options.callback = function(x) { return x.toUpperCase(); }
	  x$('#content3').xhrjson('data.json',options);
	});
}