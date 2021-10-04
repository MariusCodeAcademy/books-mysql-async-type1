const url = 'http://localhost:3000';

// html el
const formEl = document.querySelector('.add-book');
const catSelectEl = document.querySelector('.cat-select');

const generateSelectOptions = async () => {
  // gauti categorijas is db
  const resp = await fetch(`${url}/categories`);
  const data = await resp.json();
  console.log('data', data);
  // is gautu duomenu sugeneruoti select options
  if (data.cat.length > 0) {
    const options = data.cat.map(
      (c) => `<option value="${c.id}">${c.cat_name}</option>`,
    );
    return `<option selected>Add category</option> ${options.join('')}`;
  }
  console.log('no categories got');
};

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('siusti forma');
  const formData = new FormData(formEl);
  // console.log(JSON.stringify(Object.fromEntries(formData)));
  const formDataJson = JSON.stringify(Object.fromEntries(formData));
  const resp = await fetch(`${url}/book/add`, {
    method: 'POST',
    body: formDataJson,
    headers: {
      'Content-type': 'application/json',
    },
  });
  const data = await resp.json();
  console.log('data', data);
});

const init = async () => {
  const options = await generateSelectOptions();
  catSelectEl.innerHTML = options;
};

init();
