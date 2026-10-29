
function Message({message}){
    return(
        <div
            className={
                message.role === "user"? "message user-message": "message assistant-message"
            }
        >
            <div className="message-role">
                {message.role === "user" ? "You":"AI"} 
            </div>
            <div className="message-text">
                {message.content}
            </div>
        </div>
    )
}

export default Message