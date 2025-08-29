export interface MarkdownInputProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
};


export default function MarkdownInput({
    markdown,
    setMarkdown
}: MarkdownInputProps) {

    return (
        <div
            className="
            markdown-input
            bg-[#384655]
            m-0
            p-1
            h-full
            w-full
        ">
            <textarea
                className="
                    markdown-input-textarea
                    text-[#dedede]
                    text-lg
                    resize-none
                    focus:outline-none
                    h-full
                    w-full
                    overflow-y-auto
                "
                placeholder="输入 Markdown 内容..."
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
            ></textarea>
        </div>
    );
}