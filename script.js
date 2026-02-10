document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 3. Hero Animation (Reveal Text)
    const tl = gsap.timeline();
    
    tl.from(".badge-pill", { 
        y: -20, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power3.out" 
    })
    .from(".line-reveal", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=0.4")
    .from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6");

    // 4. Scroll Triggers for Sections
    gsap.utils.toArray(".bento-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out(1.7)"
        });
    });

    // 5. Mouse Follower Glow
    const cursor = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    });

    // 6. Form Submission Logic (Ultra Premium)
    const form = document.querySelector('.ultra-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('.submit-btn');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = "Processing...";
            btn.style.opacity = "0.7";
            
            setTimeout(() => {
                btn.innerHTML = `Request Confirmed <i data-lucide="check"></i>`;
                btn.style.background = "#fff";
                btn.style.color = "#000";
                
                form.reset();
                lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = "";
                    btn.style.color = "";
                    lucide.createIcons();
                }, 4000);
            }, 1500);
        });
    }
});
