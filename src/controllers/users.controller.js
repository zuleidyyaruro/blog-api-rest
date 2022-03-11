const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');

// utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// get all users
exports.getAllUser = catchAsync(async (req, res) => {
    const users = await User.findAll({
        where: { status: 'active' },
        include: [
            { model: Post },
            { model: Comment, include: [{ model: Post }] }
        ]
    });

    res.status(200).json({
        status: 'success',
        data: { users }
    });
})

exports.getUserById = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    const user = await User.findOne({ where: { id } });

    if (!user) {
        return next(new AppError(404, 'User Not found'));
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

exports.createNewUser = catchAsync(async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new AppError(400, 'Must provide a valid name, email and password'));
    };

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
        status: 'success',
        data: { newUser }
    });

});

// exports.updateUserPatch = async (req, res) => {

//     try {
//         const id = req.params.id;
//         const { name, email, password } = req.body;

//         const user = await User.findOne({ where: { id } });

//         if (!user) {
//             res.status(404).json({
//                 status: 'error',
//                 message: 'id not found'
//             });
//             return;
//         };

//         await user.update({ name, email, password });

//         res.status(204).json({
//             status: 'success'
//         })

//     } catch (error) {
//         console.log(error);
//     }

// }

// exports.deleteUser = async (req, res) => {

//     try {
//         const id = req.params.id;
//         const user = await User.findOne({ where: { id } });

//         if (!user) {
//             res.status(404).json({
//                 status: 'error',
//                 message: 'id not found'
//             });
//             return;
//         };

//         await user.update({ status: 'deleted' });

//         res.status(204).json({
//             status: 'success',
//         })
//     } catch (error) {
//         console.log(error);
//     }

// } 