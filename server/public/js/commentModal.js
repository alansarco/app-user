// open and close the damn modal

const modal_container = document.getElementsByClassName('comment_container');
const modal_btn = document.getElementsByClassName('comment_btn');
const close_btn = document.getElementsByClassName('close_btn');
const comment_section = document.getElementsByClassName('comment-section');
// ?data=${encodeURIComponent(dataToSend)}
const postId = document.getElementsByClassName('postid');


for(let x = 0; x < modal_container.length; x++){
    modal_btn[x].addEventListener('click', () => {
        modal_container[x].style.display = "flex";
        const apiUrl = `http://localhost:4000/get-comment?postid=${encodeURIComponent(postId[x].value)}`;

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
                // Handle the data
                for(let z = 0; z < data.results.length; z++){
                    var div = document.createElement('div');
                    div.innerHTML = `
                    <div class="p-4 bg-blue-100 w-4/5 mt-4 rounded-lg shadow-sm">
                            <header>
                                    <span class="font-bold">${data.results[z].created_by}</span>
                            </header>
                            <main>${data.results[z].content}</main>
                    </div>
                    `
                    comment_section[x].appendChild(div);
                }
                console.log('Data from the API:', data);
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

//button click to send data in form
const send_btn = document.getElementsByClassName('comment_form');
for(let x = 0; x < modal_container.length; x++){
    send_btn[x].addEventListener('submit', (e) => {
        e.preventDefault();
    })
}
