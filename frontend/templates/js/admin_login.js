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
            localStorage.setItem("token", data.access);
            localStorage.setItem("tokenrefresh", data.refresh);
            window.location.href = "/"+"student-view";
        })
        .catch(error => {
            console.log(error);
        })

    })

}
