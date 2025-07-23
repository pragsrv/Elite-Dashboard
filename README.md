# Elite Dashboard

Elite Dashboard is a modern, responsive, and feature-rich personal productivity dashboard built with HTML, CSS, and JavaScript. It brings together essential productivity tools in a single, visually appealing interface.
> AI was used in proper wokring of this project, and to integrate Dark Mode in the overall Project, and to add the edit widgets button

![20250723-0641-17 5472532-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/59459573-94cc-4966-ba2b-c45de5b8e22b)


## Features

- **Responsive Layout**: Widgets automatically fill available space with well-defined gaps and margins, adapting to any screen size.
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing. All widgets and text invert colors for accessibility.
- **To-Do List**: Add, complete, and delete tasks to manage your daily activities.
- **Weather Widget**: Get real-time weather updates for any city using a weather API. Placeholder and results adapt to dark mode.
- **Latest News**: Stay updated with the latest headlines fetched from NewsAPI.org. News content and loading/error states adapt to dark mode.
> Latest News removed due to incompatible API
- **Image Gallery**: Upload, view, and delete images in a beautiful grid layout. Deletion is instant and reliable.
- **Calculator**: Perform basic arithmetic operations with a stylish calculator, including keyboard support.
- **Random Quotes**: Get inspired with a new motivational quote at the click of a button.
- **Currency Converter**: Convert between major world currencies with live exchange rates from ExchangeRate-API.
- **Pomodoro Timer**: Boost productivity with a customizable Pomodoro timer and digital clock. Includes notification support.
- **Accessibility Improvements**: Most form elements have labels and accessible names. Color contrast is improved in dark mode.

## Demo

Open `index.html` in your browser to try the dashboard locally.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/pragsrv/Elite-Dashboard.git
   cd Elite-Dashboard
   ```
2. **Open `index.html` in your web browser.**

No build tools or dependencies are required. All features work client-side.

## Configuration

- **Weather Widget:**
  - The weather widget uses a weather API key. Update the `WEATHER_API_KEY` variable in `index.html` with your own API key if needed.
- **News Widget:**
  - The news widget uses NewsAPI.org. Replace the `NEWS_API_KEY` in `index.html` with your own API key for live news.

## Accessibility & Customization

- All widgets are keyboard accessible and support color inversion for dark mode.
- You can customize widget order, layout, and styles by editing `index.html` and the embedded CSS.

## Credits

- [Font Awesome](https://fontawesome.com/) for icons
- [ExchangeRate-API](https://www.exchangerate-api.com/) for currency rates

## License

This project is licensed under the MIT License.
