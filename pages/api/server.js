app.post('/api/add-room', async (req, res) => {
    const { number } = req.body;

    try {
        await sql.query(`INSERT INTO Rooms (type, total, available) VALUES ('Standard', 1, 1)`);
        res.json({ message: "Room added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
