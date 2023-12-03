const token = document.cookie;
if(token == null) {
    window.location.replace("/login");
}