import express from 'express';
import loggerMiddleWare from './middleware/logger.js';
import pool from './db.js';
const app = express();
const PORT = 3000;

// Posts
const posts = [
    {
      "id": 1,
      "name": "Exploring the Cosmos",
      "date": "2024-08-15T12:00:00Z",
      "content": "In this blog post, we dive deep into the mysteries of the universe, exploring the latest discoveries in space science and technology.",
      "status": "published"
    },
    {
      "id": 2,
      "name": "The Future of Backend Development",
      "date": "2024-08-16T08:30:00Z",
      "content": "A comprehensive look at emerging trends and technologies in backend development, and how they are shaping the future of programming.",
      "status": "draft"
    },
    {
      "id": 3,
      "name": "AI in Disaster Management",
      "date": "2024-08-17T14:45:00Z",
      "content": "An exploration of how artificial intelligence can be utilized to improve disaster response and management, focusing on real-world applications and innovations.",
      "status": "published"
    }
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Logger middleware
app.use(loggerMiddleWare);

app.get('/', (req,res) =>{
    res.render('index.ejs');
});

// GET all posts
app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// GET a single post by ID
app.get('/api/posts/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    console.log(typeof(id));
    try {
        const rows = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving post' });
    }
});

app.post('/api/posts/', async (req, res) =>{
    const { name, content } = req.body;
    if (!name || !content) {
        return res.status(400).json({ error: 'Required name and content' });
    }

    try {
        const [result] = await pool.query('INSERT INTO posts (name, content, status) VALUES (?, ?, ?)', [name, content, 'published']);
        const newPost = { id: result.insertId, name, content, status: 'published' };
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
});

app.put('/api/posts/:id', async (req, res) =>{
    const { id } = req.params;
    const { name, content } = req.body;

    try {
        const [result] = await pool.query('UPDATE posts SET name = ?, content = ?, date = NOW() WHERE id = ?', [name, content, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const [updatedPost] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
        res.json(updatedPost[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating post' });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});