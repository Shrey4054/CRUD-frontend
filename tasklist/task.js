import './taskService.js'
import { deleteTask, updateDescription, updateDueDate, updateStatus } from './taskService.js';

export default class task  {
    constructor(updateStatus){

        this.taskHtml = `
    <div data-description = "your task" class= "task-description">your task</div>
    <input data-date='empty' type = "date" class ="task-due-date"></input>
    <div data-status =false class="status">pending</div>
    <div class ='task-buttons'>
      <button class = "edit-button">Edit</button>
      <button class = "delete-button">Delete</button>
    </div>  
  
`
        this.updateStatus = updateStatus
        this.taskElement = document.createElement('div')
        this.taskElement.className = 'task'
        this.taskElement.id = ""
        this.taskElement.innerHTML = this.taskHtml

        this.dueDate = this.taskElement.querySelector(".task-due-date")
        this.deleteButton = this.taskElement.querySelector(".delete-button")
        this.status = this.taskElement.querySelector(".status")
        this.editButton = this.taskElement.querySelector(".edit-button")
        this.description = this.taskElement.querySelector(".task-description")

      


       
    }
    
    createTask(taskList){
        taskList.appendChild(this.taskElement)
        this.addListeners()
        this.updateStatus()
        
       
    }

    


    addListeners(){
        this.dateButton()
        this.deleteButtonUI()
        this.statusButton()
        this.editButtonUI()
        

    }

    dateButton(){
        const today = new Date().toISOString().split('T')[0]
        this.dueDate.setAttribute('min', today)

        const cleanUp = () => {
            this.dueDate.removeEventListener('change', onChange)
        }
        const save = () => {
            this.dueDate.dataset.date = this.getDateValue();
            console.log(this.getDateValue())
            const data = {
                "dueDate": this.getDateValue(),
                "id": this.taskElement.id
            }
            updateDueDate(data);
            
        }

        const onChange = () => {
            save()
            cleanUp()
        }
        this.dueDate.addEventListener('change',() =>  {
            onChange()
        })
            
 }

    deleteButtonUI(){
        this.deleteButton.addEventListener('click', () => {
            this.taskElement.remove()
            this.updateStatus()
            deleteTask(this.getValues())
           
        })

    }

    statusButton(){
        const cleanUp = () => {
            this.status.removeEventListener('click', save)
        }
        const save = () => {
           if (this.status.classList.contains("active")){
                this.status.classList.remove("active")
                this.status.textContent = "pending"
                this.status.dataset.status = false
               
                
        } else{
        this.status.classList.add("active")
        this.status.textContent = "finished"
        this.status.dataset.status = true
        
        } 
        const data = {
            "status": this.getStatusValue(),
            "id": this.taskElement.id
        }
        updateStatus(data)    
        }
        this.status.addEventListener('click', () => {
        
        save()
        cleanUp()
    }
    )
    }

    editButtonUI(){
        const save = () => {
            this.description.setAttribute("contenteditable", "false")
            this.description.dataset.description = this.getDescriptionValue()
            const data = {
                "description": this.getDescriptionValue(),
                "id": this.taskElement.id
            }
            updateDescription(data)
        }
        const cleanup = () => {
            this.description.removeEventListener('focusout', onFocusOut);
            this.description.removeEventListener('keydown', onKeyDown);
        }

        const onFocusOut = () => {
            save()
            cleanup()
        }

        const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            save();
            cleanup();
        }
    }
        this.editButton.addEventListener('click', () => {
            this.description.setAttribute("contenteditable", "true");
            this.description.focus();
            this.description.textContent = ""

            this.description.addEventListener('focusout', onFocusOut);
            this.description.addEventListener('keydown', onKeyDown);
    })
}


    //----Utility Method----//
    getValues(){
            return {
                "description": this.getDescriptionValue(),
                "dueDate": this.getDateValue(),
                "status": this.getStatusValue(),
                "id": this.taskElement.id
            }
        
    }

    getDescriptionValue(){
        return this.description.textContent
    }

    getStatusValue(){
        return this.status.classList.contains("active")
    }

    getDateValue(){
        
        return this.dueDate.value   
    }

    populateTask(
        description,
        status,
        dueDate,
        id
    ){
        this.description.textContent = description
        this.description.dataset.description = description

        this.dueDate.value = dueDate.split('T')[0]
        this.dueDate.dataset.date = dueDate

        this.taskElement.id = id

        this.status.dataset.status = status
        if (status){
            this.status.classList.add("active") 
            this.status.textContent = "finished"
        }else{
            this.status.textContent = "pending"
        } 
        
    }
} 

