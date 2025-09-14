import { vm } from "../components/AISetModel/vm";
import { AIModelConfig, converModelInfoToAIModelConfig } from "../models/AIModels";
import { OptimizeRequest } from "../models/OptimizeModels";
import { EditorEventTypes, eventEmitter } from "../utils/EventEmitter";
import { AIService } from "./AIService";

export class AppVM{
    private style: string;
    private markdown: string;
    private isAISetModelShow: boolean;
    private currentAppliedModel: AIModelConfig | null;
    private isOptimizing: boolean;

    constructor() {
        this.style = "";
        this.markdown = "";
        this.isAISetModelShow = false;
        this.currentAppliedModel = null;

        this.isOptimizing = false;
        this.initCurrentAppliedModel();
    }

    private initCurrentAppliedModel() {
    const currentAppliedModelId = vm.getCurrentAppliedModelId();
    if (currentAppliedModelId) {
        const model = vm.getModel(currentAppliedModelId);
        if (model) {
            this.currentAppliedModel = converModelInfoToAIModelConfig(model);
            console.log("[AppVM] 初始化当前应用模型:", this.currentAppliedModel);
        }
    }
}

    getIsOptimizing() {
        return this.isOptimizing;
    }

    getStyle() {
        return this.style;
    }       

    getMarkdown() {
        return this.markdown;
    }

    getIsAISetModelShow() {
        return this.isAISetModelShow;
    }

    setStyle(style: string) {
        this.style = style;
        eventEmitter.emit(EditorEventTypes.STYLE_UPDATE, style);
    }

    setMarkdown(markdown: string) {
        this.markdown = markdown;
        eventEmitter.emit(EditorEventTypes.MARKDOWN_UPDATE, markdown);
    }

    setIsAISetModelShow(isShow: boolean) {
        this.isAISetModelShow = isShow;
        eventEmitter.emit(EditorEventTypes.AI_SET_MODEL_SHOW_UPDATE, isShow);
    }

    setCurrentAppliedModel(model: AIModelConfig | null) {
        this.currentAppliedModel = model;

        console.log("[appVM] 当前应用的模型: ", model);
    }

    // 流式更新开始
    startOptimizing() {
        this.isOptimizing = true;
        eventEmitter.emit(EditorEventTypes.MARKDOWN_STREAM_START, true);
    }

    // 流式更新时追加Markdown内容
    appendToMarkdown(chunk: string) {
        this.markdown += chunk;
        eventEmitter.emit(EditorEventTypes.MARKDOWN_STREAM_UPDATE, this.markdown);
    }

    // 流式更新结束
    endOptimizing() {
        this.isOptimizing = false;
        eventEmitter.emit(EditorEventTypes.MARKDOWN_STREAM_END, false);
        eventEmitter.emit(EditorEventTypes.MARKDOWN_UPDATE, this.markdown);
    }

    errorOptimizing(error: string) {
        this.isOptimizing = false;
        eventEmitter.emit(EditorEventTypes.MARKDOWN_STREAM_ERROR, error);
    }

    async optimizeMarkdown(): Promise<void> {
        if (!this.markdown.trim()) {
            console.log("请输入内容");
            return;
        }

        if (!this.style) {
            console.log("请选择写作风格");
            return;
        }

        if (!this.currentAppliedModel) {
            console.log("请先配置模型信息");
            return;
        }

        try {
            this.startOptimizing();

            const markdownSnapshot = this.markdown;

            const request: OptimizeRequest = {
                markdown: markdownSnapshot,
                style: this.style,
                ...this.currentAppliedModel
            }

            this.setMarkdown("");

            const llmReponse = await AIService.optimizeBatch(request);

            console.log("[AppVM]: 接收到LLM回复");

            this.setMarkdown(llmReponse.content);
        } catch (error) {
            this.errorOptimizing(error instanceof Error ? error.message : "未知错误");
            console.log("优化失败", error);
        }
    }
}

export const appVM = new AppVM();