import { type ChangeEvent, useState } from "react";

type QuestionAnswer = {
  question: string;
  answer: string | null;
};

export default function MultiStepFormReverse() {
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState<QuestionAnswer[]>([
    { question: "Is the sky blue?", answer: null },
    { question: "Is the ocean blue?", answer: null },
    { question: "Is the grass green?", answer: null },
    { question: "Is the sun yellow?", answer: null },
  ]);

  function goToPreviousStep() {
    if (step === 0) {
      return;
    }

    setStep((prevStep) => prevStep - 1);
  }
  function goToNextStep() {
    if (step === questions.length - 1) {
      return;
    }

    setStep((prevStep) => prevStep + 1);
  }

  return (
    <div className="prose-none card mx-auto w-72 bg-base-100 drop-shadow-xl md:w-80 lg:w-96">
      <div className="card-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goToNextStep();
          }}
        >
          <p className="mb-2 mt-0 flex w-full justify-between">
            <span>{questions[step].question}</span>
            <span>
              ({step + 1} / {questions.length})
            </span>
          </p>
          {["Yes", "No"].map((option) => {
            const isChecked = questions[step].answer === option;

            const onChange = (e: ChangeEvent<HTMLInputElement>) => {
              setQuestions((prevQuestions) => {
                const newQuestions = [...prevQuestions];
                newQuestions[step].answer = e.target.value;
                return newQuestions;
              });
            };

            return (
              <div key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  className="radio"
                  id={option}
                  name={questions[step].question}
                  value={option}
                  checked={isChecked}
                  onChange={onChange}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            );
          })}
          <div className="mt-4 flex w-full flex-row-reverse justify-between">
            {step !== 3 && (
              <button
                className="btn btn-accent focus-visible:outline-black"
                type="submit"
              >
                Next
              </button>
            )}

            {step !== 0 ? (
              <button
                type="button"
                onClick={() => goToPreviousStep()}
                className="btn"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
