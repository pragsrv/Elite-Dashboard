// In-memory storage for tasks and images
let tasks = [];
let images = [];
let taskIdCounter = 0;

// Todo List Functions
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;
    
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        taskList.appendChild(taskItem);
    });
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}

// Weather Functions
const WEATHER_API_KEY = 'HdQOWWugTsvQCrtut3pS-fdnj50nweiYtVPlPoEdKM07Zvsuzd'; // Your provided API key

async function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const cityName = locationInput.value.trim();
    
    if (!cityName) {
        alert('Please enter a city name');
        return;
    }
    
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '<div class="loading">Loading weather data</div>';
    
    try {
        // First, search for the city
        const citySearchResponse = await searchCity(cityName);
        
        if (!citySearchResponse || citySearchResponse.length === 0) {
            throw new Error(`City "${cityName}" not found`);
        }
        
        // Use the first search result
        const cityData = citySearchResponse[0];
        
        // Get weather data for the city
        const weatherData = await getWeatherData(cityData);
        
        displayWeather(weatherData);
        
    } catch (error) {
        console.error('Weather API Error:', error);
        
        // Fallback to mock data
        const mockWeatherData = {
            location: cityName,
            temperature: Math.round(Math.random() * 30 + 5), // Random temp between 5-35°C
            condition: ['sunny', 'cloudy', 'partly cloudy', 'rainy'][Math.floor(Math.random() * 4)],
            humidity: Math.round(Math.random() * 40 + 40), // 40-80%
            windSpeed: Math.round(Math.random() * 15 + 5), // 5-20 km/h
            pressure: Math.round(Math.random() * 50 + 1000), // 1000-1050 hPa
            icon: null
        };
        
        displayWeather(mockWeatherData);
        
        // Show a subtle notice about using mock data
        setTimeout(() => {
            const weatherInfo = document.getElementById('weatherInfo');
            const notice = document.createElement('div');
            notice.style.cssText = 'font-size: 10px; color: #999; margin-top: 10px; font-style: italic;';
            notice.textContent = 'Using sample data - API connection issue';
            weatherInfo.appendChild(notice);
        }, 100);
    }
}

async function searchCity(cityName) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("accept-language", "en-US,en;q=0.9");
    myHeaders.append("origin", "https://edition.cnn.com");
    myHeaders.append("priority", "u=1, i");
    myHeaders.append("referer", "https://edition.cnn.com/");
    myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "cross-site");
    myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
    myHeaders.append("x-apihub-key", WEATHER_API_KEY);
    myHeaders.append("x-apihub-host", "Weather-API.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "175f72ec-0ec4-4986-bbc6-b098d29b8200");
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };
    
    const response = await fetch(
        `https://Weather-API.proxy-production.allthingsdev.co/weather/citySearch?search_term=${encodeURIComponent(cityName)}`,
        requestOptions
    );
    
    if (!response.ok) {
        throw new Error(`City search failed: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
}

async function getWeatherData(cityData) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("accept-language", "en-US,en;q=0.9");
    myHeaders.append("origin", "https://edition.cnn.com");
    myHeaders.append("priority", "u=1, i");
    myHeaders.append("referer", "https://edition.cnn.com/");
    myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "cross-site");
    myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
    myHeaders.append("x-apihub-key", WEATHER_API_KEY);
    myHeaders.append("x-apihub-host", "Weather-API.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "175f72ec-0ec4-4986-bbc6-b098d29b8200");
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };
    
    // Try to get current weather - this endpoint might need to be adjusted based on API documentation
    const response = await fetch(
        `https://Weather-API.proxy-production.allthingsdev.co/weather/current?location=${encodeURIComponent(cityData.name || cityData.city || cityData.location)}`,
        requestOptions
    );
    
    if (!response.ok) {
        throw new Error(`Weather data fetch failed: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Transform API response to our expected format
    return {
        location: cityData.name || cityData.city || cityData.location,
        temperature: Math.round(result.temperature || result.temp || result.current?.temp_c || 20),
        condition: result.condition || result.weather_description || result.current?.condition?.text || 'Unknown',
        humidity: result.humidity || result.current?.humidity || 50,
        windSpeed: Math.round((result.wind_speed || result.current?.wind_kph || 10)),
        pressure: result.pressure || result.current?.pressure_mb || 1013,
        icon: null
    };
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherIcon = data.icon ? 
        `<img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.condition}" style="width: 80px; height: 80px;">` :
        `<i class="fas fa-cloud-sun" style="font-size: 48px; color: #667eea; margin: 10px 0;"></i>`;
    
    weatherInfo.innerHTML = `
        <div class="weather-location">${data.location}</div>
        ${weatherIcon}
        <div class="weather-temp">${data.temperature}°C</div>
        <div class="weather-condition">${data.condition}</div>
        <div class="weather-details">
            <div class="weather-detail">
                <i class="fas fa-tint"></i>
                <span>Humidity</span>
                <strong>${data.humidity}%</strong>
            </div>
            <div class="weather-detail">
                <i class="fas fa-wind"></i>
                <span>Wind</span>
                <strong>${data.windSpeed} km/h</strong>
            </div>
            <div class="weather-detail">
                <i class="fas fa-thermometer-half"></i>
                <span>Pressure</span>
                <strong>${data.pressure} hPa</strong>
            </div>
        </div>
    `;
}

// News Functions
async function loadNews() {
    const NEWS_API_KEY = '6a64cd14686744c8b90d9978c3279565'; // <-- Replace with your NewsAPI.org API key
    const country = 'us'; // You can change this to your preferred country code
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=8&apiKey=${NEWS_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.status !== 'ok' || !data.articles) {
            throw new Error('Invalid news data');
        }
        displayNews(data.articles);
    } catch (error) {
        document.getElementById('newsList').innerHTML = `
            <div style="color: #e53e3e; text-align: center;">
                <i class="fas fa-exclamation-triangle"></i>
                Unable to load news
            </div>
        `;
    }
}

function displayNews(articles) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';
    
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-title">${article.title}</div>
            <a href="${article.url}" class="news-link" target="_blank">Read more</a>
        `;
        newsList.appendChild(newsItem);
    });
}

// Image Gallery Functions
function uploadImages(event) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = {
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    name: file.name
                };
                images.push(imageData);
                renderImages();
            };
            reader.readAsDataURL(file);
        }
    });
}

function renderImages() {
    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = '';
    
    images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.innerHTML = `
            <img src="${image.src}" alt="${image.name}">
            <button class="image-delete" data-image-id="${image.id}">×</button>
        `;
        // Add event listener for delete button
        imageItem.querySelector('.image-delete').addEventListener('click', function(e) {
            const imgId = this.getAttribute('data-image-id');
            deleteImage(imgId);
        });
        imageGrid.appendChild(imageItem);
    });
}

function deleteImage(imageId) {
    images = images.filter(img => String(img.id) !== String(imageId));
    renderImages();
}

// Calculator Functions
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    const display = document.getElementById('calcDisplay');
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput === '') return;
        if (previousInput !== '' && operator !== '') {
            calculateResult();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    } else {
        currentInput += value;
    }
    
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('calcDisplay');
    if (currentInput !== '') {
        display.value = currentInput;
    } else if (previousInput !== '') {
        display.value = previousInput;
    } else {
        display.value = '0';
    }
}

function calculateResult() {
    if (previousInput === '' || currentInput === '' || operator === '') return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    previousInput = '';
    operator = '';
    updateDisplay();
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    document.getElementById('calcDisplay').value = '0';
}

function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

// Random Quotes Functions
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" }
];

function loadNewQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
}

// Currency Converter Functions
let exchangeRates = {};

async function loadExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        exchangeRates = data.rates;
        convertCurrency();
    } catch (error) {
        console.error('Error loading exchange rates:', error);
        // Fallback rates
        exchangeRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73,
            JPY: 110,
            CAD: 1.25,
            AUD: 1.35,
            CHF: 0.92,
            CNY: 6.45,
            INR: 74.5
        };
        convertCurrency();
    }
}

function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const fromAmount = parseFloat(document.getElementById('fromAmount').value);
    
    if (isNaN(fromAmount) || fromAmount <= 0) {
        document.getElementById('toAmount').value = '';
        document.getElementById('currencyResult').textContent = 'Enter amount to convert';
        return;
    }
    
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    
    const convertedAmount = (fromAmount / fromRate) * toRate;
    
    document.getElementById('toAmount').value = convertedAmount.toFixed(2);
    document.getElementById('currencyResult').textContent = 
        `${fromAmount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    convertCurrency();
}

// Pomodoro Timer Functions
let timerInterval;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds
let currentMode = 'work';

const timerModes = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

function setTimerMode(mode) {
    currentMode = mode;
    timeLeft = timerModes[mode];
    
    // Update active mode button
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update status
    const statusText = {
        work: 'Ready to work',
        shortBreak: 'Ready for short break',
        longBreak: 'Ready for long break'
    };
    document.getElementById('timerStatus').textContent = statusText[mode];
    
    updateTimerDisplay();
    
    if (isRunning) {
        pauseTimer();
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline-block';
        
        const statusText = {
            work: 'Working...',
            shortBreak: 'Taking short break...',
            longBreak: 'Taking long break...'
        };
        document.getElementById('timerStatus').textContent = statusText[currentMode];
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                document.getElementById('startBtn').style.display = 'inline-block';
                document.getElementById('pauseBtn').style.display = 'none';
                
                // Show completion message
                const completionText = {
                    work: 'Work session complete! Take a break.',
                    shortBreak: 'Break over! Ready to work?',
                    longBreak: 'Long break complete! Ready to work?'
                };
                document.getElementById('timerStatus').textContent = completionText[currentMode];
                
                // Play notification sound (optional)
                if ('Notification' in window) {
                    new Notification('Pomodoro Timer', {
                        body: completionText[currentMode]
                    });
                }
                
                // Reset timer
                timeLeft = timerModes[currentMode];
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        document.getElementById('startBtn').style.display = 'inline-block';
        document.getElementById('pauseBtn').style.display = 'none';
        
        const statusText = {
            work: 'Work paused',
            shortBreak: 'Break paused',
            longBreak: 'Break paused'
        };
        document.getElementById('timerStatus').textContent = statusText[currentMode];
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    timeLeft = timerModes[currentMode];
    updateTimerDisplay();
    
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    
    const statusText = {
        work: 'Ready to work',
        shortBreak: 'Ready for short break',
        longBreak: 'Ready for long break'
    };
    document.getElementById('timerStatus').textContent = statusText[currentMode];
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

// Digital Clock Function
function updateDigitalClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('digitalClock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Dark Mode Functions
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update icon
    const icon = document.getElementById('darkModeIcon');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
}

function initializeDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeIcon').className = 'fas fa-sun';
    }
}

// Event Listeners
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

document.getElementById('locationInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Keyboard support for calculator
document.addEventListener('keydown', function(e) {
    if (e.target.id === 'calcDisplay') {
        e.preventDefault();
        
        if (e.key >= '0' && e.key <= '9' || e.key === '.') {
            appendToDisplay(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            appendToDisplay(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            calculateResult();
        } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
            clearCalculator();
        } else if (e.key === 'Backspace') {
            deleteLast();
        }
    }
});

// Currency converter event listeners
document.getElementById('fromAmount').addEventListener('input', convertCurrency);
document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
document.getElementById('toCurrency').addEventListener('change', convertCurrency);

// Request notification permission for Pomodoro timer
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize dashboard
window.addEventListener('load', function() {
    loadNews();
    renderTasks();
    renderImages();
    updateDisplay();
    loadNewQuote();
    loadExchangeRates();
    initializeDarkMode();
    updateDigitalClock();
    setInterval(updateDigitalClock, 1000);
});
// Widget Management System
const availableWidgets = {
    'todo': {
        id: 'todo-widget',
        name: 'To-Do List',
        icon: 'fas fa-tasks',
        active: true
    },
    'weather': {
        id: 'weather-widget',
        name: 'Weather',
        icon: 'fas fa-cloud-sun',
        active: true
    },
    'gallery': {
        id: 'gallery-widget',
        name: 'Image Gallery',
        icon: 'fas fa-images',
        active: true
    },
    'calculator': {
        id: 'calculator-widget',
        name: 'Calculator',
        icon: 'fas fa-calculator',
        active: false
    },
    'quotes': {
        id: 'quotes-widget',
        name: 'Random Quotes',
        icon: 'fas fa-quote-right',
        active: false
    },
    'currency': {
        id: 'currency-widget',
        name: 'Currency Converter',
        icon: 'fas fa-exchange-alt',
        active: false
    },
    'timer': {
        id: 'timer-widget',
        name: 'Pomodoro Timer',
        icon: 'fas fa-clock',
        active: false
    }
};

// Edit Widgets Modal Functions
function toggleEditWidgets() {
    const modal = document.getElementById('editWidgetsModal');
    const isActive = modal.classList.contains('active');
    
    if (isActive) {
        modal.classList.remove('active');
    } else {
        modal.classList.add('active');
        renderWidgetLists();
    }
}

function renderWidgetLists() {
    const activeList = document.getElementById('activeWidgetsList');
    const availableList = document.getElementById('availableWidgetsList');
    
    activeList.innerHTML = '';
    availableList.innerHTML = '';
    
    Object.entries(availableWidgets).forEach(([key, widget]) => {
        const widgetItem = createWidgetItem(key, widget);
        
        if (widget.active) {
            activeList.appendChild(widgetItem);
        } else {
            availableList.appendChild(widgetItem);
        }
    });
}

function createWidgetItem(key, widget) {
    const item = document.createElement('div');
    item.className = 'widget-item';
    
    const actionBtn = widget.active 
        ? `<button class="widget-action-btn remove-widget-btn" onclick="removeWidget('${key}')">
             <i class="fas fa-minus"></i> Remove
           </button>`
        : `<button class="widget-action-btn add-widget-btn" onclick="addWidget('${key}')">
             <i class="fas fa-plus"></i> Add
           </button>`;
    
    item.innerHTML = `
        <div class="widget-info">
            <i class="${widget.icon}"></i>
            <span>${widget.name}</span>
        </div>
        ${actionBtn}
    `;
    
    return item;
}

function addWidget(widgetKey) {
    const widget = availableWidgets[widgetKey];
    const widgetElement = document.getElementById(widget.id);
    
    if (widgetElement) {
        widgetElement.style.display = 'flex';
        availableWidgets[widgetKey].active = true;
        
        // Save to localStorage
        saveWidgetPreferences();
        
        // Re-render the lists
        renderWidgetLists();
        
        // Initialize widget-specific functionality if needed
        initializeWidget(widgetKey);
    }
}

function removeWidget(widgetKey) {
    const widget = availableWidgets[widgetKey];
    const widgetElement = document.getElementById(widget.id);
    
    if (widgetElement) {
        widgetElement.style.display = 'none';
        availableWidgets[widgetKey].active = false;
        
        // Save to localStorage
        saveWidgetPreferences();
        
        // Re-render the lists
        renderWidgetLists();
    }
}

function initializeWidget(widgetKey) {
    switch(widgetKey) {
        case 'currency':
            loadExchangeRates();
            break;
        case 'calculator':
            updateDisplay();
            break;
        case 'quotes':
            loadNewQuote();
            break;
        case 'timer':
            updateTimerDisplay();
            break;
    }
}

function saveWidgetPreferences() {
    const preferences = {};
    Object.entries(availableWidgets).forEach(([key, widget]) => {
        preferences[key] = widget.active;
    });
    localStorage.setItem('widgetPreferences', JSON.stringify(preferences));
}

function loadWidgetPreferences() {
    const saved = localStorage.getItem('widgetPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        Object.entries(preferences).forEach(([key, active]) => {
            if (availableWidgets[key]) {
                availableWidgets[key].active = active;
                const widgetElement = document.getElementById(availableWidgets[key].id);
                if (widgetElement) {
                    widgetElement.style.display = active ? 'flex' : 'none';
                }
            }
        });
    } else {
        // Default: show only todo, weather, and gallery
        Object.entries(availableWidgets).forEach(([key, widget]) => {
            const widgetElement = document.getElementById(widget.id);
            if (widgetElement) {
                widgetElement.style.display = widget.active ? 'flex' : 'none';
            }
        });
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('editWidgetsModal');
    if (event.target === modal) {
        toggleEditWidgets();
    }
});

// Add to the existing window load event listener
window.addEventListener('load', function() {
    loadNews();
    renderTasks();
    renderImages();
    updateDisplay();
    loadNewQuote();
    loadExchangeRates();
    initializeDarkMode();
    updateDigitalClock();
    setInterval(updateDigitalClock, 1000);
    
    // Load widget preferences
    loadWidgetPreferences();
});
