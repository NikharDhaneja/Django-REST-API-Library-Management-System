const add_bookForm = document.getElementById('add_bookForm');
if(add_bookForm){

    add_bookForm.addEventListener('submit', function(e){
        e.preventDefault()
        // Sending request to Create an entry for Book
        fetch('/'+'api/book/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                category: document.getElementById("category").value,
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                window.location.href = "/"+"retrieve-books/";
                return response.json();
             }
             else {
                 console.log("add book"+ response);
             }
        })
        .then(data => {
            // window.location.href = "/"+"student-view";
        })
        .catch(error => {
            console.log(error);
        })

    })

}
