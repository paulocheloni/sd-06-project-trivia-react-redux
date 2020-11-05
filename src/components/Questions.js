import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
    };

    // function binds
    this.changeToNextQuestion = this.changeToNextQuestion.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.applyIndexToIncorrectAnswers = this.applyIndexToIncorrectAnswers.bind(this);
  }

  changeToNextQuestion() {
    const { questionNumber } = this.state;
    const indexLimit = 4;
    this.setState({
      questionNumber: (questionNumber < indexLimit ? questionNumber + 1 : 0),
    });
  }

  applyIndexToIncorrectAnswers(index) {
    index += 1;
    return index;
  }

  shuffle(array) {
    const magic = 0.5;
    return array.sort(() => Math.random() - magic);
  }

  handleQuestions() {
    const { gameQuestions } = this.props;
    const { questionNumber } = this.state;

    if (gameQuestions) {
      const CORRECT_ANSWER = gameQuestions[questionNumber].correct_answer;
      const INCORRECT_ANSWER = gameQuestions[questionNumber].incorrect_answers;
      const questionsArray = [CORRECT_ANSWER, ...INCORRECT_ANSWER];
      console.log(questionsArray);
      const newArr = this.shuffle(questionsArray);
      console.log(newArr);
      return (
        <div>
          <h4 data-testid="question-category">{gameQuestions[questionNumber].category}</h4>
          <p data-testid="question-text">{gameQuestions[questionNumber].question}</p>
          {newArr.map((question) => {
            if (question === CORRECT_ANSWER) {
              return (
                <button type="button" data-testid="correct-answer">
                  {question}
                </button>
              );
            }
            return (
              <button key={ this.applyIndexToIncorrectAnswers() } type="button" data-testid="wrong-answers">
                {question}
              </button>
            );
          })}
        </div>
      );
    }
    return <p>Loading</p>;
  }

  render() {
    const { gameQuestions } = this.props;
    const { questionNumber } = this.state;
    return (
      <div>
        {this.handleQuestions()}
        <button type="button" onClick={ this.changeToNextQuestion }>Next Question</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameQuestions: state.game.questions,
});

export default connect(mapStateToProps)(Questions);
