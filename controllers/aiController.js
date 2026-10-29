import { askQuestion } from "../rag/ragChain.js";


export const askAI = async(req, res)=>{
    try {
        const {question} = req.body;

        if(!question){
            return res.status(400).json({msg:"question is required"})
        }

        const result = await askQuestion(question)

        return res.status(200).json(result)

    } catch (error) {
        console.log(error.message)
    }
}