
$("#btn-login").click(function() {
  $(this).addClass("btn-primary");
  var str = $("#txt").getValue("value");
  parseThis(str);
});

function parseThis(str) {
  alert(str);
}
