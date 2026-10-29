import { loadPDF } from "../rag/documentLoader.js";
import { splitDocument } from "../rag/textSplitter.js";
import vectorStore from "../rag/vectorStore.js";

export const uploadDocument = async(req, res)=>{
    try {
        if(!req.file){
            return res.status(400).json({msg:"PDF file is required"})
        }

        const result = await loadPDF(req.file.path)

    const documents = await splitDocument(
        result.text, {
            source: req.file.originalname
        }
    )

    await vectorStore.addDocuments(documents)

    console.log("Documents stored in MongoDB")
    return res.status(201).json({
        message: "PDF process and stored successfully",
        filename: req.file.originalname,
        pages: result.pages,
        totalChunks: documents.length
    })

    } catch (error) {
        console.log(error.message)
    }
}