(function () {

var undefined,
    xui,
    window = this,
    // prevents Google compiler from removing primative and subsidising out allowing us to compress further
    string = new String('string'), 
    document = window.document,
    idExpr = /^#([\w-]+)$/,
    slice = [].slice;
    
window.x$ = window.xui = xui = function(q, context) {
  return new xui.fn.find(q, context);
};

// patch in forEach to help get the size down a little and avoid over the top currying on event.js and dom.js (shortcuts)
if (![].forEach) {
  Array.prototype.forEach = function (fn) {
    var len = this.length || 0, that = arguments[1];
    if (typeof fn == 'function') {
      for (var i = 0; i < len; i++) {
        fn.call(that, this[i], i, this);
      }
    }
  };
}

/**
* Array Remove - By John Resig (MIT Licensed) 
*/
function removex(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from: from;
    return array.push.apply(array, rest);
}

xui.fn = xui.prototype = {
      
      extend: function(o) {
        for (var i in o) {
          xui.fn[i] = o[i];
        }
      },

      find: function(q, context) {
          var ele = [], list, i, j, x;
          if (!q) {
            return this;
          } else if (context == undefined && this.length) {
            this.each(function (el, i) {
              ele = ele.concat(slice.call(xui(q, this)));
            });
            ele = this.reduce(ele);
          } else {
            context = context || document;
            
            // fast matching for pure ID selectors
            if (typeof q == string && idExpr.test(q)) {
                ele = [context.getElementById(q.substr(1))];
            } else if (typeof q == string) {
                // one selector
                ele = slice.call(context.querySelectorAll(q));
            } else if (q.toString() === '[object Array]') {
                ele = q;
            } else {
                // an element was passed in
                ele = [q];
            }
          }
          // disabling the append style, could be a plugin: 
          // xui.fn.add = function (q) { this.elements = this.elements.concat(this.reduce(xui(q).elements)); return this; }
          return this.set(ele);
      },
      
      /** 
       * Resets the body of elements contained in XUI
       * Note that due to the way this.length = 0 works
       * if you do console.dir() you can still see the 
       * old elements, but you can't access them. Confused?
       */
      set: function (elements) {
        var ret = xui(); // this *really* doesn't feel right...
        ret.cache = slice.call(this);
        ret.length = 0;
        [].push.apply(ret, elements);
        return ret;
      },

      /**
        * Array Unique
        */
      reduce: function(elements, b) {
          var a = [], elements = elements || slice.call(this);
          elements.forEach(function (el) {
            // question the support of [].indexOf in older mobiles (RS will bring up 5800 to test)
            if (a.indexOf(el, 0, b) < 0)
                a.push(el);            
          });

          return a;
      },
      
      /**
       * Has modifies the elements array and reurns all the elements that match (has) a CSS Query
       */
      has: function(q) {
        return this.filter(function () {
          return !!xui(q, this).length;
        });
      },
      
      /**
       * Both an internal utility function, but also allows developers to extend xui using custom filters
       */
      filter: function (fn) {
        var elements = [];
        return this.each(function (el, i) {
          if (fn.call(el, i)) elements.push(el);
        }).set(elements);
      },

      // supports easier conversion of jQuery plugins to XUI
      end: function () {
        return this.set(this.cache || []);
      },


     /**
      * Not modifies the elements array and reurns all the elements that DO NOT match a CSS Query
      */
      not: function(q) {
          var list = slice.call(this);

          return this.filter(function (i) {
            var found;
            xui(q).each(function(el) {
              return found = list[i] != el;
            });
            return found;
          });
      },


     /**
      * Element iterator.
      * 
      * @return {XUI} Returns the XUI object. 
      */
      each: function(fn) {
        // we could compress this by using [].forEach.call - but we wouldn't be able to support
        // fn return false breaking the loop, a feature I quite like.
          for (var i = 0, len = this.length; i < len; ++i) {
              if (fn.call(this[i], this[i], i, this) === false)
                  break;
          }
          return this;
      }
};

xui.fn.find.prototype = xui.fn;
    
xui.extend = xui.fn.extend;

  // --- 
  /// imports(); 
  // ---

})();