import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

export interface MarkdownInputProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
};


export default function MarkdownInput({
    markdown,
    setMarkdown
}: MarkdownInputProps) {

    const [localMarkdown, setLocalMarkdown] = useState<string>(markdown);
    const debounceMarkdown = useDebounce(localMarkdown, 300);

    useEffect(() => {
        setMarkdown(debounceMarkdown);
    }, [debounceMarkdown, setMarkdown]);

    useEffect(() => {
        setLocalMarkdown(markdown);
    }, [markdown]);

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
                value={localMarkdown}
                onChange={(e) => setLocalMarkdown(e.target.value)}
            ></textarea>
        </div>
    );
}