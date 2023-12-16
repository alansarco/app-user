// send some data
const uri = 'https://app-user-obuwk.ondigitalocean.app/pagination';
const value = {
    pageSize: 3
}
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(value)
}
// button click to load more
const load = document.getElementById('load_more');
load.addEventListener('click', () => {
    fetch(uri, requestOptions)
    .then(response => {
        if(!response.ok){
            throw new Error(`Http Error! response: ${response.status}`)
        }
        console.log(response);
        location.reload();
        return response;
    })
    .catch(error => {
        console.error(`Fetch Error: ${error}`);
    });
});


//button click to send data in form
// send some data
const uri2 = '/create-comment';
const comment_section2 = document.getElementsByClassName('comment-section');
const send_btn = document.getElementsByClassName('comment_form');
for(let x = 0; x < send_btn.length; x++){
    send_btn[x].addEventListener('submit', (e) => {
        e.preventDefault();
        const value = {
            comment: document.getElementsByClassName('comment_content')[x].value,
            postid: document.getElementsByClassName('comment_id')[x].value
        }
        const requestOptions2 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        }

        // checks if comment is empty or not
        if(value.comment == '' || value.comment.trim() == ''){
            console.log('Please Enter value');
        }else{
                fetch(uri2, requestOptions2)
                .then(response =>{
                    if(!response.ok){
                        throw new Error(`Http Error! response: ${response.status}`)
                    }
                    const div = document.createElement('div');
                    div.classList.add('p-4', 'bg-blue-fade', 'w-4/5', 'mt-4', 'rounded-lg', 'shadow-sm', 'cursor-pointer', 'text-xxs')
                    div.innerHTML = `
                        <header>
                                <span class="font-bold text-white">You</span>
                        </header>
                        <main>${value.comment}</main>
                    `;
                    comment_section2[x].appendChild(div);
                    console.log(response.user);
                    document.getElementsByClassName('comment_content')[x].value = '';
                })
                .catch(error => {
                    console.error(`Fetch Error: ${error}`);
                });
            
        }

    })
}
