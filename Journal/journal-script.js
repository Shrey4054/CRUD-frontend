

const textArea = document.getElementById('journal')
const saveButton = document.getElementById('save_button')
const createButton = document.getElementById('create_button')
const downloadButton = document.getElementById('download_button')
const titleArea = document.getElementById('titleArea')
const entriesPanel = document.getElementById('entries')

const API_URL = "https://crud-backend-cerb.onrender.com/journal/action"
const headers = {'Content-Type': 'application/json'}

import popup from "./popup.js"
const popUp = new popup()





const autoSave = setInterval(() =>{
    saveEntry()
},120 * 1000)



const journalState = {
    currentId : null,
    reset() {
        this.currentId = null,
        textArea.value = "",
        titleArea.value = ""

    },
    setTitle(title){
        titleArea.value = title
    },setText(text){
        textArea.value = text
    }, setCurrentId(id){
        this.currentId = id
    }
}



async function saveEntry(paramTitle){
    const text = textArea.value
    let title = titleArea.value.trim() || paramTitle
    title = title || (text ? text.slice(0,30) + "..." : "N/A")
    



    let method = journalState.currentId ? 'PUT' : "POST"

    
    try{
        const body = {
            title : title,
            text : text
        }

        if (journalState.currentId){
            body.id = journalState.currentId
        }
        const response  = await fetch( API_URL ,{
        method,
        headers: headers,
        credentials: "include" ,
        body: JSON.stringify(body),
        credentials: "include"
    })   
    if (response.ok){
        console.log(response.status)
        const resID = await response.json()
        journalState.currentId = resID
        
    }
    }catch (err){
        console.error("Failed to save entry: ",err)
    }finally{
        await loadEntries()
    }
}

downloadButton.addEventListener('click', () => {
    const title = titleArea.value 
    const text = textArea.value

    if(!text){
        return
    }

    const blob = new Blob([text], {'type':'text/plain'})
    const Url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = Url
    a.download = title.trim() ? title : "journalEntry"

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(Url)
    
})


createButton.addEventListener('click', async () => {
    try{
    journalState.reset()
    const title = await popUp.open()
    if (!title){
        return
    }
    titleArea.value = title
    saveEntry(title)
    popUp.reset()
    }catch(err){
        console.error("Failed to create an entry: ",err)
    }
    
})



saveButton.addEventListener('click', async () => {
    saveEntry("")
})


async function loadEntries (){
    try{
    const res = await fetch(API_URL, 
        {
            credentials: "include"
        }
    )
    const data = await res.json()

    data.sort((a,b) => {return b.date - a.date})
    entriesPanel.innerHTML = ""

    let lastDate = null
   



    
    data.forEach(element => {
        const currentDate = formatDate(element.date)
        if (currentDate != lastDate){
            const timestamp = document.createElement('span')
            timestamp.textContent = currentDate
            entriesPanel.appendChild(timestamp)
        }
        
        const li = document.createElement('li')
        li.textContent = `${element.id} : ${element.title}`

       

        li.addEventListener('dblclick',async () => {
            textArea.value = element.text
            titleArea.value = element.title
            journalState.currentId = element.id

            
        })
        let styleTimeout, holdTimer
        li.addEventListener('mousedown', () => {
            styleTimeout = setTimeout(() =>  li.classList.add("removing"), 200)
            
            holdTimer = setTimeout(async () =>{
            
                try{
                
                    const response = await fetch(API_URL,  {
                        method: 'DELETE',
                        headers: headers,
                        body : JSON.stringify({id : element.id }),
                        credentials: "include"

                    })

                    if (response.ok){
                        console.log(response.status)
                        journalState.reset()
                        await loadEntries()}
                    
                }catch (err){
                    console.error(err)
                }
            
            },1200)
          
        })

        li.addEventListener('mouseup', () =>{
            clearTimeout(styleTimeout)
            clearTimeout(holdTimer)
            
            li.classList.remove("removing")
        })
        lastDate = currentDate
        entriesPanel.appendChild(li)
    });

    }catch (err){
        console.error("Failed to load entries: ",err)
    }
    
}



function formatDate(date) {
    const timestamp = new Date(date) 
    
    const mm = String(timestamp.getMonth() + 1).padStart(2,'0')
    const dd = String(timestamp.getDate()).padStart(2,'0')
    const yy = String(timestamp.getFullYear())

    return `${mm}/${dd}/${yy}`


}


(async function init() {
    try{

    journalState.reset()
    await loadEntries()
    }catch (err){
        console.error("Failed to initialize journal: ",err)
    }
})()




