import { ModelPreviewItem, type ModelPreviewItemProps } from "./ModelPreviewItem"

export interface ModelListProps {
    modelPreviewItems: ModelPreviewItemProps[] | null;
    focusedModelId: string;
    appliedModelId: string | null;
    onCreateModel: () => void;
    onSelectModel: (id: string) => void;
}

export function ModelList({modelPreviewItems, focusedModelId, appliedModelId, onCreateModel, onSelectModel}: ModelListProps) {

    return (
        <div 
            className="
                h-full
                w-full
                flex
                flex-col
                justify-between
            "
        >
            <div 
                className="
                    model-preview-list
                    flex-1
                    overflow-y-auto
                    overflow-x-hidden
                    bg-[#316c6d]
                "
            >
                {modelPreviewItems ? modelPreviewItems.map((modelPreviewItem) => {
                    return (
                        <ModelPreviewItem 
                            id={modelPreviewItem.id} 
                            provider={modelPreviewItem.provider} 
                            modelName={modelPreviewItem.modelName} 
                            onSelectModel={onSelectModel}
                            isFocus={modelPreviewItem.id === focusedModelId}
                            isApplied={modelPreviewItem.id === appliedModelId}
                        />
                    );
                }): null}
            </div>

            <button 
                className="
                    create-new-model
                    h-6
                    bg-[#fae1cb]
                    flex
                    justify-center
                    items-center
                    rounded-bl-xl
                    hover:bg-[#c6b3a1]
                    transition-all duration-300
                "
                onClick={onCreateModel}
            >
                +
            </button>
        </div>
    );
}