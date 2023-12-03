// open and close the damn modal

const modal_container = document.getElementsByClassName('comment_container');
const modal_btn = document.getElementsByClassName('comment_btn');
const close_btn = document.getElementsByClassName('close_btn');
const comment_section = document.getElementsByClassName('comment-section');
// ?data=${encodeURIComponent(dataToSend)}
const postId = document.getElementsByClassName('postid');


for(let x = 0; x < modal_container.length; x++){
    modal_btn[x].addEventListener('click', () => {
        requestData = {
            data: postId[x].value
        }
        const queryParams = new URLSearchParams(requestData).toString()
        modal_container[x].style.display = "flex";
        const apiUrl = `/get-comment?${queryParams}`;

        // Make a GET request using the Fetch API
        fetch(apiUrl)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                comment_section[x].innerHTML = '';
                // Handle the data
                if(data.results.length <= 0){
                    var div = document.createElement('div');
                    div.classList.add('p-4', 'w-4/5', 'mt-4', 'rounded-lg');
                    div.innerHTML = `
                    <header class='text-center'>
                        <span class="font-bold">No Comments</span>
                    </header>
                    <main></main>
                    `
                    comment_section[x].appendChild(div);
                }
                else{
                    for(let z = 0; z < data.results.length; z++){
                        var div = document.createElement('div');
                        div.classList.add('p-4', 'bg-blue-200', 'w-4/5', 'mt-4', 'rounded-lg', 'shadow-sm', 'cursor-pointer')
                        div.innerHTML = `
                            <header>
                                    <span class="font-bold">${data.results[z].created_by}</span>
                            </header>
                            <main>${data.results[z].content}</main>
                        `;
                        
                        console.log('Response:', queryParams);
                        comment_section[x].appendChild(div);
                        
                    }
                }
                
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    })
}

for(let x = 0; x < modal_container.length; x++){
    close_btn[x].addEventListener('click', () => {
        modal_container[x].style.display = "none";
    })
}

