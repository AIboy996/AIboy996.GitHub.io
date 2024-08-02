function link_blank() {
    document.querySelectorAll(".md-content a[href *='//']:not(.md-content__button):not(:has(img))").forEach(function (link) {
        link.setAttribute('target', '_blank');
    });
    document.querySelectorAll("figure img").forEach(function (img) {
        img.setAttribute('loading', 'lazy');
    });
};

window.addEventListener("load", link_blank);