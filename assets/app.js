(function () {
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function flash(btn, ok) {
    btn.textContent = ok ? "Kopeeritud ✓" : "Kopeeri käsitsi";
    btn.classList.toggle("done", ok);
    setTimeout(function () {
      btn.textContent = "Kopeeri";
      btn.classList.remove("done");
    }, 1800);
  }

  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest(".copy");
    if (!btn) return;
    var pre = document.getElementById(btn.getAttribute("data-target"));
    if (!pre) return;
    var text = pre.textContent;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        function () { flash(btn, true); },
        function () { flash(btn, fallbackCopy(text)); }
      );
    } else {
      flash(btn, fallbackCopy(text));
    }
  });
})();
