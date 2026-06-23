const SUPABASE_URL = 'https://oymwlxxasifyttbkpqt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_335qzV9UbTZ8NwOgAKezkw_RyhqRlqV';

async function submitScore(username, score) {
    try {
        console.log('Attempting to submit score:', username, score);
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/scores`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ username, score })
        });

        if (response.ok) {
            console.log('✅ Score submitted successfully!');
            alert('Score saved! Check leaderboard.');
        } else {
            const errorText = await response.text();
            console.error('❌ Failed:', response.status, errorText);
            alert('Failed to save score. Check console (F12)');
        }
    } catch (e) {
        console.error('❌ Network/Connection Error:', e);
        alert('Cannot connect to database. Check console.');
    }
}