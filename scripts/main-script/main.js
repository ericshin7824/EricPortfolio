'use strict';

const navMenu = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');
const navMenuBtn = document.querySelector('.nav-menu-btn');
const body = document.body;

const toggleNavMenu = function () {
    navMenuBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
    overlay.classList.toggle('hidden');
    navMenuBtn.querySelectorAll('span').forEach((span) => span.classList.toggle('open'));
    // body.classList.toggle("disabled");
};

navMenuBtn.addEventListener('click', toggleNavMenu);

overlay.addEventListener('click', toggleNavMenu);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenuBtn.classList.contains('open')) {
        toggleNavMenu();
    }
});

// --------------- scroll down & up event ---------------

// let lastScroll = 0;
// let windowWidth = window.innerWidth;

// console.log(windowWidth);

// window.addEventListener("scroll", function () {
//     const currentScroll = window.pageYOffset;

//     if (currentScroll <= 0) {
//         body.classList.remove("scroll-up");
//     }

//     if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
//         body.classList.remove("scroll-up");
//         body.classList.add("scroll-down");
//     }

//     if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
//         body.classList.remove("scroll-down");
//         body.classList.add("scroll-up");
//     }

//     lastScroll = currentScroll;
// });

// ------------------ scroll animation ------------------

window.addEventListener('scroll', reveal);

function reveal() {
    let reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// --------------- scroll down & up event ---------------

let backToTop = document.getElementById('back-to-top'),
    docElem = document.documentElement,
    offset,
    scrollPos,
    docHeight;

//문서 높이 계산
docHeight = Math.max(docElem.offsetHeight, docElem.scrollHeight);
scrollPos = docElem.scrollTop;
if (docHeight !== undefined) {
    offset = docHeight / 10;
}

//스크롤 이벤트 추가
window.addEventListener('scroll', function () {
    scrollPos = docElem.scrollTop;
    // console.log(scrollPos);

    backToTop.className = scrollPos > offset ? 'visible' : 'hidden';
});

backToTop.addEventListener('click', function (ev) {
    ev.preventDefault(); //a 의 기능 막음.
    //docElem.scrollTop = 0;
    scrollToTop();
});
function scrollToTop() {
    let scrollInterval = setInterval(function () {
        if (scrollPos !== 0) {
            window, scrollBy(0, -100);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}
