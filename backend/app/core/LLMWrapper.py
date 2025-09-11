from typing import Optional
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage

from ..models.AIModelConfig import AIModelPrompt
from ..models.OptModels import OptRequest, OptResponse

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
    
    def call(self, request: AIModelPrompt):
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
        
        msg = chain.invoke({"markdown": markdown, "style": style})
        
        responseDict = {
            "optimizedMarkdown": msg.content,
            "useToken": 1024
        }
        
        return OptResponse(**responseDict)
        
    async def testHealth(self) -> bool:
        """
        测试大模型是否可通
        发送简单提示并检查响应
        """
        print("testHealth")
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
        except Exception as e:
            # 记录错误（可选）
            print(f"Health check failed: {e}")
            return False




