const form = document.getElementById('login_form');

form.addEventListener('submit', (e) => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
  
    // setup some stuff
    const uri = '/login';
    let value = {
        username: username.value,
        password: password.value
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    }

    fetch(uri, requestOptions)
    .then(response => {
        if(!response.ok){
            throw new Error(`Http Error! response: ${response.status}`)
        }
        console.log('Response:', response);
        return response;
    })
    .catch(error => {
        console.error(`Fetch Error: ${error}`);
    });
})