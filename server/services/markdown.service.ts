import { writeFile, readFile } from "fs/promises"
import path from "path"

export class MarkdownService {
    private static folderPath = path.resolve("./server/markedFiles")
    private static mockFilePath = path.resolve("./server/mocks/mockResponse.md")

    public static async saveMarkdownFile(content: string): Promise<string> {
        const now = new Date()
        const formattedTimestamp = now.toISOString().replace(/[:T]/g, "-").split(".")[0]
        const fileName = `diagnosis-${formattedTimestamp}.json`
        const filePath = path.join(this.folderPath, fileName)

        await writeFile(filePath, content)
        return filePath
    }
    public static async readMockMarkdownFile(): Promise<string> {
        try {
            const markdownContent = await readFile(this.mockFilePath, "utf-8")
            return markdownContent
        } catch (error) {
            console.error("Error reading mock Markdown file:", error)
            throw new Error("Failed to read mock Markdown file.")
        }
    }
}
