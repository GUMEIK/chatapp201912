import React from 'react'
import './MailList.css'
import img1 from '../../static/img/1.png'
// 引入仓库
import store from '../../store/index';
import cookie from '../../core/cookie'
import {Link} from 'react-router-dom'
import {queryInfoByCountId} from '../../serve'
// 读取cookie
const userName = cookie.getCookie('userName');
const socket = store.getState().socket;
class MailList extends React.Component{
    state = {}
    // 点击事件中能够拿到e.target
    handleClick = (e)=> {
        
        const target = e.target;
        const tagName = target.tagName;
        let oLi = null;
        if (tagName == "LI") {
            oLi = target;
        } else if (tagName == "IMG") {
            oLi = target.parentElement;
        } else if (tagName == "P" || tagName == "H4") {
            oLi = target.parentElement.parentElement;
        }
        let userData = JSON.parse(oLi.getAttribute("val"));//这里获取到的userData 就是countid
        // 将给谁发送消息写入cookie
        cookie.setCookie({
            toWho:userData//将对方用户的countid写入cookie
        })
        queryInfoByCountId(userData).then(res =>{
            localStorage.setItem('imgUrltoWho',res.imgUrl);
        })

        // 读取要将消息发给谁
        // const toWho = cookie.getCookie("toWho")
        // 跳转到聊天界面，并传递相关参数

        this.props.history.push({
            pathname:"/messageView",
        })
        socket.emit("con",{
            // username:userInfo.userName,
            // 改为 从cookie中读取
            username:userName,//当前用户的countid
            // toWho:userInfo.toWho
            toWho:userData//对方用户的countid
        }); 
        // 获取消息列表
        socket.emit("privateChatData",`${userName}-${userData}`)

      
    
    }

    componentDidMount(){
        socket.emit("con",{
            username:userName,//其实就是countId，当前用户的countid
            // imgUrl:'imgUrl',
            // name:'name'
        })
        // 拿到ul元素
        let oUl = this.refs.ul;
        let imgUrl = localStorage.getItem("imgUrl");
        socket.on("userData",function(data){
            oUl.innerHTML = '';
            // data 是个对象，保存了所有当前连接的用户名:id
            for(let prop in data){
                console.log()
                let imgUrl = data[prop].imgUrl;
                // console.log()
        
                let htmlStr = `
            <li val= ${JSON.stringify(prop)}  >
                <div class='img'>
                    <img src=${imgUrl} alt="" />
                </div>
                <div class="info">
                    <h4>${data[prop].name}</h4>
                    <p>${prop}</p>
                </div>
            </li>
            `
           
            if(prop == 'undefined'){
            //    console.log('格式不正确')
            }else if(prop == userName){
                // oUl.innerHTML = '';
                let temp  = `
            <li 
            class="currentUser"
            val= ${JSON.stringify(prop)}  >
                <div class='img'>
                     <img src=${imgUrl} alt="" />
                </div>
                <div class="info">
                    <h4>${data[prop].name}</h4>
                    <p>${prop}</p>
                </div>
            </li>
            `
            oUl.innerHTML += temp;
            }
            else {
                oUl.innerHTML += htmlStr;
            }
            }
            })
    }

    render(){
        
        return (
            <div className="wrapperMailList">
            <div className="topMailList" >
                <span>通讯录</span>
                <div className="topRight">
                    <i className="iconfont iconsousuo"></i>
                    <i className="iconfont iconjiahao"></i>
                </div>
            </div>
            <div className="centerMailList">
             
                <ul onClick={this.handleClick} ref="ul">
        
                </ul>
            </div>
            <div className="bottomMailList">
                <Link to="/MessageList">
                <i className="iconfont iconxinxi"></i>
                </Link>
                <i className="iconfont icontongxunlu"></i>
                <i className="iconfont iconfaxian"></i>
                <Link to="/usercenter">
                <i className="iconfont iconicon-user" ></i>
                </Link>
            </div>
        </div>
        )
    }
}

export default MailList;