


function formatToDouble(num){
    num = String(num)
    if(num.length < 2){
        num = "0"+num
    }
    return num
}

export function formatTime(ms){
    const hours = parseInt(ms/3600000)
    ms = ms % 3600000
    const minutes = parseInt(ms/60000)
    ms = ms % 60000
    const seconds = parseInt(ms/1000)
    ms = (ms % 1000)/100
    return `${formatToDouble(hours)}:${formatToDouble(minutes)}:${formatToDouble(seconds)}:${ms}`
}