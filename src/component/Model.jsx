import React from "react";
import { useState } from "react";

export default function Model({ setModelOpen, setSelectImage, selectImage }) {
  // const [error, setError] = useState(null);

  console.log('selected image',selectImage);
  const closeModel = () => {
    setModelOpen(false);
    setSelectImage(null);
  };

   const generateUplaodedmage = ()=>{

   }

  return (
    <div className="model">
      <div onClick={closeModel}>
        X
        <div className="imageContainer">
          {selectImage && (
            <img src={URL.createObjectURL(selectImage)} alt="selectedImage" />
          )}
        </div>
      </div>
      <button onClick={generateUplaodedmage}>Generate</button>
    </div>
  );
}
