const express = require('express');
const router = express.Router();
const User = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    User.find()
        .then(result => {
            res.status(200).json({
                userData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.post('/signUp', async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const user = new User({
                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    })
                })
        }
    })

});

router.post('/login', async (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.lenght < 1) {
                return res.status(401).json({
                    mes: "user not exits"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: "pasword matching fail"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        phone: user[0].phone,
                        email: user[0].email,
                    },
                        'this id dummy text',
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        username: user[0].username,
                        phone: user[0].phone,
                        email: user[0].email,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })

});
router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;

    User.deleteOne({ _id: userId })
        .then(result => {
            if (result.deletedCount === 1) {
                res.status(200).json({
                    message: 'User deleted successfully'
                });
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.put('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const newData = req.body;

    if (newData.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newData.password, saltRounds);
        newData.password = hashedPassword;
    }

    User.findByIdAndUpdate(userId, newData, { new: true })
        .then(updateUser => {
            if (!updateUser) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            res.status(200).json({
                message: "user data updated successfully",
                userData: updateUser
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;