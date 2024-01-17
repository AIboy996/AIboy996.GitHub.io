// 引用自 https://codepen.io/pkra/pen/EPeKjo
window.MathJax = {
  jax: ["input/TeX","output/CommonHTML"],
  CommonHTML: { linebreaks: {automatic: true}},
  SVG: { linebreaks: {automatic: true}},
  "HTML-CSS": { linebreaks: {automatic: true}},
  extensions: ["tex2jax.js", "asciimath2jax.js", "mml2jax.js", "MathMenu.js", "MathZoom.js"],
  TeX: {
    extensions: ["AMSmath.js", "AMSsymbols.js", "autoload-all.js"]
  },
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ["\\(", "\\)"]
    ],
    processEscapes: true
  },
  AuthorInit: function() {MathJax.Hub.Register.MessageHook("End Process", function (message) {
            var timeout = false, // holder for timeout id
            delay = 250; // delay after event is "complete" to run callback
            var reflowMath = function() {
              var dispFormulas = document.getElementsByClassName("formula");
              if (dispFormulas){
              for (var i=0; i<dispFormulas.length; i++){
                var dispFormula = dispFormulas[i];
                var child = dispFormula.getElementsByClassName("MathJax_Preview")[0].nextSibling.firstChild;
                var isMultiline = MathJax.Hub.getAllJax(dispFormula)[0].root.isMultiline;
                if(dispFormula.offsetWidth < child.offsetWidth || isMultiline){
                  MathJax.Hub.Queue(["Rerender", MathJax.Hub, dispFormula]);
                }
              }
            }
            };
            window.addEventListener('resize', function() {
                // clear the timeout
              clearTimeout(timeout);
              // start timing for event "completion"
              timeout = setTimeout(reflowMath, delay);
            });
          });
  }
};

(function(d, script) {
  script = d.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.onload = function() {
    // remote script has loaded
  };
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js';
  d.getElementsByTagName('head')[0].appendChild(script);
}(document));