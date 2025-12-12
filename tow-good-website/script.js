const scroll = new LocomotiveScroll({
    el: document.querySelector('main'),
    smooth: true
});


window.addEventListener('load',()=>{
    let tl = gsap.timeline();
    tl.from('.h1-container h1',{
        y: '100%',
        duration:0.5,
        stagger: 0.2
    })
    tl.from('.img-container',{
        y: 30,
        opacity:0,
        duration:0.5,
    })
})

const productArea = document.querySelector('.products')
productArea.addEventListener('mouseenter',()=>{
    gsap.to('#page-3 .circle',{
        opacity: 1,
        scale: 1,
    })
})
productArea.addEventListener('mouseleave',()=>{
    gsap.to('#page-3 .circle',{
        opacity: 0,
        scale: 0,
    })
})
document.querySelector('#page-3').addEventListener('mousemove',(e)=>{
    gsap.to('#page-3 .circle',{
        x:`${e.clientX}px`,
        y:`${e.clientY}px`,
    })
})
