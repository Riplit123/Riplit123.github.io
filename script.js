// ========== ДАННЫЕ ПРОЕКТОВ (6 штук) ==========
const projectsData = [
    {
        id: 1,
        title: "Проект 6",
        shortDesc: "Командная стратегическая игра Экспериментариум",
        fullDesc: "",
        thumbnail: "images/thumbnails/space-shooter.jpg",
        screenshots: [
            "images/screenshots/space-shooter/01.jpg",
            "images/screenshots/space-shooter/02.jpg",
            "images/screenshots/space-shooter/03.jpg"
        ],
        video: "",
        links: {
            itch: "https://itch.io/your-game",
            github: "https://github.com/yourusername/space-shooter",
            gameplay: "https://youtu.be/example"
        }
    },
    {
        id: 2,
        title: "Проект 5",
        shortDesc: "Командная стратегическая игра для маленьких детей Лабораторная битва",
        fullDesc: "",
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
        title: "Проект 4",
        shortDesc: "Командная стратегическая игра Алхимическая битва",
        fullDesc: "",
        thumbnail: "images/thumbnails/pixel-farm.jpg",
        screenshots: [
            "images/screenshots/pixel-farm/01.jpg",
            "images/screenshots/pixel-farm/02.jpg"
        ],
        video: "",
        links: {
            github: "https://github.com/yourusername/pixel-farm"
        }
    },
    {
        id: 4,
        title: "Проект 3",
        shortDesc: "Мини игра по уборке комнаты",
        fullDesc: "Развивающая игра для детей по уброке мусора в команатах",
        thumbnail: "images/thumbnails/rhythm-brawler.jpg",
        screenshots: [
            "images/screenshots/rhythm-brawler/01.jpg",
            "images/screenshots/rhythm-brawler/02.jpg"
        ],
        video: "",
        links: {
            itch: "https://itch.io/your-game",
            github: "https://github.com/yourusername/rhythm-brawler"
        }
    },
    {
        id: 5,
        title: "Проект 2",
        shortDesc: "Обучающее приложение",
        fullDesc: "Обучющее профориентационное приложение",
        thumbnail: "images/thumbnails/gravity-shift.jpg",
        screenshots: [
            "images/screenshots/gravity-shift/01.jpg",
            "images/screenshots/gravity-shift/02.jpg",
            "images/screenshots/gravity-shift/03.jpg"
        ],
        video: "",
        links: {
            github: "https://github.com/yourusername/gravity-shift"
        }
    },
    {
        id: 6,
        title: "Проект 1",
        shortDesc: "Интерактивная карта России",
        fullDesc: "Интерактивная карта России с регионами участниками фестиваля Технострелка",
        thumbnail: "images/thumbnails/card-dungeon.jpg",
        screenshots: [
            "images/screenshots/card-dungeon/01.jpg",
            "images/screenshots/card-dungeon/02.jpg"
        ],
        video: "",
        links: {
            itch: "https://itch.io/your-game"
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

    // ========== КОПИРОВАНИЕ КОНТАКТОВ ==========
    const copyIcons = document.querySelectorAll('.copy-icon');
    copyIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const textToCopy = this.dataset.copy;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Создаём всплывающую подсказку
                const tooltip = document.createElement('div');
                tooltip.className = 'copy-tooltip';
                tooltip.textContent = 'Скопировано!';
                document.body.appendChild(tooltip);
                
                // Позиционируем возле курсора
                const x = e.clientX;
                const y = e.clientY;
                tooltip.style.left = x + 'px';
                tooltip.style.top = (y - 40) + 'px';
                
                // Удаляем через 1.5 секунды
                setTimeout(() => {
                    tooltip.remove();
                }, 1500);
            }).catch(err => {
                console.error('Ошибка копирования:', err);
            });
        });
    });
});

