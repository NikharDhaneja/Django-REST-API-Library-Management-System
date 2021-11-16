// It makes link active in navbar
document.getElementById('nav-student-view').classList.add("active");
window.onunload = function(){
    document.getElementById('nav-student-view').classList.remove("active");
}

// Sending request to get list Of Books
fetch('/'+'api/book/', {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log(response)
    if (response.ok) {
        return response.json();
     }
     else {
         console.log("Student View "+ response);
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


let createBookCard = (book) => {

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


    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(category);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

    document.getElementById('card-container-row').appendChild(cardContainer);
}


let createCardOfBooks = (data) => {

    data.forEach((book) => {
        createBookCard(book);
    });
};
