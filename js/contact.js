class ForgedExperience {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.scrollY = 0;

        this.init();
    }

    init() {
        this.setupCursor();
        this.setupMouseMove();
        this.setup3DEffects();
        this.animate();
    }

    // CURSOR
    setupCursor() {
        this.cursor = document.querySelector('.cursor');
        const interactiveElements = document.querySelectorAll('button, .tech-item, .feature-card, .contact-info li');

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }

    // MOUSE MOVE
    setupMouseMove() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX - window.innerWidth / 2) * 0.01;
            this.mouseY = (e.clientY - window.innerHeight / 2) * 0.01;

            this.update3DEffects();
        });
    }

    // CUBE PRINCIPAL
    setup3DEffects() {
        this.createCubeFaces();
    }

    createCubeFaces() {
        const cube = document.getElementById('main-cube');
        if (!cube) return;

        const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
        faces.forEach(face => {
            const faceEl = document.createElement('div');
            faceEl.className = `face ${face}`;
            cube.appendChild(faceEl);
        });
    }

    update3DEffects() {
        const cube = document.getElementById('main-cube');
        if (cube) {
            cube.style.transform = `rotateX(${25 + this.mouseY * 10}deg) rotateY(${25 + this.mouseX * 10}deg)`;
        }
    }

    // ANIMATION CONTINUE
    animate() {
        requestAnimationFrame(() => this.animate());

        const cube = document.getElementById('main-cube');
        if (cube) {
            const time = Date.now() * 0.001;
            cube.style.transform = `rotateX(${25 + Math.sin(time) * 5}deg) rotateY(${25 + Math.cos(time) * 5}deg)`;
        }
    }
}

// INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    new ForgedExperience();

    // Fade-in au chargement
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});
