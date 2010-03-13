/**
 *
 * @namespace {Form}
 * @example
 *
 *
 * Form
 * ---
 *	
 * Form related
 * 
 */
xui.extend({

	/**
	 * 
	 * This method is private, it takes a form element and returns a string
	 * 
	 * @param {Element} form
	 * @return encoded querystring
	 * 
	 */
    _toQueryString: function(docForm) {   
       var submitString = formElement = lastElementName =  ''; 

       for(i = 0 ; i < docForm.length ; i++) { 
         formElement = docForm[i]; 
         switch(formElement.type) { 
            case 'text' : 
            case 'select-one' : 
            case 'hidden' : 
            case 'password' : 
            case 'textarea' : 
               submitString += formElement.name + '=' + encodeURIComponent(formElement.value) + '&'; 
               break; 
            case 'radio' :    
               if(formElement.checked) { 
                 submitString += formElement.name + '=' + encodeURIComponent(formElement.value) + '&'; 
               } 
               break; 
            case 'checkbox' :    
               if(formElement.checked)  { 
                 if(formElement.name = lastElementName) { 
                    if(submitString.lastIndexOf('&') == submitString.length - 1) { 
                       submitString = submitString.substring(0, submitString.length - 1); 
                    } 
                    submitString += ',' + encodeURIComponent(formElement.value); 
                 } else { 
                    submitString += formElement.name + '=' + encodeURIComponent(formElement.value);  
                 } 
                 submitString += '&'; 
                 lastElementName = formElement.name; 
               } 
               break;  
         }                                                                             
       } 
       submitString = submitString.substring(0, submitString.length - 1); 
       return submitString;                                
    }
// --
});
