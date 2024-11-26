const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files (css, js, images etc.)
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// in memory database for blog posts
const blogPosts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
    { id: 3, title: 'Third Post', content: 'This is the content of the third post.' },
]

// home page route
app.get('/', (req, res) => {
    res.render('index', { posts: blogPosts });
});

// individual post route
app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = blogPosts.find(post => post.id === postId);

    if(post) {
        res.render('post', { post });
    } else {
        res.status(404).send('Post not found');
    }
}); 

// start the node server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});