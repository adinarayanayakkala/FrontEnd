// VideoSummarizer.js
import React, { useState } from 'react';
import './VP.css';

function VideoSummarizer() {
  const [videoPath, setVideoPath] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_path: videoPath }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error:', error);
      setSummary('Error occurred while generating summary');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="video-summarizer">
      <h1>Video Summarizer</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={videoPath}
            onChange={(e) => setVideoPath(e.target.value)}
            placeholder="Enter video path or URL (YouTube/Facebook)"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating Summary...' : 'Generate Summary'}
          </button>
        </div>
      </form>

      {summary && (
        <div className="summary-section">
          <h2>Summary</h2>
          <div className="summary-content">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoSummarizer;