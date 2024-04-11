import React from "react";
import { useState,useRef } from "react";

export default function Model({ setModelOpen, setSelectImage, selectImage, variations }) {
  const [error, setError] = useState(null);
  const refUse = useRef(null);
  console.log("selected image", selectImage);
  const closeModel = () => {
    setModelOpen(false);
    setSelectImage(null);
  };

  const generateUplaodedmage = () => {
    // if(refUse.current.width === 256 && refUse.current.height === 256){
    //   variations();
    // }else{
    //   setError("Size Error: Choose 256x256 image ")
    // }
      variations();
    
  };

  return (
    <div className="model">
      <div onClick={closeModel}>
        ✘
        <div className="imageContainer">
          {selectImage && (
            <img
              ref={refUse}
              src={URL.createObjectURL(selectImage)}
              alt="selectedImage"
            />
          )}
        </div>
      </div>
      <p>{error || "* Image size must be 256x256"}</p>
      {!error && <button onClick={generateUplaodedmage}>Generate</button>}
      {error && <button onClick={closeModel}>Close this & Try again</button>}
    </div>
  );
}
