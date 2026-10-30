/* 应达学术 restyle sample: KaTeX helpers (protect $..$ / $$..$$ from marked, then auto-render) */
(function () {
  var store = [];
  window.ydProtectMath = function (src) {
    store = [];
    src = String(src || '');
    // keep fenced / inline code untouched
    var code = [];
    src = src.replace(/```[\s\S]*?```|`[^`\n]*`/g, function (m) { code.push(m); return 'YDCODE' + (code.length - 1) + 'END'; });
    src = src.replace(/\$\$([\s\S]+?)\$\$|\$([^\$\n]+?)\$/g, function (m) { store.push(m); return 'YDMATH' + (store.length - 1) + 'END'; });
    return src.replace(/YDCODE(\d+)END/g, function (_, i) { return code[+i]; });
  };
  window.ydRestoreMath = function (html) {
    return String(html).replace(/YDMATH(\d+)END/g, function (_, i) {
      return store[+i].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });
  };
  window.ydRenderMath = function (el) {
    if (!el || !window.renderMathInElement) return;
    try {
      window.renderMathInElement(el, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false, ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      });
    } catch (e) { console.warn('KaTeX render failed', e); }
  };
})();
