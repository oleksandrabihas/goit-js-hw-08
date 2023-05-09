import throttle from 'lodash.throttle';

const email = document.querySelector('input');
const message = document.querySelector('textarea[name="message"]');
const form = document.querySelector('form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackData = {
  email: '',
  message: '',
};

function inputData(e) {
  e.preventDefault();
  feedbackData.email = email.value;
  feedbackData.message = message.value;
  saveFeedbackData();
}

function saveFeedbackData() {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackData));
}

function loadFeedbackData() {
  try {
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedData !== null && savedData !== undefined) {
      const parsedData = JSON.parse(savedData);
      feedbackData.email = parsedData.email || '';
      feedbackData.message = parsedData.message || '';
    }
  } catch (error) {
    console.error('Помилка зчитування даних з localStorage:', error);
  }
}

function updateForm() {
  email.value = feedbackData.email;
  message.value = feedbackData.message;
}

function onFormSubmit(e) {
  e.preventDefault();
  if (email.value === '' || message.value === '') {
    alert(`Всі поля повинні бути заповненні`);
  } else {
    console.log(feedbackData);
  }
  localStorage.removeItem(LOCALSTORAGE_KEY);
  form.reset();
}

form.addEventListener('input', throttle(inputData, 500));
form.addEventListener('submit', onFormSubmit);

loadFeedbackData();
updateForm();
