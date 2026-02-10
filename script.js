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

    // 2. Register GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 3. Hero Stats Counter Animation
    const stats = document.querySelectorAll(".stat-num");
    stats.forEach(stat => {
        const target = +stat.getAttribute("data-target");
        gsap.to(stat, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out"
        });
    });

    // 4. Battery Charging Simulation (Scroll Triggered)
    ScrollTrigger.create({
        trigger: ".tech-section",
        start: "top 70%",
        onEnter: () => {
            let charge = 0;
            const batteryFill = document.querySelector(".battery-level");
            const chargeText = document.getElementById("charge-percent");
            
            const interval = setInterval(() => {
                if(charge >= 100) clearInterval(interval);
                else {
                    charge++;
                    batteryFill.style.height = charge + "%";
                    chargeText.innerText = charge;
                }
            }, 30); // Speed of charging
        }
    });

    // 5. Mouse Follower
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 6. Form Logic
    const form = document.querySelector('.ultra-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('.submit-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = "Processing...";
            btn.style.opacity = "0.7";
            setTimeout(() => {
                btn.innerHTML = `Request Confirmed <i data-lucide="check"></i>`;
                btn.style.background = "#fff"; btn.style.color = "#000";
                form.reset();
                lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = ""; btn.style.color = "";
                    lucide.createIcons();
                }, 4000);
            }, 1500);
        });
    }
});
