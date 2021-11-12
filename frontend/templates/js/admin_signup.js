const admin_signupForm = document.getElementById('admin_signupForm');
if(admin_signupForm){

    admin_signupForm.addEventListener('submit', function(e){
        e.preventDefault()
        // sending SignUp credential and if valid then redirect to student_view.html page
        fetch('/'+'api/admin-signup/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log(response)
                getToken()
             }
            else {
                console.log("signup form "+response)
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    })

    function getToken()
    {
        // Generates token and store it in local storage
        fetch('/'+'api/admin-login/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
             }
             else {
                 console.log("token   "+ response);
             }
        })
        .then(data => {
            localStorage.setItem("token", data.access);
            localStorage.setItem("tokenrefresh", data.refresh);
            window.location.href = "/"+"student-view";
        })
        .catch(error => {
            console.log(error);
        })
    }

}
