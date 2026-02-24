import React, { useState, useEffect } from 'react';

const Thoughts = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState('');
  const [author, setAuthor] = useState('');

  // Load thoughts from localStorage on component mount
  useEffect(() => {
    const savedThoughts = localStorage.getItem('thoughts');
    if (savedThoughts) {
      setThoughts(JSON.parse(savedThoughts));
    }
  }, []);

  // Save thoughts to localStorage whenever thoughts change
  useEffect(() => {
    localStorage.setItem('thoughts', JSON.stringify(thoughts));
  }, [thoughts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newThought.trim() === '') return;

    const thought = {
      id: Date.now(),
      text: newThought,
      author: author.trim() || 'Anonymous',
      timestamp: new Date().toLocaleString(),
    };

    setThoughts([thought, ...thoughts]);
    setNewThought('');
    setAuthor('');
  };

  const handleDelete = (id) => {
    setThoughts(thoughts.filter(thought => thought.id !== id));
  };

  return (
    <div className="relative z-10 min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-8 text-center">
          Thoughts
        </h1>

        {/* Form to add new thought */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-purple-950 mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="thought" className="block text-sm font-medium text-purple-950 mb-2">
                Your Thought
              </label>
              <textarea
                id="thought"
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                placeholder="Write your thoughts here..."
                rows="6"
                className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Post Thought
            </button>
          </form>
        </div>

        {/* Display thoughts */}
        <div className="space-y-4">
          {thoughts.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center text-purple-700">
              <p>No thoughts yet. Be the first to share!</p>
            </div>
          ) : (
            thoughts.map((thought) => (
              <div
                key={thought.id}
                className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-purple-950">{thought.author}</p>
                    <p className="text-sm text-purple-600">{thought.timestamp}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(thought.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                    aria-label="Delete thought"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-purple-900 whitespace-pre-wrap leading-relaxed">
                  {thought.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Thoughts;
