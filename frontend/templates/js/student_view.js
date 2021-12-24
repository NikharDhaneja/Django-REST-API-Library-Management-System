// It makes link active in navbar
document.getElementById('nav-student-view').classList.add("active");
window.onunload = function(){
    document.getElementById('nav-student-view').classList.remove("active");
}

// Url to get all books
var url = '/'+'api/book/'
sendRequestToGetBooks(url)

if(search_bookForm){

    search_bookForm.addEventListener('submit', function(e){
         e.preventDefault()

         // Url with query parameter to get filtered books
         // Ex - 127.0.0.1:8000/api/books?search_input=physics
         url = '/'+'api/book?' + $.param({search_input: document.getElementById('search_input').value})
         sendRequestToGetBooks(url)

    })
}

function sendRequestToGetBooks(url){

    // Sending request to get list Of Books
    fetch(url, {
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

}




let createBookCard = (book) => {

    var cardContainer = document.createElement('div');
    cardContainer.classList.add('col-4');
    cardContainer.style.cssText = "width: 20rem;"
    cardContainer.classList.add('m-2');

    let card = document.createElement('div');
    card.className = 'card';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerHTML =  book.title;
    title.className = 'card-title';

    let author = document.createElement('div');
    author.innerHTML = "<b>Author - </b>" + book.author;
    author.className = 'card-text';

    let category = document.createElement('div');
    category.innerHTML = "<b>Category - </b>" + book.category;
    category.className = 'card-text';


    let location = document.createElement('div');
    location.innerHTML = "<b>Location - </b>" + "floor -> " + book.floor + " shelf -> " + book.shelf ;
    location.className = 'card-text';


    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(category);
    cardBody.appendChild(location);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

    document.getElementById('card-container-row').appendChild(cardContainer);
}


let createCardOfBooks = (data) => {
    document.getElementById('card-container-row').innerHTML = ""
    data.forEach((book) => {
        createBookCard(book);
    });
};
