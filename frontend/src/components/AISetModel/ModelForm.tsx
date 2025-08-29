import { useEffect, useState } from "react";
import { ModelInfo } from "../../models/AIModelConfig";

export interface ModelFormProps {
    id: string;
    modelName: string;
    provider: string;
    apiKey: string;
    maxTokens?: number;
    temperature?: number;
    baseUrl?: string;
    prompt?: string;

    onSaveModel: (model: ModelInfo) => void;
    onDeleteModel: (id: string) => void;
    onCancelEdit: (id: string) => void;
}

export function ModelForm({
    id,
    modelName,
    provider,
    apiKey,
    maxTokens = 1000,
    temperature = 0.7,
    baseUrl = "",
    prompt = "",
    onSaveModel,
    onDeleteModel,
    onCancelEdit
}: ModelFormProps) {

    const [nowModelName, setModelName] = useState<string>(modelName);
    const [nowProvider, setProvider] = useState<string>(provider);
    const [nowApiKey, setApiKey] = useState<string>(apiKey);
    const [nowMaxTokens, setMaxTokens] = useState<number>(maxTokens);
    const [nowTemperature, setTemperature] = useState<number>(temperature);
    const [nowBaseUrl, setBaseUrl] = useState<string>(baseUrl);
    const [nowPrompt, setPrompt] = useState<string>(prompt);

    useEffect(() => {
        setModelName(modelName);
        setProvider(provider);
        setApiKey(apiKey);
        setMaxTokens(maxTokens);
        setTemperature(temperature);
        setBaseUrl(baseUrl);
        setPrompt(prompt);
    },[modelName, provider, apiKey, maxTokens, temperature, baseUrl, prompt])

    const handleCancel = () => {
        setModelName(modelName);
        setProvider(provider);
        setApiKey(apiKey);
        setMaxTokens(maxTokens);
        setTemperature(temperature);
        setBaseUrl(baseUrl);
        setPrompt(prompt);

        onCancelEdit(id);
    };

    const handleSaveModel = () => {
        if (!nowModelName || !nowProvider || !nowApiKey) {
            window.alert("请填写所有必填字段");
            return;
        }

        onSaveModel({
            id: id,
            provider: nowProvider,
            modelName: nowModelName,
            apiKey: nowApiKey,
            maxTokens: nowMaxTokens,
            temperature: nowTemperature,
            baseUrl: nowBaseUrl,
            prompt: nowPrompt,
            timestamp: Date.now()
        })
    }
    const formItemWrapperClassName: string = `
        form-item-wrapper
        m-4
    `;

    const labelClassName: string = `
        block
        text-lg
        font-medium 
        text-gray-700
    `;

    const inputClassName: string = `
        w-4/5
        px-3
        py-2
        border
        border-gray-300
        rounded-md
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        `;

    const textareaClassName: string = `
        w-4/5
        px-3
        py-2
        border
        border-gray-300
        rounded-md
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        h-25
        resize-none
        overflow-y-auto
        `;

    const buttonClassName: string = `
        px-4
        py-2
        rounded-md
        transition-colors
        m-2
        `;

    return (
        <div className="
            model-form
            flex
            flex-col
            bg-white
            h-full
            rounded-br-xl
            overflow-auto
        ">
            <div className={formItemWrapperClassName}>

                <label className={labelClassName}>
                    模型名
                </label>
                <input
                    type="text"
                    value={nowModelName}
                    placeholder="例如: deepseek-chat"
                    className={inputClassName}
                    onChange={(e) => setModelName(e.target.value)}
                />

            </div>
            <div className={formItemWrapperClassName}>
                <label className={labelClassName}>
                    提供商
                </label>
                <input
                    type="text"
                    value={nowProvider}
                    placeholder="例如: OpenAI"
                    className={inputClassName}
                    onChange={(e) => setProvider(e.target.value)}
                />
            </div>
            <div className={formItemWrapperClassName}>
                <label className={labelClassName}>
                    API密钥
                </label>
                <input
                    type="password"
                    value={nowApiKey}
                    placeholder="输入API密钥"
                    className={inputClassName}
                    onChange={(e) => setApiKey(e.target.value)}
                />
            </div>
            <div className={formItemWrapperClassName}>
                <label className={labelClassName}>
                    最大Token数
                </label>
                <input
                    type="number"
                    value={nowMaxTokens}
                    placeholder="最大token数"
                    className={inputClassName}
                    onChange={(e) => setMaxTokens(Number(e.target.value))}
                />
            </div>
            <div className={formItemWrapperClassName}>
                <label className={labelClassName}>
                    温度
                </label>
                <input
                    type="number"
                    step="0.1"
                    value={nowTemperature}
                    placeholder="温度"
                    className={inputClassName}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                />
            </div>
            <div className={formItemWrapperClassName}>
                <label className={labelClassName}>
                    基础URL
                </label>
                <input
                    type="text"
                    value={nowBaseUrl}
                    placeholder="基础URL"
                    className={inputClassName}
                    onChange={(e) => setBaseUrl(e.target.value)}
                />
            </div>
            <div className={formItemWrapperClassName}>
                <label className={labelClassName}>
                    提示词
                </label>
                <textarea
                    value={nowPrompt}
                    placeholder="提示词"
                    className={textareaClassName}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>
            <div className="flex justify-end space-x-4 pt-6">
                <button
                    type="button"
                    className={`${buttonClassName} text-gray-700 bg-gray-200 hover:bg-gray-300`}
                    onClick={handleCancel}
                >
                    取消
                </button>
                <button
                    type="button"
                    className={`${buttonClassName} text-white bg-red-500 hover:bg-red-600`}
                    onClick={() => onDeleteModel(id)}
                >
                    删除
                </button>
                <button
                    type="submit"
                    className={`${buttonClassName} text-white bg-[#316c6d] hover:bg-[#609b9b]`}
                    onClick={() => handleSaveModel()}
                >
                    保存
                </button>
            </div>
        </div>
    );
}