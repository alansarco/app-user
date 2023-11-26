// open and close the damn modal

const modal_container = document.getElementsByClassName('comment_container');
const modal_btn = document.getElementsByClassName('comment_btn');


for(let x = 0; x < modal_container.length; x++){
    modal_btn[x].addEventListener('click', () => {
        modal_container[x].style.display = "flex";
    })
}