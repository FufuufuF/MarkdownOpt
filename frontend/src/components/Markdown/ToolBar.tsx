
export interface ToolBarProps {
    setStyle: (style: string) => void;
    isAISetModelOpen: boolean;
    setIsAISetModelOpen: (isAISetModelOpen: boolean) => void;
    handleOptimize: () => void;
    isOptimizing: boolean;
};

export default function ToolBar({
    setStyle,
    isAISetModelOpen,
    setIsAISetModelOpen,
    handleOptimize,
    isOptimizing
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
                    <option value="小红书体">小红书体</option>
                    <option value="知乎体">知乎体</option>
                    <option value="微信公众号体">微信公众号体</option>
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
                className={`
                        ai-optimize
                        text-white
                        p-2
                        rounded-2xl
                        text-center
                        h-8
                        flex
                        items-center
                        transition-all
                        duration-300
                        ${isOptimizing 
                            ? 'bg-gray-500 cursor-not-allowed opacity-70' 
                            : 'bg-[#ec5b54] hover:bg-[#d14a44] cursor-pointer'
                        }
                    `}
                onClick={handleOptimize}
                disabled={isOptimizing}
            >
                {isOptimizing ? "优化中..." : "一键优化"}
            </button>
        </div>
    )
}