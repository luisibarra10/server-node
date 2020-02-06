const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const userController = {};

userController.getUsers = async(req, res) => {

    let init = req.query.init || 0;
    init = Number(init);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    users = await User.find({}, 'name email role estado img google')
        .skip(init)
        .limit(limit)

    User.count({}, (err, count) => {
        res.json({
            users,
            count
        })
    });

}

userController.getUser = async(req, res) => {
    user = await User.findById(req.params.id, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (userDB === null) {
            return res.status(404).json({
                ok: false,
                mesagge: 'User not found'
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
}


userController.postUser = async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        img: req.body.img,
        role: req.body.role,
        estado: req.body.estado,
        google: req.body.google
    });

    await user.save();
    console.log(user);
    res.json(user)
}

userController.putUser = async(req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']);

    user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    res.json(user)
}

userController.deleteUser = async(req, res) => {
    await User.findOneAndRemove(req.params.id, (err, userDelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (userDelete === null) {
            return res.status(404).json({
                ok: false,
                mesagge: 'User not found'
            });
        }

        res.json({
            ok: true,
            message: 'User Delete'
        });
    });
}





module.exports = userController;