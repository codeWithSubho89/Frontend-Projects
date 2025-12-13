const nextBtn = document.querySelector('.arrows .next')
const prevBtn = document.querySelector('.arrows .prev')
const goBackBtn = document.querySelector('.goback')
const seeMoreBtn = document.querySelectorAll('.seemore')
const carousel = document.querySelector('.carousel')
const list = document.querySelector('.carousel .list')

nextBtn.addEventListener('click',()=>showSlide('next'))
prevBtn.addEventListener('click',()=>showSlide('prev'))

let holdClick;
function showSlide(type){
    nextBtn.style.pointerEvents = 'none'
    prevBtn.style.pointerEvents = 'none'

    const items = document.querySelectorAll('.carousel .list .item')

    carousel.classList.remove('next')
    carousel.classList.remove('prev')
    
    if(type === 'next'){
        list.append(items[0]);
        carousel.classList.add('next')
    }else{
        list.prepend(items[items.length - 1])
        carousel.classList.add('prev')
    }
    clearTimeout(holdClick)
    holdClick = setTimeout(()=>{
        nextBtn.style.pointerEvents = 'auto'
        prevBtn.style.pointerEvents = 'auto'
    },2000)

}

seeMoreBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        carousel.classList.add('showDetails')
        goBackBtn.style.pointerEvents = 'auto'
        goBackBtn.style.opacity = '1'
        prevBtn.style.opacity = '0'
        nextBtn.style.opacity = '0'
    })
})

goBackBtn.addEventListener('click',()=>{
    carousel.classList.remove('showDetails')
    prevBtn.style.opacity = '1'
    nextBtn.style.opacity = '1'
    goBackBtn.style.pointerEvents = 'none'
})