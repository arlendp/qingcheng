// fix overlay scroll on ios
document.body.addEventListener('touchmove', function(e) {
  if (!document.body.classList.contains('no-scroll')) return;

  var el = e.target;
  while (el !== document.body) {
    if (el.classList.contains('overlay')) {
      if (el.scrollHeight <= el.offsetHeight) {
        e.preventDefault();
      }
      return;
    }
    el = el.parentNode;
  }
  e.preventDefault();
});
