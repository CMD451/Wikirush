function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export function genereateRandomLobbyId(){
    let epochMinutes = Date.now() % 1000000
    let id = epochMinutes.toString(16)
    id += getRandomInt(100000000).toString(16)
    return id
}