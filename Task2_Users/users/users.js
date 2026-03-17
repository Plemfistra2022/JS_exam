let main = document.getElementById("main");

if (main) {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(users => {
            main.innerHTML = users.map(user => `
                <div class="user-card">
                    <div class="user-info">
                       <span><b>ID:</b> ${user.id}</span>
                       <span><b>Name:</b> ${user.name}</span>
                    </div>
                    <button onclick="location.href='../user-details/user-details.html?id=${user.id}'">Details</button>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error("Data fetching error:", error);
            main.innerHTML = `<p style="color: red;">Error loading user list. Please try again later.</p>`;
        });
}