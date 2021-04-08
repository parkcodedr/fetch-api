const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const POST = require('./model/posts');
const mongoose = require('mongoose');
app.use(bodyParser({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const DBurl = "mongodb://localhost/api_data";
mongoose.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((result) => {
        console.log('connected');

    }).catch((err) => {
        console.log(err);
    });

app.listen(5000, () => {

});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.post('/addPost', (req, res) => {
    console.log(req.body);
    const blogPost = new POST({
        title: req.body.title,
        post_body: req.body.post_body
    });
    blogPost.save().then(result => res.json(result))
        .catch(err => console.log(err));

});

app.get('/api/posts', (req, res) => {
    POST.find({}).then(result => res.json(result))
        .catch(err => console.log(err));

})
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    POST.findByIdAndDelete(id).then(result => res.json(result)).catch(err => console.log(err));
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    POST.findOneAndUpdate({ _id: id }, { title: req.body.title, post_body: req.body.post_body })
        .then(result => res.json(result))
        .catch(err => console.log(err))
});
