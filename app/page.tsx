'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files![0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('files', image);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData as any,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadStatus(`Upload successful: ${data.message}`);
      } else {
        setUploadStatus(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      setUploadStatus(`Upload error: ${error.message}`);
    }
  };

  return (
      <div>
        <h1>Upload Image</h1>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
  );
}
