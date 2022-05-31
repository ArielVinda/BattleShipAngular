# BattleShipAngular

BattleShip game done for a technical test. Starting empty project was created using angular-cli.

## Technologies

Angular 13, Typescript, SCSS, HTML

## Libraries

Angular CDK (for dialog/popup boxes)

## Instructions

Download this repository and run the development server locally with `ng serve`. Navigate to `http://localhost:4200/`.
If any error is presented, please run `npm install` and try again.

OR

Go to `https://main--battleship-angular-av.netlify.app/` where a demo of the game is hosted temporarily. 

## Clarifications

Unit tests were not done. Files .spec.ts, as well as karma.conf.js, are the default scaffolded by `ng generate`. I'm leaving them there for transparency, but they only check if the components/services are instantiable.

Game logic is annotated in code. Files to be concerned with are `game.service.ts`, `generator.service.ts`.

There is mock data written in raw on `score.service.ts`. Ideally, this data would come from an endpoint.

There are plans to continue developing this repo - below is a small TODO list - but for now it complies with the assignment given.

Minor liberties were taken on assignment items to make the experience of the game more consice.

## TODO
- Improve score logic
- Refactor some services where logic is not clearly readable
- Make a mock rest service to emmulate completely how a production site hooked to a backendd would look like
- Implement a timer (connected to the score logic)
- Add unit and coverage tests 
