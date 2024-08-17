// import express from 'express';
// import loggerMiddleWare from './middleware/logger.js';
// import pool from './db.js';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// // Logger middleware
// app.use(loggerMiddleWare);

// app.get('/', (req,res) =>{
//     res.render('index.ejs');
// });

// // GET all posts
// app.get('/api/posts', async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM posts');
//         res.json(rows);
//     } catch (err) {
//         res.status(500).json({ error: 'Database query failed' });
//     }
// });

// // GET a single post by ID
// app.get('/api/posts/:id', async (req, res) =>{
//     const id = parseInt(req.params.id);
//     console.log(typeof(id));
//     try {
//         const rows = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
//         if (rows.length === 0) {
//             return res.status(404).json({ error: 'Post not found' });
//         }
//         res.json(rows[0]);
//     } catch (error) {
//         res.status(500).json({ error: 'Error retrieving post' });
//     }
// });

// // POST a new post
// app.post('/api/posts/', async (req, res) =>{
//     const { name, content } = req.body;
//     if (!name || !content) {
//         return res.status(400).json({ error: 'Required name and content' });
//     }

//     try {
//         const [result] = await pool.query('INSERT INTO posts (name, content, status) VALUES (?, ?, ?)', [name, content, 'published']);
//         const newPost = { id: result.insertId, name, content, status: 'published' };
//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(500).json({ error: 'Error creating post' });
//     }
// });

// // PUT an existing post
// app.put('/api/posts/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, content } = req.body;
  
//     try {
//       const [result] = await pool.query('UPDATE posts SET name = ?, content = ?, date = NOW() WHERE id = ?', [name, content, id]);
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: 'Post not found' });
//       }
//       const [updatedPost] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
//       res.status(200).json(updatedPost[0]);
//     } catch (error) {
//       console.error('Error updating post:', error);
//       res.status(500).json({ error: 'Error updating post' });
//     }
//   });

// // DELETE an existing post
// app.delete('/api/posts/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Post not found' });
//         }
//         res.status(200).json({ message: 'Post deleted' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error deleting post' });
//     }
// });

// // Port
// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });

import express from 'express';
import loggerMiddleWare from './middleware/logger.js';
import supabase from './db.js';


const app = express();
const PORT = process.env.PORT || 3000;

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
        const { data, error } = await supabase
            .from('posts')
            .select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// GET a single post by ID
app.get('/api/posts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving post' });
    }
});

// POST a new post
app.post('/api/posts/', async (req, res) => {
    const { name, content } = req.body;
    if (!name || !content) {
        return res.status(400).json({ error: 'Required name and content' });
    }

    try {
        const { data, error } = await supabase
            .from('posts')
            .insert([{ name, content, status: 'published' }])
            .select()
            .single();
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
});

// PUT an existing post
app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { name, content } = req.body;
  
    try {
        const { data, error } = await supabase
            .from('posts')
            .update({ name, content, date: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Error updating post' });
    }
});

// DELETE an existing post
app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);
        if (error) throw error;
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
    }
});

// Port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});