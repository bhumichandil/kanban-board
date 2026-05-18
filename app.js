let taskdata ={

}

const todo = document.querySelector('#todo');
const Progress = document.querySelector('#progress');
const done = document.querySelector('#done');

let dragElement = null;

function addtask(title,description,column){
    const div = document.createElement("div");

        div.classList.add("task");
        div.setAttribute("draggable","true");

        div.innerHTML = 
        `<h2>${title}</h2>
        <p>${description}</p>
        <button>Delete</button>`;

        column.appendChild(div);
        div.addEventListener("drag",(e)=>{
            dragElement = div;
        });

        const deletebutton = div.querySelector("button");
        deletebutton.addEventListener("click",()=>{ 
            div.remove();
            updatetaskcount();
        });
        return div;
    }

    function updatetaskcount(){
         [todo,Progress,done].forEach(col=>{

         const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskdata[col.id] = Array.from(tasks).map(t=>{
            return{
                title: t.querySelector("h2").innerText,
                description: t.querySelector("p").innerText
            }
        });
        localStorage.setItem("taskdata",JSON.stringify(taskdata));
        count.innerText = tasks.length;
    })

}


if(localStorage.getItem("taskdata")){
    const data = JSON.parse(localStorage.getItem("taskdata"));
    // taskdata = data;


    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task=>{
            addtask(task.title,task.description,column);
})
// const tasks = column.querySelectorAll(".task");
// const count = column.querySelector(".right");
// count.innerText = tasks.length;

    }
updatetaskcount();
}

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
  task.addEventListener("drag",(e)=>{
    // console.log("dragging",e);
    dragElement = task;
  })
})

// Progress.addEventListener("dragenter",(e)=>{
//     Progress.classList.add("hover-over");
// })

// Progress.addEventListener("dragleave",(e)=>{
//     Progress.classList.remove("hover-over");
// })

function addDragEventsOnColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })


    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    }) 

    column.addEventListener("drop",(e)=>{
        e.preventDefault();


       column.appendChild(dragElement);
       column.classList.remove("hover-over");

        // [todo,Progress,done].forEach(col=>{
        // const tasks = col.querySelectorAll(".task");
        // const count = col.querySelector(".right");

        // taskdata[col.id] = Array.from(tasks).map(t=>{
        //     return{
        //         title: t.querySelector("h2").innerText,
        //         description: t.querySelector("p").innerText
        //     }
        // });
        // localStorage.setItem("taskdata",JSON.stringify(taskdata));
        // count.innerText = tasks.length;

        updatetaskcount();
    })

}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(Progress);
addDragEventsOnColumn(done); 

const toggleModalbutton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");
toggleModalbutton.addEventListener("click",()=>{
    modal.classList.toggle("active");
})

modalbg.addEventListener("click",()=>{
    modal.classList.remove("active");
})

const addtaskbutton = document.querySelector("#add-new-task");

addtaskbutton.addEventListener("click",()=>{
     const taskTitle = document.querySelector("#task-title-input").value;
    const taskDescription = document.querySelector("#task-description-input").value;

    addtask(taskTitle,taskDescription,todo);
    
    //    [todo,Progress,done].forEach(col=>{
    //     const tasks = col.querySelectorAll(".task");
    //     const count = col.querySelector(".right");

    //     taskdata[col.id] = Array.from(tasks).map(t=>{
    //         return{
    //             title: t.querySelector("h2").innerText,
    //             description: t.querySelector("p").innerText
    //         }
    //     });
    //     localStorage.setItem("taskdata",JSON.stringify(taskdata));
    //     count.innerText = tasks.length;

    updatetaskcount();
    // div.addEventListener("drag",(e)=>{
    //     dragElement = div;})

    modal.classList.remove("active");

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-description-input").value="";
})
