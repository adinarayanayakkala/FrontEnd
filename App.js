import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [display, setDisplay] = useState('Enter a name and click submit');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      setDisplay(`Hello World ${name}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <div className="text-xl font-semibold text-gray-700 p-4 bg-white rounded shadow">
        {display}
      </div>
    </div>
  );
}

export default App;