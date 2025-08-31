import { ModelInfo } from "../../models/AIModels";
import { v4 as uuidv4 } from "uuid";
import { eventEmitter, AIModelEventTypes } from "../../utils/EventEmitter";

export class AISetModelVM {
    private models = new Map<string, ModelInfo>();
    private currentShownId: string | null = null;
    private currentAppliedModelId: string | null = null;

    private static EMPTY_ARRAY = Object.freeze<ModelInfo[]>([]);

    constructor() {
        this.loadFromStorage();
    }

    loadFromStorage = () => {
        try {
            console.log(
                "[从localStorage拉取模型列表]: ",
                localStorage.getItem("ai-models")
            );
            const savedModels = localStorage.getItem("ai-models");
            const savedCurrentApplicationModelId = localStorage.getItem("current-application-model-id");
            if (savedModels) {
                const parsedModels: ModelInfo[] = JSON.parse(savedModels);
                this.models.clear();
                parsedModels.forEach((model) => {
                    this.models.set(model.id, model);
                });

                // 设置当前选中的模型为最新更新的模型
                const savedModelsArray = this.getAllModels();
                if (savedModelsArray && savedModelsArray.length > 0) {
                    this.currentShownId = savedModelsArray[0].id;
                }

                // 设置当前应用的模型ID
                if (savedCurrentApplicationModelId) {
                    console.log("[vm从localStorage拉取当前应用模型ID]");
                    this.currentAppliedModelId = savedCurrentApplicationModelId;
                }
            }
        } catch (error) {
            console.error("Failed to load models from localStorage:", error);
        }
    };

    saveToStorage = () => {
        try {
            const modelsArray = Array.from(this.models.values());
            localStorage.setItem("ai-models", JSON.stringify(modelsArray));
            console.log("[保存模型]: ", modelsArray);
        } catch (error) {
            console.error("Failed to save models to localStorage:", error);
        }
    };

    createModel = (): ModelInfo => {
        const newModel: ModelInfo = {
            id: uuidv4(),
            provider: "null",
            modelName: "新建模型",
            apiKey: "",
            temperature: 0.7,
            maxTokens: 2000,
            baseUrl: "",
            prompt: "",
            timestamp: Date.now(),
        };
        this.models.set(newModel.id, newModel); // 添加到模型集合中
        this.currentShownId = newModel.id; // 设置为当前模型
        eventEmitter.emit(AIModelEventTypes.MODEL_CREATED, newModel);
        return newModel;
    };

    getModel = (id: string): ModelInfo | undefined => {
        return this.models.get(id);
    };

    getCurrentAppliedModelId = (): string | null => {
        if (this.currentAppliedModelId && this.models.has(this.currentAppliedModelId)) {
            return this.currentAppliedModelId;
        }
        return null;
    };

    // 获取当前显示的模型
    getCurrentShownModel = (): ModelInfo => {
        if (this.currentShownId && this.models.has(this.currentShownId)) {
            return this.models.get(this.currentShownId)!;
        }
        // 返回默认模型
        return this.createModel();
    };

    // 保存或更新模型
    saveModel = (model: ModelInfo) => {
        this.models.set(model.id, model);
        this.saveToStorage();
        eventEmitter.emit(AIModelEventTypes.MODEL_UPDATED, model);
    };

    // 删除模型
    deleteModel = (id: string) => {
        this.models.delete(id);
        this.saveToStorage();
        const remainingModels = this.getAllModels();
        if (remainingModels && remainingModels.length > 0) {
            this.setCurrentShownModel(remainingModels[0].id);
        } else {
            this.currentShownId = null;
            eventEmitter.emit(AIModelEventTypes.MODEL_SELECTED, this.createModel());
        }

        eventEmitter.emit(AIModelEventTypes.MODEL_DELETED, id);
    };

    // 设置当前模型
    setCurrentShownModel = (id: string) => {
        this.currentShownId = id;
        eventEmitter.emit(AIModelEventTypes.MODEL_SELECTED, this.getCurrentShownModel());
    };

    setCurrentAppliedModel = (id: string) => {
        this.currentAppliedModelId = id;
        // 添加持久化逻辑
        localStorage.setItem("current-application-model-id", id);
        console.log("[在vm中: 发布模型应用更新事件]", id);
        eventEmitter.emit(AIModelEventTypes.MODEL_APPLIED, id);
    }

    // 获取所有模型列表
    getAllModels = (): ModelInfo[] | readonly ModelInfo[] => {
        if (!this.models || this.models.size === 0) {
            return AISetModelVM.EMPTY_ARRAY;
        }

        const modelArray = Array.from(this.models.values()).sort(
            (a, b) => b.timestamp - a.timestamp
        );
        return modelArray;
    };
}

export const vm = new AISetModelVM();
