const APILink = "/taskList/actions/"

export async function deleteTask(task){
    if(!task.id){
        return
    }
    try{
        const result = await fetch(APILink+"delete",{
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({content: task}),
            credentials: "include"
            
        })
    }catch (err){
        console.log("Failed to delete task", err)
        

    }
}


export async function updateDescription(task) {
     if(!task.id || !task.description){
        return 
    }
     try{
        const result = await fetch(APILink+"update/description",{
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({content: task}),
            credentials: "include"
            
        })
    }catch (err){
        console.log("Failed to delete task", err)
        

    }
}

export async function updateDueDate(task) {
     if(!task.id || !task.dueDate){
        return 
    }
     try{
        const result = await fetch(APILink+"update/dueDate",{
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({content: task}),
            credentials: "include"
            
        })
    }catch (err){
        console.log("Failed to delete task", err)
        

    }
}

export async function updateStatus(task) {
     if(!task.id){
        return
    }
     try{
        const result = await fetch(APILink+"update/status",{
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({content: task}),
            credentials: "include"
            
        })
    }catch (err){
        console.log("Failed to delete task", err)
        

    }
}