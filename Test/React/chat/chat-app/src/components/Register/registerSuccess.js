import React from 'react'

export default function registerSuccess(props) {
    return (
        <div>
            <h1>恭喜！注册成功</h1>
    <h1>您注册的账号为:{props.countId}</h1>
        </div>
    )
}
