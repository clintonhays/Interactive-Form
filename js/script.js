/**
 * Global Variables
 */

const nameInput = document.getElementById('name');
const jobRoleSelect = document.querySelector('#title');
const otherRole = document.getElementById('other-job-role');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const punsColors = document.querySelectorAll('[data-theme="js puns"]');
const heartColors = document.querySelectorAll('[data-theme="heart js"]');

/**
 * On Page Load Settings
 */

nameInput.focus();

otherRole.classList.add('hidden');

colorSelect.disabled = true;

/**
 * Event Listeners
 */

jobRoleSelect.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherRole.classList.remove('hidden');
  } else if (e.target.value !== 'other') {
    otherRole.classList.add('hidden');
  }
});

designSelect.addEventListener('change', (e) => {
  colorSelect.disabled = false;

  const design = e.target.value;

  if (design === 'js puns') {
    heartColors.forEach((color) => {
      color.className = 'hidden';
    });
    punsColors.forEach((color) => {
      color.classList.remove('hidden');
    });
  } else if (design === 'heart js') {
    punsColors.forEach((color) => {
      color.className = 'hidden';
    });
    heartColors.forEach((color) => {
      color.classList.remove('hidden');
    });
  }
});
