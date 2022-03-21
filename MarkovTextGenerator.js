const defaultOptions = {
  startAsSentence: true,
  endAsSentence: true,
  filterFunction: (word) => true,
};

class MarkovTextGenerator {
  constructor(order = 2, options = defaultOptions) {
    this._options = options;
    this._order = order;
    this.textChain = {};
    this.nGramStates = {};
    this._validateParams();
  }

  _validateParams() {
    if (typeof this._order !== "number" || this._order < 1) {
      throw new TypeError(
        "MarkovTextGenerator constructor: order parameter must be a positive number"
      );
    }

    if (
      this._options.filterFunction &&
      typeof this._options.filterFunction !== "function"
    ) {
      throw new TypeError(
        "MarkovTextGenerator constructor: filterFunction must be a Function"
      );
    }

    if (
      this._options.filterFunction &&
      typeof this._options.filterFunction("test") !== "boolean"
    ) {
      throw new TypeError(
        "MarkovTextGenerator constructor: filterFunction must return a boolean"
      );
    }
  }

  setTrainingText(text) {
    if (!this._options.filterFunction) {
      this._options.filterFunction = defaultOptions.filterFunction;
    }
    this.nGramStates = new NGramStates(text, this._order, this._options);
    this.textChain = new TextChain(
      this.nGramStates.getNGramStates(),
      this._order,
      this._options
    );
  }

  generateText(numWords) {
    return this.textChain.generate(numWords);
  }
}
