import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import {queryInfoByCountId} from '../../serve'
import cookie from '../../core/cookie'
import {upload,updateUserData} from '../../serve'
export default class UserCenter extends Component {


    componentDidMount(){
        let fileInput = this.refs.file;
        let image = this.refs.pic;
       fileInput.onchange = ()=>{
        let reads= new FileReader();
        let filds = fileInput.files[0];
        reads.readAsDataURL(filds);
        reads.onload = (e)=>{
            image.src = reads.result;
        }
      }
    }
    uploadBtn = ()=>{
       let file = this.refs.file.files[0];
       if(!file){
        alert("请先点击左侧按钮，选择头像图片！");
        return;
       }
       let form = new FormData();
       form.append("file",file);
       upload(form).then(res =>{
           let pic = this.refs.pic;
           pic.src = "http://47.98.229.148:12307/getpic?path=" + res.path;
           let countId = cookie.getCookie('countId');
           updateUserData(pic.src,countId).then(res=>{
               alert(res);
           })
       })
       
    }
    render() {
        let countId = cookie.getCookie("userName");
        // console.log(countId)
        queryInfoByCountId(countId).then(res=>{
            cookie.setCookie({
                name:res.name,
                countId:res.countId,
            })
            localStorage.setItem('imgUrl',res.imgUrl);
        })
        let name = cookie.getCookie("name");
        let countNumber = cookie.getCookie("countId");
    // 在这里使用cookie储存图片路径不太好时，因为储存空间有限，储存不了那么长的路径大概是这个样子
    // 这里换成用localstorage
        let imgUrl = localStorage.getItem('imgUrl')
        return (
            <div className="wrapperUserCenter">
            <div className="topUserCenter" >
               
           <div className="img">
               <div className="imgWrapper">
                  <img src={imgUrl} alt="" ref="pic"/>
               </div>
           
             <div className="replace">
                 <div className="fileWrapper" >
                     <input type="file" ref="file" />}/>
                    
                 </div>
                
                 <button onClick={this.uploadBtn}>确认更换</button>
             </div>
            
           </div>
               <div className="info">
                <h2>{name}</h2>
                <span>账号：{countNumber}</span>
             </div>
               
            </div>
            <div className="centerUserCenter">
             
                <ul ref="ul">
                    <li>功能预留</li>
                    <li>功能预留</li>
                    <li>功能预留</li>
                    <li>功能预留</li>
                    <li>功能预留</li>
                </ul>
            </div>
            <div className="bottomUserCenter">
                <Link to="/MessageList">
                <i className="iconfont iconxinxi"></i>
                </Link>
                <Link to="/maillist">
                <i className="iconfont icontongxunlu"></i>
                </Link>
                <i className="iconfont iconfaxian"></i>
                <Link to="/usercenter">
                <i className="iconfont iconicon-user" ></i>
                </Link>
            </div>
        </div>

        )
    }
}
