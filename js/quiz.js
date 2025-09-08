// js/quiz.js

class Quiz {
  /**
   * @param {Array<Question>} questions - Array of Question instances
   */
  constructor(questions) {
    this.questions = Array.isArray(questions) ? questions : [];
    this.questionIndex = 0;
    this.correctAnswers = 0;
  }

  /** Current Question instance */
  callQuestion() {
    return this.questions[this.questionIndex];
  }

  /** Move to next question (returns true if moved, false if at end) */
  next() {
    if (this.hasNext()) {
      this.questionIndex += 1;
      return true;
    }
    return false;
  }

  /** Are there more questions after the current one? */
  hasNext() {
    return this.questionIndex < this.questions.length - 1;
  }

  /** Reset progress & score (does not change question set) */
  resetProgress() {
    this.questionIndex = 0;
    this.correctAnswers = 0;
  }

  /** Total number of questions */
  get length() {
    return this.questions.length;
  }
}

// Expose globally (browser)
window.Quiz = Quiz;
