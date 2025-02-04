import { writeFile } from "fs/promises"
import path from "path"

export class MarkdownService {
    private static folderPath = path.resolve("./server/markedFiles")

    // Save the Markdown content to a file
    public static async saveMarkdownFile(content: string): Promise<string> {
        const now = new Date()
        const formattedTimestamp = now.toISOString().replace(/[:T]/g, "-").split(".")[0]
        const fileName = `diagnosis-${formattedTimestamp}.json`
        const filePath = path.join(this.folderPath, fileName)

        await writeFile(filePath, content)
        return filePath
    }
}
