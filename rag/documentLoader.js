
import fs from "fs/promises"
import { PDFParse } from "pdf-parse"

export const loadPDF = async(filePath)=>{

    const buffer = await fs.readFile(filePath)

    const parser = new PDFParse({
        data: buffer
    })

    const data = await parser.getText()

    await parser.destroy()

    return { text: data.text, pages: data.total}
}
