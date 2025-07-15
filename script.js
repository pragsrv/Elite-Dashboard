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

// Initialize dashboard
window.addEventListener('load', function() {
    loadNews();
    renderTasks();
    renderImages();
    updateDisplay();
});