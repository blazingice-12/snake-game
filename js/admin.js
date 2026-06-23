// game-frontend/js/admin.js
async function deleteLowScores() {
    if (!confirm("Delete all scores below 50? (Demo action)")) return;
    
    // Note: In production, use Supabase Service Role Key (server-side) for deletions
    // This is a client-side demo only
    alert("✅ In a real setup, this would delete low scores via Supabase.\n\nUse the Supabase Dashboard for now.");
    console.log("Admin action: Low scores cleared (demo)");
    
    // Optional: Refresh leaderboard after action
    if (typeof loadLeaderboard === 'function') loadLeaderboard();
}

async function loadAdminAnalytics() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/visitor_analytics?select=*&order=visit_timestamp.desc&limit=50`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        const data = await res.json();
        console.table(data); // For admin inspection
        document.getElementById('admin-content').innerHTML = `<p>Loaded ${data.length} analytics records. Check console.</p>`;
    } catch (e) {
        console.error(e);
    }
}

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Admin Dashboard Ready');
    loadAdminAnalytics(); // Auto-load on open
});