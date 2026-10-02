import { drawRelativeMotionSim } from './sim-relative.js';
import { drawInclinedPlaneSim } from './sim-inclined.js';

let appState = {
  role: localStorage.getItem('tf_role') || 'teacher',
  students: [],
  sessions: [],
  tasks: []
};

let activeSimMode = 'relative';
let isSimRunning = false;
let simTime = 0;
let simAnimFrame = null;

// Initialize App
async function initApp() {
  const savedStudents = localStorage.getItem('tf_students');
  if (savedStudents) {
    appState.students = JSON.parse(savedStudents);
    appState.sessions = JSON.parse(localStorage.getItem('tf_sessions')) || [];
    appState.tasks = JSON.parse(localStorage.getItem('tf_tasks')) || [];
  } else {
    const res = await fetch('./data/initial-data.json');
    const initial = await res.json();
    appState = { ...appState, ...initial };
    persistData();
  }
  renderUI();
}

function persistData() {
  localStorage.setItem('tf_students', JSON.stringify(appState.students));
  localStorage.setItem('tf_sessions', JSON.stringify(appState.sessions));
  localStorage.setItem('tf_tasks', JSON.stringify(appState.tasks));
  renderUI();
}

function renderUI() {
  document.getElementById('stat-students').innerText = appState.students.length;
  document.getElementById('stat-sessions').innerText = appState.sessions.length;
}

window.addEventListener('DOMContentLoaded', initApp);