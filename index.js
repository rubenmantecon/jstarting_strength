//Imports and dependencies
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');

//Middlewares
//For parsing and straight up rendering JSON
app.use(express.json());
//For parsing URL-encoded request bodies like in HTML forms
app.use(require('body-parser').urlencoded({ extended: true }));
//Template engine for dynamically rendering HTML
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let workout = {
  type: null,
  exercises: [{
    name: null, sets: null, reps: null, weight: null
  }],
  date: null,
};


let workoutA = {
  type: "A",
  exercises: [
    {name: "squat", sets: 3, reps: 5, weight: 20},
    {name: "press", sets: 3, reps: 5, weight: 20},
    {name: "deadlift", sets: 3, reps: 5, weight: 40},
  ],
  date: null,
};

let workoutB = {
  type: "B",
  exercises: [
    {name: "squat", sets: 3, reps: 5, weight: 20},
    {name: "benchPress", sets: 3, reps: 5, weight: 20},
    {name: "deadlift", sets: 3, reps: 5, weight: 40},
  ],
  date: null,
};

app.get('/', (req, res) => {
  const workout = app.locals.workout;
  console.log(typeof(workout))
  console.dir(workout)
  //render function takes a JS object, and locals.workout is not one. So does the EJS template
  res.render('index', workout );
});

app.post('/', (req, res) => {
  app.locals.workout = req.body;
  res.end();
});

app.get('/display', (req, res) => {
  const workout = app.locals.workout;
  console.log(`You (probably) got redirected to /display. Using app.locals.workout, we stored the POSTed JSON:`);
  console.dir(workout);
  res.render('index', { workout });
});


app.get('/workout/:type', (req, res) => {
  if (req.params.type === "A") {
    res.send(workoutA);
  }
  else if (req.params.type === "B") {
    res.send(workoutB);
  }
});


app.post('/workout/', (req, res) => {
  console.log('You POSTed to /workout');
  console.log(`The request's body: `);
  console.dir(req.body);
  app.locals.workout = req.body;
});

app.listen(port, () => {
  console.log(`JStarting Strength listening http://localhost:${port}`);
});

