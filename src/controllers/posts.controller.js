const Post = require('../models/post.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


// get all posts
exports.getAllPost = catchAsync(async (req, res, next) => {
    const posts = await Post.findAll({ where: { status: 'active' } })
    res.status(200).json({
        status: 'success',
        data: {
            posts
        }
    });

})

// get post by id
exports.getPostBy = catchAsync(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = await Post.findOne({ where: { id, status: 'active' } });

    if (!post) {
        return next(new AppError(404, 'No post found with given id'))
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        });
    };
});

// save post to database
exports.createPost = catchAsync(async (req, res, next) => {
    const { title, content, userId } = (req.body);

    if (!title || !content || !userId) {

        return next(new AppError(400, 'Fields cant be empty'))
    } else {
        const newPost = await Post.create({
            title,
            content,
            userId
        });
        res.status(201).json({
            status: 'success',
            data: {
                newPost
            }
        });
    };
});

// put posts : put debe enviar todos los campos porque son obligatorios
exports.updatedPostPut = async (req, res) => {

    try {
        const id = req.params.id;
        // extraer titulo, content, author del req.body
        const { title, content, author } = req.body;

        // validar si la data tiene valores

        if (!title || !content || !author) {
            res.status(400).json({
                status: 'error',
                message: 'Must provide a title, content and the author for this request'
            });
            return;
        };

        // encontrar el post por id obtener el index
        const post = await Post.findOne({ where: { id } });

        if (!post) {
            res.status(404).json({
                status: 'error',
                message: "can't update post, invalid ID",
            });
            return;
        };

        await post.update({ title, content, author });

        res.status(204).json({
            status: 'success',
        });

    } catch (error) {
        console.log(error)
    }
}

// patch post: no es obligatorio enviar todos los campos porque no son obligatorios
exports.updatedPostPatch = async (req, res) => {

    try {
        const id = req.params.id;
        const data = { ...req.body };
        const post = await Post.findOne({ where: { id } });

        if (!post) {
            res.status(404).json({
                status: 'error',
                message: 'Cant update post, invalid ID'
            });
            return;
        };

        await post.update({ title: data.title, content: data.content, author: data.author });

        res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        console.log(error);
    }
};

// delete posts
exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findOne({ where: { id } });

        if (!post) {
            res.status(404).json({
                status: 'error',
                message: 'Cant delete post, invalid ID'
            });
            return;
        }

        // await post.destroy();
        await post.update({ status: 'deleted' })

        res.status(204).json({
            status: 'success'
        });

    } catch (error) {
        console.log(error);
    }

};