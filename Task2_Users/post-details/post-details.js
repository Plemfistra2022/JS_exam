const postDetailsContainer = document.getElementById("post-details");
const postId = new URLSearchParams(window.location.search).get('id');

function buildList(obj, container) {
    for (const key in obj) {
        let p = document.createElement('p');
        p.innerHTML = `<b>${key}:</b> ${obj[key]}`;
        container.appendChild(p);
    }
}

if (postId && postDetailsContainer) {
    Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => {
            if (!res.ok) throw new Error('Failed to load post');
            return res.json();
        }),
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(res => {
            if (!res.ok) throw new Error('Failed to load comments');
            return res.json();
        })
    ])
        .then(([post, comments]) => {
            const postCard = document.createElement("div");
            postCard.classList.add("post-card-full");
            buildList(post, postCard);

            const commentsBlock = document.createElement("div");
            commentsBlock.classList.add("comments-section");
            commentsBlock.innerHTML = "<h3>Comments:</h3>";

            const commentsGrid = document.createElement("div");
            commentsGrid.classList.add("comments-grid");

            commentsGrid.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <p><strong>${comment.email}:</strong></p>
                <hr>
                <p>${comment.body}</p>
            </div>
        `).join('');

            commentsBlock.append(commentsGrid);
            postDetailsContainer.append(postCard, commentsBlock);
        })
        .catch(error => {
            console.error(error);
            postDetailsContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}