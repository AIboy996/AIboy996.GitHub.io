document.addEventListener('DOMContentLoaded', function () {
    adjustImage();
    document.addEventListener('scroll', updateMapBasedOnTitle);
    window.addEventListener('hashchange', updateMapBasedOnTitle);
});

function adjustImage() {
    const images = document.querySelectorAll('div.md-content figure img');

    images.forEach(img => {
        if (img.naturalWidth > img.naturalHeight) {
            // 宽图
            img.style.width = '400px';
            img.style.height = 'auto'; // Maintain aspect ratio
        } else {
            // 长图
            img.style.width = '300px';
            img.style.height = 'auto'; // Maintain aspect ratio
        }
    });

    const videos = document.querySelectorAll('div.md-content .video-container video');

    videos.forEach(video => {
        video.style.width = '60%';
        video.style.height = 'auto'; // Maintain aspect ratio
    })
}

function clearMap() {
    const map = document.getElementById('blog-map');
    const svgDoc = map.contentDocument;
    // 重置颜色并移除所有文本标签
    svgDoc.querySelectorAll('rect').forEach(path => path.setAttribute('fill', 'black'));
    const existingLabels = svgDoc.querySelectorAll('text');
    existingLabels.forEach(label => label.remove());
    // 重制视窗
    svgDoc.querySelector('svg').setAttribute('viewBox', `50 -50 300 354.6`);
    return svgDoc;
}

const locations = {
    1: '东京都',
    2: '札幌市',
    3: '小樽市',
    4: '旭川市',
    5: '美瑛町',
    6: '富良野市',
    7: '函馆市',
    8: '登别市',
    9: '洞爷湖町',
    10: '富士吉田市',
    11: '诹访市',
    12: '名古屋市',
    13: '歧阜市'
}

// 一共十三天，每天都在哪？
const day_to_location = {
    0: [2],
    1: [2],
    2: [3],
    3: [5, 6],
    4: [4],
    5: [8, 9],
    6: [7],
    7: [1, 10],
    8: [10, 11],
    9: [13],
    10: [12]
}



function updateMap(postIndex) {
    const svgDoc = clearMap();
    const cities = svgDoc.querySelectorAll('rect');

    var location_index = day_to_location[postIndex][0];
    // 设置当前索引的颜色并添加标签
    day_to_location[postIndex].forEach(element => {
        cities[element].setAttribute('fill', 'red');
    });
    const label = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', cities[location_index].getAttribute('x'));
    label.setAttribute('y', cities[location_index].getAttribute('y') - 10); // Adjust position above the rectangle
    label.setAttribute('fill', 'black');
    label.setAttribute('font-size', '5px');
    label.setAttribute('stroke', 'yellow');
    label.setAttribute('stroke-width', '2px');
    label.setAttribute('paint-order', 'stroke');
    var label_text = "";
    day_to_location[postIndex].forEach(element => {
        if (label_text === "") {
            label_text += locations[element];
        } else {
            label_text += " & " + locations[element];
        }
    });
    label.textContent = label_text;
    svgDoc.querySelector('svg').appendChild(label);

    // 放大整个svg图像，并且把视窗移动到对应的位置，用动画过度完成
    const viewBox = { width: 354.6, height: 299.99160000000006 };
    const targetX = cities[location_index].getAttribute('x') - viewBox.width / 4 + 50;
    const targetY = cities[location_index].getAttribute('y') - viewBox.height / 4;
    const targetWidth = viewBox.width / 2.5;
    const targetHeight = viewBox.height / 2.5;

    svgDoc.querySelector('svg').setAttribute('viewBox', `${targetX} ${targetY} ${targetWidth} ${targetHeight}`);
}

function updateMapBasedOnTitle() {
    // 获取当前高亮的nav
    const nav_span = document.querySelectorAll('li.md-nav__item > a.md-nav__link--active > span.md-ellipsis');
    if (nav_span.length < 2) {
        clearMap();
        return;
    }
    title = nav_span[1].textContent;
    // 使用正则表达式提取数字
    const match = title.match(/\s*Day(\d+)/);
    if (match) {
        // 提取到的数字
        const dayNumber = parseInt(match[1]);
        updateMap(dayNumber - 1);
    } else {
        clearMap();
    }
}