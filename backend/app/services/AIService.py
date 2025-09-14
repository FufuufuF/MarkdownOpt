from ..models.AIModelConfig import AIModelConfig
from ..core.LLMFactory import LLMFactory
from ..models.AIModelConfig import AIModelPrompt
from ..models.OptModels import OptResponse

class AIService:
    @staticmethod
    async def testHealth(request: AIModelConfig):
        try:
            llmWrapper = LLMFactory.createLLM(request)
            
            isHealth = await llmWrapper.testHealth()
            
            return isHealth
        except Exception as e:
            raise e
        
    @staticmethod
    async def optimizeBatch(aiModelConfig: AIModelConfig, aiModelPrompt: AIModelPrompt):        
        try:
            llmWrapper = LLMFactory.createLLM(aiModelConfig)
            
            llmResponse: OptResponse = await llmWrapper.call(aiModelPrompt)
            
            return llmResponse
            
        except Exception as e:
            raise e