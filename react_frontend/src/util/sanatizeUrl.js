export function sanatizeUrl(url){
    if(url.includes("#")){
        url = url.split("#")
        url = url[0]
    }
    return url
}