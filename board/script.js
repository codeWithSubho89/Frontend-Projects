const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')

let dragElement = null;

const taskData = {};

function getDataFromLocal(){
    const data = JSON.parse(localStorage.getItem('taskData'))

    for( let col in data){
        const column = document.querySelector(`#${col}`)

        data[col].forEach(task => {
            createTask(task.title,task.text,column)
        })
    }
    updateCount()
}
getDataFromLocal()
const tasks = document.querySelectorAll('.task')
tasks.forEach(task => {
    task.addEventListener("drag",()=>{
        dragElement = task;
    })
})


function hoverEffect(elem){
    elem.addEventListener("dragenter",(e)=>{
        e.preventDefault()
        elem.classList.add('hover-over')
    })
    elem.addEventListener("dragleave",(e)=>{
        e.preventDefault()
        elem.classList.remove('hover-over')
    })

    elem.addEventListener("dragover",(e) => {
        e.preventDefault()
    })

    elem.addEventListener("drop",(e)=>{
        e.preventDefault()

        elem.classList.remove('hover-over')
        elem.appendChild(dragElement)
        updateCount()
        setDataTolocal()
    })
}

function updateCount(){
    [todo,progress,done].forEach(col => {
        const tasks = col.querySelectorAll('.task') || null
        const count = col.querySelector('.right')
        count.textContent = tasks.length
        
    })
}

function setDataTolocal(){
    // localStorage.clear()
     [todo,progress,done].forEach(col => {
        const tasks = col.querySelectorAll('.task') || null
        
        taskData[col.id] = Array.from(tasks).map(task => {
            return {
                title: task.querySelector('h2').innerHTML,
                text: task.querySelector('p').innerHTML
            }
        })
        
    })
    localStorage.setItem('taskData',JSON.stringify(taskData))
    updateCount()
}


hoverEffect(todo)
hoverEffect(progress)
hoverEffect(done)

const toggleModalBtn = document.querySelector('#toggleModal')
const modalBg = document.querySelector('.modal .bg')
const modal = document.querySelector('.modal')
const addBtn = document.querySelector('#addBtn')

toggleModalBtn.addEventListener("click",()=>{
    modal.classList.toggle('active')
})
modalBg.addEventListener("click",()=>{
    modal.classList.toggle('active')
})


addBtn.addEventListener('click',()=>{

    const tastTitle = document.querySelector('#taskTitle').value
    const description = document.querySelector('#description').value

    createTask(tastTitle,description,todo)
    updateCount()
    setDataTolocal()
    modal.classList.remove('active')
})

function createTask(title,desc,col){
    const div = document.createElement('div')
    div.classList.add('task')
    div.setAttribute('draggable','true')

    div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}<p>
    <button>Delete</button>
    `
    col.appendChild(div)

    div.addEventListener('drag',()=>{
        dragElement = div
    })

    const deletBtn = div.querySelector('button')
    deletBtn.addEventListener('click',()=>{
        div.remove()
        updateCount()
    })
    
}

document.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
        addBtn.click()
    }
})