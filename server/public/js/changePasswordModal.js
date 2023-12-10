

const modal = document.getElementById('modal_change_pass');
const close_modal = document.getElementById('close_pass');
const open_modal = document.getElementById('open_modal_change_pass');
const form = document.getElementById('form_change_pass');

// passwords 
const currentPassword = document.getElementById('current_password');
const newPassword = document.getElementById('new_password');
const confirmNewPassword = document.getElementById('confirm_new_password');
const errorOnPassword = document.getElementById('password_error');
const successOnPassword = document.getElementById('password_success');
// functions
open_modal.addEventListener('click', () => {
    modal.style.display = 'flex';
})

close_modal.addEventListener('click', () => {
    modal.style.display = 'none';
    errorOnPassword.style.display = 'none';
    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
})



// fetch data from api
// send some data
const uri3 = '/changePassword';


form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(currentPassword.value);
    console.log(newPassword.value);
    console.log(confirmNewPassword.value);

    const value3 = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        confirmNewPassword: confirmNewPassword.value 
    }
    const requestOptions3 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value3)
    }

    fetch(uri3, requestOptions3).then(response => {
        if(!response.ok){
            errorOnPassword.style.display = 'block';
        }
        else{
            errorOnPassword.style.display = 'none';
        }
        return response.json();
    })
    .then(data => {
        if(data.res != 200){
            errorOnPassword.style.display = 'block';
            errorOnPassword.textContent = 'Old pass does not match!';
        }else{
            successOnPassword.style.display = 'block';
            successOnPassword.textContent = 'Password Changed!';
            window.location.href = "/logout";
        }
        if(value3.newPassword != value3.confirmNewPassword){
            errorOnPassword.style.display = 'block';
            errorOnPassword.textContent = 'New password does not match!';
        }
    })
    .catch(error => {
        console.error(`Fetch Error: ${error}`);
    });

    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
})