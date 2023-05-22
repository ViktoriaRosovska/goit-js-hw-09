import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from "notiflix";

const refs = {
  form: document.querySelector('.form'),

}

console.log(refs.form.elements)

refs.form.addEventListener('submit', onFormSubmitcreatePromise);


function onFormSubmitcreatePromise(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target
  const countPosition = amount.value;
  console.log(delay.value, step.value, amount.value)
  let position = 1;
  setTimeout(() => {
    const timerId = setInterval(() => {
      if (position > countPosition) {
        clearInterval(timerId);
        return;
      }
      position += 1;
      createPromise(position, delay.value)
  .then(({ position, delay }) => {
    alert(`value ${position} ${delay.value}`);
  })
  .catch(({ position, delay }) => {
    alert(`error ${position} ${delay}`);
  });
      
      
    }, step.value)
}, delay.value);

  
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
     const shouldResolve = Math.random() > 0.3;
  console.log(shouldResolve)
  if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
  })
 
}
