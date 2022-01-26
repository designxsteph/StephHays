(function() {
    var matchUp = document.getElementById('matchUp');
    
    if (matchUp) {
        var cards = matchUp.querySelectorAll('.flip-card'),
            flipper = randomNoRepeats([...cards]);

        const flipperInterval = setInterval(function() {
            flipper();
        }, 5000);

        cards.forEach(function(el) {
            el.addEventListener('click', function() {
                flipCard(el);
            }, false);

            document.addEventListener('keydown', function(e) {
                var code = (e.keyCode ? e.keyCode : e.which);

                if (code == 13 && document.activeElement == el) {
                    flipCard(el);
                }
            });

            function flipCard() {
                el.classList.add('active');

                if (!matchUp.classList.contains('active')) {
                    matchUp.classList.add('active');
                    console.log('Whahooo! You found the Matching Card game. Can you find all the matches? 🎉');
                    confettiBurst();
                    clearInterval(flipperInterval);
                    for (i of cards) {
                        i.classList.remove('random');
                    }
                }

                if (!el.classList.contains('flip-card-match')) {
                    if (!document.querySelector('.flip-card-one')) {
                        el.classList.add('flip-card-one');
                    } else if (el.classList.contains('flip-card-one')) {
                        el.classList.remove('active');
                        el.classList.remove('flip-card-one');
                    } else {
                        el.classList.add('flip-card-two');
                    
                        var cardOne = document.querySelector('.flip-card-one'),
                            cardTwo = document.querySelector('.flip-card-two');

                        if (cardOne.getAttribute('sh-data-match') == cardTwo.getAttribute('sh-data-match')) {
                            cardOne.classList.add('flip-card-match');
                            cardTwo.classList.add('flip-card-match');
                            console.log("You found a match! 🏆");
                            confettiBurst();
                        } else {
                            console.meme("Not a match", "Try again", "https://cataas.com/cat/cute?width=200?height=200?" + new Date().getTime(), 200, 200);
                            setTimeout(function() {
                                cardOne.classList.remove('active');
                                cardTwo.classList.remove('active');
                            }, 1000);
                        }

                        cardOne.classList.remove('flip-card-one');
                        cardTwo.classList.remove('flip-card-two');
                    }
                } else {
                    console.log('🤦‍♀️ Yooo that card has already been matched, bruh.');
                }
            }
        });
    }
})();