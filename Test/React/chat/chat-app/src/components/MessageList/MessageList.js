import React from 'react'
import './MessageList.css'
import cookie from '../../core/cookie'
import io from 'socket.io-client'
import {Link} from 'react-router-dom' 
const userName = cookie.getCookie('userName');

const socket = io("http://47.98.229.148:12306",{
    path:'/groupChat'
})



class MessageList extends React.Component{

    showMessage = (data,dom,userName) => {
        
        if (data.username === userName) {
            let htmlStr = `
            <div class="right">
                <span>${data.mes}</span>
                <div class="msg">
                 <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573550921439&di=ec4975809a74f75401856072576aaf77&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20171128%2F353b161af85c49988edbf92bb50ef308.jpg" alt="">
                </div>
            </div>
            `;
            dom.innerHTML += htmlStr;
        } else{
            let htmlStr = `
            <div class="left">
                <div class="msg">
                 <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573553154417&di=5f1359f3105f22c62e4129d9bd134911&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc4406b693041c569327dba318e316be839faf2538414-fYFGb4_fw658" alt="">
                </div>
                <span>${data.mes}</span>
            </div>
            `;
            dom.innerHTML += htmlStr;
        }
    }

    componentDidMount(){
        socket.emit("chat message",'')
        let showMessage = this.showMessage;
        socket.emit("con", {
            username: userName
        });
        const dom = this.refs.center;
        socket.on("groupViewData",function(data){
            dom.innerHTML = '';
            for(let i= 0;i < data.length;i++){
                showMessage(data[i],dom,userName)
            }
        })
    }
    handleKeyDown = (e)=>{
        if(e.which == 13){
            let msg = e.target.value;
            const params = this.props.history.location;
            const message = {
                username:userName,
                mes: msg
            }
            socket.emit("chat message",message);
            e.target.value = '';
        }
    }

    render(){
        return (
            <div className="wrapperMessageList">
            <div className="topMessageList">      
            <Link to="/maillist">   
                <i className="iconfont iconfanhui" ></i>
            </Link>       
                    <span>在线聊天室</span>
                <i className="iconfont icongengduo"></i>
            </div>
            <div className="centerMessageList" ref="center">
              
            </div>
            <div className="bottomMessageList">
                <i className="iconfont iconyuyin"></i>
                <input type="text" id="message" ref="input" onKeyDown={this.handleKeyDown} />
                <i className="iconfont iconbiaoqing"></i>
                <i className="iconfont iconjiahao"></i>
            </div>
        </div>

        )
    }
}

export default MessageList;