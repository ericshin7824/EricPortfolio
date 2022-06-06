'use strict';
const hoverEl = document.querySelectorAll('.tech');

function consoleEl() {
    console.log('a');
}

document.querySelectorAll('.tech').forEach((e) => {
    let toggleActive = e.querySelectorAll('.stars I');
    e.addEventListener('mouseenter', function () {
        if (e.querySelector('.stars')) {
            for (let i = 0; i < toggleActive.length; i++) {
                toggleActive[i].classList.add('active');
            }
        }
    });
    e.addEventListener('mouseleave', function () {
        if (e.querySelector('.stars')) {
            for (let i = 0; i < toggleActive.length; i++) {
                toggleActive[i].classList.remove('active');
            }
        }
    });
});
