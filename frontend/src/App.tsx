import MarkdownEditor from "./pages/MarkdownEditor";
import { AISetModel } from "./components/AISetModel";
import { useCallback, useState } from "react";

function App() {

    const [style, setStyle] = useState<string>("");
    const [markdown, setMarkdown] = useState<string>("");
    const [isAISetModelOpen, setIsAISetModelOpen] = useState<boolean>(false);

    const handleOptimize = useCallback(async () => {
        if (!markdown.trim() || !style) {
            console.log("请输入内容");
            return;
        }
        try {
            console.log("优化中...");
        } catch (error) {
            console.error("优化失败: ", error);
        }
    }, [markdown, style]);

    return (
        <>
            <MarkdownEditor
                setStyle={setStyle}
                markdown={markdown}
                setMarkdown={setMarkdown}
                isAISetModelOpen={isAISetModelOpen}
                setIsAISetModelOpen={setIsAISetModelOpen}
                handleOptimize={handleOptimize}
            />
            {
                isAISetModelOpen ? 
                <div 
                    className="
                        ai-set-model-wrapper
                        fixed
                        flex
                        top-0
                        left-0
                        w-full
                        h-full
                        justify-center
                        items-center
                        z-50
                    "
                >
                    <AISetModel onClickClose={() => setIsAISetModelOpen(false)} />
                </div>
                :
                null
            }
        </>
    )
}

export default App
