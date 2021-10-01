const url = 'http://localhost:3000/book';

// html el
const bookListEl = document.querySelector('.books-list');

const getBooks = async () => {
  const resp = await fetch(url);
  const data = await resp.json();
  console.log('data', data);
  return data.result;
};

const renderBooks = (arr, dest) => {
  const generatedBooks = arr.map(
    (bookItem) => `
    <div class="card" style="width: 18rem;">
      <img src="assets/${bookItem.image}" class="card-img-top" alt="${bookItem.title}">
      <div class="card-body">
        <h5 class="card-title">${bookItem.title}</h5>
        <p class="card-text">${bookItem.author}</p>
        <button class="btn btn-primary">View</button>
      </div>
    </div>
    `,
  );
  // eslint-disable-next-line no-param-reassign
  dest.innerHTML = generatedBooks;
};

const init = async () => {
  const books = await getBooks();
  renderBooks(books, bookListEl);
};

init();
