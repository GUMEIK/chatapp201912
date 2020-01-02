import React from 'react';
import {HashRouter as BrowserRouter ,Route} from 'react-router-dom'
import './App.css';
// 引入组件
import MessageView from './components/MessageView/MessageView'
import Login from './components/Login/Login'
import MailList from './components/MailList/MailList'
import MessageList from './components/MessageList/MessageList'
// 测试redux
import './store/index'
import Register from './components/Register'
import UserCenter from './components/UserCenter'

class App extends React.Component {

  // constructor(props){
  //   super(props);
  // }

  flag = false;
  
  // componentDidMount(){
  //   let bgImg = new Image();
  //   bgImg.src = img;
  //   // console.log(this.refs)
  //   blurImg(bgImg,this.refs.wrapper)
  // }
  
  render(){
    return (
      <>
      <BrowserRouter>
      {/* Route 上有render这个属性，当conmponent 属性存在时，该属性无效 */}
       <Route   path="/" component = {Login} exact render={
         (values)=>{
            if(this.flag){
              return <MailList/>;
            }else{
              return <h1>不好意思，密码不正确</h1>
            }
         }
       }/>
       <Route path="/MessageList" component = {MessageList}></Route>
       <Route   path="/messageView" component = {MessageView} />
       <Route   path="/mailList" component = {MailList} />
       <Route path = "/register" component = {Register}/>
       <Route path = "/usercenter" component = {UserCenter}/>
      </BrowserRouter>
     
    </>
    )
  }
}

export default App;
