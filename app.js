
// starting event handler for search
  const searchBooks = () => {
  document.getElementById('spinner').classList.remove('d-none');
  document.getElementById('spinner').classList.add('d-block');
  
    document.getElementById("error-message").innerText = '';
    const searchInput = document.getElementById("input-field");
    const searchText = searchInput.value;
    searchInput.value = "";
    if (searchText === "") {
      displayError("Please enter a book name");
    }
    else {
      const url = `https://openlibrary.org/search.json?q=${searchText}`;
      getBooks(url);
    }
  }


  // getting search result
const getBooks = url => {
    fetch(url)
      .then(res => res.json())
      .then(data => displayBooks(data))
      .catch(error =>console.log(error))

  }


  // display search result
const displayBooks = data => {
    const numOfResult = data.numFound;
    let count = 0;
    const books =data.docs;
    books.forEach(book => {
    count++;
    const title = book.title?book.title[0]:'';
    const author = book.author_name?book.author_name[0]:"";
    const publisher = book.publisher?book.publisher[0]:'';
    const publishedYear = book.publish_year?book.publish_year[0]:"";
    const coverId = book.cover_i;
      
    const booksContainer = document.getElementById('books');
      const div = document.createElement('div');
      div.classList.add('col-6')
      div.innerHTML=
        `<div class=" border card text-white m-3 book-card" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">Author: ${author}</p>
          <p class="card-text">Published By : ${publisher}</p>
              <p class="card-text"><small class="text-muted">published year: ${publishedYear}</small></p>
            </div>
          </div>
        </div>
      </div>`;
      document.getElementById('resultFound').innerText=`Showing ${count} out of ${numOfResult} resuls found`;
      booksContainer.appendChild(div);
      document.getElementById('spinner').classList.remove('d-block');
      document.getElementById('spinner').classList.add('d-none');
    });
}

  const displayError = message => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = `${message}`;
  }