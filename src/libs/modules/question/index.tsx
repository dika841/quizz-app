import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useDataQuestion } from "./hook";
import Skeleton from "@libs/components/loading/skeleton";
import { Button, Dialog } from "@libs/components";

export const QuestionModule: FC = (): ReactElement => {
  const { data, isLoading } = useDataQuestion();
  const [score, setScore] = useState<number>(() => {
    const storedItem = localStorage.getItem("score");
    return storedItem ? JSON.parse(storedItem) : 0;
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>(() => {
    const storedItem = localStorage.getItem("selectedAnswer");
    return storedItem ? JSON.parse(storedItem) : [];
  });
  const [isDialogShow, setIsDialogShow] = useState<boolean>(false);
  const [totalWrongAnswer, setTotalWrongAnswer] = useState<number>(() => {
    const storedItem = localStorage.getItem("totalWrongAnswer");
    return storedItem ? JSON.parse(storedItem) : 0;
  });
  const [totalCorrectAnswer, setTotalCorrectAnswer] = useState<number>(() => {
    const storedItem = localStorage.getItem("totalCorrectAnswer");
    return storedItem ? JSON.parse(storedItem) : 0;
  });
  const [isActiveQuestion, setIsActiveQuestion] = useState<number>(
    Number(localStorage.getItem("isActiveQuestion")) || 0
  );
  const [minutes, setMinutes] = useState<number>(
    localStorage.getItem("minutes")
      ? Number(localStorage.getItem("minutes"))
      : 1
  );

  const [seconds, setSeconds] = useState<number>(
    Number(localStorage.getItem("seconds"))
  );

  const dataQuestion = data?.results.map((item, idx) => ({
    no: idx + 1,
    question: item.question,
    options: [...item.incorrect_answers, item.correct_answer],
    correctAnswer: item.correct_answer,
  }));

  const intervalRef = useRef<NodeJS.Timeout>();

  const handleScore = (answer: string): void => {
    if (answer === dataQuestion?.[isActiveQuestion].correctAnswer) {
      setScore((prev) => prev + 20);
      setTotalCorrectAnswer((prev) => prev + 1);
    } else {
      setTotalWrongAnswer((prev) => prev + 1);
    }
  };
  const handleNextQuestion = (answer: string): void => {
    if (!selectedAnswer?.includes(answer)) {
      setSelectedAnswer([...selectedAnswer, answer]);
    }
    dataQuestion && isActiveQuestion + 1 == dataQuestion?.length
      ? setIsDialogShow(true)
      : setIsActiveQuestion(isActiveQuestion + 1);

    handleScore(answer);
    localStorage.setItem("isActiveQuestion", String(isActiveQuestion + 1));
  };
  const handleTryAgain = (): void => {
    setIsDialogShow(false);
    localStorage.removeItem("isActiveQuestion");
    localStorage.removeItem("score");
    localStorage.removeItem("selectedAnswer");
    localStorage.removeItem("totalWrongAnswer");
    localStorage.removeItem("totalCorrectAnswer");
    location.reload();
  };
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalRef.current);
        } else {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    if (minutes === 0 && seconds === 0) {
      setIsDialogShow(true);
      clearInterval(intervalRef.current);
    }

    return () => {
      localStorage.setItem("minutes", String(minutes));
      localStorage.setItem("seconds", String(seconds));
      clearInterval(intervalRef.current);
    };
  }, [minutes, seconds]);
  useEffect(() => {
    //set score to local storage
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("selectedAnswer", JSON.stringify(selectedAnswer));
    localStorage.setItem("totalWrongAnswer", JSON.stringify(totalWrongAnswer));
    localStorage.setItem(
      "totalCorrectAnswer",
      JSON.stringify(totalCorrectAnswer)
    );
  }, [score, selectedAnswer, totalCorrectAnswer, totalWrongAnswer]);
  return (
    <section className="flex w-full h-screen justify-center items-center">
      <div className=" bg-white w-full md:w-2/3 p-6 rounded h-[500px]">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <div className="flex justify-between mb-8 items-center">
              <h1 className="font-bold text-2xl ">Complete the quiz</h1>
              {minutes === 0 && seconds === 0 ? null : (
                <h3 className="text-green-600 text-lg font-semibold">
                  {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                </h3>
              )}
            </div>
            <div className="font-medium text-lg mb-5">
              <p>{`Question completed ${selectedAnswer.length} of ${dataQuestion?.length}`}</p>
            </div>
            <div className="flex flex-col gap-y-3">
              {dataQuestion && isActiveQuestion < dataQuestion.length ? (
                <>
                  <h2>{dataQuestion[isActiveQuestion].question}</h2>
                  <ul className="flex flex-col gap-y-2">
                    {dataQuestion[isActiveQuestion].options.map(
                      (option, idx) => (
                        <li
                          onClick={() => handleNextQuestion(option)}
                          key={idx}
                          className="border border-gray-300 rounded w-auto p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {option}
                        </li>
                      )
                    )}
                  </ul>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
      {isDialogShow && (
        <Dialog>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">Your Score Is : </h1>
            <h2
              className={`${
                score < 60 ? `text-red-500` : `text-green-500`
              } font-bold text-3xl`}
            >
              {score}
            </h2>
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Total Correct Answer : {totalCorrectAnswer}
              </p>
              <p className="text-lg font-semibold">
                Total Wrong Answer : {totalWrongAnswer}
              </p>
              <p className="text-lg font-semibold">
                Total of questions Answered : {selectedAnswer.length}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleTryAgain} size="md">
              Try Again
            </Button>
          </div>
        </Dialog>
      )}
    </section>
  );
};
