
import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [error, setError] = useState('');
  const [following, setFollowing] = useState([]);
  const [isFollowingUser, setIsFollowingUser] = useState(false); 

  useEffect(() => {
   
    if (isLoggedIn) {
      fetchUserMessages();
    }
  }, [isLoggedIn]);

  const fetchUserMessages = () => {
   
    setMessages([
      { id: 1, text: 'Message 1', media: null },
      { id: 2, text: 'Message 2', media: null },
      { id: 3, text: 'Message 3', media: null }
    ]);
  };

  const handleSignup = () => {
    
    if (username && email && password) {
      setIsRegistered(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setError('');
    } else {
      setError('Please provide a username, email, and password.');
    }
  };

  const handleLogin = () => {
    
    if (username && password) {
      setIsLoggedIn(true);
      setError('');
      
      setFollowing(['user1', 'user2']);
    } else {
      setError('Please provide a username and password.');
    }
  };

  const handleLogout = () => {
    // Simulate logout
    setIsLoggedIn(false);
    setMessages([]);
    setFollowing([]);
  };

  const handlePostMessage = () => {
    
    const newMsg = { id: messages.length + 1, text: newMessage, media: mediaFile };
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setMediaFile(null);
  };

  const handleUpdateMessage = (id, newText) => {

    setMessages(messages.map(msg => (msg.id === id ? { ...msg, text: newText } : msg)));
  };

  const handleDeleteMessage = id => {
    
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleFollowUser = () => {
   
    setFollowing([...following, username]);
    setIsFollowingUser(true);
  };

  const handleUnfollowUser = () => {
  
    setFollowing(following.filter(user => user !== username));
    setIsFollowingUser(false);
  };

  const handleMediaUpload = event => {
    const file = event.target.files[0];
    setMediaFile(URL.createObjectURL(file));
  };

  return (
    <div>
      {!isRegistered ? (
        <div>
          <h1>Register</h1>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button onClick={handleSignup}>Register</button>
          {error && <p>{error}</p>}
        </div>
      ) : !isLoggedIn ? (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
          <h2>Post a Message</h2>
          <textarea
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Write your message here..."
            required
          />
          <input type="file" accept="image/*, video/*" onChange={handleMediaUpload} />
          <button onClick={handlePostMessage}>Post</button>
          <h2>Messages</h2>
          <ul>
            {messages.map(message => (
              <li key={message.id}>
                <input
                  type="text"
                  value={message.text}
                  onChange={e => handleUpdateMessage(message.id, e.target.value)}
                />
              
                {message.media && message.media.startsWith('blob:') ? (
                  <img src={message.media} alt="Media" style={{ maxWidth: '100px' }} />
                ) : (
                  <video src={message.media} controls style={{ maxWidth: '100px' }} />
                )}
                <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {isFollowingUser ? (
            <button onClick={handleUnfollowUser}>Unfollow</button>
          ) : (
            <button onClick={handleFollowUser}>Follow</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
