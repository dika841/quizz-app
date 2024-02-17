export type TGetQuestionResponse = {
  results: Array<{
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: Array<string>;
    question: string;
    type: string;
  }>;
};

export type TSelectAnswer = {
  index: number;
  answer: string;
  incorrect_answers: number;
};
