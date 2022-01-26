(function() {
    var btnCollapseTarget = document.querySelectorAll('.btn-collapse-target');
    
    if (btnCollapseTarget) {
        btnCollapseTarget.forEach(function (el) {
            el.addEventListener('click', function (e) {
                var collapseTarget = document.querySelector(el.getAttribute('data-collapse-target'));

                if (!collapseTarget.classList.contains('show')) {
                    e.preventDefault();

                    var collapseTargetContainer = Collapse.getInstance(collapseTarget) ? Collapse.getInstance(collapseTarget) : new Collapse(collapseTarget, { toggle: false });

                    collapseTargetContainer.show();

                    collapseTarget.addEventListener('shown.bs.collapse', function (e) {
                        document.querySelector(el.getAttribute('href')).scrollIntoView();
                    });
                }
            }, false);
        });
    }
})();