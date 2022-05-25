const socket = io()

const divMessages = document.querySelector("#divMessages")
const button = document.querySelector("#button")


button.addEventListener("click",(event) =>{
    const inputName = document.querySelector("#chatName").value
    const inputMessage = document.querySelector("#chatMessage").value
    const message = {
        author: inputName,
        text: inputMessage
    }
    console.log(message)
    socket.emit("newMessage",message)
})


socket.on('messages',(messages) =>{
    console.log(messages)
        divMessages.innerHTML = messages.map(message => {
            return(
                `<div>
                <strong>${message.author}</strong>:
                <em>${message.text}</em>
                </div>`
            )
        }).join(" ")
})