"inner outer top bottom remove before after".split(' ').forEach(function (method) {
  xui.extend({method: function (html) { return this.html(method, html); }});
});
