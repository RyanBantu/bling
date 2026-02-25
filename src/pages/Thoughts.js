import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const Thoughts = () => {
  const [events, setEvents] = useState([]);
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [currentUser, setCurrentUser] = useState('Dummy');
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isDummyAuthenticated, setIsDummyAuthenticated] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  // Load current user and Dummy authentication from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    const dummyAuth = localStorage.getItem('dummyAuthenticated');
    if (dummyAuth === 'true') {
      setIsDummyAuthenticated(true);
    }
  }, []);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentUser', currentUser);
  }, [currentUser]);

  // Load events from Firestore with real-time updates
  useEffect(() => {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsData);
      if (eventsData.length > 0 && !selectedEventId) {
        setSelectedEventId(eventsData[0].id); // Select the most recent event by default
      }
    }, (error) => {
      console.error('Error fetching events:', error);
    });

    return () => unsubscribe();
  }, [selectedEventId]);

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

  // Group thoughts by event
  const getThoughtsForEvent = (eventId) => {
    return thoughts.filter(thought => thought.eventId === eventId);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (newEventTitle.trim() === '') return;

    try {
      const event = {
        title: newEventTitle,
        createdAt: new Date(),
        createdBy: currentUser
      };

      const docRef = await addDoc(collection(db, 'events'), event);
      setNewEventTitle('');
      setShowEventForm(false);
      setSelectedEventId(docRef.id); // Select the newly created event
    } catch (error) {
      console.error('Error adding event:', error);
      alert(`Failed to create event: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newThought.trim() === '') return;
    if (!selectedEventId) {
      alert('Please select or create an event first.');
      return;
    }

    // If posting as Dummy and not authenticated, show password modal
    if (currentUser === 'Dummy' && !isDummyAuthenticated) {
      setShowPasswordModal(true);
      setPasswordInput('');
      setPasswordError('');
      return;
    }

    try {
      const thought = {
        text: newThought,
        author: currentUser,
        eventId: selectedEventId,
        timestamp: new Date().toISOString(),
        createdAt: new Date()
      };

      await addDoc(collection(db, 'thoughts'), thought);
      setNewThought('');
    } catch (error) {
      console.error('Error adding thought:', error);
      if (error.code === 'permission-denied') {
        alert('Permission denied. Please check Firestore security rules in Firebase Console.');
      } else if (error.code === 'unavailable') {
        alert('Firestore is unavailable. Please check your internet connection.');
      } else {
        alert(`Failed to post thought: ${error.message}. Check console for details.`);
      }
    }
  };

  const DUMMY_PASSWORD = 'Amiga@5623';

  const switchUser = (user) => {
    setCurrentUser(user);
    if (user !== 'Dummy') {
      setIsDummyAuthenticated(false);
      localStorage.removeItem('dummyAuthenticated');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordInput === DUMMY_PASSWORD) {
      setIsDummyAuthenticated(true);
      localStorage.setItem('dummyAuthenticated', 'true');
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError('');
      
      // Now submit the thought after authentication
      if (newThought.trim() !== '' && selectedEventId) {
        try {
          const thought = {
            text: newThought,
            author: currentUser,
            eventId: selectedEventId,
            timestamp: new Date().toISOString(),
            createdAt: new Date()
          };

          await addDoc(collection(db, 'thoughts'), thought);
          setNewThought('');
        } catch (error) {
          console.error('Error adding thought:', error);
          if (error.code === 'permission-denied') {
            alert('Permission denied. Please check Firestore security rules in Firebase Console.');
          } else if (error.code === 'unavailable') {
            alert('Firestore is unavailable. Please check your internet connection.');
          } else {
            alert(`Failed to post thought: ${error.message}. Check console for details.`);
          }
        }
      }
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setPasswordError('');
  };

  const handleDeleteThought = async (id) => {
    try {
      await deleteDoc(doc(db, 'thoughts', id));
    } catch (error) {
      console.error('Error deleting thought:', error);
      if (error.code === 'permission-denied') {
        alert('Permission denied. Please check Firestore security rules in Firebase Console.');
      } else {
        alert(`Failed to delete thought: ${error.message}. Check console for details.`);
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event and all its thoughts?')) {
      return;
    }
    try {
      // Delete all thoughts for this event
      const eventThoughts = thoughts.filter(t => t.eventId === id);
      for (const thought of eventThoughts) {
        await deleteDoc(doc(db, 'thoughts', thought.id));
      }
      // Delete the event
      await deleteDoc(doc(db, 'events', id));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(`Failed to delete event: ${error.message}. Check console for details.`);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="relative z-10 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-purple-950 mb-8 text-center">
          Thoughts
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          {/* Left Side - Posts/Events Display */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-6 overflow-y-auto">

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-md w-full">
              <h2 className="text-2xl font-mono font-bold text-purple-950 mb-4">
                Enter Password for Dummy
              </h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-purple-950 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError('');
                    }}
                    placeholder="Enter password..."
                    className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handlePasswordCancel}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


            <h2 className="text-xl font-mono font-bold text-purple-950 mb-4 sticky top-0 bg-white/90 py-2">
              Posts
            </h2>
            {/* Display Events with Thoughts */}
            <div className="space-y-6">
          {loading ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center text-purple-700">
              <p>Loading...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center text-purple-700">
              <p>No events yet. Create your first event to get started!</p>
            </div>
          ) : (
            events.map((event) => {
              const eventThoughts = getThoughtsForEvent(event.id);
              return (
                <div
                  key={event.id}
                  className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Event Header */}
                  <div className="p-6 md:p-8 border-b border-purple-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-mono font-bold text-purple-950 mb-2">
                          {event.title}
                        </h2>
                        <p className="text-sm text-purple-600">
                          Created by {event.createdBy} • {formatTimestamp(event.createdAt)}
                        </p>
                      </div>
                      {currentUser === 'Dummy' && isDummyAuthenticated && (
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                          aria-label="Delete event"
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
                      )}
                    </div>
                  </div>

                  {/* Thoughts for this Event */}
                  <div className="p-6 md:p-8 space-y-4">
                    {eventThoughts.length === 0 ? (
                      <p className="text-purple-600 text-center py-4">No thoughts for this event yet.</p>
                    ) : (
                      eventThoughts.map((thought) => (
                        <div
                          key={thought.id}
                          className="bg-purple-50 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-semibold text-purple-950">{thought.author}</p>
                              <p className="text-sm text-purple-600">{formatTimestamp(thought.timestamp || thought.createdAt)}</p>
                            </div>
                            {currentUser === 'Dummy' && isDummyAuthenticated && (
                              <button
                                onClick={() => handleDeleteThought(thought.id)}
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
                            )}
                          </div>
                          <p className="text-purple-900 whitespace-pre-wrap leading-relaxed">
                            {thought.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })
          )}
            </div>
          </div>

          {/* Right Side - Writing/Forms */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-6 overflow-y-auto">
            <h2 className="text-xl font-mono font-bold text-purple-950 mb-4 sticky top-0 bg-white/90 py-2">
              Write
            </h2>
            
            <div className="space-y-6">
              {/* User Switcher */}
              <div className="bg-purple-50 rounded-lg p-4">
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

              {/* Create Event Form */}
              <div className="bg-purple-50 rounded-lg p-4">
                {!showEventForm ? (
                  <button
                    onClick={() => setShowEventForm(true)}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Create New Event
                  </button>
                ) : (
                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="eventTitle" className="block text-sm font-medium text-purple-950 mb-2">
                        Event Title
                      </label>
                      <input
                        type="text"
                        id="eventTitle"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        placeholder="Enter event title..."
                        className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        autoFocus
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium"
                      >
                        Create Event
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEventForm(false);
                          setNewEventTitle('');
                        }}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Event Selector and Thought Form */}
              {events.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="mb-4">
                    <label htmlFor="eventSelect" className="block text-sm font-medium text-purple-950 mb-2">
                      Select Event
                    </label>
                    <select
                      id="eventSelect"
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {events.map(event => (
                        <option key={event.id} value={event.id}>
                          {event.title}
                        </option>
                      ))}
                    </select>
                  </div>
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
                      className="w-full px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium"
                    >
                      Post Thought as {currentUser}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thoughts;
