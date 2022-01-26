(function() {
    var themeSelectorDropdown = document.getElementById('themeSelectorDropdown'),
        themeSelectors = document.querySelectorAll('.theme-selector'),
        htmlRoot = document.querySelector('html');

    if (themeSelectorDropdown) {
        themeSelectors.forEach(function (el) {
            el.addEventListener('click', function() {
                var selectedTheme = el.getAttribute('data-sh-theme');

                htmlRoot.setAttribute('data-sh-theme', selectedTheme);
                localStorage.setItem('theme', selectedTheme);
            }, false);
        });

        themeSelectorDropdown.addEventListener('show.bs.dropdown', function () {
            themeSelectors.forEach(function (el) {
                if (el.getAttribute('data-sh-theme') == htmlRoot.getAttribute('data-sh-theme')) {
                    el.classList.add('active');
                    el.setAttribute('aria-current', 'true');
                } else {
                    el.classList.remove('active');
                    el.removeAttribute('aria-current');
                }
            });
        });
    }
})();