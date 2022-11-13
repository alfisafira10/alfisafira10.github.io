const STORAGE_KEY = 'BOOKS_APPS';
 
const bookTitle = document.querySelector('#inputBookTitle');
const bookAuthor = document.querySelector('#inputBookAuthor');
const bookYear = document.querySelector('#inputBookYear');
const readedBook = document.querySelector('#inputBookIsComplete');

const btnSubmit = document.querySelector('#bookSubmit');
const btnSearch = document.querySelector('#searchSubmit');
const searchKeyword = document.querySelector('#searchBookTitle');

let checkInput = [];
let checkbookTitle = "";
let checkbookAuthor = "";
let checkbookYear = "";

window.addEventListener('load', function() {
  if (localStorage.getItem(STORAGE_KEY) !== "") {
    const booksData = getBookData();
    showBookData(booksData);
  }
})

btnSubmit.addEventListener('click', function() {
  if (btnSubmit.value == "") {
    checkInput = [];

    if (bookTitle.value == "") {
      checkbookTitle = false;
    }else{
      checkbookTitle = true;
    }

    if (bookAuthor.value == "") {
      checkbookAuthor = false;
    }else{
      checkbookAuthor = true;
    }

    if (bookYear.value == "") {
      checkbookYear = false;
    }else{
      checkbookYear = true;
    }

    checkInput.push(checkbookTitle, checkbookAuthor, checkbookYear);
    const newBook = {
      id: +new Date(),
      title: bookTitle.value.trim(),
      author: bookAuthor.value.trim(),
      year: bookYear.value.trim(),
      isComplete: readedBook.checked
    }
    insertBook(newBook);

    bookTitle.value = "";
    bookAuthor.value = "";
    bookYear.value = "";
    readedBook.checked = false;
  }else{
    const bookData = getBookData().filter(a => a.id != btnSubmit.value);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(bookData))

    const newBook = {
      id: +new Date(),
      title: bookTitle.value.trim(),
      author: bookAuthor.value.trim(),
      year: bookYear.value.trim(),
      isComplete: readedBook.checked
    }
    insertBook(newBook)
    btnSubmit.innerHTML = "Masukkan Buku";
    btnSubmit.value = "";
    bookTitle.value = "";
    bookAuthor.value = "";
    bookYear.value = "";
    readedBook.checked = false;

    alert("Edit Buku Berhasil");
  }
})

btnSearch.addEventListener('click', function(x) {
  x.preventDefault()
  if (localStorage.getItem(STORAGE_KEY) == "") {
    alert("Data Buku Kosong!");
    return location.reload();
  }else{
    const getByBookTitle = getBookData().filter(a => a.title == searchKeyword.value.trim());
    if (getByBookTitle.length == 0) {
      const getByBookAuthor = getBookData().filter(a => a.author == searchKeyword.value.trim());
      if (getByBookAuthor.length == 0) {
        const getByBookYear = getBookData().filter(a => a.year == searchKeyword.value.trim());
        if (getByBookYear.length == 0) {
          alert(`Buku dengan keyword ${searchKeyword.value} tidak ditemukan!`);
          return location.reload();
        }else{
          showBookSearchResult(getByBookYear);
        }
      }else{
        showBookSearchResult(getByBookAuthor);
      }
    }else{
      showBookSearchResult(getByBookTitle);
    }
  }
  searchKeyword.value = "";
})

function showBookSearchResult(books) {
  const booksearchResult = document.querySelector("#searchResult");

  booksearchResult.innerHTML = "";

  books.forEach(book => {
      let elemen = `
      <article class="book_item">
          <h3>Judul Buku : ${book.title}</h3>
          <p>Nama Penulis : ${book.author}</p>
          <p>Tahun Terbit: ${book.year}</p>
          <p>Keterangan : ${book.isComplete ? 'Sudah dibaca' : 'Belum dibaca'}</p>
      </article>
      `

      booksearchResult.innerHTML += elemen;
  });
}

function completeBook(id) {
  let confirms = confirm("Pindah ke rak Selesai Dibaca?");

  if (confirms == true) {
    const detailBookData = getBookData().filter(a => a.id == id);
    const newBook = {
      id: detailBookData[0].id,
      title: detailBookData[0].title,
      author: detailBookData[0].author,
      year: detailBookData[0].year,
      isComplete: true
    }

    const bookData = getBookData().filter(a => a.id != id);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(bookData))

    insertBook(newBook)
  }else{
    return 0;
  }
}

function incompleteBook(id) {
  let confirms = confirm("Pindah ke rak Belum Selesai Dibaca?");

  if (confirms == true) {
    const detailBookData = getBookData().filter(a => a.id == id);
    const newBook = {
      id: detailBookData[0].id,
      title: detailBookData[0].title,
      author: detailBookData[0].author,
      year: detailBookData[0].year,
      isComplete: false
    }

    const bookData = getBookData().filter(a => a.id != id);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(bookData))

    insertBook(newBook)
  }else{
    return 0;
  }
}












