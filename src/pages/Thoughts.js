import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const Thoughts = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState('');
  const [currentUser, setCurrentUser] = useState('Dummy');
  const [loading, setLoading] = useState(true);

  // Load current user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentUser', currentUser);
  }, [currentUser]);

  // Load thoughts from Firestore with real-time updates
  useEffect(() => {
    const thoughtsRef = collection(db, 'thoughts');
    const q = query(thoughtsRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const thoughtsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setThoughts(thoughtsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching thoughts:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newThought.trim() === '') return;

    try {
      const thought = {
        text: newThought,
        author: currentUser,
        timestamp: new Date().toISOString(),
        createdAt: new Date()
      };

      await addDoc(collection(db, 'thoughts'), thought);
      setNewThought('');
    } catch (error) {
      console.error('Error adding thought:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // More specific error messages
      if (error.code === 'permission-denied') {
        alert('Permission denied. Please check Firestore security rules in Firebase Console.');
      } else if (error.code === 'unavailable') {
        alert('Firestore is unavailable. Please check your internet connection.');
      } else {
        alert(`Failed to post thought: ${error.message}. Check console for details.`);
      }
    }
  };

  const switchUser = (user) => {
    setCurrentUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'thoughts', id));
    } catch (error) {
      console.error('Error deleting thought:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      if (error.code === 'permission-denied') {
        alert('Permission denied. Please check Firestore security rules in Firebase Console.');
      } else {
        alert(`Failed to delete thought: ${error.message}. Check console for details.`);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="relative z-10 min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-8 text-center">
          Thoughts
        </h1>

        {/* User Switcher */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm font-medium text-purple-950">Posting as:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => switchUser('Dummy')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentUser === 'Dummy'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-950 hover:bg-purple-200'
                }`}
              >
                Dummy
              </button>
              <button
                onClick={() => switchUser('Poof')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentUser === 'Poof'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-950 hover:bg-purple-200'
                }`}
              >
                Poof
              </button>
            </div>
          </div>
        </div>

        {/* Form to add new thought */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="thought" className="block text-sm font-medium text-purple-950 mb-2">
                Your Thought <span className="text-purple-600">(as {currentUser})</span>
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
              Post Thought as {currentUser}
            </button>
          </form>
        </div>

        {/* Display thoughts */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center text-purple-700">
              <p>Loading thoughts...</p>
            </div>
          ) : thoughts.length === 0 ? (
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
                    <p className="text-sm text-purple-600">{formatTimestamp(thought.timestamp || thought.createdAt)}</p>
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
