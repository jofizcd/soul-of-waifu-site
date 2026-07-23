(function () {
'use strict';

const NAV_CONFIG = [
    {
        groupKey: 'group_contents',
        items: [
            { id: 'overview',          icon: 'fa-book-open',   ru: 'Введение',                en: 'Introduction' },
            { id: 'installation',      icon: 'fa-download',    ru: 'Установка',                en: 'Installation' },
            { id: 'quick-start',       icon: 'fa-rocket',      ru: 'Быстрый старт',            en: 'Quick Start' },
            { id: 'character-creation',icon: 'fa-user-pen',    ru: 'Создание персонажей',      en: 'Character Creation' },
            { id: 'llm-setup',         icon: 'fa-microchip',   ru: 'Настройка моделей',        en: 'LLM Setup' },
            { id: 'tts',               icon: 'fa-microphone',  ru: 'Озвучка',                  en: 'Text-to-Speech' },
            { id: 'avatars',           icon: 'fa-image',       ru: 'Аватары персонажей',       en: 'Character Avatars' },
        ]
    },
    {
        groupKey: 'group_course',
        items: [
            { id: 'course-llm',          icon: 'fa-brain',        ru: 'Всё про LLM',          en: 'All About LLMs' },
            { id: 'course-persona',      icon: 'fa-mask',         ru: 'Персона',              en: 'Persona' },
            { id: 'course-system-prompt',icon: 'fa-terminal',     ru: 'Системный промпт',     en: 'System Prompt' },
            { id: 'course-lorebooks',    icon: 'fa-book-skull',   ru: 'Лорбуки',              en: 'Lorebooks' },
            { id: 'course-soul-memory', icon: 'fa-database',     ru: 'Soul Memory',         en: 'Soul Memory' },
            { id: 'course-soul-stage', icon: 'fa-solid fa-dice-d20',     ru: 'Soul Stage',         en: 'Soul Stage' },
            { id: 'course-soul-companion', icon: 'fa-solid fa-robot',     ru: 'Soul Companion',         en: 'Soul Companion' },
            { id: 'course-custom-variables',   icon: 'fa-solid fa-infinity', ru: 'Переменные и Состояния', en: 'Variables & State' },
            { id: 'course-sow-system',   icon: 'fa-wand-magic-sparkles', ru: 'Soul of Waifu System', en: 'Soul of Waifu System' },
            { id: 'course-web-server',   icon: 'fa-solid fa-server', ru: 'Веб Интерфейс', en: 'Web Interface' },
            { id: 'course-image-generation',   icon: 'fa-solid fa-image', ru: 'Генерация Изображения', en: 'Image Generation' },
            { id: 'course-discord-gateway',   icon: 'fa-brands fa-discord', ru: 'Discord Bot', en: 'Discord Bot' },
        ]
    },
    {
        groupKey: 'group_dev',
        items: [
            { id: 'community', icon: 'fa-users',         ru: 'Сообщество',       en: 'Community' },
            { id: 'support',   icon: 'fa-hand-holding-dollar', ru: 'Поддержать автора', en: 'Support the Author' },
        ]
    }
];

const FLAT_NAV = NAV_CONFIG.flatMap(g => g.items);

const I18N = {
    ru: {
        logo_docs: 'Документация',
        nav_download: 'Скачать',
        nav_features: 'Возможности',
        nav_home: 'Главная',
        nav_dimensions: 'Концепция',
        search_placeholder: 'Поиск в документации…',
        docs_root: 'Документация',
        edit_page: 'Редактировать',
        on_this_page: 'На этой странице',
        back_to_top: 'Наверх',
        loading: 'Загрузка документации…',
        error_title: 'Страница не найдена',
        error_desc: 'Не удалось загрузить страницу',
        error_suggest: 'Попробуйте вернуться к разделу',
        prev: 'Назад',
        next: 'Далее',
        group_contents: 'Содержание',
        group_course: 'Вводный курс в AI RP',
        group_dev: 'Развитие программы',
        footer_desc: 'Десктопное приложение для взаимодействия с AI-персонажами. Создавайте, настраивайте, общайтесь.',
        footer_nav: 'Навигация',
        footer_resources: 'Ресурсы',
        footer_community: 'Сообщество',
        footer_docs: 'Документация',
        footer_releases: 'Релизы',
        footer_copy: '© 2026 Soul of Waifu. Разработал Jofi.',
        page_next: 'Следующая страница',
        page_prev: 'Предыдущая страница',
    },
    en: {
        logo_docs: 'Documentation',
        nav_download: 'Download',
        nav_features: 'Features',
        nav_home: 'Home',
        nav_dimensions: 'Concept',
        search_placeholder: 'Search docs…',
        docs_root: 'Docs',
        edit_page: 'Edit',
        on_this_page: 'On this page',
        back_to_top: 'Back to top',
        loading: 'Loading documentation…',
        error_title: 'Page not found',
        error_desc: 'Could not load page',
        error_suggest: 'Try returning to the',
        prev: 'Previous',
        next: 'Next',
        group_contents: 'Contents',
        group_course: 'Intro to AI RP Course',
        group_dev: 'Program Support',
        footer_desc: 'Desktop app for interacting with AI characters. Create, customize and chat.',
        footer_nav: 'Navigation',
        footer_resources: 'Resources',
        footer_community: 'Community',
        footer_docs: 'Documentation',
        footer_releases: 'Releases',
        footer_copy: '© 2026 Soul of Waifu. Built by Jofi.',
        page_next: 'Next page',
        page_prev: 'Previous page',
    }
};

const state = {
    lang: localStorage.getItem('sow-docs-lang') || 'ru',
    theme: localStorage.getItem('sow-docs-theme') || 'dark',
    currentPage: null,
    cache: new Map(),
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || (I18N.en[key]) || key;
}

function findPage(id) {
    return FLAT_NAV.find(p => p.id === id);
}

function getPageTitle(id) {
    const p = findPage(id);
    return p ? p[state.lang] : id;
}

function renderSidebar() {
    const nav = $('#sidebarNav');
    nav.innerHTML = '';
    NAV_CONFIG.forEach(group => {
        const groupEl = document.createElement('div');
        groupEl.className = 'sidebar-group';

        const title = document.createElement('div');
        title.className = 'sidebar-group-title';
        title.textContent = t(group.groupKey);
        groupEl.appendChild(title);

        group.items.forEach(item => {
            const a = document.createElement('a');
            a.href = `#!/${item.id}`;
            a.className = 'sidebar-link';
            a.dataset.pageId = item.id;
            a.dataset.title = `${item.ru} ${item.en}`.toLowerCase();
            a.innerHTML = `<i class="fas ${item.icon}"></i><span>${item[state.lang]}</span>`;
            groupEl.appendChild(a);
        });
        nav.appendChild(groupEl);
    });
}

function highlightActiveSidebarLink(id) {
    $$('.sidebar-link').forEach(a => {
        a.classList.toggle('active', a.dataset.pageId === id);
    });
}

function initSidebarSearch() {
    const input = $('#sidebarSearch');
    if (!input) return;
    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        $$('.sidebar-link').forEach(a => {
            const match = !q || a.dataset.title.includes(q);
            a.classList.toggle('hidden', !match);
        });
        $$('.sidebar-group').forEach(g => {
            const hasVisible = g.querySelectorAll('.sidebar-link:not(.hidden)').length > 0;
            g.style.display = hasVisible ? '' : 'none';
        });
    });
}

function preprocessMarkdown(md) {
    md = md.replace(/\r\n/g, '\n');

    md = md.replace(/:::\s*(info|tip|warning|danger|note)\s*(?:\n((?:[^\n]*\n)*?)):::/gi, (m, type, body) => {
        type = type.toLowerCase();
        const titleMap = { info: 'Info', tip: 'Tip', warning: 'Warning', danger: 'Danger', note: 'Note' };
        const localizedTitle = localizedCalloutTitle(type) || titleMap[type];
        const inner = marked.parse(body || '');
        return `<div class="callout callout-${type}"><div class="callout-title">${localizedTitle}</div>${inner}</div>`;
    });

    md = md.replace(/:::\s*cards\s*(?:\n((?:[^\n]*\n)*?)):::/gi, (m, body) => {
        const cards = (body || '').split(/\n---\n/).map(cardMd => {
            const inner = marked.parse(cardMd.trim());
            return `<div class="card">${inner}</div>`;
        }).join('');
        return `<div class="card-grid">${cards}</div>`;
    });

    return md;
}

function localizedCalloutTitle(type) {
    const map = {
        ru: { info: 'Информация', tip: 'Совет', warning: 'Внимание', danger: 'Опасность', note: 'Заметка' },
        en: { info: 'Info', tip: 'Tip', warning: 'Warning', danger: 'Danger', note: 'Note' },
    };
    return (map[state.lang] && map[state.lang][type]) || null;
}

function configureMarked() {
    marked.setOptions({
        gfm: true,
        breaks: false,
        headerIds: true,
        headerPrefix: 'h-',
        mangle: false,
    });

    const renderer = new marked.Renderer();
    const origCode = renderer.code.bind(renderer);
    renderer.code = function (code, lang) {
        if (typeof code === 'object') {
            lang = code.lang;
            code = code.text;
        }
        let highlighted;
        try {
            if (lang && hljs.getLanguage(lang)) {
                highlighted = hljs.highlight(code, { language: lang }).value;
            } else {
                highlighted = hljs.highlightAuto(code).value;
            }
        } catch (e) {
            highlighted = escapeHtml(code);
        }
        const langLabel = lang ? lang.toLowerCase() : 'text';
        return `<pre data-lang="${langLabel}"><code class="hljs language-${langLabel}">${highlighted}</code></pre>`;
    };

    const origLink = renderer.link.bind(renderer);
    renderer.link = function (href, title, text) {
        if (typeof href === 'object') {
            text = href.text;
            title = href.title;
            href = href.href;
        }
        const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
        const isHash = href && href.startsWith('#');
        let html = origLink(href, title, text);
        if (isExternal) {
            html = html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
        }
        return html;
    };
    marked.use({ renderer });
}

function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]);
}

async function fetchMarkdown(lang, id) {
    const url = `content/${lang}/${id}.md`;
    const resp = await fetch(url, { cache: 'no-cache' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.text();
}

async function loadPage(id) {
    if (!findPage(id)) {
        renderNotFound(id);
        return;
    }

    state.currentPage = id;
    highlightActiveSidebarLink(id);
    updateBreadcrumb(id);
    updateEditLink(id);
    window.scrollTo({ top: 0, behavior: 'auto' });

    const contentEl = $('#docContent');
    contentEl.innerHTML = `<div class="doc-loading"><div class="loader-orb"></div><p>${t('loading')}</p></div>`;
    $('#docPagination').innerHTML = '';
    $('#tocList').innerHTML = '';

    const cacheKey = `${state.lang}:${id}`;
    try {
        let md;
        if (state.cache.has(cacheKey)) {
            md = state.cache.get(cacheKey);
        } else {
            md = await fetchMarkdown(state.lang, id);
            state.cache.set(cacheKey, md);
        }
        renderMarkdown(md, id);
        renderPagination(id);
        document.title = `${getPageTitle(id)} — Soul of Waifu ${t('logo_docs')}`;
    } catch (err) {
        console.error('[docs] loadPage error:', err);
        renderNotFound(id);
    }
}

function renderMarkdown(md, id) {
    const contentEl = $('#docContent');
    const preprocessed = preprocessMarkdown(md);
    let html = marked.parse(preprocessed);
    html = DOMPurify.sanitize(html, {
        ADD_ATTR: ['target', 'rel', 'class', 'id', 'data-lang'],
        ADD_TAGS: ['pre', 'code'],
    });
    contentEl.innerHTML = html;

    contentEl.querySelectorAll('pre code').forEach(b => {
        if (!b.classList.contains('hljs')) {
            try { hljs.highlightElement(b); } catch (e) {}
        }
    });

    contentEl.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        if (!h.id) {
            h.id = slugify(h.textContent);
        }
    });

    buildTOC(contentEl);

    contentEl.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = a.getAttribute('href');
            if (target.startsWith('#!/')) return;
            if (target.length < 2) return;
            const el = document.querySelector(target);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', target);
            }
        });
    });
}

function slugify(text) {
    return 'h-' + text.toString().toLowerCase()
        .replace(/[^\w\s\u0400-\u04ff-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

function buildTOC(root) {
    const tocList = $('#tocList');
    tocList.innerHTML = '';
    const headings = root.querySelectorAll('h2, h3');
    if (headings.length === 0) {
        $('#docToc').style.display = 'none';
        return;
    }
    $('#docToc').style.display = '';
    headings.forEach(h => {
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.textContent = h.textContent;
        a.className = `toc-${h.tagName.toLowerCase()}`;
        a.dataset.targetId = h.id;
        tocList.appendChild(a);
    });
    initTocScrollSpy();
}

let scrollSpyRaf = null;
function initTocScrollSpy() {
    const links = $$('#tocList a');
    if (links.length === 0) return;
    const targets = links.map(a => document.getElementById(a.dataset.targetId)).filter(Boolean);

    function update() {
        if (!targets.length) { scrollSpyRaf = null; return; }
        const vh = window.innerHeight;
        const triggerY = Math.max(140, vh * 0.33);
        let activeIdx = 0;
        for (let i = 0; i < targets.length; i++) {
            const rect = targets[i].getBoundingClientRect();
            if (rect.top - triggerY <= 0) activeIdx = i;
            else break;
        }
        const scrollBottom = window.scrollY + window.innerHeight;
        if (scrollBottom >= document.body.scrollHeight - 80) {
            activeIdx = targets.length - 1;
        }
        links.forEach((a, i) => {
            a.classList.toggle('active', i === activeIdx);
        });
        scrollSpyRaf = null;
    }
    window.addEventListener('scroll', () => {
        if (!scrollSpyRaf) scrollSpyRaf = requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', () => {
        if (!scrollSpyRaf) scrollSpyRaf = requestAnimationFrame(update);
    }, { passive: true });
    update();
}

function updateBreadcrumb(id) {
    $('#crumbCurrent').textContent = getPageTitle(id);
}
function updateEditLink(id) {
    const REPO_BASE = 'https://github.com/jofizcd/Soul-of-Waifu';
    const BRANCH = 'main';
    const editUrl = `${REPO_BASE}/edit/${BRANCH}/docs/content/${state.lang}/${id}.md`;
    $('#editLink').href = editUrl;
}

function renderPagination(id) {
    const idx = FLAT_NAV.findIndex(p => p.id === id);
    if (idx < 0) return;
    const prev = idx > 0 ? FLAT_NAV[idx - 1] : null;
    const next = idx < FLAT_NAV.length - 1 ? FLAT_NAV[idx + 1] : null;

    const pag = $('#docPagination');
    pag.innerHTML = '';
    if (prev) {
        const a = document.createElement('a');
        a.href = `#!/${prev.id}`;
        a.className = 'pagelink pagelink-prev';
        a.innerHTML = `
            <span class="pagelink-label"><i class="fas fa-arrow-left"></i> ${t('prev')}</span>
            <span class="pagelink-title">${prev[state.lang]}</span>`;
        pag.appendChild(a);
    }
    if (next) {
        const a = document.createElement('a');
        a.href = `#!/${next.id}`;
        a.className = 'pagelink pagelink-next';
        a.innerHTML = `
            <span class="pagelink-label">${t('next')} <i class="fas fa-arrow-right"></i></span>
            <span class="pagelink-title">${next[state.lang]}</span>`;
        pag.appendChild(a);
    }
}

function renderNotFound(id) {
    const contentEl = $('#docContent');
    contentEl.innerHTML = `
        <div class="doc-error">
            <div class="err-icon"><i class="fas fa-ghost"></i></div>
            <h2>${t('error_title')}</h2>
            <p>${t('error_desc')} <code>${escapeHtml(id || '')}</code></p>
            <p>${t('error_suggest')} <a href="#!/overview">${getPageTitle('overview')}</a></p>
        </div>`;
    $('#docPagination').innerHTML = '';
    $('#tocList').innerHTML = '';
    $('#docToc').style.display = 'none';
}

function parseRoute() {
    const h = location.hash || '';
    if (h.startsWith('#!/')) {
        const m = h.match(/^#!\/([\w-]+)/);
        return m ? m[1] : 'overview';
    }
    if (h.startsWith('#')) {
        return null;
    } 
    return 'overview';
}

function onHashChange() {
    const id = parseRoute();
    if (id === null) return;
    if (id !== state.currentPage) {
        loadPage(id);
        closeMobileSidebar();
    }
}

function applyTheme(theme) {
    state.theme = theme;
    document.body.classList.toggle('light', theme === 'light');
    const icon = $('#themeIcon');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
    localStorage.setItem('sow-docs-theme', theme);
}

function initTheme() {
    applyTheme(state.theme);
    $('#themeBtn').addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
}

function applyLanguage(lang) {
    state.lang = (lang === 'en') ? 'en' : 'ru';
    document.documentElement.lang = state.lang;
    const btn = $('#langBtn');
    if (btn) btn.textContent = state.lang.toUpperCase();

    $$('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (I18N[state.lang][key] !== undefined) {
            el.textContent = I18N[state.lang][key];
        }
    });
    $$('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (I18N[state.lang][key] !== undefined) {
            el.setAttribute('placeholder', I18N[state.lang][key]);
        }
    });

    localStorage.setItem('sow-docs-lang', state.lang);
}

function initLanguage() {
    applyLanguage(state.lang);
    $('#langBtn').addEventListener('click', () => {
        const next = state.lang === 'ru' ? 'en' : 'ru';
        applyLanguage(next);
        renderSidebar();
        state.cache.clear();
        loadPage(state.currentPage || parseRoute());
    });
}

function openMobileSidebar() {
    $('#docSidebar').classList.add('open');
    $('#sidebarBackdrop').classList.add('show');
    document.body.style.overflow = 'hidden';
}
function closeMobileSidebar() {
    $('#docSidebar').classList.remove('open');
    $('#sidebarBackdrop').classList.remove('show');
    document.body.style.overflow = '';
}
function initMobileSidebar() {
    $('#sidebarToggle').addEventListener('click', openMobileSidebar);
    $('#sidebarBackdrop').addEventListener('click', closeMobileSidebar);
    const closeBtn = $('#sidebarClose');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileSidebar);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMobileSidebar();
    });
}

function init() {
    configureMarked();
    initTheme();
    applyLanguage(state.lang);
    renderSidebar();
    initSidebarSearch();
    initLanguage();
    initMobileSidebar();

    window.addEventListener('hashchange', onHashChange);

    const id = parseRoute() || 'overview';
    loadPage(id);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

})();
