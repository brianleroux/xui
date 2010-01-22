"inner outer top bottom remove before after".split(' ').forEach(function (method) {
  xui.fn[method] = function (html) { return this.html(method, html); };
});
