function changeColorByWeekday() {
    var date = new Date();
    // 0-6代表周日到周六
    var day = date.getDay() + 1;
    var schemes = new Array("placeholder", "sun", "mon", "tues", "wed", "thur", "fri", "sat");
    var colors = new Array("white", "purple", "grey", "blue-grey", "teal", "indigo", "pink", "deep-purple");
    if (document.body.getAttribute("data-md-color-scheme") != schemes[day]) {
        document.body.setAttribute("data-md-color-scheme", schemes[day]);
        document.body.setAttribute("data-md-color-primary", colors[day]);
        var local_json = {
            'index': day,
            'color': {
                "scheme": schemes[day],
                "primary": colors[day],
                "accent": "orange"
            }
        };
        // 把更改存储到本地
        window.localStorage.setItem('/.__palette', JSON.stringify(local_json));
    }
}

window.addEventListener("load", changeColorByWeekday);