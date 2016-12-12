var bang = {};

window.onload = function() {

    function broomstickControl() {
        let broomstickStartPosition;
        let cursorStartPosition;
        let delta;
        let alpha;

        const arena = document.querySelector('[data-element="arena"]'),
            broomstick = arena.querySelector('[data-element="broomstick"]'),
            cat = document.querySelector('[data-element="cat"]'),
            food1 = document.querySelector('[data-id="foodnum=1"]'),
            food2 = document.querySelector('[data-id="foodnum=2"]'),
            food3 = document.querySelector('[data-id="foodnum=3"]');


        let = {
            width,
            height
        } = arena.getBoundingClientRect();

        let move = function(e) {
            //aktualna pozycja kursora
            //The event.pageX property returns the position of the mouse pointer,
            //relative to the left edge of the document.
            const x = e.pageX - cursorStartPosition;
            const y = e.pageY - cursorVerticalStartPosition;
            //ograniczenie lewo/prawo
            const position = ((e.pageX + broomstickStartPosition) - cursorStartPosition);
            const positionVertical = ((e.pageY + broomstickStartPositionTop) - cursorVerticalStartPosition);

            // zatrzymanie funkcji move jesli pozycja wykracza poza obszar lewo prawo
            if (position < 0 || broomstick.offsetWidth + position > width) {
                return;
            }

            //offsetHeight is a property of the DHTML object model which was first introduced 
            //by MSIE. It is sometimes referred as an element physical/graphical dimensions 
            //or an element's box height.
            if (positionVertical < 0 || broomstick.offsetHeight + positionVertical > height) {
                return;
            }
            //The translate() method moves an element from its current position 
            //(according to the parameters given for the X-axis and the Y-axis).
            broomstick.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            delta = position;
            alpha = positionVertical;

            let broomLeft = parseInt(broomstick.offsetLeft, 10),
                broomRight = width - parseInt(broomstick.offsetLeft, 10) + parseInt(broomstick.offsetWidth, 10),
                broomTop = parseInt(broomstick.offsetTop, 10),
                food1Left = parseInt(food1.offsetLeft, 10),
                food1Right = width - parseInt(food1.offsetLeft, 10) + parseInt(food1.offsetWidth, 10),
                food1Top = parseInt(food1.offsetTop, 10),
                food2Left = parseInt(food2.offsetLeft, 10),
                food2Right = width - parseInt(food2.offsetLeft, 10) + parseInt(food2.offsetWidth, 10),
                food2Top = parseInt(food2.offsetTop, 10),
                food3Left = parseInt(food3.offsetLeft, 10),
                food3Right = width - parseInt(food3.offsetLeft, 10) + parseInt(food3.offsetWidth, 10),
                food3Top = parseInt(food3.offsetTop, 10);

            if ((broomLeft >= food1Left && broomLeft <= food1Right && broomTop <= food1Top) ||
                (broomLeft >= food2Left && broomLeft <= food2Right && broomTop <= food2Top) ||
                (broomLeft >= food3Left && broomLeft <= food3Right && broomTop <= food3Top)
            ) {
                bang.smash = 'yeah';
            } else {
                bang.smash = 'no';
            }
            console.log(bang.smash);

        };

        const start = function(e) {
            //offsetLeft Zwraca ilość pikseli, jaką dzieli górny lewy róg bieżącego 
            //elementu od lewej strony wewnątrz węzła offsetParent
            broomstickStartPosition = broomstick.offsetLeft;
            //The HTMLElement.offsetTop read-only property returns the distance of 
            //the current element relative to the top of the offsetParent node.
            broomstickStartPositionTop = broomstick.offsetTop;
            cursorStartPosition = e.pageX;
            cursorVerticalStartPosition = e.pageY;
            document.addEventListener('mousemove', move, false);
            /*console.log(e);*/

        };

        const stop = function(e) {
            broomstick.style.left = delta + 'px';
            broomstick.style.top = alpha + 'px';
            broomstick.style.transform = '';

            document.removeEventListener('mousemove', move, false);
        };

        broomstick.addEventListener('mousedown', start, false);
        broomstick.addEventListener('mouseup', stop, false);

    };



    //the cat jumps
    function Jumping() {
        const cat = document.querySelector('[data-element="cat"]'),
            food1 = document.querySelector('[data-id="foodnum=1"]'),
            food2 = document.querySelector('[data-id="foodnum=2"]'),
            food3 = document.querySelector('[data-id="foodnum=3"]'),
            positions = [food1, food2, food3],
            catPositionHome = parseInt(cat.offsetTop, 10);

        /*console.log('drugie bang' + bang.smash);*/

        setInterval(Jump, 5000);
        /*let ju = setInterval(JumpUp, 4000);*/


        function Jump() {
            let chosenPosition = positions[Math.floor(Math.random() * positions.length)],
                mu = setInterval(MoveUp, 1);

            function MoveUp() {
                if (parseInt(cat.offsetTop, 10) === parseInt(food1.offsetTop, 10) - 32) {
                    clearInterval(mu);
                } else {
                    let posTop = parseInt(cat.offsetTop, 10),
                        posLeft = parseInt(cat.offsetLeft, 10);
                    if (chosenPosition === food1) {
                        posTop -= 4;
                        posLeft -= 4;
                        cat.style.top = posTop + 'px';
                        cat.style.left = posLeft + 'px';
                    } else if (chosenPosition === food2) {
                        posTop -= 4;
                        cat.style.top = posTop + 'px';
                    } else if (chosenPosition === food3) {
                        posTop -= 4;
                        posLeft += 4;
                        cat.style.top = posTop + 'px';
                        cat.style.left = posLeft + 'px';
                    }
                }

            }


            setTimeout(JumpDown, 2500);

            function JumpDown() {
                let md = setInterval(MoveDown, 1);

                function MoveDown() {
                    if (parseInt(cat.offsetTop, 10) === catPositionHome) {
                        clearInterval(md);
                    } else {
                        let posTop = parseInt(cat.offsetTop, 10),
                            posLeft = parseInt(cat.offsetLeft, 10);
                        if (chosenPosition === food1) {
                            posTop += 4;
                            posLeft += 4;
                            cat.style.top = posTop + 'px';
                            cat.style.left = posLeft + 'px';
                        } else if (chosenPosition === food2) {
                            posTop += 4;
                            cat.style.top = posTop + 'px';
                        } else if (chosenPosition === food3) {
                            posTop += 4;
                            posLeft -= 4;
                            cat.style.top = posTop + 'px';
                            cat.style.left = posLeft + 'px';
                        }
                    }
                }
            }
        }
    };


    /*hit the cat *************/



    broomstickControl();
    Jumping();

}

function Smashi() {
    console.log('rrrr' + bang.smash);
}


/*
event.pageX 
property returns the position of the mouse pointer,
relative to the left edge of the document.

offsetHeight 
is a property of the DHTML object model which was first introduced 
by MSIE. It is sometimes referred as an element physical/graphical dimensions 
or an element's box height.

The translate() 
method moves an element from its current position 
(according to the parameters given for the X-axis and the Y-axis).

offsetLeft 
Zwraca ilość pikseli, jaką dzieli górny lewy róg bieżącego 
elementu od lewej strony wewnątrz węzła offsetParent*/
