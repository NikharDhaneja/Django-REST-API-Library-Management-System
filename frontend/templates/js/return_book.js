// It makes link active in navbar
document.getElementById('nav-return-book').classList.add("active");
window.onunload = function(){
    document.getElementById('nav-return-book').classList.remove("active");
}

const return_bookForm = document.getElementById('return_bookForm');
if(return_bookForm){

    return_bookForm.addEventListener('submit', function(e){
        e.preventDefault()
        // Sending request to issue book
        fetch('/'+'api/return-book/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                book: document.getElementById("book-id").value,
                copy_no: document.getElementById("copy-no").value,
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log("returned successfully");
                return response.json();
             }
             else {
                 console.log("Unsuccessful"+ response);
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
