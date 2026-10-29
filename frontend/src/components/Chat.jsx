import React, { useState } from 'react'
import Message from './Message'
import axios from "axios"

const Chat = () => {
    const [question, setQuestion] = useState("")
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const askQuestion = async()=>{
        if(!question.trim()){
            return;
        }

        const userQuestion = question

        setMessages((prev)=>[...prev,{
            role: "user", 
            content: userQuestion
        }])
        setQuestion("")

        try {
                setLoading(true)
                const response = await axios.post("http://localhost:3000/api/ai/ask",
                    {
                        question:userQuestion
                    }
                )
                 setMessages((prev)=>[...prev,{
            role: "assistant", 
            content: response.data.answer
        }])
        } catch (error) {
            console.log(error)
             setMessages((prev)=>[...prev,{
            role: "assistant", 
            content: "something went wront while fetching answer"
        }])
        }finally{
            setLoading(false)
        }

    }

    const handleKeyDown = (e)=>{
        if(e.key === "Enter" && !e.shiftkey){
            e.preventDefault()
            askQuestion()
        }
    }
    

  return (
 <div className="chat-box">

    <h2>Ask AI</h2>
    <div className="messages">
        {messages.length === 0 && (
            <div className="empty-message">
                Ask a question about your upload pdf
            </div>
        )}
        {messages.map((message, index)=>
            <Message key={index} message={message} />
        )}
    </div>

       <div className='input-area'>
        <textarea 
            value={question}
            onChange = {(e)=>setQuestion(e.target.value)}
            placeholder = "Ask your question"
        />
    <button onClick={askQuestion} disabled={loading}>{loading? "...": "Send"}</button>
    </div>
 </div>
 
  )
}

export default Chat