// IT makes link active in navbar
document.getElementById('nav-admin-login').classList.add("active");
window.onunload = function(){
    document.getElementById('nav-admin-login').classList.remove("active");
}

const admin_loginForm = document.getElementById('admin_loginForm');
if(admin_loginForm){

    admin_loginForm.addEventListener('submit', function(e){
        e.preventDefault()
        // sending login credential and if valid then redirect to student_view.html page
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
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem("is_superuser", data.is_superuser)

            window.location.href = "/";
        })
        .catch(error => {
            console.log(error);
        })

    })

}
