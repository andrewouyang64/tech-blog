
const addPostHandler = async (event) => {
    event.preventDefault();
  
    //get post title and content from the post input area and trim trailing spaces
    const postTitle = document.getElementById('title').value.trim();
    const postContent = document.getElementById('content').value.trim();
    
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content: postContent, title: postTitle }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // load the home page again to display newly added post
      document.location.replace('/');
    } else {
      alert("Sorry! We couldn't add your post!");
    }
  };
  
  document
    .querySelector('.add-post')
    .addEventListener('submit', addPostHandler);