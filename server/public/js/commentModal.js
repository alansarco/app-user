// open and close the damn modal

const modal_container = document.getElementsByClassName('comment_container');
const modal_btn = document.getElementsByClassName('comment_btn');
const close_btn = document.getElementsByClassName('close_btn');


for(let x = 0; x < modal_container.length; x++){
    modal_btn[x].addEventListener('click', () => {
        modal_container[x].style.display = "flex";
    })
}

for(let x = 0; x < modal_container.length; x++){
    close_btn[x].addEventListener('click', () => {
        modal_container[x].style.display = "none";
    })
}

//button click to send data in form
const send_btn = document.getElementsByClassName('comment_form');
for(let x = 0; x < modal_container.length; x++){
    send_btn[x].addEventListener('submit', (e) => {
        e.preventDefault();
    })
}