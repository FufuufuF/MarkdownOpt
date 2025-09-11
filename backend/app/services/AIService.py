from ..models.AIModelConfig import AIModelConfig
from ..core.LLMFactory import LLMFactory
from ..core.LLMWrapper import LLMWrapper

class AIService:
    @staticmethod
    async def testHealth(request: AIModelConfig):
        try:
            llmWrapper = LLMFactory.createLLM(request)
            
            if llmWrapper != None:
                isHealth = await llmWrapper.testHealth()
            else:
                raise TypeError("大模型必须不为None")
            
            return isHealth
        except Exception as e:
            raise e