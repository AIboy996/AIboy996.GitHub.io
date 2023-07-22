(function changeColorByWeekday(){
    var date=new Date();
    var day=date.getDay();
    var schemes=new Array("","mon","tue","wed","thur","fri","sat","sun");
    var colors=new Array("","grey","blue grey","teal","indigo","pink","deep purple","deep purple");
    if (document.body.getAttribute("data-md-color-scheme") != schemes[day]){
        // 更改页面主题
        document.body.setAttribute("data-md-color-scheme",schemes[day]);
        var local_json = {
            'index': day-1,
            'color': {
                "scheme":schemes[day],
                "primary":colors[day],
                "accent":"orange"
            }
        };
        // 把更改存储到本地
        window.localStorage.setItem('/.__palette', JSON.stringify(local_json));
        // 刷新页面
        location.reload();
    } else{
        console.log("1");
    };
}());