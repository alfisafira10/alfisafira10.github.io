function insertBook(book) {
    let bookData = [];
  
    if (localStorage.getItem(STORAGE_KEY) == "") {
      alert('Buku Gagal Ditambahkan!')
      localStorage.setItem(STORAGE_KEY, 0);
    }else{
      alert('Buku Berhasil Ditambahkan!')
      bookData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
  
    bookData.unshift(book);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(bookData));
  
    showBookData(getBookData());
}
  
function getBookData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}
  
function showBookData(books = []) {
    const inComplete = document.querySelector('#incompleteBookshelfList');
    const complete = document.querySelector('#completeBookshelfList');
  
    inComplete.innerHTML = "";
    complete.innerHTML = "";
  
    books.forEach(book => {
      if (book.isComplete == false) {
          let elemen = `
          <article class="book_item">
              <h3 style="text-align:left;">${book.title}</h3>
              <p style="text-align:left;">Nama Penulis : ${book.author}</p>
              <p>Tahun Terbit : ${book.year}</p>
  
              <div class="action" style="margin-top: 20px;">
                <button class="green" onclick="completeBook('${book.id}')">Selesai</button>
                <button class="yellow" onclick="editBook('${book.id}')"><a href="#input" style="color: black;">Edit</a></button>
                <button class="red" onclick="deleteBook('${book.id}')">Hapus</button>
              </div>
          </article>
          `
  
          inComplete.innerHTML += elemen;
      }else{
          let elemen = `
          <article class="book_item">
              <h3 style="text-align:left;">${book.title}</h3>
              <p style="text-align:left;">Nama Penulis : ${book.author}</p>
              <p>Tahun Terbit: ${book.year}</p>
  
              <div class="action" style="margin-top: 20px;">
                <button class="green" onclick="incompleteBook('${book.id}')">Belum Selesai</button>
                <button class="yellow" onclick="editBook('${book.id}')"><a href="#input" style="color: black;">Edit</a></button>
                <button class="red" onclick="deleteBook('${book.id}')">Hapus</button>
              </div>
          </article>
          `
          complete.innerHTML += elemen;
      }
    });
}

function editBook(id) {
    const detailBookData = getBookData().filter(a => a.id == id);
    bookTitle.value = detailBookData[0].title
    bookAuthor.value = detailBookData[0].author
    bookYear.value = detailBookData[0].year
    detailBookData[0].isComplete ? readedBook.checked = true : readedBook.checked = false
  
    btnSubmit.innerHTML = "Edit Buku"
    btnSubmit.value = detailBookData[0].id
}
  
function deleteBook(id) {
    let confirms = confirm("Hapus Buku yang Dipilih?")
  
    if (confirms = true) {
      const detailBookData = getBookData().filter(a => a.id == id);
      const bookData = getBookData().filter(a => a.id != id);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(bookData))
      showBookData(getBookData())
      alert(`Buku ${detailBookData[0].title} telah dihapus!`)
    }else{
      return 0
    }
}
  