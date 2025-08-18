export default class popup{
    constructor() {
        this.popupHtml = `
                    
                    <section class= "container">
                    <h3 class = "popUpTitle">Enter Title</h3>
                    <textarea class = "popuptextarea" id="popuptextarea" name="popuptextarea" placeholder="title" class = "enter_title"></textarea>
                    <span class="button_container">
                        <button class="Cancel_button">Cancel</button>
                        <button class="Create_button">Create</button>    
                    </span>
                    </section>
                `

        this.popupElement = document.createElement('div')
        this.popupElement.innerHTML = this.popupHtml
       
        this.popupElement.classList.add('popup')
        this.createButton = this.popupElement.querySelector('.Create_button')
        this.cancelButton = this.popupElement.querySelector('.Cancel_button')
        this.popUpTitle = this.popupElement.querySelector('textarea')
    }

    reset(){
        this.popUpTitle.value = ""
    }

    open(){
            this.popupElement.style.visibility = "visible"
            this.popupElement.style.pointerEvents = "all";
            document.body.appendChild(this.popupElement)
            return this.addlistener()
        }
    close(){
            this.popupElement.style.visibility = "hidden"
            this.popupElement.style.pointerEvents = "none";
        }
    
    
    addlistener(){
        return new Promise((resolve, reject) => {

    

        this.createButton.addEventListener('click', () =>{
            const title = this.popUpTitle.value.trim() || null
            this.close()
           
            resolve(title)
        })

        this.cancelButton.addEventListener('click', () => {
            this.reset()
            this.close()
            resolve(null)
        })
    }
    )}
}






