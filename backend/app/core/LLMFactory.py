from langchain_deepseek import ChatDeepSeek

from .LLMWrapper import LLMWrapper

from ..models.AIModelConfig import AIModelConfig

class LLMFactory:
    @staticmethod
    def createLLM(aiModelConfig: AIModelConfig):
        
        if aiModelConfig.provider == "DeepSeek":
            llm = ChatDeepSeek(
                model=aiModelConfig.modelName,
                temperature=aiModelConfig.temperature,
                max_tokens=aiModelConfig.maxTokens,
                api_key=aiModelConfig.apiKey
            )
            
            return LLMWrapper(llm)
        else:
            raise Exception("大模型为None")
        
        