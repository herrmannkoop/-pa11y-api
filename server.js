const express = require('express');
const pa11y = require('pa11y');

const app = express();

app.get('/check', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'Bitte URL angeben ?url=' });
    }

    try {
        const results = await pa11y(url, { standard: 'WCAG2AA', timeout: 60000 });

        res.json({
            url,
            totalIssues: results.issues.length,
            errors: results.issues.filter(i => i.type === 'error').length,
            warnings: results.issues.filter(i => i.type === 'warning').length,
            notices: results.issues.filter(i => i.type === 'notice').length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fehler bei Pa11y', details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
