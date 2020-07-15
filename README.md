### Load balancer concept

A load balancer concept written in TypeScript and UI with React.js. 

It runs JS tasks in a limited number of Web Workers (threads).

#### Example

(A JS task for the example is a setTimeout delay, for random number of seconds between 1 and 10)

- One load balancer is created by default.
- The user selects how many task runners should be available.
- The user selectes how many tasks should run.
- The tasks run in whatever task runner is available until the tasks list is empty.
- The busy task runners are marked as red.
- When a task runner is available, it turns green again.

#### Run locally

Install dependencies 

`npm i`

Start the local dev server

`npm run dev`

Start the UI

[http://localhost:3000](http://localhost:3000)

#### View the threads

Start the dev console, open Debugger (in Firefox), follow the Web Workers (threads) as they are created and terminated.
