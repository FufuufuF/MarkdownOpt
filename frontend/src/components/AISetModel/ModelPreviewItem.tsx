import { useEffect } from "react";

export interface ModelPreviewItemProps {
    id: string;
    provider: string;
    modelName: string;
    isFocus: boolean;
    isApplied?: boolean;
    onSelectModel: (id: string) => void;
}

export function ModelPreviewItem({ id, provider, modelName, isFocus, isApplied, onSelectModel }: ModelPreviewItemProps) {

    const onClickItem = () => {
        console.log("选中模型: ", id);
        onSelectModel(id);
    }

    useEffect(() => {
        console.log("isFocus: ", isFocus);
    }, [isFocus]);

    useEffect(() => {
        console.log("模型预览项: ", { id, provider, modelName, isFocus });
    })

    return (
        <button
            className={`
                w-full
                flex
                flex-col
                p-2
                transform 
                hover:scale-105 
                transition-transform 
                duration-300 
                ease-in-out
                border-x border-1 border-[#e0e0e0]
                text-[#c1fdfe]
                relative
                ${isFocus ? "bg-[#111f2c]" : "bg-[#384655]"}
            `}
            onClick={onClickItem}
        >
            {isApplied && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-[#eb4f46] rounded-full border-2 border-white"></div>
            )}
            <div className="text-xl">{modelName}</div>
            <div className="text-[#939393]">{provider}</div>
        </button>
    )
}