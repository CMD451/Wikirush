//temporary solution
export function getAvatarsPaths(){
    let avatarPathArray = []
    for(let i=0;i<3;i++){
        avatarPathArray[i] = './assets/avatars/avatar'+(i+2).toString() + ".png";
    }
    return avatarPathArray;
}