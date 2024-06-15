
import express from "express";
import { outcomes } from "./outcomes";
import cors from "cors";  //Imports the CORS (Cross-Origin Resource Sharing) middleware to allow cross-origin requests.

const app = express();
app.use(cors())

const TOTAL_DROPS = 16; // The total number of drops (or steps) in the game, set to 16.

const MULTIPLIERS: {[ key: number ]: number} = {
    0: 16,
    1: 9,
    2: 2,
    3: 1.4,
    4: 1.4,
    5: 1.2,
    6: 1.1,
    7: 1,
    8: 0.5,
    9: 1,
    10: 1.1,
    11: 1.2,
    12: 1.4,
    13: 1.4,
    14: 2,
    15: 9,
    16: 16
}

app.post("/game", (req, res) => {
    let outcome = 0; //outcome: Tracks the number of "R" (right) steps taken.
    const pattern = [] ; //pattern: An array to store the sequence of "R" (right) and "L" (left) steps.
    //For Loop: Iterates TOTAL_DROPS times to generate the game pattern:
// Math.random() > 0.5: Simulates a 50/50 chance of moving right or left.
// pattern.push("R"): Adds "R" to the pattern and increments outcome if the random number is greater than 0.5.
// pattern.push("L"): Adds "L" to the pattern if the random number is 0.5 or less.
    for (let i = 0; i < TOTAL_DROPS; i++) {
        if (Math.random() > 0.5) {
            pattern.push("R")
            outcome++;
        } else {
            pattern.push("L")
        }
    }

    const multiplier = MULTIPLIERS[outcome];
    const possiblieOutcomes = outcomes[outcome];

    res.send({
        point: possiblieOutcomes[Math.floor(Math.random() * possiblieOutcomes.length || 0)],
        multiplier,
        pattern
    });
});

app.listen(3000)