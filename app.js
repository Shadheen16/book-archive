
// component toggler function

const toggleComponent = (id, displayStyle) =>{
    const component = document.getElementById(id);

    if(displayStyle==='d-block'){
        component.classList.remove('d-none');
        component.classList.add(displayStyle);
    }
    else{
        component.classList.add(displayStyle);
    }
       
    }

// starting event handler for search
  const searchBooks = () => {
  toggleComponent('spinner','d-block');
  toggleComponent('books','d-none')
    document.getElementById("error-message").innerText = '';
    const searchInput = document.getElementById("input-field");
    const searchText = searchInput.value;
    searchInput.value = "";
    if (searchText === "") {
      displayError("Please enter a book name")
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
      .catch(error => displayError(error))
      .finally(()=>{ 
        toggleComponent('spinner','d-none');
        toggleComponent('books','d-block');
      })
  }


  // display search result
const displayBooks = data => {
    const numOfResult = data.numFound;
    let count = 0;
    const books =data.docs;
    books.forEach(book => {
    count++;
    console.log(count);
    const author = book.author_name[0];
    const publisher = book.publisher;
    const publishedYear = book.publish_year;
    const coverId = book.cover_i;
    console.log(Object.keys(book)) ;  
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
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Author: ${author}</p>
          <p class="card-text">Published By : ${publisher}</p>
              <p class="card-text"><small class="text-muted">published year: ${publishedYear}</small></p>
            </div>
          </div>
        </div>
      </div>`;
      document.getElementById('resultFound').innerText=`Showing ${count} out of ${numOfResult} resuls found`;
      booksContainer.appendChild(div);
    });
}

  const displayError = message => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = `${message}`;
  }