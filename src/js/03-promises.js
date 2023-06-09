import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target;
  const countPosition = parseInt(amount.value);
  let delayMs = parseInt(delay.value);
  let stepMs = parseInt(step.value);
  let position = 0;
  
  const timerId = setInterval(() => {
    position += 1;
    if (position > countPosition) {
      clearInterval(timerId);
       
      return;
    }
    createPromise(position, delayMs)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayMs += stepMs;
  }, stepMs);
  e.target.reset();
}

function createPromise(position, delay) {
 
    return new Promise((resolve, reject) => {
    setTimeout(() => {
     const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({position, delay});
  } else {
    reject({ position, delay });
  } }, delay)
  }) 
 
 
}
