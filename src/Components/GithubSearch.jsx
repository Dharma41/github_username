import React, { useState } from 'react';
import '../CSS/GithubSearch.css';
import axios from 'axios'; // Import Axios

const GithubSearch = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        try {
            // Fetch data from GitHub API using Axios
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setUserData(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            setUserData(null);
            if (error.response && error.response.status === 404) {
                setError('User not found');
            } else {
                setError('Something went wrong');
            }
        }
    };

    return (
        <div className="github-search">
            <h1>GitHub User Search</h1>

            {/* Form to input GitHub username */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter GitHub username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {/* Display error if any */}
            {error && <p className="error">{error}</p>}

            {/* Display user details */}
            {userData && (
                <div className="user-details">
                    <img src={userData.avatar_url} alt="User avatar" />
                    <h2>{userData.name}</h2>
                    <p><strong>Username:</strong> {userData.login}</p>
                    <p><strong>Bio:</strong> {userData.bio || "No bio available"}</p>
                    <p><strong>Location:</strong> {userData.location || "No location available"}</p>
                    <p><strong>Public Repos:</strong> {userData.public_repos}</p>
                    <p><strong>Followers:</strong> {userData.followers}</p>
                    <p><strong>Following:</strong> {userData.following}</p>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">View Profile on GitHub</a>
                </div>
            )}
        </div>
    );
};

export default GithubSearch;