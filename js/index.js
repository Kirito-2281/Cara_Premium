document.addEventListener('DOMContentLoaded', function() {
// Элементы карусели
const photos = document.querySelector('.photos');
const rounds = document.querySelectorAll('.round');
const descriptions = document.querySelectorAll('.desc');
            
// Элементы поиска
const modelSelect = document.getElementById('modelSelect');
const colorSelect = document.getElementById('colorSelect');
const priceSelect = document.getElementById('priceSelect');
const searchButton = document.getElementById('searchButton');
const searchStatus = document.getElementById('searchStatus');
            
// Данные для карусели
const carData = [
                {
        img: '/img/photo1.jpg',
        name: 'Aventador SVJ',
        price: '25 000 000₽',
        desc: 'Эксклюзивный гиперкар с двигателем V12 мощностью 770 л.с. и уникальным аэродинамическим дизайном. Максимальная скорость - 350 км/ч, разгон до 100 км/ч за 2.8 секунды.'
    },
    {
        img: '/img/photo2.jpg',
        name: 'Huracán EVO',
        price: '18 500 000₽',
        desc: 'Спорткар с двигателем V10 5.2 л, 640 л.с. Система полного привода и адаптивная подвеска. Цифровая приборная панель и продвинутые системы помощи водителю.'
    },
    {
        img: '/img/photo3.jpg',
        name: 'Urus S',
        price: '22 000 000₽',
        desc: 'Первый в мире супер-внедорожник. Двигатель V8 twin-turbo, 666 л.с. Сочетание комфорта, роскоши и экстремальной производительности. Вместимость до 5 пассажиров.'
    }
];
            
let currentSlide = 0;
            
// Функция обновления карусели
function updateCarousel() {
    // Обновляем положение фотографий
    photos.style.transform = `translateX(-${currentSlide * 25}%)`;
                
    // Обновляем активный круг
    rounds.forEach((round, index) => {
        round.classList.toggle('active', index === currentSlide);
    });
                
    // Обновляем описание
    descriptions.forEach((desc, index) => {
        desc.classList.toggle('d-none', index !== currentSlide);
    });
}
            
// Обработчики для кругов
rounds.forEach((round, index) => {
    round.addEventListener('click', function() {
        currentSlide = index;
        updateCarousel();
    });
});
            
// Автопрокрутка карусели
let carouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    updateCarousel();
}, 5000);
            
// Останавливаем автопрокрутку при наведении
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});
            
carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % 3;
        updateCarousel();
    }, 5000);
});
            
// Функция обновления состояния кнопки поиска
function updateSearchButton() {
    const hasSelection = modelSelect.value || colorSelect.value || priceSelect.value;
                
    if (hasSelection) {
        searchButton.disabled = false;
        searchButton.style.opacity = '1';
        searchButton.style.cursor = 'pointer';
                    
        // Обновляем текст кнопки в зависимости от выбора
        let buttonText = 'НАЙТИ АВТОМОБИЛЬ';
                    
        if (modelSelect.value) {
            const modelText = modelSelect.options[modelSelect.selectedIndex].text;
            searchStatus.textContent = `Модель: ${modelText.split(' (')[0]}`;
        } else if (colorSelect.value) {
            const colorText = colorSelect.options[colorSelect.selectedIndex].text;
            searchStatus.textContent = `Цвет: ${colorText.split(' (')[0]}`;
        } else if (priceSelect.value) {
            const priceText = priceSelect.options[priceSelect.selectedIndex].text;
            searchStatus.textContent = `Цена: ${priceText}`;
        }
    } else {
        searchButton.disabled = true;
        searchButton.style.opacity = '0.7';
        searchButton.style.cursor = 'not-allowed';
        searchStatus.textContent = 'Выберите параметры поиска';
    }
}
            
// Подсветка активных фильтров
function highlightActiveFilters() {
    [modelSelect, colorSelect, priceSelect].forEach(select => {
        if (select.value) {
            select.classList.add('filter-active');
        } else {
            select.classList.remove('filter-active');
        }
    });
    }
            
// Инициализация кнопки поиска
updateSearchButton();
            
// Обработчики изменения выбора
modelSelect.addEventListener('change', function() {
    updateSearchButton();
    highlightActiveFilters();
});
            
colorSelect.addEventListener('change', function() {
    updateSearchButton();
    highlightActiveFilters();
});
            
priceSelect.addEventListener('change', function() {
    updateSearchButton();
    highlightActiveFilters();
});
            
// Обработчик кнопки поиска
searchButton.addEventListener('click', function() {
    if (this.disabled) return;
                
    // Сохраняем оригинальный текст
    const originalText = this.innerHTML;
                
    // Показываем анимацию загрузки
    this.classList.add('loading');
    this.disabled = true;
                
    // Имитация поиска
    searchStatus.textContent = 'Ищем подходящие автомобили...';
                
    // Через 2 секунды показываем результат
    setTimeout(() => {
        const selectedFilters = [];
                    
        if (modelSelect.value) {
            selectedFilters.push(modelSelect.options[modelSelect.selectedIndex].text);
        }
        if (colorSelect.value) {
            selectedFilters.push(colorSelect.options[colorSelect.selectedIndex].text);
        }
        if (priceSelect.value) {
            selectedFilters.push(priceSelect.options[priceSelect.selectedIndex].text);
        }
                    
        // Сбрасываем анимацию
        this.classList.remove('loading');
        this.innerHTML = originalText;
                    
        // Показываем результат
        const filterText = selectedFilters.join(', ');
        searchStatus.textContent = `Найдено 3 автомобиля по фильтрам: ${filterText}`;
                    
        // В реальном приложении здесь был бы редирект на страницу с результатами
        // Например: window.location.href = `car.html?model=${modelSelect.value}&color=${colorSelect.value}&price=${priceSelect.value}`;
                    
        // Активируем кнопку обратно через 3 секунды
        setTimeout(() => {
            this.disabled = false;
            updateSearchButton();
        }, 3000);
                    
    }, 2000);
});
            
// Сброс фильтров при двойном клике на статус
searchStatus.addEventListener('dblclick', function() {
    modelSelect.value = '';
    colorSelect.value = '';
    priceSelect.value = '';
    updateSearchButton();
    highlightActiveFilters();
    this.textContent = 'Фильтры сброшены';
});
            
// Плавный скролл для ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
                    
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
                    
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
            
// Анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
            
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
            
// Наблюдаем за блоками
document.querySelectorAll('.block').forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(20px)';
    block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(block);
});});