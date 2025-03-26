"use strict";

// from https://github.com/DavidAnson/live-photo-web

class LivePhotoElement extends HTMLElement {

  static get observedAttributes() {
    return ["src"];
  }

  start(evt) {
    this.video.style.display = "inline";
    this.img.style.display = "none";
    this.video.play();
    evt.preventDefault();
  }

  stop(evt) {
    this.img.style.display = "inline";
    this.video.style.display = "none";
    this.video.pause();
    this.video.currentTime = 0;
    evt.preventDefault();
  }

  attributeChangedCallback(name, old, value) {
    if (name === "src" && this.img && this.video) {
      const src = value || this.getAttribute("src");
      this.img.src = src;

      const videoSrcMov = src.replace(/\.[^\.]+$/, ".mov");
      const videoSrcMp4 = src.replace(/\.[^\.]+$/, ".mp4");

      fetch(videoSrcMov, { method: "HEAD" })
        .then(response => {
          this.video.src = response.ok ? videoSrcMov : videoSrcMp4;
        })
        .catch(() => {
          this.video.src = videoSrcMp4;
        });
    } else if (name === "caption" && this.caption) {
      this.caption.innerText = value || this.getAttribute("caption");
    }
  }

  connectedCallback() {
    this.img = document.createElement("img");

    // Add a badge to the image
    const badge = document.createElement("span");
    badge.innerText = "Live";
    badge.style.position = "absolute";
    badge.style.top = "10px";
    badge.style.right = "10px";
    badge.style.backgroundColor = "red";
    badge.style.color = "white";
    badge.style.padding = "2px 5px";
    badge.style.borderRadius = "3px";
    badge.style.fontSize = "12px";
    badge.style.fontWeight = "bold";
    // badge.style.zIndex = "10";

    // Create a wrapper to hold the image and the badge
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    this.img.style.display = "block";
    wrapper.appendChild(this.img);
    wrapper.appendChild(badge);
    this.appendChild(wrapper);

    this.video = document.createElement("video");
    this.video.playsInline = true;
    this.video.loop = true;
    // this.video.muted = true;
    this.video.style.display = "none";
    this.video.preload = "auto"; // Enable prefetching
    this.appendChild(this.video);

    this.caption = document.createElement("div");
    this.caption.style.textAlign = "center";
    this.caption.style.marginTop = "5px";
    this.caption.style.fontStyle = "italic";
    this.appendChild(this.caption);

    const start = this.start.bind(this);
    const stop = this.stop.bind(this);
    [this.img, this.video].forEach(function (element) {
      element.addEventListener("mouseenter", start);
      element.addEventListener("mouseleave", stop);
      element.addEventListener("touchstart", start);
      element.addEventListener("touchcancel", stop);
      element.addEventListener("touchend", stop);
    });

    this.attributeChangedCallback("src");
    this.attributeChangedCallback("caption");
  }
}

customElements.define("live-photo-element", LivePhotoElement);