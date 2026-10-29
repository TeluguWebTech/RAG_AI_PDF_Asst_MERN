
import vectorStore from "./vectorStore.js";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const llm = new ChatOpenAI({
    model: "gpt-5.6-luna"
})

const prompt = PromptTemplate.fromTemplate(`
    You are a helpful AI assistant.

    Answer the question using only the provided context.

    If the answer is not available in the context, say:
    "I could not find the answer in the uploaded document."

    Context:
    {context}

    Question:
    {question}
    
    Answer:
    
    `)

export const askQuestion = async(question)=>{
    const documents = await vectorStore.similaritySearch(
        question, 4
    )


const context = documents
    .map((doc)=>doc.pageContent).join("\n\n")

const formattedPrompt = await prompt.format({
    context, question
})

const response = await llm.invoke(formattedPrompt)

return  {
    answer: response.content[0].text,
    sources: documents.map((doc)=>doc.metadata)
}

}