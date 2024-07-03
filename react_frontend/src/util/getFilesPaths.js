//temporary solution
export function getAvatarsPaths(){
    let avatarPathArray = []
    for(let i=1;i<5;i++){
        avatarPathArray.push('./assets/avatars/avatar'+(i).toString() + ".png")  
    }
    console.log(avatarPathArray)
    return avatarPathArray;
}