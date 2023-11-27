// send some data
const uri = '/pagination';
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