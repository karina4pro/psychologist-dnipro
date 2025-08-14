function getHeaderHTML(currentPage = '') {
    return `<header class="fixed-header">
        <div class="container flex justify-between items-center py-4">
            <a href="/" class="text-2xl font-bold text-white hover:text-gray-300">Ψ</a>
            <div class="flex items-center">
                <a href="tel:380506191220" class="btn btn-secondary btn-icon flex" onclick="fbq('track', 'Lead');">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    &nbsp; 050 619 12 20
                </a>
                <button id="menu-toggle" class="p-2 ml-2 w-10 h-10 rounded-md bg-primary-dark hover:bg-primary-light text-white flex items-center justify-center">
                    ☰
                </button>
            </div>
        </div>
        <nav id="mobile-menu">
            <div class="flex flex-col items-center py-6">
                <div class="mb-6 w-full">
                    <div class="flex flex-col items-center space-y-6 py-4">
                        <a href="https://www.karina-psychologist.com/" class="text-white text-lg hover:text-neutral-light">Главная</a>
                        <a href="#about" class="text-white text-lg hover:text-neutral-light">Обо мне</a>
                        <a href="#services" class="text-white text-lg hover:text-neutral-light">Услуги</a>
                        <a href="#reviews" class="text-white text-lg hover:text-neutral-light">Отзывы</a>
                        <a href="blog.html" class="text-white text-lg hover:text-neutral-light">Блог</a>
                        <a href="#contacts" class="text-white text-lg hover:text-neutral-light">Контакты</a>
                    </div>
                </div>
                <div class="w-3/4 h-px bg-white bg-opacity-10 my-4"></div>
                <div class="flex justify-center space-x-6 my-6">
                    <a href="https://t.me/+m6AvyfgL3H0zYWFi" target="_blank" rel="noopener noreferrer" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </a>
                    <a href="https://www.instagram.com/karina.varganova4/" target="_blank" rel="noopener noreferrer" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href="https://www.youtube.com/channel/UCWQYYpjSpWn2703KRj8tM0w" target="_blank" rel="noopener noreferrer" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                    </a>
                </div>
                <div class="w-3/4 h-px bg-white bg-opacity-10 my-4"></div>
                <div class="flex flex-col items-center space-y-4 mt-4">
                    <a href="tel:380506191220" class="btn btn-secondary btn-icon w-full sm:w-64">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        050 619 12 20
                    </a>
                    <a href="https://t.me/karinavarganova" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-icon w-full sm:w-64">
                        <img src="images/telegram.svg" alt="Telegram" class="mr-2 w-5 h-5">
                        Написать в телеграм
                    </a>
                </div>
            </div>
        </nav>
    </header>`;
}