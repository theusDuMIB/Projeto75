window.addEventListener('load', () => {

    gsap.to('#loader-bar', {

        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut',

        onComplete: () => {

            gsap.to('#loader', {

                opacity: 0,
                duration: 0.5,

                onComplete: () => {

                    document.getElementById('loader').style.display = 'none';

                    gsap.to('#hero-content', {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out'
                    });

                }

            });

        }

    });

});

/* =========================
   PARTICLES
========================= */

particlesJS('particles-js', {

    particles: {

        number: {
            value: 40,
            density: {
                enable: true,
                value_area: 800
            }
        },

        color: {
            value: '#E5B800'
        },

        shape: {
            type: 'circle'
        },

        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false
            }
        },

        size: {
            value: 2,
            random: true
        },

        line_linked: {
            enable: true,
            distance: 150,
            color: '#E5B800',
            opacity: 0.1,
            width: 1
        },

        move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out'
        }

    },

    interactivity: {

        detect_on: 'canvas',

        events: {

            onhover: {
                enable: true,
                mode: 'grab'
            },

            onclick: {
                enable: false
            },

            resize: true

        },

        modes: {

            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.4
                }
            }

        }

    },

    retina_detect: true

});

gsap.registerPlugin(ScrollTrigger);

/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        navbar.classList.add(
            'bg-noir-black/85',
            'backdrop-blur-xl',
            'shadow-lg',
            'shadow-black/20',
            'py-3'
        );

        navbar.classList.remove('py-6');

    } else {

        navbar.classList.remove(
            'bg-noir-black/85',
            'backdrop-blur-xl',
            'shadow-lg',
            'shadow-black/20',
            'py-3'
        );

        navbar.classList.add('py-6');

    }

});

/* =========================
   ACTIVE NAV LINK
========================= */

const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {

    let current = '';

    document.querySelectorAll('section[id]').forEach(section => {

        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active', 'text-noir-yellow');

        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active', 'text-noir-yellow');
        }

    });

});

/* =========================
   GSAP ANIMATIONS
========================= */

gsap.to('#home img', {

    yPercent: 20,
    ease: 'none',

    scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }

});

gsap.from('.about-img-wrapper', {

    scrollTrigger: {
        trigger: '#about',
        start: 'top 70%'
    },

    x: -80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'

});

gsap.from('#about .lg\\:w-1\\/2:last-child > *', {

    scrollTrigger: {
        trigger: '#about',
        start: 'top 60%'
    },

    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'

});

/* =========================
   COUNTERS
========================= */

document.querySelectorAll('.counter').forEach(counter => {

    const target = parseInt(counter.getAttribute('data-target'));

    ScrollTrigger.create({

        trigger: counter,
        start: 'top 85%',
        once: true,

        onEnter: () => {

            gsap.to(counter, {

                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: {
                    innerText: 1
                },
                onUpdate: function () {
                    counter.textContent =
                        Math.ceil(parseFloat(counter.textContent)) + '+';
                }
            });
        }
    });
});

/* =========================
   EVENTS
========================= */

document.querySelectorAll('#events-grid .event-card').forEach((card, i) => {

    gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

/* =========================
   MOBILE MENU
========================= */

const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

let menuOpen = false;

function toggleMenu() {

    menuOpen = !menuOpen;

    if (menuOpen) {
        mobileMenu.classList.add('open');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');

        gsap.fromTo(

            '.mobile-link',

            {
                y: 20,
                opacity: 0
            },

            {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.4,
                ease: 'power2.out'
            }
        );

    } else {
        gsap.to(mobileMenu, {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.out',

            onComplete: () => {
                mobileMenu.classList.remove('open');
                gsap.set(mobileMenu, {
                    opacity: ''
                });
            }
        });
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');

    }

}

mobileToggle.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

/* =========================
   CURSOR GLOW
========================= */

const cursorGlow = document.getElementById('cursor-glow');

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

gsap.ticker.add(() => {
    gsap.set(cursorGlow, {
        x: mouseX,
        y: mouseY
    });
});

if (window.innerWidth < 768) {
    cursorGlow.style.display = 'none';
}

/* =========================
   SCROLL REVEAL
========================= */

const sr = ScrollReveal({

    distance: '30px',
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    reset: false
});

sr.reveal('.divider-line', {
    delay: 100
});

/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(
            this.getAttribute('href')
        );
        if (target) {
            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                80;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    });
});

/* =========================
   WHATSAPP FLOAT
========================= */

const whatsappFloat = document.getElementById('whatsapp-float');
let prevScroll = window.scrollY;
window.addEventListener('scroll', () => {
    if (window.scrollY > prevScroll && window.scrollY > 300) {
        gsap.to(whatsappFloat, {
            y: 80,
            opacity: 0,
            duration: 0.3
        });
    } else {
        gsap.to(whatsappFloat, {
            y: 0,
            opacity: 1,
            duration: 0.3
        });
    }
    prevScroll = window.scrollY;
});






gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector(".gallery-track");

if (track) {

    gsap.to(track, {

        x: () => -(track.scrollWidth - window.innerWidth),

        ease: "none",

        scrollTrigger: {

            trigger: ".gallery",

            start: "top top",

            end: () => "+=" + (track.scrollWidth - window.innerWidth),

            scrub: true,

            pin: true,

            anticipatePin: 1,

            invalidateOnRefresh: true

        }

    });

}

// TESTE PARA MODAL DE ITENS DO CARDAPIO

const cards=document.querySelectorAll(".menu-card");
const modals=document.querySelectorAll(".menu-modal");
const closeButtons=document.querySelectorAll(".close-modal");

function openModal(id){
    const modal=document.getElementById(id);

    if(!modal)return;

    modal.classList.add("active");
    document.body.style.overflow="hidden";

    const items=modal.querySelectorAll(".modal-item");

    items.forEach((item,index)=>{
        item.style.opacity="0";
        item.style.transform="translateY(25px)";

        setTimeout(()=>{
            item.style.transition=".45s ease";
            item.style.opacity="1";
            item.style.transform="translateY(0)";
        },120+(index*100));
    });
}

function closeModal(modal){

    modal.classList.remove("active");

    document.body.style.overflow="";

}

cards.forEach(card=>{

    card.addEventListener("click",()=>{

        openModal(card.dataset.modal);

    });

});

closeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        closeModal(button.closest(".menu-modal"));

    });

});

modals.forEach(modal=>{

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){

            closeModal(modal);

        }

    });

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modals.forEach(modal=>{

            if(modal.classList.contains("active")){

                closeModal(modal);

            }

        });

    }

});