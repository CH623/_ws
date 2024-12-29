export function layout(user, title, content) {
    return `
      <html>
      <head>
        <title>${user}:${title}</title>
        <style>
          body { padding: 20px; font: 16px Arial; }
          h1 { font-size: 24px; }
          a { text-decoration: none; color: blue; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 10px 0; }
          textarea, input[type=text] { width: 100%; padding: 10px; margin: 5px 0; }
          textarea { height: 200px; }
          input[type=submit] { padding: 10px 20px; }
        </style>
      </head>
      <body>
        <section id="content">
          <h1>${user ? `User: ${user}` : "Welcome!"}</h1>
          ${content}
        </section>
      </body>
      </html>
    `;
  }
  
  export function userList(users) {
    return layout('', 'User List', `
      <h1>User List</h1>
      <ul>${users.map(user => `<li><a href="/${user}/">${user}</a></li>`).join('')}</ul>
    `);
  }
  
  export function list(user, posts) {
    const postList = posts.map(post => `
      <li>
        <h2>${post.title}</h2>
        <p>Created at: ${new Date(post.created_at).toLocaleString()}</p>
        <a href="/${user}/post/${post.id}">Read More</a>
      </li>
    `).join('');
    return layout(user, 'Posts', `
      <h1>${user}'s Posts</h1>
      <p><a href="/${user}/post/new">Create a New Post</a></p>
      <ul>${postList}</ul>
    `);
  }
  
  export function newPost(user) {
    return layout(user, 'New Post', `
      <h1>Create a New Post</h1>
      <form action="/${user}/post" method="post">
        <input type="text" name="title" placeholder="Title" required>
        <textarea name="body" placeholder="Contents" required></textarea>
        <input type="submit" value="Create Post">
      </form>
    `);
  }
  
  export function show(user, post) {
    return layout(user, post.title, `
      <h1>${post.title}</h1>
      <p>${post.body}</p>
      <p>Created at: ${new Date(post.created_at).toLocaleString()}</p>
    `);
  }
  
