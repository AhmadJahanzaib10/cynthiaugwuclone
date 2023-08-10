const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    let tl = gsap.timeline();
    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })
    .to(".boundingElem",{
        y:0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: Expo.easeInOut
    })
    .from("#hero-footer",{
        y:-10,
        opacity: 0,
        duration: 2,
        delay: -1,
        ease: Expo.easeInOut
    })
}

let timer;

function circleSkew(){
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;
    window.addEventListener("mousemove",(e)=>{
        clearInterval(timer)
        xscale = gsap.utils.clamp(0.8, 1.2, e.clientX - xprev)
        yscale = gsap.utils.clamp(0.8, 1.2, e.clientY - yprev)
        xprev = e.clientX;
        yprev = e.clientY;
        circleMovement(xscale, yscale);
        timer = setTimeout(()=>{
            document.querySelector(".mini-circle").style.transform = `translate(${e.clientX}px,${e.clientY}px) scale(1, 1)`;
        },100)
    })
}

function circleMovement(xscale, yscale){
    window.addEventListener("mousemove",(e)=>{
        document.querySelector(".mini-circle").style.transform = `translate(${e.clientX}px,${e.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
circleSkew()
circleMovement();
firstPageAnim()

document.querySelectorAll(".elem").forEach((elem)=>{
    let rotate = 0;
    let diffrot = 0;
    elem.addEventListener("mousemove",(e)=>{
        diffrot = e.clientX - rotate;
        rotate = e.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: e.clientY - elem.getBoundingClientRect().top,
            left: e.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot)
        })
    })
})

document.querySelectorAll(".elem").forEach((elem)=>{
    elem.addEventListener("mouseleave",(e)=>{
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
        })
    })
})