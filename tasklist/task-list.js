import task from "./task.js";

const taskList = document.querySelector(".task-list")
const sidePanelBtn = document.querySelector(".side-panel-btn")
const createTask = document.querySelector(".create-task")
const saveTasks = document.querySelector(".save-task")
const sidePanel = document.querySelector(".side-panel")
const panelMarkAll = document.querySelector(".panel-mark-all")
const panelClearAll = document.querySelector(".panel-clear-all")
const APILink = "/taskList/"
const headers = {"Content-type": "application/json"}



const markAll = document.querySelector(".mark-all-btn")
const unMarkAll = document.querySelector(".umark-all-btn")

const clearAll = document.querySelector(".clear-all-btn")
const clearComplete = document.querySelector(".clear-complete-btn")
const clearIncomplete = document.querySelector(".clear-incomplete-btn")

const statElements = {
    total: document.getElementById('totalTasks'),
    pending: document.getElementById('pendingTasks'),
    completed: document.getElementById('completedTasks'),
    overdue: document.getElementById('overdueTasks')
};

function actionListeners(newTask){
    markAll.addEventListener('click', () =>{
        if (!newTask.getStatusValue()){
            newTask.status.click()
        }
    })
    unMarkAll.addEventListener('click', () => {
        if (newTask.getStatusValue()){
            newTask.status.click()
        }
    })


    clearAll.addEventListener('click', () =>{
        newTask.deleteButton.click()
    })

    clearComplete.addEventListener('click', () =>{
        if (newTask.getStatusValue()){
            newTask.deleteButton.click()
        }
    })

    clearIncomplete.addEventListener('click', () => {
        if (!newTask.getStatusValue()){
            newTask.deleteButton.click()
        }
    })
}

function updateStats(){
    
    const taskData = getTaskValues()
    let total = taskData.length;
    let pending = taskData.filter(t => t.status === "false").length;
    let completed = taskData.filter(t => t.status === "true").length
    
    let overdue = 0;
    
    statElements.total.innerText = total
    statElements.pending.innerText = pending
    statElements.completed.innerText = completed


}

function getTaskValues(){
    const allTasks = taskList.querySelectorAll('.task')
    let taskData = []
    allTasks.forEach(taskElement => {
        
        const descriptionElement = taskElement.querySelector('.task-description');
        const dueDateElement = taskElement.querySelector('.task-due-date');
        const statusElement = taskElement.querySelector('.status');
        
        const description = descriptionElement.dataset.description
        const dueDate = dueDateElement.value;
        const status = statusElement.dataset.status;

        
            taskData.push(
            {
                description: description,
                date: dueDate,
                status: status,

            })
        }
    )
    return taskData
    
}

const populatePreviousTasks = async () => {
  
    try{
        const response = await fetch(APILink+'retrieve', {
        method: 'GET',
        headers: headers,
    })
    if (response.ok){
        const tasks = await response.json()

        tasks.forEach(item => {
            const newTask =  new task(updateStats)
         
            newTask.populateTask(
                item.description,
                item.status,
                item.date,
                item.id
            )
            newTask.createTask(taskList)
            actionListeners(newTask)
        })

    }
    }catch (err){
        console.error("Failed to populate tasks: ", err)
    }
} 
populatePreviousTasks()

function toggleElements(options){
    const {
        triggerElement,
        targetElements,
        className = "active"
    } = options;
    
    const targets =  Array.isArray(targetElements) ? targetElements : [targetElements]
    triggerElement.addEventListener('click', () => {
        targets.forEach(target => target.classList.toggle(className))
    })
}

createTask.addEventListener('click', () => {
    const newTask = new task(updateStats)
    newTask.createTask(taskList)
    actionListeners(newTask)

})



saveTasks.addEventListener('click', async () => {
    try {
    const taskData = getTaskValues()
    console.log(taskData)
    const response = await fetch(APILink+'save', {
        method : 'POST',
        headers : headers,
        body: JSON.stringify({ content: taskData })
    })
    if (response.ok){
        console.log("saved successfully")
    }else if (response.status === 409){
        alert("Duplicate items will skip saving.")
    }

}catch (err){
    console.error("Error saving tasks:", err)
}
})


toggleElements({
    triggerElement: panelClearAll,
    targetElements: panelClearAll
})

toggleElements({
    triggerElement: panelMarkAll,
    targetElements: panelMarkAll
})


toggleElements({
    triggerElement: sidePanelBtn,
    targetElements: [sidePanel, sidePanelBtn]
})


