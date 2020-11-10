import { GET_QUESTIONS, SCORED_POINT, ANSWERED, PLAYER_DATA } from '../actions';

const INITIAL_STATE = {
  results: [],
  name: '',
  score: 0,
  assertions: 0,
  timeout: false,
  time: 30,
  answered: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, results: action.payload.results };
  case SCORED_POINT:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
      answered: action.answered,
    };
  case PLAYER_DATA:
    return {
      ...state, ...action.payload };
  case ANSWERED:
    return {
      ...state,
      answered: action.answered,
      time: action.time,
      timeout: action.timeout,
    };
  default:
    return state;
  }
}
