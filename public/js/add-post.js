
const addPostHandler = async (event) => {
    event.preventDefault();
  
    //get post-text from the post area and trim trailing spaces
    const postText = document.getElementById('post-text').value.trim();
  
    //retrieve post_id from the URL by splitting to string and grabbing the final element from the array
    const userId = window.location.toString().split('/').pop();
  
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ post_text: postText, user_id: userId }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // load the book's page again to display newly added comment
      document.location.replace(`/api/posts/${userId}`);
    } else {
      alert("Sorry! We couldn't add your post!");
    }
  };
  
  document
    .querySelector('.add-post')
    .addEventListener('submit', addPostHandler);