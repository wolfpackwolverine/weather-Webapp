

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value

    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''

fetch('http://localhost:3000/weather?address='+location).then((Response) => {
    Response.json().then((data) => {
        if(data.error){
            messageone.textContent = data.error
            messagetwo.textContent = ''
            console.log(data.error)
        }else{
            messageone.textContent = data.description
            messagetwo.textContent = 'temp: ' + data.temp
            console.log(data)
        }
    })
})
    
})