// IT makes link active in navbar
document.getElementById('nav-admin-signup').classList.add("active");
window.onunload = function(){
    document.getElementById('nav-admin-signup').classList.remove("active");
}

const admin_signupForm = document.getElementById('admin_signupForm');
if(admin_signupForm){

    admin_signupForm.addEventListener('submit', function(e){
        e.preventDefault()
        // sending SignUp credential and if valid then redirect to student_view.html page
        fetch('/'+'api/admin-signup/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem("access_token")
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
                window.location.href = "/";
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
}
