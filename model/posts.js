const mongoose = require('mongoose');
const postScheme = new mongoose.Schema({
    title: {
        require: true,
        type: String
    },
    post_body: {
        require: true,
        type: String
    }

});
const Post = mongoose.model('Post', postScheme);
module.exports = Post;
