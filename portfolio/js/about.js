// GSAP : recomposition de la photo
document.addEventListener("DOMContentLoaded", () => {
    
    const pieces = document.querySelectorAll(".piece");

    // Position initiale : légèrement dispersée
    pieces.forEach(p => p.classList.add("starting"));

    gsap.fromTo(
        pieces,
        { x: (i) => (i % 2 === 0 ? -80 : 80), y: -80, opacity: 0 },
        {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.4,
            delay: 0.4,
            ease: "power4.out",
            stagger: 0.12,
            onComplete: () => {
                pieces.forEach(p => {
                    p.classList.remove("starting");
                    p.classList.add("assembled");
                });
            }
        }
    );

});
