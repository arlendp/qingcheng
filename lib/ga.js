(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-21475122-6', 'auto', {'name': 'z'});
ga('z.set', 'dimension1', 'qingcheng');
ga('z.send', 'pageview');

var http = require('./xhr');
http.defaults.afterRequest = function(req, duration) {
  ga('send', 'timing', 'AJAX', req.url, duration, req.status);
};

window.addEventListener('error', function(e) {
  var msg = 'Unknown Error';
  if (e.filename) {
    msg = e.message + ' ' + e.filename + ': ' + e.lineno;
  }
  ga('z.send', 'exception', {
    exDescription: msg
  });
});
