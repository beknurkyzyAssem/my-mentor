// --- Selectors
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation');
const mentorClick = document.querySelectorAll('.mentor-click');
const about = document.querySelectorAll('.about');
const chooseBtn = document.querySelectorAll('.choose-btn');
const userName = document.getElementById('user-name');
const goal = document.getElementById('user-goal');
const selectedMentor = document.querySelector('.selected-mentor');
const goToTasks = document.querySelector('.go-to-tasks');
const clearBtn = document.querySelector('.clear-btn');
const main = document.querySelector('.main');
const tasksPage = document.getElementById('tasks');
const ulItem = document.getElementById('ul-item');
const firstLink = document.getElementById('first');
const secondLinnk = document.getElementById('staff');
const thirdLink = document.getElementById('benefit-link');
const information = document.querySelector('.information');
const benefit = document.getElementById('benefit');
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const deleteSelectedBtn = document.getElementById("delete-selected-btn");

// --- Burger Menu
burger.addEventListener('click', () => {
    navigation.classList.toggle('active');
});

// --- Mentor Description Show/Hide
for (let i = 0; i < mentorClick.length; i++) {
    mentorClick[i].addEventListener('click', () => {
        about[i].style.display = 'block';
    });
    mentorClick[i].addEventListener('dblclick', () => {
        about[i].style.display = 'none';
        mentorClick[i].style.filter = 'grayscale(100%)';
    });
}

// --- Choose Mentor
for (let i = 0; i < chooseBtn.length; i++) {
    chooseBtn[i].addEventListener('click', () => {
        const mentorName = about[i].querySelector('.name').textContent;
        const nameValue = userName.value.trim();
        const goalValue = goal.value.trim();

        localStorage.setItem('mentor', mentorName);
        localStorage.setItem('username', nameValue);
        localStorage.setItem('goal', goalValue);

        about[i].style.display = 'none';
        selectedMentor.textContent = 'Your mentor: ' + mentorName;
        goToTasks.textContent = 'Go To Your Tasks';
    });
}

// --- Scroll to Tasks
goToTasks.addEventListener('click', () => {
    const section = document.getElementById('tasks');
    section.scrollIntoView({ behavior: 'smooth' });
});

// --- Show Tasks Page
goToTasks.addEventListener('dblclick', () => {
    const nameValue = userName.value.trim();
    const goalValue = goal.value.trim();
    const mentorValue = localStorage.getItem('mentor');

    if (!nameValue || !goalValue || !mentorValue) {
        alert("Fill in all fields and choose a mentor before continuing.");
        return;
    }

    main.style.display = 'none';
    tasksPage.style.display = 'block';
    ulItem.innerHTML = '';

    const goalLower = goalValue.toLowerCase();
    const tasks = [];

    if (mentorValue === 'Mark Zuckerberg' && goalLower.includes('js')) {
        tasks.push(
            'Watch a JavaScript tutorial',
            'Build a simple JS project',
            'Understand ES6 syntax',
            'Learn about DOM manipulation',
            'Practice with JS quizzes'
        );
    } else if (mentorValue === 'Bill Gates' && goalLower.includes('python')) {
        tasks.push(
            'Learn Python basics on W3Schools',
            'Practice with Python mini projects',
            'Solve 5 coding problems on LeetCode',
            'Read about OOP in Python',
            'Write a simple calculator script'
        );
    } else if (mentorValue === 'Steve Jobs' && goalLower.includes('design')) {
        tasks.push(
            'Study UI/UX design principles',
            'Redesign a famous app UI',
            'Read "The Design of Everyday Things"',
            'Create wireframes for your app',
            'Try Figma or Adobe XD'
        );
    } else if (mentorValue === 'Sam Altman' && goalLower.includes('ai')) {
        tasks.push(
            'Read about OpenAI projects',
            'Train a small ML model',
            'Complete an AI course on Coursera',
            'Explore ChatGPT plugins',
            'Build a basic chatbot with Python'
        );
    } else {
        tasks.push(
            'Research your goal online',
            'Find 3 free tutorials about your topic',
            'Write a plan for learning',
            'Try to explain your goal to someone',
            'Watch a motivational video'
        );
    }

    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        if (completedTasks.includes(task)) {
            checkbox.checked = true;
            li.style.textDecoration = 'line-through';
        }

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.style.textDecoration = 'line-through';
                completedTasks.push(task);
            } else {
                li.style.textDecoration = 'none';
                const index = completedTasks.indexOf(task);
                if (index > -1) completedTasks.splice(index, 1);
            }
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(' ' + task));
        ulItem.appendChild(li);
    }
});

// --- Navbar Navigation
firstLink.addEventListener('click', function () {
    main.style.display = 'block';
    tasksPage.style.display = 'none';
    information.style.display = 'block';
    benefit.style.display = 'none';
});

secondLinnk.addEventListener('click', function () {
    main.style.display = 'none';
    tasksPage.style.display = 'block';
    tasksPage.style.justifyContent = 'center';
    information.style.display = 'block';
    benefit.style.display = 'none';
});

thirdLink.addEventListener('click', function () {
    information.style.display = 'none';
    benefit.style.display = 'block';
});

// --- Clear All Data
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('goal');
    localStorage.removeItem('mentor');
    localStorage.removeItem('completedTasks');

    userName.value = '';
    goal.value = '';
    selectedMentor.textContent = 'Your mentor: ';
    goToTasks.textContent = 'Choose your mentor';

    main.style.display = 'block';
    tasksPage.style.display = 'none';
    ulItem.innerHTML = '';
});

// --- Benefits Section (Useful Links)
let myLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads();
}

inputBtn.addEventListener("click", function () {
    if (inputEl.value.trim() === "") return;
    myLeads.push(inputEl.value.trim());
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
});

deleteBtn.addEventListener("dblclick", function () {
    localStorage.removeItem("myLeads");
    myLeads = [];
    renderLeads();
});

deleteSelectedBtn.addEventListener("click", function () {
    const checkboxes = ulEl.querySelectorAll("input[type='checkbox']");
    const updatedLeads = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
            updatedLeads.push(myLeads[i]);
        }
    }

    myLeads = updatedLeads;
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
});

function renderLeads() {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <label>
                    <input type="checkbox">
                    <a target="_blank" href="${myLeads[i]}">
                        ${myLeads[i]}
                    </a>
                </label>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

// --- Restore Local Data
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('username');
    const savedGoal = localStorage.getItem('goal');
    const savedMentor = localStorage.getItem('mentor');

    if (savedUsername) userName.value = savedUsername;
    if (savedGoal) goal.value = savedGoal;
    if (savedMentor) {
        selectedMentor.textContent = 'Your mentor: ' + savedMentor;
        goToTasks.textContent = 'Go To Your Tasks';
    }
});