let currentLang = localStorage.getItem('sow-lang') || 'en';
const langBtn = document.getElementById('langBtn');
let translationsCache = {};
let soundVizAnimId = null;

function observeCanvasAndRun(canvas, drawFrameCallback) {
    let animId = null;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animId) {
                    const loop = () => {
                        drawFrameCallback();
                        animId = requestAnimationFrame(loop);
                    };
                    loop();
                }
            } else {
                if (animId) {
                    cancelAnimationFrame(animId);
                    animId = null;
                }
            }
        });
    }, { threshold: 0.05 });
    observer.observe(canvas);
}

async function fetchTranslations(lang) {
    if (translationsCache[lang]) return translationsCache[lang];
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`HTTP status: ${response.status}`);
        translationsCache[lang] = await response.json();
        return translationsCache[lang];
    } catch (error) {
        console.error(`Failed to load translation schema for: ${lang}. Loading fallback.`, error);
        return null;
    }
}

async function applyTranslations(lang) {
    const t = await fetchTranslations(lang);
    if (!t) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });
    
    if (langBtn) langBtn.textContent = lang.toUpperCase();
    document.documentElement.lang = lang;
}

if (langBtn) {
    langBtn.addEventListener('click', async () => {
        currentLang = currentLang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('sow-lang', currentLang);
        await applyTranslations(currentLang);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
});

(function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [];

    function resize() {
        const hero = document.querySelector('.hero');
        W = canvas.width = hero ? hero.offsetWidth : canvas.offsetWidth;
        H = canvas.height = hero ? hero.offsetHeight : canvas.offsetHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.size = Math.random() * 2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random() * 0.4 + 0.1;
            this.hue = Math.random() > 0.6 ? 25 : (Math.random() > 0.5 ? 35 : 45);
            this.pulse = Math.random() * Math.PI * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulse += 0.02;
            
            if (this.x < -10) this.x = W + 10;
            if (this.x > W + 10) this.x = -10;
            if (this.y < -10) this.y = H + 10;
            if (this.y > H + 10) this.y = -10;
        }
        draw() {
            const pulseAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 85%, 60%, ${pulseAlpha})`;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 85%, 60%, ${pulseAlpha * 0.3})`;
            ctx.fill();
        }
    }

    const orbs = [
        { x: 0.15, y: 0.25, r: 280, color: 'rgba(255,140,58,0.06)' },
        { x: 0.85, y: 0.65, r: 320, color: 'rgba(255,180,80,0.05)' },
        { x: 0.5, y: 0.85, r: 240, color: 'rgba(230,115,41,0.05)' },
        { x: 0.7, y: 0.2, r: 200, color: 'rgba(255,168,102,0.04)' },
    ];

    function init() {
        particles = [];
        const particleCount = Math.min(150, Math.floor((W * H) / 8000));
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }

    resize();
    init();

    window.addEventListener('resize', () => { 
        resize(); 
        init(); 
    });

    let frameCount = 0;
    observeCanvasAndRun(canvas, () => {
        frameCount++;
        ctx.clearRect(0, 0, W, H);

        orbs.forEach((o, i) => {
            const time = Date.now() * 0.0005;
            const offsetX = Math.sin(time + i) * 20;
            const offsetY = Math.cos(time + i * 0.7) * 15;
            const grad = ctx.createRadialGradient(
                o.x * W + offsetX, o.y * H + offsetY, 0, 
                o.x * W + offsetX, o.y * H + offsetY, o.r
            );
            grad.addColorStop(0, o.color);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);
        });

        if (frameCount % 2 === 0) {
            particles.forEach(p => { p.update(); p.draw(); });
        } else {
            particles.forEach(p => p.draw());
        }

        if (frameCount % 3 === 0) {
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i += 2) {
                for (let j = i + 1; j < particles.length; j += 3) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255,140,58,${(1 - dist / 100) * 0.06})`;
                        ctx.stroke();
                    }
                }
            }
        }
    });
})();

(function initDimNeural() {
    const canvas = document.getElementById('dimNeuralCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], density = 1;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        build();
    }
    function build() {
        const c = Math.floor(26 * density);
        nodes = Array.from({ length: c }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
            r: Math.random() * 2 + 0.8, a: Math.random() * 0.6 + 0.2, p: Math.random() * Math.PI * 2
        }));
    }

    window.addEventListener('resize', resize);
    resize();

    observeCanvasAndRun(canvas, () => {
        ctx.clearRect(0, 0, W, H);
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy; n.p += 0.02;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy), maxD = 120 * density;
                if (d < maxD) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(168,85,247,${(1 - d / maxD) * 0.22})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
        nodes.forEach(n => {
            const a = n.a * (0.6 + 0.4 * Math.sin(n.p)) * density;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(196,160,255,${a})`;
            ctx.fill();
        });
    });

    window._dimNeuralDensity = (d) => { density = d; build(); };
})();

(function initDimPetals() {
    const canvas = document.getElementById('dimPetals');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, petals = [];
    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    function make() {
        return {
            x: Math.random() * W, y: Math.random() * H * -1,
            r: Math.random() * 5 + 2.5, vy: Math.random() * 0.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.5, rot: Math.random() * Math.PI * 2,
            rs: (Math.random() - 0.5) * 0.05, sway: Math.random() * Math.PI * 2,
            ss: Math.random() * 0.03 + 0.01, a: Math.random() * 0.5 + 0.3
        };
    }
    window.addEventListener('resize', resize);
    resize();
    petals = Array.from({ length: 30 }, make);

    observeCanvasAndRun(canvas, () => {
        ctx.clearRect(0, 0, W, H);
        petals.forEach(p => {
            p.sway += p.ss;
            p.x += p.vx + Math.sin(p.sway) * 0.4;
            p.y += p.vy;
            p.rot += p.rs;
            if (p.y > H + 10) Object.assign(p, make(), { y: -10 });
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = p.a;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,200,170,0.8)';
            ctx.fill();
            ctx.restore();
        });
    });
})();

const mainHeader = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        mainHeader.style.background = document.body.classList.contains('light')
            ? 'rgba(248,246,243,0.97)'
            : 'rgba(6,6,12,0.97)';
        mainHeader.style.boxShadow = '0 4px 40px rgba(0,0,0,0.4)';
    } else {
        mainHeader.style.background = '';
        mainHeader.style.boxShadow = '';
    }
}, { passive: true });

const burgerBtn  = document.getElementById('burgerBtn');
const mobileNav  = document.getElementById('mobileNav');
if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const observer  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

const ftabs   = document.querySelectorAll('.ftab');
const fpanels = document.querySelectorAll('.fpanel');

ftabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const idx = tab.dataset.tab;
        ftabs.forEach(t => t.classList.remove('active'));
        fpanels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.querySelector(`.fpanel[data-panel="${idx}"]`);
        if (panel) panel.classList.add('active');
    });
});

const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lbImg');
const lbClose    = document.getElementById('lbClose');
const lbBackdrop = document.getElementById('lbBackdrop');
const lbPrev     = document.getElementById('lbPrev');
const lbNext     = document.getElementById('lbNext');
const lbCaption  = document.getElementById('lbCaption');
const lbCounter  = document.getElementById('lbCounter');

let lbGallery = [];
let lbIndex = 0;

function buildLbGallery() {
    lbGallery = [];
    document.querySelectorAll('.sc-card[data-lightbox]').forEach(card => {
        const titleText = card.querySelector('.sc-title')?.textContent || '';
        const descText = card.querySelector('.sc-desc')?.textContent || '';
        
        const fullCaption = descText ? `${titleText} — ${descText}` : titleText;

        lbGallery.push({
            src: card.dataset.lightbox,
            cap: fullCaption
        });
    });
}

function openLightbox(src) {
    buildLbGallery();
    lbIndex = lbGallery.findIndex(item => item.src === src);
    if (lbIndex < 0) lbIndex = 0;
    renderLbSlide();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function renderLbSlide() {
    if (!lbGallery.length) return;
    const item = lbGallery[lbIndex];
    lbImg.src = item.src;
    if (lbCaption) lbCaption.textContent = item.cap;
    if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${lbGallery.length}`;
}

function lbNavigate(dir) {
    if (!lbGallery.length) return;
    lbIndex = (lbIndex + dir + lbGallery.length) % lbGallery.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
        renderLbSlide();
        lbImg.style.opacity = '1';
    }, 150);
}

document.querySelectorAll('[data-lightbox]').forEach(card => {
    card.addEventListener('click', () => openLightbox(card.dataset.lightbox));
});

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
}

if (lbClose)    lbClose.addEventListener('click', closeLightbox);
if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
if (lbPrev)     lbPrev.addEventListener('click', (e) => { e.stopPropagation(); lbNavigate(-1); });
if (lbNext)     lbNext.addEventListener('click', (e) => { e.stopPropagation(); lbNavigate(1); });

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  lbNavigate(-1);
    if (e.key === 'ArrowRight') lbNavigate(1);
});

(function initDimProgress() {
    const steps = document.querySelectorAll('.dp-step');
    const blocks = document.querySelectorAll('.dim-block');

    if (!steps.length || !blocks.length) return;

    const dimObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dim = entry.target.dataset.dim;
                const stepMap = { chat: 1, memory: 2, stage: 3, companion: 4 };
                const stepNum = stepMap[dim];
                steps.forEach(s => s.classList.remove('active'));
                const targetStep = document.querySelector(`.dp-step[data-step="${stepNum}"]`);
                if (targetStep) targetStep.classList.add('active');
            }
        });
    }, { rootMargin: '-30% 0px -55% 0px' });

    blocks.forEach(b => dimObserver.observe(b));

    steps.forEach(step => {
        step.style.cursor = 'pointer';
        step.addEventListener('click', () => {
            const dimMap = { 1: 'chat', 2: 'memory', 3: 'stage', 4: 'companion' };
            const targetDim = dimMap[step.dataset.step];
            const target = document.querySelector(`.dim-block[data-dim="${targetDim}"]`);
            if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset - 40;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
})();

const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
            const delay = siblings.indexOf(entry.target) * 100;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

const themeBtn  = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('sow-theme') || 'dark';
if (savedTheme === 'light') applyLight();

themeBtn && themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('sow-theme', isLight ? 'light' : 'dark');
    if (themeIcon) {
        themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }
});

function applyLight() {
    document.body.classList.add('light');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
}

(function initDimCompanion() {
    const clock = document.getElementById('dimClock');
    function tickClock() {
        if (!clock) return;
        const n = new Date();
        clock.textContent = `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`;
    }
    tickClock();
    setInterval(tickClock, 60000);
})();

(function initDimensionsBg() {
    const canvas = document.querySelector('.section-bg-dimensions');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], pulses = [];

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        W = canvas.width = rect.width;
        H = canvas.height = rect.height;
        build();
    }
    function build() {
        const target = Math.min(48, Math.floor((W * H) / 22000));
        nodes = Array.from({ length: target }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: Math.random() * 1.6 + 0.6,
            phase: Math.random() * Math.PI * 2
        }));
        pulses = [];
    }
    function spawnPulse() {
        if (!nodes.length) return;
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        let best = null, bestD = Infinity;
        for (const b of nodes) {
            if (b === a) continue;
            const dx = a.x - b.x, dy = a.y - b.y;
            const d = dx * dx + dy * dy;
            if (d < bestD && d < 240 * 240) { bestD = d; best = b; }
        }
        if (!best) return;
        pulses.push({ x: a.x, y: a.y, tx: best.x, ty: best.y, t: 0 });
    }
    window.addEventListener('resize', resize);
    resize();
    let frame = 0;
    observeCanvasAndRun(canvas, () => {
        ctx.clearRect(0, 0, W, H);
        frame++;
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy; n.phase += 0.02;
            if (n.x < -10) n.x = W + 10;
            if (n.x > W + 10) n.x = -10;
            if (n.y < -10) n.y = H + 10;
            if (n.y > H + 10) n.y = -10;
        });
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 200 * 200) {
                    const a = (1 - Math.sqrt(d2) / 200) * 0.10;
                    ctx.strokeStyle = `rgba(255,140,58,${a})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        nodes.forEach(n => {
            const glow = 0.5 + 0.5 * Math.sin(n.phase);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,140,58,${0.08 * glow})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,179,102,${0.55 * glow + 0.25})`;
            ctx.fill();
        });
        if (frame % 28 === 0) spawnPulse();
        pulses = pulses.filter(p => p.t < 1);
        pulses.forEach(p => {
            p.t += 0.035;
            const x = p.x + (p.tx - p.x) * p.t;
            const y = p.y + (p.ty - p.y) * p.t;
            const a = Math.sin(p.t * Math.PI);
            const grad = ctx.createLinearGradient(p.x, p.y, x, y);
            grad.addColorStop(0, 'rgba(255,168,102,0)');
            grad.addColorStop(1, `rgba(255,200,140,${0.6 * a})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, 2.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,210,160,${0.95 * a})`;
            ctx.fill();
        });
    });
})();

(function initFeaturesBg() {
    const canvas = document.querySelector('.section-bg-features');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, t = 0;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        W = canvas.width = rect.width;
        H = canvas.height = rect.height;
    }
    window.addEventListener('resize', resize);
    resize();

    observeCanvasAndRun(canvas, () => {
        ctx.clearRect(0, 0, W, H);
        t += 0.002;

        const bands = [
            { color: 'rgba(255,140,58,0.16)',  amp: 80,  freq: 0.004,  speed: 0.4,  yBase: 0.30, thickness: 60 },
            { color: 'rgba(255,168,102,0.14)', amp: 100, freq: 0.0035, speed: -0.28, yBase: 0.55, thickness: 70 },
            { color: 'rgba(168,85,247,0.08)',  amp: 60,  freq: 0.005,  speed: 0.2,  yBase: 0.75, thickness: 50 }
        ];

        bands.forEach((b, idx) => {
            ctx.beginPath();
            for (let x = 0; x <= W; x += 4) {
                const y = b.yBase * H +
                          Math.sin(x * b.freq + t * b.speed * 6) * b.amp +
                          Math.cos(x * b.freq * 1.7 + t * b.speed * 4) * b.amp * 0.4;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.lineTo(W, H);
            ctx.lineTo(0, H);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, b.yBase * H - b.thickness, 0, b.yBase * H + b.thickness);
            grad.addColorStop(0, b.color.replace(/[\d.]+\)$/, '0)'));
            grad.addColorStop(0.5, b.color);
            grad.addColorStop(1, b.color.replace(/[\d.]+\)$/, '0)'));
            ctx.fillStyle = grad;
            ctx.fill();
        });

        for (let i = 0; i < 18; i++) {
            const seedX = (i * 137) % W;
            const x = (seedX + t * 60 * (i % 2 ? 1 : -1)) % W;
            const phase = (i / 18) * Math.PI * 2 + t * 3;
            const y = (0.30 + 0.45 * Math.sin(i)) * H +
                      Math.sin(x * 0.004 + t * 6) * 80;
            const size = (Math.sin(phase) * 0.5 + 1) * 1.2;
            const col = i % 2 === 0 ? 'rgba(255,168,102,0.6)' : 'rgba(255,140,58,0.6)';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = col;
            ctx.fill();
        }
    });
})();

(function initScreenshotsBg() {
    const canvas = document.querySelector('.section-bg-screenshots');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, t = 0;
    let clouds = [], embers = [];

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        W = canvas.width = rect.width;
        H = canvas.height = rect.height;
        build();
    }
    function build() {
        const cloudCount = Math.max(4, Math.min(7, Math.floor(W / 240)));
        clouds = Array.from({ length: cloudCount }, (_, i) => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 180 + Math.random() * 220,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.06,
            hue: i % 3 === 0 ? 'orange' : (i % 3 === 1 ? 'amber' : 'purple'),
            phase: Math.random() * Math.PI * 2
        }));
        const emberCount = Math.min(40, Math.floor((W * H) / 18000));
        embers = Array.from({ length: emberCount }, () => spawnEmber(true));
    }
    function spawnEmber(initial) {
        return {
            x: Math.random() * W,
            y: initial ? Math.random() * H : H + 10,
            r: Math.random() * 1.2 + 0.4,
            vy: -(Math.random() * 0.25 + 0.08),
            vx: (Math.random() - 0.5) * 0.12,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.04 + 0.015,
            color: Math.random() > 0.7 ? 'amber' : 'orange'
        };
    }
    window.addEventListener('resize', resize);
    resize();

    observeCanvasAndRun(canvas, () => {
        ctx.clearRect(0, 0, W, H);
        t += 0.005;

        clouds.forEach(c => {
            c.x += c.vx;
            c.y += c.vy;
            c.phase += 0.004;
            if (c.x < -c.r) c.x = W + c.r;
            if (c.x > W + c.r) c.x = -c.r;
            if (c.y < -c.r) c.y = H + c.r;
            if (c.y > H + c.r) c.y = -c.r;

            const breath = 0.85 + 0.15 * Math.sin(c.phase);
            let coreColor, midColor;
            if (c.hue === 'orange') {
                coreColor = `rgba(255,140,58,${0.10 * breath})`;
                midColor  = `rgba(255,140,58,0)`;
            } else if (c.hue === 'amber') {
                coreColor = `rgba(255,168,102,${0.09 * breath})`;
                midColor  = `rgba(255,168,102,0)`;
            } else {
                coreColor = `rgba(168,85,247,${0.06 * breath})`;
                midColor  = `rgba(168,85,247,0)`;
            }
            const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
            grad.addColorStop(0, coreColor);
            grad.addColorStop(0.55, coreColor.replace(/[\d.]+\)$/, `${0.03 * breath})`));
            grad.addColorStop(1, midColor);
            ctx.fillStyle = grad;
            ctx.fillRect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
        });

        embers.forEach((e, idx) => {
            e.x += e.vx + Math.sin(e.phase) * 0.18;
            e.y += e.vy;
            e.phase += e.twinkleSpeed;
            if (e.y < -10) {
                embers[idx] = spawnEmber(false);
                return;
            }
            if (e.x < -10) e.x = W + 10;
            if (e.x > W + 10) e.x = -10;

            const tw = 0.35 + 0.65 * Math.abs(Math.sin(e.phase));
            const col = e.color === 'amber'
                ? `rgba(255,210,160,${tw * 0.85})`
                : `rgba(255,168,102,${tw * 0.7})`;
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = col.replace(/[\d.]+\)$/, `${tw * 0.12})`);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
            ctx.fillStyle = col;
            ctx.fill();
        });

        const vGrad = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.7);
        vGrad.addColorStop(0, 'transparent');
        vGrad.addColorStop(1, 'rgba(0,0,0,0.25)');
        ctx.fillStyle = vGrad;
        ctx.fillRect(0, 0, W, H);
    });
})();

(function initHistoryBg() {
    const canvas = document.querySelector('.section-bg-history');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], comet = null;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        W = canvas.width = rect.width;
        H = canvas.height = rect.height;
        build();
    }
    function build() {
        const count = Math.min(120, Math.floor((W * H) / 9000));
        stars = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.2 + 0.3,
            twinkle: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.04 + 0.01,
            color: Math.random() > 0.55 ? 'orange' : (Math.random() > 0.5 ? 'amber' : 'white')
        }));
    }
    function spawnComet() {
        const fromLeft = Math.random() > 0.5;
        comet = {
            x: fromLeft ? -50 : W + 50,
            y: Math.random() * H * 0.6,
            vx: fromLeft ? 2.2 + Math.random() * 1.5 : -(2.2 + Math.random() * 1.5),
            vy: 0.6 + Math.random() * 0.6,
            life: 1,
            trail: []
        };
    }
    window.addEventListener('resize', resize);
    resize();

    let frame = 0;
    observeCanvasAndRun(canvas, () => {
        ctx.clearRect(0, 0, W, H);
        frame++;
        stars.forEach(s => {
            s.twinkle += s.speed;
            const a = 0.3 + 0.6 * Math.abs(Math.sin(s.twinkle));
            let col;
            if (s.color === 'orange')      col = `rgba(255,168,102,${a * 0.7})`;
            else if (s.color === 'amber')  col = `rgba(255,210,160,${a * 0.7})`;
            else                           col = `rgba(248,247,245,${a * 0.5})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = col;
            ctx.fill();
            if (s.r > 0.9) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = col.replace(/[\d.]+\)$/, `${a * 0.15})`);
                ctx.fill();
            }
        });
        if (frame % 360 === 0 && !comet) spawnComet();
        if (comet) {
            comet.trail.unshift({ x: comet.x, y: comet.y });
            if (comet.trail.length > 24) comet.trail.pop();
            comet.x += comet.vx;
            comet.y += comet.vy;
            comet.trail.forEach((p, i) => {
                const a = (1 - i / comet.trail.length) * 0.6;
                const size = (1 - i / comet.trail.length) * 2.4;
                const col = i < comet.trail.length / 2
                    ? `rgba(255,210,160,${a})`
                    : `rgba(255,140,58,${a})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = col;
                ctx.fill();
            });
            const headGrad = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 8);
            headGrad.addColorStop(0, 'rgba(255,210,160,0.95)');
            headGrad.addColorStop(0.5, 'rgba(255,140,58,0.6)');
            headGrad.addColorStop(1, 'rgba(255,140,58,0)');
            ctx.fillStyle = headGrad;
            ctx.beginPath();
            ctx.arc(comet.x, comet.y, 8, 0, Math.PI * 2);
            ctx.fill();
            if (comet.x < -100 || comet.x > W + 100 || comet.y > H + 100) comet = null;
        }
    });
})();

(function initLiveStats() {
    const ghStarsEl = document.getElementById('ghStars');
    const discordCountEl = document.getElementById('discordCount');

    async function fetchGitHubStars() {
        if (!ghStarsEl) return;
        try {
            const res = await fetch('https://api.github.com/repos/jofizcd/Soul-of-Waifu');
            if (res.ok) {
                const data = await res.json();
                if (data.stargazers_count !== undefined) {
                    ghStarsEl.textContent = data.stargazers_count;
                }
            }
        } catch (e) {
            console.warn('Failed to fetch live GitHub stars, using fallback value.', e);
        }
    }

    async function fetchDiscordCount() {
        if (!discordCountEl) return;
        
        const inviteCode = '6vFtQGVfxM';
        const apiUrl = `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`;

        try {
            const res = await fetch(apiUrl);
            if (res.ok) {
                const data = await res.json();
                if (data.approximate_member_count) {
                    discordCountEl.textContent = `${data.approximate_member_count}`;
                }
            } else {
                throw new Error('Direct Discord API call returned non-OK status.');
            }
        } catch (e) {
            console.warn('Failed to fetch Discord members directly (possibly CORS), trying proxy...', e);
            
            try {
                const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(apiUrl);
                const proxyRes = await fetch(proxyUrl);
                if (proxyRes.ok) {
                    const proxyData = await proxyRes.json();
                    const data = JSON.parse(proxyData.contents);
                    if (data.approximate_member_count) {
                        discordCountEl.textContent = `${data.approximate_member_count}`;
                    }
                }
            } catch (proxyError) {
                console.warn('Discord CORS proxy also failed. Keeping static fallback.', proxyError);
            }
        }
    }

    fetchGitHubStars();
    fetchDiscordCount();
})();
