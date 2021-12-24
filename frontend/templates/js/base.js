// member
if ((localStorage.getItem("is_superuser")) == null){
    document.getElementById("nav-add-book").remove();
    document.getElementById("nav-my-books").remove();
    document.getElementById("nav-admin-signup").remove();
    document.getElementById("nav-logout").remove();
    document.getElementById("nav-issue-book").remove();
    document.getElementById("nav-return-book").remove();
}
// superuser
else if(localStorage.getItem("is_superuser") == "True"){
    document.getElementById("nav-add-book").remove();
    document.getElementById("nav-my-books").remove();
    document.getElementById("nav-admin-login").remove();
    document.getElementById("nav-issue-book").remove();
    document.getElementById("nav-return-book").remove();
    addLogoutListner();
}
// admin
else if(localStorage.getItem("is_superuser") == "False"){
    document.getElementById("nav-admin-login").remove();
    document.getElementById("nav-admin-signup").remove();
    addLogoutListner();
}


function addLogoutListner(){
    const logout = document.getElementById("nav-logout")
    logout.addEventListener("click", function (e){
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("is_superuser");
            window.location.href = "/";
    })
}
