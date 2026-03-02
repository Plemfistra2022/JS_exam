// index.html

let main = document.getElementById("main");

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then(users => {
        main.innerHTML = users.map(user => `
            <div class="user-card">
                <div class="user-info">
                   <span>ID: ${user.id}</span>
                   <span>Name: ${user.name}</span>
                </div>
                <button onclick="location.href='user-details.html?id=${user.id}'">Details</button>
            </div>
        `).join('')
    });




// user-details.html

let userDetails = document.getElementById("user-details");
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        let userCard = document.createElement("div");
        userCard.classList.add("user-card-details");

        userCard.innerHTML = `
            <p><b>Id:</b> ${user.id}</p>
            <p><b>Name:</b> ${user.name}</p>
            <p><b>Username:</b> ${user.username}</p>
            <p><b>Email:</b> ${user.email}</p>
            <div class="info-section">
                <h3>Address:</h3>
                <p><b>Street:</b> ${user.address.street}</p>
                <p><b>Suite:</b> ${user.address.suite}</p>
                <p><b>City:</b> ${user.address.city}</p>
                <p><b>Zipcode:</b> ${user.address.zipcode}</p>
                <p><b>Geo:</b> lat: ${user.address.geo.lat}, lng: ${user.address.geo.lng}</p>
            </div>
            <div class="info-section">
                <h3>Company:</h3>
                <p><b>Name:</b> ${user.company.name}</p>
                <p><b>CatchPhrase:</b> ${user.company.catchPhrase}</p>
                <p><b>Bs:</b> ${user.company.bs}</p>
            </div>
        `;

        let userPostsBtn = document.createElement("button");
        userPostsBtn.id = "load-posts-btn";
        userPostsBtn.innerText = "Post of current user";

        let blockPosts = document.createElement("div");
        blockPosts.id = "posts-grid";

        userDetails.append(userCard, userPostsBtn, blockPosts);

        userPostsBtn.addEventListener("click", () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                .then(response => response.json())
                .then(posts => {
                    blockPosts.innerHTML = '';

                    posts.forEach(post => {
                        let postCard = document.createElement("div");
                        postCard.classList.add("post-item");
                        postCard.innerHTML = `
                            <p>${post.title}</p>
                            <button onclick="location.href='post-details.html?id=${post.id}'">Details</button>
                        `;
                        blockPosts.appendChild(postCard);
                    });
                });
        });
    });




// post-details.html

const postDetails = document.getElementById("post-details");
const postId = new URLSearchParams(window.location.search).get('id');

Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json()),
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(res => res.json())
])
    .then(([post, comments]) => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card-full");

        postCard.innerHTML = `
        <p><b>User ID:</b> ${post.userId}</p>
        <p><b>Post ID:</b> ${post.id}</p>
        <p><b>Title:</b> ${post.title}</p>
        <p><b>Body:</b> ${post.body}</p>
    `;

        const commentsBlock = document.createElement("div");
        commentsBlock.classList.add("comments-section");
        commentsBlock.innerHTML = "<h3>Comments:</h3>";

        const commentsGrid = document.createElement("div");
        commentsGrid.classList.add("comments-grid");

        const commentsList = comments.map(comment => `
        <div class="comment-item">
            <p><strong>${comment.email}:</strong></p>
            <hr>
            <p>${comment.body}</p>
        </div>
    `).join('');

        commentsGrid.innerHTML = commentsList;
        commentsBlock.append(commentsGrid);
        postDetails.append(postCard, commentsBlock);
    });