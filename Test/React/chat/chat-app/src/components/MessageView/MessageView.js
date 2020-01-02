import React, { Component } from 'react'
import './MessageView.css'
import store from '../../store/index'
import {Link} from 'react-router-dom'
import cookie from '../../core/cookie'
import {queryInfoByCountId} from '../../serve/index';

const socket = store.getState().socket;


class MessageView extends Component{
    userName = cookie.getCookie("userName");
    toWho =  cookie.getCookie("toWho");
    userInfo = {};
     showMessage =  (data,dom,userName,toWho) => {
        if(data.msg == "消息记录已经同步") return;

        if (data.username === userName && data.toWho == toWho) {
                let temp =  localStorage.getItem('imgUrl');             
                let htmlStr = `
                <div class="right">
                    <span>${data.mes}</span>
                    <div class="msg">
                     <img src=${temp} alt="">
                    </div>
                </div>
                `;
                dom.innerHTML += htmlStr;
           
          
            // 判断当前窗口的顶部名字是不是当前用户要发送给的按个人
            // 如果是，就渲染到左侧，如果不是，暂且不做渲染处理
            // 这样就处理了发送给同一个人不会渲染到同一个聊天界面了
        } else if(data.username === toWho){        
                let imgUrltoWho = localStorage.getItem('imgUrltoWho')
                let htmlStr = `
                <div class="left">
                    <div class="msg">
                     <img src=${imgUrltoWho} alt="">
                    </div>
                    <span>${data.mes}</span>
                </div>
                `;
                dom.innerHTML += htmlStr;
            
           
        }else{
            console.log("不做渲染")
        }
    }
    componentDidMount(){
      
 

        const toWho = this.toWho //目标用户的cookie id
        const userName = cookie.getCookie("userName")//当前用户的cookie Id
        
         // 该请求的作用就是，当界面刷新时，获取消息记录
        // 但会将请求内容渲染到对话框，影响体验
        // 所以，在渲染时要做特殊处理
        // 如果msg == 消息记录已经同步 就不渲染
        socket.emit("chat message",{
            username:userName,
            toWho:toWho,
            msg:"消息记录已经同步"
        });
        socket.emit("privateChatData",`${userName}-${toWho}`)
          // 发送这个是为了实时将用户与socketID绑定起来
        // 另一方面是获取最新的用户信息
        socket.emit("con",{
            username:userName,
            toWho:toWho
        }); 
        // 利用此方法刷新聊天记录     
        // const userInfo = store.getState().userInfo;
        // 拿到要和谁聊天
        const dom = this.refs.center;
        let showMessage = this.showMessage;
        socket.on("receiveMessage",function(data){
                dom.innerHTML = '';
                const dataArr = data.viewData;
                if(dataArr != null && dataArr.length != 0){
                    for(let i = 0;i < dataArr.length;i++){
                        showMessage(dataArr[i],dom,userName,toWho);
                    }
                }
        })
        
      

       
    }


    

    handleKeyDown = (e)=>{
        if(e.which == 13){
            let msg = e.target.value;
            const message = {
                username:this.userName,
                toWho:this.toWho,
                mes: msg
            }
            socket.emit("chat message",message);
            e.target.value = '';
        }
    }
    render(){
      // 获取目标对象信息


        queryInfoByCountId(this.toWho).then(res =>{
            localStorage.setItem('imgUrltoWho',res.imgUrl);
        })
    
        return (
            <div className="wrapperMessageView">
            <div className="topMessageView">
                {/* 点击返回按钮，返回到通讯录界面 */}
                <Link to="/mailList">
                <i className="iconfont iconfanhui" onClick={this.handleReturn}></i>
                </Link>
                {/* 将此处的thWho修改为从cookie中读取,但cookie存在刷新不及时的问题 */}
                <span>{this.toWho}</span>
                <i className="iconfont icongengduo"></i>
            </div>
            <div className="centerMessageView" ref="center">
            </div>
            <div className="bottomMessageView">
                <i className="iconfont iconyuyin"></i>
                <input type="text" id="message" ref="input" onKeyDown={this.handleKeyDown} />
                <i className="iconfont iconbiaoqing"></i>
                <i className="iconfont iconjiahao"></i>
            </div>
        </div>
        )
    }
}
export default MessageView;