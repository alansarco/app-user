const btn = document.getElementById('btn_request');
const modal_request = document.getElementById('modal_request');
const btn_close = document.getElementsByClassName('close_btn');
const request_document_form = document.getElementById('request_document_form');
const request_success =  document.getElementById('request_success');
const request_error =  document.getElementById('request_error');
btn.addEventListener('click', () => {
    modal_request.style.display = 'flex';
})

btn_close[0].addEventListener('click', () => {
    modal_request.style.display = 'none';
    request_success.style.display = 'none';
    request_error.style.display = 'none';

    document.getElementById('dateNeeded').value = null
    document.getElementById('purpose').value = null
})


// request some shit

request_document_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const uri = '/create-request';
    var data = {
        documentType: document.getElementById('documentType').value,
        dateNeeded: document.getElementById('dateNeeded').value,
        purpose: document.getElementById('purpose').value
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(uri, requestOptions).then(response => {
        if(!response.ok){
            throw new Error(`Http Error! response: ${response.status}`)
        }
        return response.json();
    }).then( data => {
        if(data.res == 200){
            request_success.style.display = 'block';
        }
        else if(data.res == 500){
            request_error.style.display = 'block';
        }
        else if(data.res == 501){
            console.log('Error on making a request');
        }
    })
    .catch(error => {
        console.error(`Fetch Error: ${error}`);
    });
})