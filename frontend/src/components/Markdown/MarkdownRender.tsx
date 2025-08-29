import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface MarkdownRenderProps {
    markdown: string;
}

export default function MarkdownRender({markdown}: MarkdownRenderProps) {

    return (
        <div
            className="
            markdown-render
            h-full
            bg-[#212e3c]
            text-[#ffffff]
            overflow-auto
            p-4
        "
        >
            <article className="prose dark:prose-invert">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code: ({ children = [], className, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return (<SyntaxHighlighter
                                language={match?.[1]}
                                style={oneDark}
                                PreTag='div'
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>)
                        }
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            </article>
        </div>
    );
}