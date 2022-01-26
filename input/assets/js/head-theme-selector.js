if (!/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    const theme = localStorage.getItem('theme'),
        html = document.getElementsByTagName('html')[0];

    if (theme) {
        html.setAttribute('data-sh-theme', theme);
    }
}