import userReducer from './userReducer';
import io from 'socket.io-client'
// http://localhost:12306
// const socket = io("http://106.13.75.179:12306");
const socket = io("http://47.98.229.148:12306");

export default (state = {},action)=>{
    const newState = {
        userInfo:userReducer(state.userInfo,action) || {},
        otherInfo:null,
        socket:socket
    }
    return newState;
}

console.log(socket)