# Wikirush
> Multiplayer implementation of [Wiki Game](https://en.wikipedia.org/wiki/Wikipedia:Wiki_Game) made with Django&React&Websockets.

![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)


## Overview
This is a multiplayer version of Wiki Game, also known as the Wikipedia race, is a race between any number of participants, using wikilinks to travel from one Wikipedia page to another. The first person to reach the destination page, wins the race. 

## Preview

<p align="center">
    <img src="preview.gif" alt="Example of application usage">
</p>

## Key points
- WebSocket Communication
- Lobby management(creating,joining,dynamic lobby owner)
- Live view of other players current article

## How to run


To clone and run this application, you'll need [Git](https://git-scm.com) and [Docker](https://www.docker.com/) From your command line:
```bash
# Clone this repository
$ git clone https://github.com/CMD451/Wikirush

# Go into the repository
$ cd Wikirush

# Run docker compose
$ docker compose up
```
After containers are created frontend site should be available on: http://localhost:3000



## License
<h5>MIT</h5>
