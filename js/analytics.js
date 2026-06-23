async function loadAnalytics() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/visitor_analytics?select=*&order=visit_timestamp.desc&limit=100`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        const data = await res.json();
        const tbody = document.querySelector('#analytics-table tbody');
        tbody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.username || 'Anonymous'}</td>
                <td>${row.device_type}</td>
                <td>${row.browser}</td>
                <td>${row.os}</td>
                <td>${row.screen_resolution}</td>
                <td>${new Date(row.visit_timestamp).toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        alert("Failed to load analytics");
    }
}