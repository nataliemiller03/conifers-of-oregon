// import './App.css';
import keyData from './key.json';
import resultsData from './results.json'
import { useEffect, useState } from "react";
import { OptionComponent } from './components/Option';
import { getResultById } from './components/results';
import './App.css';

function readStepFromUrl() {
  const step = new URLSearchParams(window.location.search).get("step");
  return step || "1";
}

export function App() {
  const [step, setStep] = useState(readStepFromUrl);

  useEffect(() => {
    const handlePopState = () => {
      setStep(readStepFromUrl());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateToStep = (destination: string) => {
    const url = new URL(window.location.href);

    url.searchParams.set("step", destination);

    window.history.pushState({}, "", url);
    setStep(destination);
  };

  const getKeyDataById = (id: string) =>
    keyData.find(item => item.id === id);

  const getResultDataById = (id: string) => 
    resultsData.find(item => item.id === id);

  const currentStep = getKeyDataById(step);
  const currentResult = getResultDataById(step);

  if (!currentStep && !currentResult) {
    return (
      <main>
        <h1>You've caught me cleanin'</h1>
      </main>
    );
  }

  if (currentResult) {
    const resultContent = getResultById(currentResult.id)
    return (
      <div className="container">
        <h1 className="pageTitle libreBaskerville">You're looking at a {currentResult.common}</h1>
        {currentResult.scientific && <h2 className="subtitle libreBaskerville italic">({currentResult.scientific})</h2>}
        {resultContent && resultContent}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="pageTitle libreBaskerville">Conifers of Oregon</h1>
      <h2 className="subtitle libreBaskerville">What do you see?</h2>
      <div className="options">
        {currentStep && currentStep.options.map(option => (
          <button
            className="optionButton"
            key={option.id}
            onClick={() => navigateToStep(option.destination)}
          >
            <OptionComponent {...option} />
          </button>
        ))}
      </div>
    </div>
  );
}
