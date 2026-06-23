async function loadLeaderboard() {
    const data = await getLeaderboard();
    const tbody = document.querySelector('#leaderboard-table tbody');
    tbody.innerHTML = '';

    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${row.username}</td>
            <td>${row.score}</td>
            <td>${new Date(row.timestamp).toLocaleDateString()}</td>
        `;
        tbody.appendChild(tr);
    });
}

window.onload = loadLeaderboard;