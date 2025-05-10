import React, { useState } from "react";
import axios from "axios";

function App() {
  const [videoLink, setVideoLink] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (videoLink) {
      formData.append("videoLink", videoLink);
    }
    if (videoFile) {
      formData.append("videoFile", videoFile);
    }

    npmtry {
      const response = await axios.post("http://localhost:5000/process-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error processing video:", error);
      alert("Failed to process video. Please try again.");
    }
  };

  return (
    <div>
      <h1>Video Summarizer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter YouTube/Facebook Video Link:</label>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Enter video link"
          />
        </div>
        <div>
          <label>Or Upload a Local Video File:</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {summary && (
        <div>
          <h2>Video Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;