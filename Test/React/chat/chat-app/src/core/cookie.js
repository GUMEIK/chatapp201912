function setCookie(cookieObj){
    if(!cookieObj) return;
    for(let prop in cookieObj){
        document.cookie = `${prop}=${cookieObj[prop]}`
    }
    
}

function getCookie(key){
    let cookie = document.cookie;
    let obj = {};
    if(cookie.indexOf(";") > -1){
        let cookieArray = cookie.split("; ");
        let len = cookieArray.length;
        for(let i = 0;i < len;i++){
            let [name,value]= cookieArray[i].split("=");
            obj[name] = value;
        }
    }else{
        let [name,value] = cookie.split("=");
        obj[name] = value;
    }
    if(key) return obj[key];
    return obj;
}

export default {
    setCookie,
    getCookie
}