import { ModelInfo } from "../../models/AIModelConfig";
import { v4 as uuidv4 } from "uuid";
import { eventEmitter, EventTypes } from "../../utils/EventEmitter";

export class AISetModelVM {
    private models = new Map<string, ModelInfo>();
    private currentModelId: string | null = null;
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
            if (savedModels) {
                const parsedModels: ModelInfo[] = JSON.parse(savedModels);
                this.models.clear();
                parsedModels.forEach((model) => {
                    this.models.set(model.id, model);
                });
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
        this.currentModelId = newModel.id; // 设置为当前模型
        eventEmitter.emit(EventTypes.MODEL_CREATED, newModel);
        return newModel;
    };

    getModel = (id: string): ModelInfo | undefined => {
        return this.models.get(id);
    };

    // 获取当前显示的模型
    getCurrentModel = (): ModelInfo => {
        if (this.currentModelId && this.models.has(this.currentModelId)) {
            return this.models.get(this.currentModelId)!;
        }
        // 返回默认模型
        return this.createModel();
    };

    // 保存或更新模型
    saveModel = (model: ModelInfo) => {
        this.models.set(model.id, model);
        this.saveToStorage();
        eventEmitter.emit(EventTypes.MODEL_UPDATED, model);
    };

    // 删除模型
    deleteModel = (id: string) => {
        this.models.delete(id);
        this.saveToStorage();
        const remainingModels = this.getAllModels();
        if (remainingModels && remainingModels.length > 0) {
            this.setCurrentModel(remainingModels[0].id);
        } else {
            this.currentModelId = null;
            eventEmitter.emit(EventTypes.MODEL_SELECTED, this.createModel());
        }

        eventEmitter.emit(EventTypes.MODEL_DELETED, id);
    };

    // 设置当前模型
    setCurrentModel = (id: string) => {
        this.currentModelId = id;
        eventEmitter.emit(EventTypes.MODEL_SELECTED, this.getCurrentModel());
    };

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
