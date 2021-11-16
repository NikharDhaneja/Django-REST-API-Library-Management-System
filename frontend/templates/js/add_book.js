// It makes link active in navbar
document.getElementById('nav-add-book').classList.add("active");
window.onunload = function(){
    document.getElementById('nav-add-book').classList.remove("active");
}

const add_bookForm = document.getElementById('add_bookForm');
if(add_bookForm){

    add_bookForm.addEventListener('submit', function(e){
        e.preventDefault()
        // Sending request to Create an entry for Book
        fetch('/'+'api/book/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem("access_token"),
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
