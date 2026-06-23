function startGame() {
    const usernameInput = document.getElementById('username').value.trim();
    if (!usernameInput) {
        alert("Please enter a username to play!");
        return;
    }
    localStorage.setItem('snakeUsername', usernameInput);
    trackVisit(usernameInput);   // Track analytics
    window.location.href = 'game.html';
}