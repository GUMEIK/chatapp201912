import React, { Component } from 'react'
import './index.css'
import {register} from '../../serve'
export default class index extends Component {

    

     btnRegisterOnclick =  ()=>{
        // 获取用户名
        // 获取用户密码
        const rejisterName = this.refs.rejisterName.value;
        const rejisterPassword = this.refs.rejisterPassword.value;
        if(rejisterName == '' || rejisterName == undefined){
            alert("请输入合法用户名，不能为空和undefined")
        }else if(rejisterPassword == ''){
            alert("请输入密码！")
        }else if(rejisterPassword.length < 4 || rejisterPassword.length > 12){
            alert("请输入4-12位的密码！")
        }else{
           register(rejisterName,rejisterPassword).then(res=>{
               if(res && res.countId){
                let flag = window.confirm(`恭喜，注册成功，您的账号为：${res.countId};按确认键返回登录页！`)
                if(flag){
                    this.props.history.push("/")
                }
               }
           });
        }
        
    }


    render() {
        return (
            <div className="wrapperRegister">
                <div className="titleRegister">
                <h1>欢迎注册！</h1>
                </div>
                <div className="nameRegister">
                    <label >昵称
                        <input type="text" placeholder="请输入昵称" ref="rejisterName" />
                    </label>
                </div>
                <div className="passwordRegister">
                    <label >密码
                        <input type="password" placeholder="请输入4-12位字符" ref="rejisterPassword"/>
                    </label>
                </div>
                <div className="mailRegister">
                <label >邮箱
                        <input type="text" placeholder="用于确认注册信息"/>
                    </label>
                </div>
                <div className="registerRegister">
                    <button id="btnRegister" onClick={this.btnRegisterOnclick}>立即注册</button>
                </div>
            </div>
        )
    }
}
