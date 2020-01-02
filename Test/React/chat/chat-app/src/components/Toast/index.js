import React ,{useState}from 'react'
import './index.css'
export default function Toast(props) {
    console.log(props)
    const defaultState = {
        title:''
    }
    let [buttonBool,setButtonBool] = useState(false);
    props.children(buttonBool)
    return (
        <div className="ToastWrapper">
            <div className="ToastHeaderTip">
                提示 : {props.title || defaultState.title}
            </div>
            <div className="ToastContent">
               <div className="Tips">
                   <div className="top">

                   </div>
                   <div className="bottom">
                       <div className="sure"
                       onClick = {()=>{
                           setButtonBool(true)
                       }}
                       >
                            确认
                       </div>
                       <div className="cancel"
                       onClick = {()=>{
                           setButtonBool(false);
                       }}
                       >
                            取消
                       </div>
                   </div>
               </div>
            </div>
        </div>
    )
}
