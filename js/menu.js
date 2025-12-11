document.addEventListener("DOMContentLoaded", function () {
    const navBottom = document.querySelector('[data-nav="bottom-wrapper"]');
    const navTopLinks = document.querySelectorAll('[data-nav="top-link"]');
    const navBottomLinks = document.querySelectorAll('[data-nav="bottom-link"]');
    const navMenuButton = document.querySelector('[data-nav="menu-button"]');
    const navMenuLines = document.querySelectorAll('[data-nav="menu-line"]');
    const heroTexts = document.querySelectorAll('[data-hero="text"]');

    const navTopLinksSplits = Array.from(navTopLinks, el =>
        el.textContent.trim().length ? new SplitType(el, { type: "chars" }) : { chars: [] }
    );

    const navBottomLinksSplits = Array.from(navBottomLinks, el =>
        el.textContent.trim().length ? new SplitType(el, { type: "chars" }) : { chars: [] }
    );

    gsap.set(navBottom, { display: "flex" });

    navTopLinks.forEach((link, index) => {
        const chars = navTopLinksSplits[index].chars;
        if (!chars || !chars.length) return;

        const staggerFrom = index % 2 === 0 ? "start" : "end";

        link.addEventListener("mouseenter", () => gsap.to(chars, { y: "-100%", stagger: { each: 0.02, from: staggerFrom } }));
        link.addEventListener("mouseleave", () => gsap.to(chars, { y: 0, overwrite: true, stagger: { each: 0.02, from: staggerFrom } }));
    });

    const openAnimation = gsap.timeline({ paused: true })
        .fromTo(navBottom, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "expo.inOut" })
        .to(navTopLinks, { color: "#1e1d1a" }, 0.5)
        .to(navMenuLines, { backgroundColor: "#1e1d1a", duration: 0.125 }, 0.5)
        .to(heroTexts, { opacity: 0, duration: 1 }, 0);

    const closeAnimation = gsap.timeline({ paused: true })
        .to(navBottom, { clipPath: "inset(0 0 100% 0)", duration: 1.25, ease: "expo.inOut" })
        .to(navTopLinks, { color: "white" }, 0.5)
        .to(navMenuLines, { backgroundColor: "white", duration: 0.125 }, 0.5)
        .to(heroTexts, { opacity: 1, duration: 1 }, 0);

    let isClosed = false;

    navMenuButton.addEventListener("click", () => {
        isClosed ? closeAnimation.restart() : openAnimation.restart();
        isClosed = !isClosed;
    });

    // Hover couleur top links
  navTopLinksSplits.forEach((split, index) => {
    const chars = split.chars;
    if (!chars || !chars.length) return;

    navTopLinks[index].addEventListener("mouseenter", () => {
        gsap.to(chars, { color: "#cb9f4d", duration: 0.3 });
    });
    navTopLinks[index].addEventListener("mouseleave", () => {
        gsap.to(chars, { color: "#fff", duration: 0.3 });
    });

//     document.querySelectorAll('.nav_link').forEach(link => {
//   if (link.href === window.location.href) {
//     link.classList.add('active');
//   }
// });
});
});
