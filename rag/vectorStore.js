
import embeddings from "./embeddings.js";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

const client = new MongoClient(process.env.MONGO_URI)

const db = client.db("agent_pdf_asst")

const collection = db.collection("documents")

const vectorStore = new MongoDBAtlasVectorSearch(
    embeddings, 
    {
        collection, 
        indexName: "vector_index",
        textKey: "text",
        embeddingKey: "embedding"
    }
)

export default vectorStore
