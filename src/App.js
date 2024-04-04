import { useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState(null);
  const [size, setSize] = useState("");
  const [error,setError] = useState(null)

  const botherMeOption = [
    "A blue panda eating pizza",
    "A frog talking on phone",
    "A superhero beaten by women",
    "A baby flying on fish",
  ];

  const botherMe = ()=>{
    setImages(null)
    setError(null)
    const pickRandom = botherMeOption[Math.floor(Math.random()*botherMeOption.length)]
    setValue(pickRandom)
  }

  console.log("this is input1::", value);
  console.log("this is images1::", images);
  console.log("this is size choosen::", size);

  const getImg = async () => {
    setImages(null)
    if(value=== null){
      setError('Error! must have prompt in input section :( ')
    }
    try {
      const option = {
        method: "POST",
        body: JSON.stringify({
          value: value,
          size: size,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch("http://localhost:5000/genImg", option);
      const data = await response.json();
      console.log(data.data);
      setImages(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <section className="headline-section">
        <h2>
          <u>Daas Gen.ai</u> :)
        </h2>
      </section>
      <section className="search-section">
        <p>
          If you want to play with me just
          <span className="surprise" onClick={botherMe}>Bother Me</span>
        </p>
        <div className="inputContainer">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            id="prompt"
            placeholder="An artist paint a wall..."
          />
          <select
            name="size"
            className="sizeSection"
            id="size"
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
          <button onClick={getImg}>Generate</button>
        </div>
        <p className="filesUpload">
          <span>
            <label htmlFor="files">Upload an image</label>
            <input type="file" id="files" accept="image/*" hidden/>
          </span>
        </p>
        {error && <p>{error}</p>}
      </section>
      
      <section className="image-section">
        {images?.map((image, index) => (
          <img key={index} src={image.url} alt={`index of img : ${index}`} />
        ))}
      </section>
    </div>
  );
}

export default App;
