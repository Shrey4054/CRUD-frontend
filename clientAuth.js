const email = document.querySelector(".email")
const password = document.querySelector(".password")
const register = document.querySelector(".register")
const login = document.querySelector('.form')



const API_URL = "http://localhost:3000/Auth/action"
const headers = {'Content-Type': 'application/json'}

login.addEventListener('submit', async (event) =>{

    event.preventDefault()
    const emailValue = email.value.trim()
    const passwordValue = password.value
    

   const response = await fetch(API_URL,{
        method: "POST",
        headers: headers,
        body: JSON.stringify({"email": emailValue , "password": passwordValue}) //encrypted value
   })
  

           if(response.status === 200){
               const parsed = await response.json()
               window.location.href = parsed.link
               return
               
          }else{
          
          const msg = await response.text()
          appendErrors(msg)
          }
     
})

register.addEventListener('click', async () => {
     
     if (!validEmail()){
          appendErrors("Invalid Email.")  
         
     }else if (!validPassword()){
          appendErrors("Invalid password. Password must contain at least 8 characters.")
          
     }else{
          const response = await fetch(`${API_URL}/register`, {
               method: "POST",
               headers: headers,
               body : JSON.stringify({"email" : email.value.trim(), "password": password.value})
          })
          if(response.status === 200){
               const parsed = await response.json()
               window.location.href = parsed.link
          }
          

     }
})


function appendErrors(err){
     const existingWarning = login.querySelectorAll("p")
     existingWarning.forEach(w => w.remove())

     const warning = document.createElement("p")
     warning.textContent = err
     warning.style.color = "red"

     login.appendChild(warning)
}


function validEmail(){
const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
const e = email.value.trim()
     
     return regex.test(e)
}

function validPassword(){
     const value = password.value.trim()
     
     return value.length >= 8
     
}



     