import { Project } from '../types/portfolio';

/**
 * Projects Metadata — Complete
 * All 5 verified projects with engineering notes
 */

export const projects: Project[] = [
  {
    id: '03',
    tags: ['Calculator', 'BMI Tool', 'No eval()'],
    title: 'Utility Calculator + BMI',
    shortDescription: 'A full-featured calculator with custom expression parsing and a built-in BMI calculator in a modal.',
    fullDescription: 'Handles arithmetic (+, −, ×, ÷) with proper operator precedence using custom string parsing (no eval()). Includes a separate BMI calculation mode accessed via a modal dialog.',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    image: './assets/images/03-utility-calculator-bmi.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_3/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_3',
    engineeringNotes: {
      problem: 'Built a calculator that could handle multi-operation expressions with correct operator precedence without relying on eval() for security and learning reasons.',
      keyDecision: 'Implemented a custom string parser that evaluates expressions recursively, respecting order of operations. This showcases algorithmic thinking.',
      challenge: 'Getting operator precedence right (multiplication/division before addition/subtraction) required careful recursion logic.',
      hindsight: 'A proper lexer/parser library would have been overkill here, but understanding how parsing works at this level is valuable foundational knowledge.'
    },
    skillsUsed: ['custom-parser', 'dom-manipulation', 'modal-dialogs']
  },

  {
    id: '04',
    tags: ['Data Table', 'Report Cards', 'Live Search'],
    title: 'Student Record System',
    shortDescription: 'Tabbed records manager with live search, editable student data, and automatic report card generation.',
    fullDescription: 'Add, update, and delete student records inline in a table. Live search filters by name. Automatic calculation of totals and averages. Generate per-student report cards with letter grades and personalized remarks based on performance.',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    image: './assets/images/04-student-record-system.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_4/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_4',
    engineeringNotes: {
      problem: 'Needed to build an editable table that could handle multiple data states (new, edit, saved) with input validation and live filtering, all persisted to localStorage.',
      keyDecision: 'Used inline edit-in-place for records rather than a modal form — more intuitive for a data-entry tool.',
      challenge: 'Preventing invalid input (numbers in age/score fields) without blocking legitimate edits required blocking specific key codes (e, E, +, -) on number inputs.',
      hindsight: 'Input type="number" has built-in restrictions, but I added extra guards for a tighter UX. Balancing permissiveness and validation is hard to get right first try.'
    },
    skillsUsed: ['form-validation', 'array-methods', 'dom-manipulation', 'event-delegation']
  },

  {
    id: '06',
    tags: ['6 Themes', 'CSS Variables', 'Persistent Prefs'],
    title: 'Theme Switcher',
    shortDescription: '6-theme UI switcher (Light, Dark, Fire, Water, Earth, Wind) with persistent user preference.',
    fullDescription: 'Dynamic theming system with 6 fully-fledged color palettes. Switch themes via toggle button or dropdown. User preference saved to localStorage and restored on page load.',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    image: './assets/images/06-theme-switcher.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_6/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_6',
    engineeringNotes: {
      problem: 'Wanted to show that theming isn\'t just light/dark toggle — built 6 cohesive color palettes each with subtle mood and purpose.',
      keyDecision: 'Stored themes as a JavaScript array of color objects, applying them to CSS custom properties at runtime rather than swapping CSS class names.',
      challenge: 'Ensuring all 6 themes had enough contrast for accessibility and visual distinction.',
      hindsight: 'This approach scales well; adding new themes is as simple as adding an object to the array without touching CSS.'
    },
    skillsUsed: ['localstorage', 'dom-manipulation', 'event-delegation']
  },

  {
    id: '07',
    tags: ['Timed Quiz', '3 Categories', 'Data-Driven'],
    title: 'Quiz App',
    shortDescription: 'Timed, category-based quiz with HTML/CSS/JavaScript topics, data-driven from a reusable config file.',
    fullDescription: 'Select a category (HTML, CSS, or JavaScript), answer timed questions with instant feedback, navigate via numbered jump buttons. All questions and feedback live in a separate data file (quizData.js), making the app reusable.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'ES6 Modules'],
    image: './assets/images/07-quiz-app.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_7/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_7',
    engineeringNotes: {
      problem: 'Needed a quiz tool where new questions could be added without touching the app logic — a true data-driven design.',
      keyDecision: 'Separated quiz engine (logic, timing, navigation) from quiz content (questions, answers, feedback). Data lives in quizData.js as an ES6 export.',
      challenge: 'Handling the countdown timer and auto-submit when time runs out required careful state management.',
      hindsight: 'This data-driven approach is a real skill — seeing the boundary between engine and content is how you build reusable tools.'
    },
    skillsUsed: ['error-handling', 'modal-dialogs', 'dom-manipulation']
  },

  {
    id: '08',
    tags: ['Live Weather', 'Open-Meteo API', '°F/°C Toggle'],
    title: 'Weather App',
    shortDescription: 'Real-time weather lookup using Open-Meteo API with state machine error handling and °F/°C toggle.',
    fullDescription: 'Select a location, fetch live weather data, toggle between Celsius and Fahrenheit. Explicit state machine handles Idle → Loading → Success/Error flow with distinct UI per state.',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    image: './assets/images/08-weather-app.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_8/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_8',
    engineeringNotes: {
      problem: 'Building a real-time app meant handling network delays, timeouts, and partial failures gracefully without leaving the UI stuck in a loading state.',
      keyDecision: 'Implemented a strict state machine (Idle → Loading → Success/Error) where only valid state transitions are allowed. This makes the UI predictable.',
      challenge: 'Implementing proper timeout handling (AbortController) so a hung request doesn\'t lock up the interface.',
      hindsight: 'State machines feel like overkill for simple apps, but they\'re the foundation of robust UIs. Learned that lesson here.'
    },
    skillsUsed: ['fetch-api', 'async-await', 'dom-manipulation']
  }
];