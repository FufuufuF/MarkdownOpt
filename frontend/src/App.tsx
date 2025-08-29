import MarkdownEditor from "./pages/MarkdownEditor";
import { AISetModel } from "./components/AISetModel";
import { useCallback, useState } from "react";
import { appVM } from "./services/AppVM";
import { useEventListener } from "./hooks/useEventListener";
import { EditorEventTypes } from "./utils/EventEmitter";

function App() {

    const [style, setStyle] = useState<string>(appVM.getStyle());
    const [markdown, setMarkdown] = useState<string>(appVM.getMarkdown());
    const [isAISetModelOpen, setIsAISetModelOpen] = useState<boolean>(appVM.getIsAISetModelShow());

    useEventListener(EditorEventTypes.STYLE_UPDATE, (style: string) => {
        setStyle(style);
    });

    useEventListener(EditorEventTypes.MARKDOWN_UPDATE, (markdown: string) => {
        setMarkdown(markdown);
    });

    useEventListener(EditorEventTypes.AI_SET_MODEL_SHOW_UPDATE, (isShow: boolean) => {
        setIsAISetModelOpen(isShow);
    });

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

    const handleStyleChange = (style: string) => {
        appVM.setStyle(style);
    }

    const handleMarkdownChange = (markdown: string) => {
        appVM.setMarkdown(markdown);
    }

    const handleIsAISetModelOpenChange = (isOpen: boolean) => {
        appVM.setIsAISetModelShow(isOpen);
    }

    return (
        <>
            <MarkdownEditor
                setStyle={handleStyleChange}
                markdown={markdown}
                setMarkdown={handleMarkdownChange}
                isAISetModelOpen={isAISetModelOpen}
                setIsAISetModelOpen={handleIsAISetModelOpenChange}
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
