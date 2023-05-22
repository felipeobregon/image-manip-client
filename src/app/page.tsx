"use client"
import React, { useState } from 'react';


function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    if (selectedFile !== null)
      formData.append('image', selectedFile);

    fetch('process.env.BACKEND_URL', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        setImageUrl(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      {imageUrl && (
        <div>
          <h2>Returned Image</h2>
          <img src={imageUrl} alt="Returned" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default App;
