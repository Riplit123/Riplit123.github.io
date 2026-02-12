// ========== ДАННЫЕ ПРОЕКТОВ ==========
// Редактируйте этот массив — добавляйте свои проекты
const projectsData = [
    {
        id: 1,
        title: "Космический шутер",
        shortDesc: "2D аркада, 5 уровней, боссы, система апгрейдов",
        fullDesc: "Мой первый серьёзный проект на Unity. Релиз на Itch.io, ~500 загрузок. Научился работать с физикой, корутинами и пулом объектов.",
        thumbnail: "images/thumbnails/space-shooter.jpg", // замените на свой путь
        screenshots: [
            "images/screenshots/space-shooter/01.jpg",
            "images/screenshots/space-shooter/02.jpg",
            "images/screenshots/space-shooter/03.jpg"
        ],
        video: "", // оставьте пустым или укажите путь к .mp4
        links: {
            itch: "https://itch.io/your-game",
            github: "https://github.com/yourusername/space-shooter",
            gameplay: "https://youtu.be/example"
        }
    },
    {
        id: 2,
        title: "Лабиринт страха",
        shortDesc: "3D хоррор-головоломка с видом от первого лица",
        fullDesc: "Сделано за 72 часа на геймджеме. Тема — «темнота». Использовал Godot 4, модели в Blender. Занял 14 место.",
        thumbnail: "images/thumbnails/maze-of-fear.jpg",
        screenshots: [
            "images/screenshots/maze-of-fear/01.jpg",
            "images/screenshots/maze-of-fear/02.jpg"
        ],
        video: "",
        links: {
            itch: "https://itch.io/your-game",
            github: "https://github.com/yourusername/maze-of-fear"
        }
    },
    {
        id: 3,
        title: "Пиксельная ферма",
        shortDesc: "Тайкун про выращивание кристаллов (мобильная версия)",
        fullDesc: "Прототип для Android. Сделал инвентарь, сохранения, простой AI для монстров. Сейчас в работе.",
        thumbnail: "images/thumbnails/pixel-farm.jpg",
        screenshots: [
            "images/screenshots/pixel-farm/01.jpg",
            "images/screenshots/pixel-farm/02.jpg"
        ],
        video: "",
        links: {
            github: "https://github.com/yourusername/pixel-farm"
        }
    }
];

// ========== РЕНДЕРИНГ КАРТОЧЕК ==========
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = projectsData.map(project => `
        <div class="project-card" onclick="openModal(${project.id})">
            <img src="${project.thumbnail}" alt="${project.title}" class="project-thumb" loading="lazy">
            <div class="project-info">
                <div class="project-title">${project.title}</div>
                <div class="project-short-desc">${project.shortDesc}</div>
            </div>
        </div>
    `).join('');
}

// ========== ОТКРЫТИЕ МОДАЛКИ ==========
window.openModal = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    // Медиа-блок
    let mediaHTML = '';
    project.screenshots.forEach(src => {
        mediaHTML += `<img src="${src}" alt="screenshot" loading="lazy">`;
    });
    if (project.video) {
        mediaHTML += `
            <video controls>
                <source src="${project.video}" type="video/mp4">
                Ваш браузер не поддерживает видео.
            </video>
        `;
    }

    // Ссылки
    let linksHTML = '';
    if (project.links.itch) linksHTML += `<a href="${project.links.itch}" target="_blank" class="modal-link">Itch.io</a>`;
    if (project.links.github) linksHTML += `<a href="${project.links.github}" target="_blank" class="modal-link">GitHub</a>`;
    if (project.links.gameplay) linksHTML += `<a href="${project.links.gameplay}" target="_blank" class="modal-link">Геймплей</a>`;

    const modalContent = `
        <h3 class="modal-title">${project.title}</h3>
        <div class="modal-desc">${project.fullDesc}</div>
        <div class="modal-media">${mediaHTML}</div>
        <div class="modal-meta">${linksHTML}</div>
    `;

    document.getElementById('modalDynamicContent').innerHTML = modalContent;
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

// ========== ЗАКРЫТИЕ МОДАЛКИ ==========
function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ========== ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ ==========
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();

    // Закрытие по крестику
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);

    // Закрытие по клику вне контента
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие по ESC
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Плавный скролл для навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});