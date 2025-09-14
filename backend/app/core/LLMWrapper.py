from typing import Optional
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage
import logging
from langchain_core.exceptions import LangChainException

from ..models.AIModelConfig import AIModelPrompt
from ..models.OptModels import OptRequest, OptResponse
from .Exceptions import AIServiceError, NetworkError

from .MyPtompts import MyPrompts

class LLMWrapper():
    def __init__(
            self,
            langchainModel: BaseChatModel,
        ) -> None:
        self.model: BaseChatModel = langchainModel
        self.chatTemplate: ChatPromptTemplate = ChatPromptTemplate.from_messages(
            [
                ("system", MyPrompts.systemDefaultPromptTemplate),
                ("human", MyPrompts.humanDefaultPromptTemplate)
            ]
        )
    
    async def call(self, request: AIModelPrompt):
        try:
            markdown: str = request.markdown
            style: str = request.style
            
            chain = (
                {
                    "markdown": lambda x : x["markdown"],
                    "style": lambda x : x["style"]
                }
                | self.chatTemplate
                | self.model
            )
            
            msg = await chain.ainvoke({"markdown": markdown, "style": style})
            
            # 检查响应是否有效
            if not msg or not hasattr(msg, 'content'):
                raise ValueError("Invalid response from model")
                
            responseDict = {
                "content": msg.content,
                "useToken": 1024  # 应该从实际响应中获取
            }
            
            return OptResponse(**responseDict)
            
        except (ConnectionError, TimeoutError) as e:
            logging.error(f"Network error in LLM call: {e}")
            raise NetworkError("无法连接到AI服务")
        except LangChainException as e:
            logging.error(f"LangChain error: {e}")
            raise AIServiceError(f"LangChain调用失败: {str(e)}")
        except ValueError as e:
            logging.error(f"Value error in LLM call: {e}")
            raise AIServiceError(f"模型响应无效: {str(e)}")
        except Exception as e:
            logging.error(f"Unexpected error in LLM call: {e}")
            raise AIServiceError(f"模型调用失败: {str(e)}")
        
    async def testHealth(self) -> bool:
        """
        测试大模型是否可通
        发送简单提示并检查响应
        """
        try:
            # 创建简单的人类消息
            simple_message = HumanMessage(content="Hello, are you working?")
            
            # 调用模型
            response = await self.model.ainvoke([simple_message])
            
            # 检查响应是否有效
            if response and hasattr(response, 'content') and response.content:
                return True
            else:
                return False
        except (ConnectionError, TimeoutError) as e:
            logging.error(f"Network error in health check: {e}")
            raise NetworkError("无法连接到AI服务")
        except Exception as e:
            logging.error(f"Health check failed: {e}")
            raise AIServiceError(f"健康检查失败: {str(e)}")




