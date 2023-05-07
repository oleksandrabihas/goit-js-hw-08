import throttle from 'lodash.throttle';

const email = document.querySelector('input');
const message = document.querySelector('textarea[name="message"]');
const form = document.querySelector('form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackData = {
  email: '',
  message: '',
};

function inputEmail(e) {
  e.preventDefault();
  feedbackData.email = e.target.value;
  saveFeedbackData();
}

function inputMessage(e) {
  e.preventDefault();
  feedbackData.message = e.target.value;
  saveFeedbackData();
}

function saveFeedbackData() {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackData));
}

function loadFeedbackData() {
  const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedData !== null && savedData !== undefined) {
    const parsedData = JSON.parse(savedData);
    feedbackData.email = parsedData.email || '';
    feedbackData.message = parsedData.message || '';
  }
}

function updateForm() {
  email.value = feedbackData.email;
  message.value = feedbackData.message;
}

function resetForm() {
  if (email.value !== '' || message.value !== '') {
    saveFeedbackData();
  }
  updateForm();
  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormSubmit(e) {
  e.preventDefault();
  if (email.value === '' || message.value === '') {
    alert(`Всі поля повинні бути заповненні`);
  } else {
    const emailValue = feedbackData.email;
    const messageValue = feedbackData.message;

    const arrayData = {
      email: emailValue,
      message: messageValue,
    };
    console.log(arrayData);
  }
  resetForm();
}

email.addEventListener('input', throttle(inputEmail, 500));
message.addEventListener('input', throttle(inputMessage, 500));
form.addEventListener('submit', onFormSubmit);

loadFeedbackData();
updateForm();
