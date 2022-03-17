const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()) 

let workoutA = {
  type: "A",
  squat: { sets: 3, reps: 15, weight: 20 },
  press: { sets: 3, reps: 15, weight: 20 },
  deadlift: { sets: 1, reps: 5, weight: 40 },

};

let workoutB = {
  type: "B",
  squat: { sets: 3, reps: 15, weight: 20 },
  bench: { sets: 3, reps: 15, weight: 20 },
  deadlift: { sets: 1, reps: 5, weight: 40 },

};

app.get('/', (req, res) => {
  res.send('<h2>Hello there</h2>')
})

app.get('/display', (req, res) => {
  console.log(`You (probably) got redirected. Using req.app.locals.workout, we stored the POSTed JSON in
  /workout: ${JSON.stringify(res.app.locals.workout)}`);
  res.json(res.app.locals.workout);
})


app.get('/workout/:type', (req, res) => {
  if (req.params.type === "A") {
    res.send(workoutA);
  }
  else if (req.params.type === "B") {
    res.send(workoutB);
  }
});


app.post('/workout/', (req, res) => {
  console.log('You POSTed');
  console.log(`The request's body: ${JSON.stringify(req.body)}`);
  req.app.locals.workout = req.body;
  console.log(`req.app.locals.workout: ${JSON.stringify(req.app.locals.workout)}`);
});

app.listen(port, () => {
  console.log(`JStarting Strength listening http://localhost:${port}/workout/`);
});

