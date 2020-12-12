/**
 * Global Variables
 */

const nameInput = document.getElementById('name');
const jobRoleSelect = document.querySelector('#title');
const jobRoleOptions = document.querySelectorAll('#title option');
const otherRole = document.getElementById('other-job-role');

/**
 * on page load settings
 */

// focus on name input element
nameInput.focus();

// hide other job role input element
otherRole.classList.add('hidden');

/**
 * Event Listeners
 */

jobRoleSelect.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherRole.classList.remove('hidden');
  }
});
