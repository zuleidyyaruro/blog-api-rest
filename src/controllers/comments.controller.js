const Comment = require("../models/comment.model");
const User = require("../models/user.model");

exports.getAllComments = async (req, res) => {

    try {
        const comment = await Comment.findAll({
            where: { status: 'active' },
            include: [{ model: User }]
        });

        res.status(200).json({
            status: 'success',
            data: { comment }
        });

    } catch (error) {
        console.log(error);
    }

}

exports.getCommentsById = async (req, res) => {

    try {
        const id = req.params.id;

        const comment = await Comment.findOne({ where: { id, status: 'active' } });

        if (!comment) {
            res.status(404).json({
                status: 'error',
                message: 'id not found'
            });
            return;
        };

        res.status(200).json({
            status: 'success',
            data: { comment }
        });

    } catch (error) {
        console.log(error);
    }

}

exports.createComments = async (req, res) => {

    try {
        const { text, postId, userId } = req.body;

        if (!text || !postId || !userId) {
            res.status(400).json({
                status: 'error',
                message: 'must be provide all fields'
            });
            return;
        };

        const newComment = await Comment.create({ text, postId, userId });

        res.status(201).json({
            status: 'success',
            data: { newComment }
        });

    } catch (error) {
        console.log(error);
    }

}