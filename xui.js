
//select by id (returns:element)
var $ = function(selector){
 return document.getElementById(selector);
};

//select by class (returns:array)
var $$ = function(selector){
 return document.getElementsByClassName(selector);
};
