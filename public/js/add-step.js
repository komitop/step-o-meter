document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        defaultDate: new Date(),
        format: "yyyy/mm/dd",
        maxDate: new Date()
    });
});