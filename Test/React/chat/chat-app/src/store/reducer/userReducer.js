import userAction from '../action/userAction'

let userState = {
    userName:null,
    toWho:null,
    conuntId:null
}

function userReducer(state = userState ,action){
    if(action.type == 'update') return Object.assign(state,action.payload)
}


export default  userReducer;
