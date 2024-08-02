import React, { useState } from 'react';
import './Forum.css';

function Forum() {
    const [posts, setPosts] = useState([
        { id: 1, title: "First Post", content: "This is the content of the first post.", comments: [] },
        { id: 2, title: "Second Post", content: "This is the content of the second post.", comments: [] },
        { id: 3, title: "Third Post", content: "This is the content of the third post.", comments: [] }
    ]);

    const [selectedPost, setSelectedPost] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newPostData, setNewPostData] = useState({ title: '', content: '' });
    const [commentData, setCommentData] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handlePostClick = (postId) => {
        const post = posts.find(post => post.id === postId);
        setSelectedPost(post);
    };

    const handleBackToPosts = () => {
        setSelectedPost(null);
    };

    const handleNewPost = () => {
        setShowForm(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPostData({
            ...newPostData,
            [name]: value
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setShowForm(false); 
    };

    const handleCommentChange = (event) => {
        setCommentData(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const updatedPosts = posts.map(post => {
            if (post.id === selectedPost.id) {
                return { ...post, comments: [...post.comments, commentData] };
            }
            return post;
        });
        setPosts(updatedPosts);
        setCommentData('');
    };

    const filteredPosts = searchTerm ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : posts;

    return (
        <div className="forum">
            <div className="title">
                <h><b>Forum</b></h>
            </div>
            <hr />  
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type="button" onClick={() => setSearchTerm('')}>Clear</button>
            </div>
            <button onClick={handleNewPost}>New Post</button>
            {showForm && (
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={newPostData.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="content"
                        placeholder="Enter content"
                        value={newPostData.content}
                        onChange={handleInputChange}
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            )}
            {selectedPost ? (
                <div className="selectedpost">
                    <img className="backbutton" onClick={handleBackToPosts} src="/src/files/icons/backbutton.png" />
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.content}</p>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            placeholder="Enter your comment"
                            value={commentData}
                            onChange={handleCommentChange}
                        ></textarea>
                        <button type="submit">Comment</button>
                    </form>
                    <div className="comments">
                        <h3>Comments:</h3>
                        {selectedPost.comments.map((comment, index) => (
                            <p key={index}>{comment}</p>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    {filteredPosts.map(post => (
                        <div key={post.id} className="post" onClick={() => handlePostClick(post.id)}>
                            <h2>{post.title}</h2>
                            <p>{post.content.substring(0, 100)}...</p>
                            <p>{"1 Komentar"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Forum;
