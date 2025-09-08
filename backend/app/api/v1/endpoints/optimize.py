from fastapi import APIRouter

router = APIRouter()

@router.get("/batch")
async def optimize():
    res: str = '''
        hello
        this is 
        a 
        test
        information
    '''
    
    return res