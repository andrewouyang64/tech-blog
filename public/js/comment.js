//const { query } = require("express");

//logged in users can post a comment
const commentHandler = async (event) => {
    event.preventDefault();
  
    //get text from the comment text area and trim trailing spaces
    const commentText = document.getElementById('comment-text').value.trim();
    console.log(commentText);
    const url = window.location.toString();
    
    const id = url.charAt(url.length-1);
    console.log('My post id is============='+id);
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment_text: commentText, post_id: id}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // load the blog's page again to display newly added comment
    //  document.location.replace(`/post/${id}`);
    } else {
      alert("Sorry! We couldn't add your comment!");
    }
  };
  const form = document.querySelector('.add-comment');
    form.addEventListener('click', commentHandler);
    console.log(form);
  