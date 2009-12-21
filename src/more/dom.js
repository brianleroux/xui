"inner outer top bottom remove before after".split(' ').forEach(function (method) {
  eval("var temp = {" + method + ": function (html) { return this.html('" + method + "', html); }}");
  xui.extend(temp);
});
