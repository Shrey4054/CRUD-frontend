

const list = document.querySelectorAll('.items-list li');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');


const API_URLS = [
    "https://crud-backend-cerb.onrender.com/redirect/protected/Journal",
    "https://crud-backend-cerb.onrender.com/redirect/protected/tasklist",
]





list.forEach((element, index) => {
    element.addEventListener('click', async () =>{
        const API_URL = API_URLS[index]
        const response =  await fetch(API_URL, {
            method: "POST",
            headers:  {'Content-Type': 'application/json'}
        })
        if(response.ok){
            const parsed = await response.json()
            window.location.href = parsed.link
            
        }
    })
});




function addListEventListener(){
    //read a json file

}

