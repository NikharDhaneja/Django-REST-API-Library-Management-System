// It makes link active in navbar
document.getElementById('nav-my-books').classList.add("active");
window.onunload = function(){
    document.getElementById('nav-my-books').classList.remove("active");
}

// Sending request to Retrieve list Of Books by ID
fetch('/'+'api/book/mybooks/', {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+ localStorage.getItem("access_token")
    }
})
.then(response => {
    console.log(response)
    if (response.ok) {
        return response.json();
     }
     else {
         console.log("my books"+ response);
         return response.json();
     }
})
.then(data => {
    console.log(data)
    createCardOfBooks(data)  // Dynamically creates cards to represent books
})
.catch(error => {
    console.log(error);
})


let createBookCard = (book) => {       // Called from line 83

    var cardContainer = document.createElement('div');
    cardContainer.classList.add('col-4')
    cardContainer.style.cssText = "width: 20rem;"

    let card = document.createElement('div');
    card.className = 'card ';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = book.title;
    title.className = 'card-title';

    let author = document.createElement('div');
    author.innerText = book.author;
    author.className = 'card-text';

    let category = document.createElement('div');
    category.innerText = book.category;
    category.className = 'card-text';
    cardContainer.classList.add('m-2')

    const lineBreak = document.createElement('br');

    let updateButton = document.createElement('a');
    updateButton.classList.add('btn')
    updateButton.classList.add('btn-light')
    updateButton.innerHTML = 'Update';
    updateButton.setAttribute('href', `javascript:window.location.href = '/'+'update-book/'+ ${book.id}`);
    updateButton.style.cssText = "margin-right: 5px;"
    updateButton.setAttribute('onclick', `setBookId(${book.id})`)  // Set bookId in localStorage

    let deleteButton = document.createElement('a');
    deleteButton.classList.add('btn')
    deleteButton.classList.add('btn-danger')
    deleteButton.innerHTML = 'Delete';
    deleteButton.setAttribute('href', "#");
    deleteButton.setAttribute('onclick', `deleteBook(${book.id})`)  // Delete Book

    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(category);
    cardBody.appendChild(lineBreak);
    cardBody.appendChild(updateButton);
    cardBody.appendChild(deleteButton);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

    document.getElementById('card-container-row').appendChild(cardContainer);
}


let createCardOfBooks = (data) => {

    data.forEach((book) => {
        createBookCard(book);
    });
};


let setBookId = (bookId) => {
    localStorage.setItem("bookId", bookId);
};


let deleteBook = (bookId) => {

    // Sending request to delete Book
    fetch('/'+'api/book/'+ bookId +'/',{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ localStorage.getItem("access_token")
        }
    })
    // Converting received data to JSON
    .then(response => {
        console.log(response)
        if(response.ok){
            window.location.href = "";
        }else{
            return response.json()
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error));

    // end
};
