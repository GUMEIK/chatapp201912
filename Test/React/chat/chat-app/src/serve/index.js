
export async function register(rejisterName,rejisterPassword){
    let url = `http://47.98.229.148:12306/register?name=${rejisterName}&password=${rejisterPassword}`;
    return await fetch(url,{
        method:'get'
    }).then(res =>res.json())
}

export async function login(userName,password){
    let url = `http://47.98.229.148:12306/login?name=${userName}&password=${password}`
    return await fetch(url,{
        method:'get'
    }).then(res =>res.text());
}

export async function queryInfoByCountId(id){
    let url = `http://47.98.229.148:12306/getUserInfo?id=${id}`;
    return await fetch(url,{
        method:'get'
    }).then(res =>res.json())
}


export async function upload(data){
    return await fetch('http://47.98.229.148:12307/upload',{
        method:'post',
        body:data
    }).then(res =>res.json())
}

export async function updateUserData(imgUrl,countId){
    return await fetch('http://47.98.229.148:12306/updateUserData',{
        method:'post',
        body:JSON.stringify({
            imgUrl,
            countId
        })
    }).then(res =>res.text())
}

