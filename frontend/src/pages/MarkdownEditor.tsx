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
    isOptimizing: boolean;
};

export default function MarkdownEditor({
    setStyle,
    markdown,
    setMarkdown,
    isAISetModelOpen,
    setIsAISetModelOpen,
    handleOptimize,
    isOptimizing
}: MarkdownEditorProps) {

    return (
        <div className="
            flex
            h-full
        ">
            <div
                className="
                    input-area
                    w-1/2
                    flex-shrink-0
                    flex-grow-0
                    flex
                    flex-col
                    overflow-hidden
                ">
                    <ToolBar
                        setStyle={setStyle}
                        setIsAISetModelOpen={setIsAISetModelOpen}
                        isAISetModelOpen={isAISetModelOpen}
                        handleOptimize={handleOptimize}
                        isOptimizing={isOptimizing}
                    />
                
                    <div className="input-wrapper flex-1 overflow-hidden">
                        <MarkdownInput
                            markdown={markdown}
                            setMarkdown={setMarkdown}
                        />
                    </div>
            </div>

            <div className="
                render-wrapper 
                w-1/2 
                flex-shrink-0 
                flex-grow-0 
                h-screen 
                overflow-hidden
            ">
                <MarkdownRender markdown={markdown}/>
            </div>
        </div>
    );
}