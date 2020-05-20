let perceptron;
let training = new Array(2000);
let xmin = -1;
let xmax = 1;
let ymin = -1;
let ymax = 1;
let count = 0;

function f(x) {
    let y = 3 * x;
    return y;
}

function setup() {
    createCanvas(400, 400);
    perceptron = new Perceptron(3, 0.01);

    //test
    // let inputs = [-1, 0.5];
    // let prediction = perceptron.feedforward(inputs);
    // console.log(prediction);
    //

    //training data
    for (let i = 0; i < training.length; i++) {
        let x = random(xmin, xmax);
        let y = random(ymin, ymax);
        let correctOutp = 1;
        if (y < f(x)) {
            correctOutp = -1;
        }
        training[i] = {
            input: [x, y, 1],
            output: correctOutp
        };
    }


}

function draw() {
    background(0);
    //drawing the line
    strokeWeight(1);
    stroke(255);
    let x1 = map(xmin, xmin, xmax, 0, width);
    let x2 = map(xmax, xmin, xmax, 0, width);
    let y1 = map(f(xmin), ymin, ymax, height, 0);
    let y2 = map(f(xmax), ymin, ymax, height, 0);
    line(x1, y1, x2, y2);

    //drawing the line ajusted by the weights
    //w[0]*x+w[1]*y+w[2]=0
    strokeWeight(2);
    stroke(255);
    let weights = perceptron.getWeights();
    x1 = xmin;
    x2 = xmax;
    y1 = -weights[0] * x1 - weights[2] / weights[1];
    y2 = -weights[0] * x2 - weights[2] / weights[1];

    x1 = map(x1, xmin, xmax, 0, width);
    x2 = map(x2, xmin, xmax, 0, width);
    y1 = map(y1, ymin, ymax, height, 0);
    y1 = map(y2, ymin, ymax, height, 0);
    line(x1, y1, x2, y2);

    //training the perceptron
    perceptron.train(training[count].input, training[count].output);
    count = (count + 1) % training.length;

    //drawing the points based on prediction
    for (let i = 0; i < count; i++) {
        strokeWeight(1);
        stroke(255);
        fill(255);
        let prediction = perceptron.feedforward(training[i].input);
        if (prediction > 0) {
            noFill();
        }

        let x = map(training[i].input[0], xmin, xmax, 0, width);
        let y = map(training[i].input[1], ymin, ymax, height, 0);
        ellipse(x, y, 8, 8);


    }

}
