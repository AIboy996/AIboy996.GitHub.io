// Model


// View

class View {
    // 相当于python的__init__方法，创建实例的时候传入参数
    constructor(container) {
        this.container = container;
        this.init();
    }
    // 初始化背景
    init() {
        this.container.style.width = 600;
        this.container.style.height = 600;
        this.container.style.backgroundColor = "#ADD8E6";
    }
}

// Contorller

// 获取html里面的元素
var container = document.getElementById("game-container");
// 设置相关的属性
var view = new View(container);