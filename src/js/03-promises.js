import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
  form: document.querySelector(".form"),
  delay: document.querySelector("input[name=delay]"),
  step: document.querySelector("input[name=step]"),
  amount: document.querySelector("input[name=amount]"),
  btn: document.querySelector("[type=submit]")
}

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  })
}

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);
  for (let i = 1; i <= amount; i++) {
    let position = i; 
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 7000,
          // ...
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: 7000,
          // ...
        });
      });
    delay += step;
  }
}






