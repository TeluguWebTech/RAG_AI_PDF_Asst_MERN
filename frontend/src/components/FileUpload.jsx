import React, { useState } from 'react'
import axios from "axios"

const FileUpload = () => {
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleUpload = async()=>{
        console.log("tetsing to confirm")
        if(!file){
            setMessage("Please selece a pdf")
            return;
        }
        const formData = new FormData()

        formData.append("file", file)

        try {
            setLoading(true)
            setMessage("")
            const response = await axios.post("http://localhost:3000/api/documents/upload", formData)
            setMessage(
                `${response.data.filename} uploaded successfully. ${response.data.totalChunks} chunks created`
            )

        } catch (error) {
            console.log(error.message)
            setMessage("failed to upload pdf")
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='upload-box'>
        <h2>Upload PDF</h2>

        <input type="file" accept='.pdf'
        onChange={(e)=>setFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>{loading? "Processing": "Upload PDF"}</button>
        {message && (
            <div className="upload-message">
                {message}
            </div>
        )}
    </div>
  )
}

export default FileUpload