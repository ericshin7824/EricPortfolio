// --------------- slider ---------------

const sliderBtns = document.querySelectorAll('.slider-btn');
const slides = document.querySelectorAll('.video-slide');
const contents = document.querySelectorAll('.content');

var sliderNav = function (manual) {
    sliderBtns.forEach(function (btn) {
        btn.classList.remove('active');
    });

    slides.forEach(function (slide) {
        slide.classList.remove('active');
    });

    contents.forEach(function (content) {
        content.classList.remove('active');
    });

    sliderBtns[manual].classList.add('active');
    slides[manual].classList.add('active');
    contents[manual].classList.add('active');
};

sliderBtns.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
        sliderNav(i);
    });
});

// --------------- menuBtn ---------------

// const pageBtns = document.querySelectorAll('.page-btn');

// var pageSlider = function (manual) {
//     pageBtns.forEach(function (btn) {
//         btn.classList.remove('active');
//     });
//     pageBtns[manual].classList.add('active');
// };

// pageBtns.forEach(function (btn, i) {
//     btn.addEventListener('click', function () {
//         pageSlider(i);
//     });
// });

// --------------- menu button ---------------

// --------------- scroll down & up event ---------------
const body = document.body;
var lastScroll = 0;

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        body.classList.remove('scroll-up');
    }

    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
        body.classList.remove('scroll-up');
        body.classList.add('scroll-down');
    }

    if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
        body.classList.remove('scroll-down');
        body.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// ------------------ scroll animation ------------------

window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 0;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
        //  else {
        //     reveals[i].classList.remove('active');
        // }
    }
}

// --------------- scroll down & up event ---------------

var goTopBtn = document.getElementById('back-to-top'),
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
// console.log(docHeight);

//스크롤 이벤트 추가
window.addEventListener('scroll', function () {
    scrollPos = docElem.scrollTop;
    // console.log(scrollPos);

    goTopBtn.className = scrollPos > offset ? 'visible' : '';
});

goTopBtn.addEventListener('click', function (ev) {
    ev.preventDefault(); //a 의 기능 막음.
    //docElem.scrollTop = 0;
    scrollToTop();
});
function scrollToTop() {
    //일정시간 마다 할일
    //setInterval(할일, 시간);
    //0.0015s = 15
    //할일 = function(){ 실제로 할일 }
    //실제로 할일 윈도우 스크롤이 0이 아닐때 window.scrollBy(x,y);
    // 스크롤이 0 이면 setInterval을 멈춰라. clearInterval(이름);

    var scrollInterval = setInterval(function () {
        if (scrollPos !== 0) {
            window, scrollBy(0, -100);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}
