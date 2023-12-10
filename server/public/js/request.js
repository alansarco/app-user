const btn = document.getElementById('btn_request');
const modal_request = document.getElementById('modal_request');
const btn_close = document.getElementsByClassName('close_btn');

console.log('shite')
btn.addEventListener('click', () => {
    modal_request.style.display = 'flex';
})

btn_close[0].addEventListener('click', () => {
    modal_request.style.display = 'none';
})