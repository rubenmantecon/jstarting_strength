const express = require('express');
const app = express();
const port = 3000;


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

app.get('/workout/:type', (req, res) => {
  if (req.params.type === "A") {
    res.send(workoutA);
  }
  else if (req.params.type === "B") {
    res.send(workoutB)
  }
});

app.post('/workout/:type', (req, res) => {
  //
});

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}/workout/`)
})