const userIntialValue={}


const userReducer=(state=userIntialValue,action)=>{
    switch(action.type){
        case 'SET_USER':{
            return {...action.payload}
        }
       
        default:{
            return state
        }
    }

}
export default userReducer