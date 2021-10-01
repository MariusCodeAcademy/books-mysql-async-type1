const url = 'http://localhost:3000/book';

// html el
const formEl = document.querySelector('.add-book');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('siusti forma');
  const formData = new FormData(formEl);
  // console.log(JSON.stringify(Object.fromEntries(formData)));
  const formDataJson = JSON.stringify(Object.fromEntries(formData));
  const resp = await fetch(`${url}/add`, {
    method: 'POST',
    body: formDataJson,
    headers: {
      'Content-type': 'application/json',
    },
  });
  const data = await resp.json();
  console.log('data', data);
});

const init = async () => {};

init();
