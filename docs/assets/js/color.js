function changeColorByWeekday(){
    var date=new Date();
    var day=date.getDay();
    var colors=new Array(
        "",
        "#757575",// grey
        "#546d78",// blue grey
        "#009485",// teal
        "#4051b5",// indigo
        "#e92063",// pink
        "#7e56c2",// deep purple
        "#7e56c2"
        );
    // 选择器，改变日间主题的颜色
    const root = document.querySelector('[data-md-color-scheme="day"]');
    root.style.setProperty('--md-primary-fg-color', colors[day]);
    // console.log('color changed');
}

changeColorByWeekday();