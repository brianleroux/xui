x$('#button1').click(function(){
  x$('#box1').getStyle('background-color',function(value){
    console.log(value);
    x$('#box2').setStyle('backgroundColor',value);
  });
});  

x$('#button2').click(function(){
  x$('#box3').addClass('red');
});

x$('#button3').click(function(){
  x$('#box4').removeClass('red');
});

x$('#button4').click(function(){
  x$('#box5').css({backgroundColor:'blue',width:'100px',border:'2px solid red'});  
});