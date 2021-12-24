const update_bookForm = document.getElementById('update_bookForm');
if(update_bookForm){

    update_bookForm.addEventListener('submit', function(e){
        e.preventDefault()
        // Sending request to Update Book details
        fetch('/'+'api/book/'+localStorage.getItem("bookId")+'/', {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")
            },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                category: document.getElementById("category").value,
                floor: document.getElementById("floor").value,
                shelf: document.getElementById("shelf").value,
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                window.location.href = "/"+"my-books";
             }
             else {
                 console.log("add book"+ response);
                 return response.json();
             }
        })
        .then(data => {
            console.log(data)

        })
        .catch(error => {
            console.log(error);
        })

    })

}

if(localStorage.getItem("bookId"))
{
            // get description of book to populate form with existing value
            fetch('/'+'api/book/'+ localStorage.getItem("bookId"),{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            // Converting received data to JSON
            .then(response => {
                if(response.ok){
                    return response.json()
                }else{
                    return response.json()
                }
            })
            .then(data => {
                console.log(data)
                document.getElementById("title").value = data.title
                document.getElementById("author").value = data.author
                document.getElementById("category").value = data.category
                document.getElementById("floor").value = data.floor
                document.getElementById("shelf").value = data.shelf
            })
            .catch(error => console.log(error));
            // end
}
