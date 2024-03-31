
import { useState } from 'react'
import './App.css'

function App() {
  const [images,setImages] = useState(null)
  const [value,setValue] = useState(null)

  const surpriseMe=[
    "A blue panda eating pizza",
    "A frog talking on phone",
    "A superhero beaten by women",
    "A baby flying on the sparrow"
  ]

  console.log("this is input1::",value)
  console.log("this is images1::", images);

  const getImg = async() =>{
    try {
      const option = {
          method:"POST",
          body:JSON.stringify({
            message:"blugh"
          }),
          header:{
            "Content-type":"application/json"
          }
      }
      const response = await fetch('http://localhost:5000/genImg',option)
      const data = await response.json()
      console.log(data.data)
      setImages(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div className="App">
      <section className="headline-section">
        <h2>
          {" "}
          <u>Daas</u>:)
        </h2>
      </section>
      <section className="search-section">
        <p>
          Start with detailed description{" "}
          <span className="surprise">Surprise Me</span>{" "}
        </p>
        <div className="inputContainer">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            id="prompt"
            placeholder="An artist paint a wall..."
          />
          <button onClick={getImg}>Generate</button>
        </div>
      </section>
      {/* <select name="size" id="size">
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </select> */}
      <section className="image-section">
        
        {images?.map((image, index) => (
          <img key={index} src={image.url} alt={`Image ${index}`} />
        ))}
      </section>
    </div>
  );
}

export default App;
