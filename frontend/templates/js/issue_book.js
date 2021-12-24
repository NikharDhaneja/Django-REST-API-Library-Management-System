// It makes link active in navbar
document.getElementById('nav-issue-book').classList.add("active");
window.onunload = function(){
    document.getElementById('nav-issue-book').classList.remove("active");
}

const issue_bookForm = document.getElementById('issue_bookForm');
if(issue_bookForm){

    issue_bookForm.addEventListener('submit', function(e){
        e.preventDefault()
        // Sending request to issue book
        fetch('/'+'api/issue-book/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                book: document.getElementById("book-id").value,
                copy_no: document.getElementById("copy-no").value,
                borrower: document.getElementById("borrower-id").value,
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log("issued successfully");
                return response.json();
             }
             else {
                 console.log("res"+ response);
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
