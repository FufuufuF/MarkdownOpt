import MarkdownInput from "../components/Markdown/MarkdownInput";
import MarkdownRender from "../components/Markdown/MarkdownRender";
import ToolBar from "../components/Markdown/ToolBar";

export interface MarkdownEditorProps {
    setStyle: (style: string) => void;
    markdown: string;
    setMarkdown: (markdown: string) => void;
    isAISetModelOpen: boolean;
    setIsAISetModelOpen: (isAISetModelOpen: boolean) => void;
    handleOptimize: () => void;
};

export default function MarkdownEditor({
    setStyle,
    markdown,
    setMarkdown,
    isAISetModelOpen,
    setIsAISetModelOpen,
    handleOptimize
}: MarkdownEditorProps) {

    return (
        <div className="
            flex
            h-full
        ">
            <div
                className="
                    input-area
                    flex-1/2
                    flex
                    flex-col
                ">
                    <ToolBar
                        setStyle={setStyle}
                        setIsAISetModelOpen={setIsAISetModelOpen}
                        isAISetModelOpen={isAISetModelOpen}
                        handleOptimize={handleOptimize}
                    />
                
                    <div className="input-wrapper flex-1">
                        <MarkdownInput
                            markdown={markdown}
                            setMarkdown={setMarkdown}
                        />
                    </div>
            </div>

            <div className="flex-1/2 h-screen">
                <MarkdownRender markdown={markdown}/>
            </div>
        </div>
    );
}