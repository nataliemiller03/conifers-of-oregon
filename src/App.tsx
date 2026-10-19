// import './App.css';
import keyData from './key.json';
import { useEffect, useState } from "react";
import { OptionComponent } from './components/Option';
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

  const currentStep = getKeyDataById(step);

  if (!currentStep) {
    return (
      <main>
        <h1>Conifers of Oregon</h1>
      </main>
    );
  }
  return (
    <div className="container">
      <h1>Conifers of Oregon</h1>
      <div className="options">
        {currentStep.options.map(option => (
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
