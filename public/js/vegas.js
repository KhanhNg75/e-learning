/*-----------------------------------------------------------------------------------*/
/*Banner Vegas Vendor Background Slider
/*-----------------------------------------------------------------------------------*/
$('.c-banner__wrap').vegas({
    slides: [
        { src: './img/bg-img.png' },
        { src: './img/bg-img1.png' },
        { src: './img/bg-img2.png' },
        { src: './img/bg-img3.png' },
        { src: './img/bg-img4.png' }
    ],
    animation: 'random',
    transitionDuration: 5000,
    delay: 8000,
    overlay: true,
});
$('.vegas-overlay').css({
    background: 'rgba(0,0,0,0.8)'
});
$('.c-banner__wrap').css({ height: '100vh' });