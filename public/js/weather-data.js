document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, null);
});

// Or with jQuery

$(document).ready(function () {
    $('.collapsible').collapsible();
});