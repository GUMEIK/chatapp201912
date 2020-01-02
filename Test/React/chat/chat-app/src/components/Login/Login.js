import React from 'react'
import store from '../../store/index'
import './Login.css'
import cookie from '../../core/cookie'
import {login} from '../../serve'
import Toast from '../../components/Toast'
const socket = store.getState().socket;

class Login extends React.Component{
    state = {
        isShowToast:false,
        isGoRegister:false
    }
    // 登录按钮处理事件
    handleClick = () => {
        let userName = this.refs.userName.value;
        let password = this.refs.password.value;
        // 发送请求要放在前面，因为cookie的设置和读取可能是同步的
        if(userName == ''){
            this.setState({
                isShowToast:true
            })
        }else if(password == ''){
            alert("密码不正确！")
        }else{
            socket.emit('con', {
                username: userName//账号
            })
            cookie.setCookie({
                userName: userName//账号
            })
            login(userName,password).then(res => {
                console.log(res)
                if (res === '允许登录!') {
                    this.props.history.push("/mailList")
                 
                }else if(res === '账号或密码错误!'){
                    alert("账号或密码错误！请重新输入：")
                }
            })
        }
    }

    rejisterClick = ()=>{
        this.props.history.push("/register")
    }
    render(){
        console.log(this.props)
        return (
            <div className="wrapper" id="wrapper" ref={'wrapper'} >
            {
                this.state.isShowToast && <Toast 
                title="注册账号！"
                content = {
                    <h1>要去注册一个账号吗</h1>
                }
                >
                    {flag =>{
                        if(flag){
                            this.props.history.push("/register")
                        }
                        console.log(flag)
                        this.state.isGoRegister = flag;
                        console.log(this.state)
                    }}
                </Toast>
            }
            <div className="avatar">
                <i className="iconfont iconicon-user">
      
                </i>
            </div>
            <div className="loginArea">
      
                <h2>Sign in</h2>
                <div className="username">
                    <i className="iconfont iconyonghu"></i>
                    <input type="text" placeholder="请输入用户名" ref="userName"/>
                </div>
                <div className="password">
                    <i className="iconfont iconmima"></i>
                    <input type="password" placeholder="请输入密码" ref="password"/>
                </div>
                {/* 使用link组件，用户名和密码正确就进行跳转 */}
                {/* 按道理讲，配合导航守卫来进行密码验证是好使的 */}
                {/* <Link to="/mailList"> */}
                    <button id="loginBtn" onClick={this.handleClick}><i> Login</i></button>
                {/* </Link> */}
                <div className="tipArea">
                
                    <span>请记住我</span>
                    <span onClick={
                        this.rejisterClick
                    }>账号注册</span>
                </div>
            </div>
        </div>
        )
    }
}

export default Login