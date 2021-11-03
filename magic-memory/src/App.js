import "./App.css";
import { useEffect, useState } from "react";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/sword-1.png" },
  { src: "/img/shield-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [flipTime, setFlipTime] = useState(500);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [solvedCard, setSolvedCard] = useState(null);
  const handleChoices = (src) => {
    if (choiceOne === null) {
      setChoiceOne(src);
      console.log(src);
    } else {
      if (choiceOne === src) {
        setSolvedCard(src);
      }
    }
  };

  const changeFlipTime = (e) => {
    setFlipTime(e.target.textContent);
  };
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random() };
      });
    setCards(shuffledCards);
    setTurns(0);
  };
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div
        contentEditable
        className="flip-time"
        onInput={(e) => changeFlipTime(e)}
      >
        {flipTime}
      </div>
      <div className="card-grid">
        {cards.map((e) => {
          return (
            <Card
              src={e.src}
              id={e.id}
              flipTime={flipTime}
              handleChoice={handleChoices}
              solved={solvedCard}
            />
          );
        })}
      </div>
    </div>
  );
}

function Card({ id, src, flipTime, handleChoice, solved }) {
  console.log(solved);
  const [reveal, setReveal] = useState(false);
  const flipCard = (e) => {
    setReveal(!reveal);
    handleChoice(src);
  };

  //reveal all cards on first time render
  useEffect(() => {
    setReveal(true);
    setTimeout(() => setReveal(false), flipTime);
  }, []);
  useEffect(() => {
    let timer;
    if (reveal && solved !== src) {
      timer = setTimeout(() => setReveal(false), flipTime);
    }
    return () => clearTimeout(timer);
  }, [reveal, flipTime]);
  return (
    <div key={id} className="card">
      <div>
        {reveal ? (
          <img className="front" src={src} alt="Front" />
        ) : (
          <img
            onClick={flipCard}
            className="back"
            src="/img/cover.png"
            alt="Back"
          />
        )}
      </div>
    </div>
  );
}

export default App;
