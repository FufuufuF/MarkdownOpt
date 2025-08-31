import MarkdownEditor from "./pages/MarkdownEditor";
import { AISetModel } from "./components/AISetModel";
import { useCallback, useState } from "react";
import { appVM } from "./services/AppVM";
import { useEventListener } from "./hooks/useEventListener";
import { AIModelEventTypes, EditorEventTypes } from "./utils/EventEmitter";
import { vm } from "./components/AISetModel/vm";
import { converModelInfoToAIModelConfig } from "./models/AIModels";

function App() {

    const [style, setStyle] = useState<string>(appVM.getStyle());
    const [markdown, setMarkdown] = useState<string>(appVM.getMarkdown());
    const [isAISetModelOpen, setIsAISetModelOpen] = useState<boolean>(appVM.getIsAISetModelShow());
    const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

    useEventListener(EditorEventTypes.STYLE_UPDATE, (style: string) => {
        setStyle(style);
    });

    useEventListener(EditorEventTypes.MARKDOWN_UPDATE, (markdown: string) => {
        setMarkdown(markdown);
    });

    useEventListener(EditorEventTypes.AI_SET_MODEL_SHOW_UPDATE, (isShow: boolean) => {
        setIsAISetModelOpen(isShow);
    });

    useEventListener(AIModelEventTypes.MODEL_APPLIED, (id: string) => {
        const model = vm.getModel(id);
        if (model) {
            const aiModelConfig = converModelInfoToAIModelConfig(model);

            appVM.setCurrentAppliedModel(aiModelConfig);
        } else {
            console.error("[在App中未找到正在应用的模型]");
        }
    });

    // 监听流式更新事件
    useEventListener(EditorEventTypes.MARKDOWN_STREAM_START, () => {
        setIsOptimizing(true);
    });

    useEventListener(EditorEventTypes.MARKDOWN_STREAM_UPDATE, (content: string) => {
        setMarkdown(content);
    })

    useEventListener(EditorEventTypes.MARKDOWN_STREAM_END, () => {
        setIsOptimizing(false);
    });

    useEventListener(EditorEventTypes.MARKDOWN_STREAM_ERROR, (error: Error) => {
        setIsOptimizing(false);
        console.error("流式更新错误: ", error);
    });

    const handleOptimize = useCallback(async () => {
        await appVM.optimizeMarkdown();
    }, []);

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
