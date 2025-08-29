import { useEffect, useState } from "react";
import { ModelForm } from "./ModelForm";
import { ModelList } from "./ModelList";
import { ModelPreviewItemProps } from "./ModelPreviewItem";
import { vm } from "./vm";
import { ModelInfo } from "../../models/AIModelConfig";
import { useEventListener } from "../../hooks/useEventListener";
import { EventTypes } from "../../utils/EventEmitter";

export interface AISetModelProps {
    onClickClose: () => void;
}

export function AISetModel({ onClickClose }: AISetModelProps) {

    const [modelList, setModelList] = useState<ModelInfo[] | readonly ModelInfo[]>(vm.getAllModels());
    const [currentModel, setCurrentModel] = useState<ModelInfo>(vm.getCurrentModel());

    useEffect(() => {
        console.log("[最新模型列表]", modelList);
        console.log("当前展示模型: ", currentModel)
    }, [modelList, currentModel]);

    useEventListener(EventTypes.MODEL_CREATED, (model: ModelInfo) => {
        setCurrentModel(model);
        setModelList((prev) => [...prev, model]);
    });

    useEventListener(EventTypes.MODEL_UPDATED, (model: ModelInfo) => {
        setCurrentModel(model);
        const nowModelList = [model, ...modelList.filter(m => m.id !== model.id)];
        setModelList(nowModelList);
    })

    useEventListener(EventTypes.MODEL_DELETED, (id: string) => {
        setModelList((prev) => prev.filter(m => m.id !== id));
        setCurrentModel(vm.getCurrentModel());
    });

    const onSaveModel = (model: ModelInfo) => {
        vm.saveModel(model);
    };

    const onSelectModel = (id: string) => {
        if (
            currentModel.provider === "null" &&
            currentModel.modelName == "新建模型" &&
            currentModel.apiKey === "" &&
            currentModel.maxTokens === 2000 &&
            currentModel.temperature === 0.7 &&
            currentModel.baseUrl === "" &&
            currentModel.prompt === ""
        ) {
            vm.deleteModel(currentModel.id);
        }

        const model = modelList.find(m => m.id === id);
        if (model) {
            setCurrentModel(model);
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
        setCurrentModel(newModel);
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
                        focusedModelId={currentModel.id}
                    />
                </div>

                <div className="
                    model-set-wrapper
                    flex-1
                    h-full
                ">
                    <ModelForm
                        id={currentModel.id}
                        provider={currentModel.provider}
                        modelName={currentModel.modelName}
                        apiKey={currentModel.apiKey}
                        maxTokens={currentModel.maxTokens}
                        temperature={currentModel.temperature}
                        baseUrl={currentModel.baseUrl}
                        prompt={currentModel.prompt}
                        onSaveModel={onSaveModel}
                        onDeleteModel={onDeleteModel}
                        onCancelEdit={onCancelEdit}
                    />
                </div>

            </div>
        </div>
    );
}