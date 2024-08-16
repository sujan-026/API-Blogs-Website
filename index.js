import express from 'express';
import loggerMiddleWare from './middleware/logger.js';
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

app.get('/api/posts', (req, res) =>{
    res.json(posts);
});

app.get('/api/posts/:id', (req, res) =>{
    const post = posts.find((e) => e.id === parseInt(req.params.id));
    if(!post){
        res.status(404).json({ error: "Post id not found" });
    } else{
        res.json(post);
    }
});

app.post('/api/posts/', (req, res) =>{
    const newPost = {
        id: posts.length ? Math.max(posts.map(p => p.id)) + 1 : 1,
        name : req.body.name,
        date: req.body.date,
        content: req.body.content,
        status: 'published'
    }

    if(!newPost.name || !newPost.content){
        res.status(400).json({ error: "Required name and content"});
    } else{
        posts.push(newPost);
        res.json(newPost);
    }
});

app.put('/api/posts/:id', (req, res) =>{
    const post = posts.find((e) => e.id === parseInt(req.params.id));

    if(!post){
        return res.status(404).json({ error: "Post not found" });
    }

    const upDatedPost = req.body;
    posts.forEach((post) =>{
        if(post.id === parseInt(req.params.id)){
            post.name = upDatedPost.name ? upDatedPost.name : post.name;
            post.content = upDatedPost.content ? upDatedPost.content : post.content;
            
            return res.status(200).json({'Updated post: ': post});
        }
    });
});

app.delete('/api/posts/:id', (req, res) => {
    const postId = posts.findIndex((e) => e.id === parseInt(req.params.id));
    if(postId === -1 || postId === undefined) return res.status(404).json({Error: "Post id is not found"});
    else{
        const deletedPost = posts[postId];
        delete posts[postId];
        return res.status(200).json({'Deleted post: ': deletedPost});
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});