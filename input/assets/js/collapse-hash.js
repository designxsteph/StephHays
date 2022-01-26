(function() {
    if (location.hash) {
        var el = document.querySelector(escapeId(location.hash));
        
        if (el) {
            var elScroll = el,
                collapseParents = getParents(el).filter(el => el != document && el.classList.contains('collapse'));

            if (collapseParents.length == 0 && el.classList.contains('collapse')) {
                collapseParents.push(el);
            }

            collapseParents.reverse().forEach(function (el, idx, array) {
                el = document.getElementById(escapeId(el.id));

                var collapseParentContainer = Collapse.getInstance(el) ? Collapse.getInstance(el) : new Collapse(el, { toggle: false });
                
                collapseParentContainer.show();

                el.addEventListener('shown.bs.collapse', function (e) {
                    e.stopImmediatePropagation();

                    if (idx === array.length - 1) {
                        elScroll.scrollIntoView();
                    }
                });
            });
        }
    }
})();