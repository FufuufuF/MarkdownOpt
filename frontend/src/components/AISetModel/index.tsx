import { useEffect, useState } from "react";
import { ModelForm } from "./ModelForm";
import { ModelList } from "./ModelList";
import { ModelPreviewItemProps } from "./ModelPreviewItem";
import { vm } from "./vm";
import { ModelInfo } from "../../models/AIModels";
import { useEventListener } from "../../hooks/useEventListener";
import { AIModelEventTypes } from "../../utils/EventEmitter";

export interface AISetModelProps {
    onClickClose: () => void;
}

export function AISetModel({ onClickClose }: AISetModelProps) {

    const [modelList, setModelList] = useState<ModelInfo[] | readonly ModelInfo[]>(vm.getAllModels());
    const [currentShownModel, setCurrentShownModel] = useState<ModelInfo>(vm.getCurrentShownModel());
    const [currentAppliedModelId, setCurrentAppliedModelId] = useState<string | null>(vm.getCurrentAppliedModelId());

    useEffect(() => {
        console.log("[最新模型列表]", modelList);
        console.log("当前展示模型: ", currentShownModel)
    }, [modelList, currentShownModel]);

    useEventListener(AIModelEventTypes.MODEL_CREATED, (model: ModelInfo) => {
        setCurrentShownModel(model);
        setModelList((prev) => [...prev, model]);
    });

    useEventListener(AIModelEventTypes.MODEL_UPDATED, (model: ModelInfo) => {
        setCurrentShownModel(model);
        const nowModelList = [model, ...modelList.filter(m => m.id !== model.id)];
        setModelList(nowModelList);
    })

    useEventListener(AIModelEventTypes.MODEL_DELETED, (id: string) => {
        setModelList((prev) => prev.filter(m => m.id !== id));
        setCurrentShownModel(vm.getCurrentShownModel());
    });

    useEventListener(AIModelEventTypes.MODEL_APPLIED, (id: string) => {
        console.log("[监听到模型应用更新]");
        const model = vm.getAllModels().find(m => m.id === id);
        if (model) {
            setCurrentAppliedModelId(id);
        }
    });

    const onSaveModel = (model: ModelInfo) => {
        vm.saveModel(model);
    };

    const onSelectModel = (id: string) => {
        if (
            currentShownModel.provider === "null" &&
            currentShownModel.modelName == "新建模型" &&
            currentShownModel.apiKey === "" &&
            currentShownModel.maxTokens === 2000 &&
            currentShownModel.temperature === 0.7 &&
            currentShownModel.baseUrl === "" &&
            currentShownModel.prompt === ""
        ) {
            vm.deleteModel(currentShownModel.id);
        }

        const model = modelList.find(m => m.id === id);
        if (model) {
            setCurrentShownModel(model);
        }
    }

    const onCreateModel = () => {
        if (
            modelList && 
            modelList[0].provider === "null" &&
            modelList[0].modelName === "新建模型" &&
            modelList[0].apiKey === "" &&
            modelList[0].maxTokens === 2000 &&
            modelList[0].temperature === 0.7 &&
            modelList[0].baseUrl === "" &&
            modelList[0].prompt === ""
        ) {
            return;
        }

        const newModel = vm.createModel();
        setModelList([newModel, ...modelList]);
        setCurrentShownModel(newModel);
    };

    const onDeleteModel = (id: string) => {
        vm.deleteModel(id);
    }

    const onCancelEdit = (id: string) => {
        const model = modelList.find(m => m.id === id);
        if (!model) return;
        if (
            model.provider === "null" &&
            model.modelName == "新建模型" &&
            model.apiKey === "" &&
            model.maxTokens === 2000 &&
            model.temperature === 0.7 &&
            model.baseUrl === "" &&
            model.prompt === ""
        ) {
            vm.deleteModel(id);
        }
    }

    const onApplyModel = (id: string) => {
        const model = modelList.find(m => m.id === id);
        if (!model) return;
        vm.setCurrentAppliedModel(id);
    };

    const onTestModel = (id: string) => {
        console.log("[在AISetModel中: 模型测试]");
        const model = modelList.find(m => m.id === id);
        if (!model) return;
        vm.testModel(model);
    }

    // 将模型列表处理成预览数据
    const modelPreviewItems: ModelPreviewItemProps[] = (
        modelList ?
            modelList.map(m => ({
                id: m.id,
                provider: m.provider,
                modelName: m.modelName
            } as ModelPreviewItemProps)) :
            []
    )

    return (
        <div
            className="
            ai-set-model
            w-[80%]
            h-[80%]
            bg-[#c1fdfe]
            rounded-xl
            flex
            flex-col
            "
        >
            <div
                className="
                    set-title
                    h-9
                    bg-[#609b9b]
                    text-[#ffffff]
                    flex
                    rounded-t-xl
                    justify-between
                    items-center
                "
            >
                <div
                    className="
                        title
                        p-2
                        text-lg
                    "
                >
                    模型配置
                </div>
                <button
                    className="
                        close-button
                        p-2
                        text-2xl
                        hover:bg-[#eb4f46]
                        rounded-tr-xl
                        h-full
                        w-12
                        flex
                        items-center
                        justify-center
                        transition-all duration-300
                    "
                    onClick={onClickClose}
                >
                    X
                </button>
            </div>

            <div
                className="
                    ai-content-wrapper
                    flex-1
                    flex
                    rounded-b-xl
                    h-full
                "
            >
                <div className="
                    model-list-wrapper
                    w-[180px]
                    h-full
                    rounded-bl-xl
                ">
                    <ModelList
                        modelPreviewItems={modelPreviewItems}
                        onCreateModel={onCreateModel}
                        onSelectModel={onSelectModel}
                        focusedModelId={currentShownModel.id}
                        appliedModelId={currentAppliedModelId}
                    />
                </div>

                <div className="
                    model-set-wrapper
                    flex-1
                    h-full
                ">
                    <ModelForm
                        id={currentShownModel.id}
                        provider={currentShownModel.provider}
                        modelName={currentShownModel.modelName}
                        apiKey={currentShownModel.apiKey}
                        maxTokens={currentShownModel.maxTokens}
                        temperature={currentShownModel.temperature}
                        baseUrl={currentShownModel.baseUrl}
                        prompt={currentShownModel.prompt}
                        isApplied={currentAppliedModelId === currentShownModel.id}
                        onSaveModel={onSaveModel}
                        onDeleteModel={onDeleteModel}
                        onCancelEdit={onCancelEdit}
                        onApplyModel={onApplyModel}
                        onTestModel={onTestModel}
                    />
                </div>

            </div>
        </div>
    );
}