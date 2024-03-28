
import './App.css'

function App() {
  const surpriseArray=[
    "A blue panda eating pizza",
    "A frog talking on phone",
    "A superhero beaten by women",
    "A baby flying on the sparrow"
  ]

  
  return (
    <div className="App">
      <section className="headline-section">
        <h2> <u>Daas</u>:)</h2>
      </section>
      <section className="search-section">
        <p>Start with detailed description <span className="surprise">Surprise Me</span> </p>
        <div className="inputContainer">
          <input type="text" placeholder="An artist paint a wall..." />
          <button>Generate</button>
        </div>
      </section>
      <section className="image-section">

      </section>
    </div>
  );
}

export default App;
