//logged in users can post a comment
const commentHandler = async (event) => {
    event.preventDefault();
  
    //get text from the comment text area and trim trailing spaces
    const commentText = document.getElementById('comment-text').value.trim();
  
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment_text: commentText, post_id: postId }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // load the blog's page again to display newly added comment
      document.location.replace(`/api/posts/${postId}`);
    } else {
      alert("Sorry! We couldn't add your comment!");
    }
  };
  
  document
    .querySelector('.add-comment')
    .addEventListener('submit', commentHandler);
  