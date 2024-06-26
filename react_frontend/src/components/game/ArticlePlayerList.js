import React from 'react';
import '../../styles/game.css'

export function ArticlePlayerList(props) {
    function getPlayersCurrentArticleList(){
        return props.players.map((player)=>{
            return(
                <div class="player-in-game">
                <div class="player">
                  <div class="player-img">
                    <img src={player.avatarUrl}/>
                  </div>
                  <div class="player-username">
                    <span>{player.username}</span>
                  </div>
                </div>
                 <div class="player-article">
                  <span>{player.current_article}</span>
                </div>
              </div>
            )
        }
           
        )
    }
    return (
       <React.Fragment>
            {getPlayersCurrentArticleList()}
       </React.Fragment>
    );

}

