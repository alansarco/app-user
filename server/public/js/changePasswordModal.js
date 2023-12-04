const modal = document.getElementById('modal_change_pass');
const close_modal = document.getElementById('close_pass');
const open_modal = document.getElementById('open_modal_change_pass');
const form = document.getElementById('form_change_pass');


open_modal.addEventListener('click', () => {
    modal.style.display = 'flex';
})

close_modal.addEventListener('click', () => {
    modal.style.display = 'none';
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
})