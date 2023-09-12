// When the user clicks on <div>, open the popup
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
var width = ((typeof screen !== 'undefined') ? screen.width : null)
    || window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
if (width <= 800) {
    window.location = "m.resume.html";
}