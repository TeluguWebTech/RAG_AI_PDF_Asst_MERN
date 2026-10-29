
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
})

export const splitDocument = async(text, metadata={})=>{

    const documents = await splitter.createDocuments(
        [text], [metadata]
    )
    return documents
}