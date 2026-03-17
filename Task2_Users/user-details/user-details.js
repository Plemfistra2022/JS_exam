let userDetailsContainer = document.getElementById("user-details");
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('id');
// console.log(userId);

function buildList(obj, container) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            let subContainer = document.createElement('div');
            subContainer.classList.add('info-section');
            subContainer.innerHTML = `<h3>${key}:</h3>`;
            container.appendChild(subContainer);
            buildList(obj[key], subContainer);
        } else {
            let p = document.createElement('p');
            p.innerHTML = `<b>${key}:</b> ${obj[key]}`;
            container.appendChild(p);
        }
    }
}

if (userId && userDetailsContainer) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load user details');
            return response.json();
        })
        .then(user => {
            let userCard = document.createElement("div");
            userCard.classList.add("user-card-details");

            buildList(user, userCard);

            let userPostsBtn = document.createElement("button");
            userPostsBtn.id = "load-posts-btn";
            userPostsBtn.innerText = "Posts of current user";

            let blockPosts = document.createElement("div");
            blockPosts.id = "posts-grid";

            userDetailsContainer.append(userCard, userPostsBtn, blockPosts);

            userPostsBtn.onclick = () => {
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                    .then(res => {
                        if (!res.ok) throw new Error('Failed to load posts');
                        return res.json();
                    })
                    .then(posts => {
                        blockPosts.innerHTML = '';
                        posts.forEach(post => {
                            let postCard = document.createElement("div");
                            postCard.classList.add("post-item");
                            postCard.innerHTML = `
                                <p>${post.title}</p>
                                <button onclick="location.href='../post-details/post-details.html?id=${post.id}'">Post Details</button>
                            `;
                            blockPosts.appendChild(postCard);
                        });
                    })
                    .catch(err => console.error(err));
            };
        })
        .catch(error => {
            userDetailsContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}