class Perceptron {
    constructor(n, lr) {
        this.weights = new Array(n);

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] = random(-1, 1);
        }

        this.lr = lr; //learning rate

    }

    activationFunction(escP) { //funcao sinal
        if (escP > 0) {
            return 1;
        } else {
            return -1;
        }
    }

    feedforward(inputs) {
        let escP = 0;
        for (let i = 0; i < this.weights.length; i++) {
            escP += inputs[i] * this.weights[i]; //produtoescalar
        }
        return this.activationFunction(escP); //outputs
    }

    train(inputs, targetOutp) {
        let prediction = this.feedforward(inputs);
        let error = targetOutp - prediction;

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += this.lr * error * inputs[i];
        }
    }

    getWeights() {
        return this.weights;
    }

}
