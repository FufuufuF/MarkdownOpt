
export interface ToolBarProps {
    setStyle: (style: string) => void;
    isAISetModelOpen: boolean;
    setIsAISetModelOpen: (isAISetModelOpen: boolean) => void;
    handleOptimize: () => void;
};

export default function ToolBar({
    setStyle,
    isAISetModelOpen,
    setIsAISetModelOpen,
    handleOptimize
}: ToolBarProps) {

    const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStyle(e.target.value);
    }

    return (
        <div
            className="
                tool-bar
                bg-[#111f2c]
                h-10
                flex
                items-center
                justify-between
            ">
            <div
                className="
                        h-full
                        set-wrapper
                        flex
                        items-center
                    ">
                <select
                    name="write-style"
                    id="write-style"
                    onChange={handleSelectedChange}
                    className="
                        text-white
                        bg-[#111f2c]
                        p-2
                        h-full
                        rounded-b
                        hover:bg-[#384655]
                        focus:bg-[#111f2c]
                        
                    ">
                    <option value="" disabled selected>选择写作风格</option>
                    <option value="">小红书体</option>
                    <option value="">知乎体</option>
                    <option value="">微信公众号体</option>
                </select>

                <button
                    className="
                        text-white
                        bg-inherit
                        p-2
                        h-full
                        rounded-b
                        hover:bg-[#384655]
                    "
                    onClick={() => {setIsAISetModelOpen(!isAISetModelOpen)}}
                >
                    模型配置
                </button>
            </div>
            <button
                className="
                        ai-optimize
                        text-white
                        bg-[#ec5b54]
                        p-2
                        rounded-2xl
                        text-center
                        h-8
                        flex
                        items-center
                    "
                onClick={handleOptimize}
            >一键优化</button>
        </div>
    )
}