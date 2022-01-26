// Get parents of an element and push to array
function getParents(el) {
    var parents = [],
        node = el;

    while (node != document) {
        parents.push(node.parentNode);
        node = node.parentNode;
    }
    return parents;
}

// Escape special chars from Id elements
function escapeId(el) {
    return el.replace(/[.]/g, "\\$&");
}

function confettiBurst() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

function randomNoRepeats(array) {
    var copy = array.slice(0);

    return function() {
        array.forEach(function (el) {
            el.classList.remove('random');
        });

        if (copy.length < 1) {
            copy = array.slice(0);
        }

        var index = Math.floor(Math.random() * copy.length),
            item = copy[index];

        copy.splice(index, 1);

        item.classList.add('random');

        return item;
    };
}

var confettiClick = document.querySelectorAll('.confetti');
confettiClick.forEach(function(el) {
    el.addEventListener('click', function() {
        confettiBurst();
    }, false);

    document.addEventListener('keydown', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);

        if (code == 13 && document.activeElement == el) {
            confettiBurst();
        }
    });
});