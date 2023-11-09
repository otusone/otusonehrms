const express = require('express');
const router = express.Router();
const Attendance = require('../model/attendance');

router.get('/', (req, res, next) => {
    Attendance.find()
        .then(result => {
            res.status(200).json({
                attendanceData: result
            })
        })
        .catch(err => {
            console.log();
            res.status(500).json({
                error: err
            })
        })
});

router.post('/create', (req, res, next) => {
    const attendance = new Attendance({
        name: req.body.name,
        date: req.body.date,
        status: req.body.status,
        clock_in: req.body.clock_in,
        clock_out: req.body.clock_out,
        late: req.body.late,
        early_leaving: req.body.early_leaving,
        overtime: req.body.overtime,
    })

    attendance.save()
        .then(result => {
            res.status(200).json({
                new_Attendance: result
            })
        })
        .catch(err => {
            console.log()
            res.status(500).json({
                error: err
            })
        })
});

router.put('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const newData = req.body;

    Attendance.findByIdAndUpdate(userId, newData, { new: true })
        .then(updateAttendance => {
            if (!updateAttendance) {
                return res.status(404).json({
                    message: "attendance not found"
                })
            }
            res.status(200).json({
                message: "Updated attendance succesfully",
                attendanceData: updateAttendance
            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;

    Attendance.deleteOne({ _id: userId })
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

module.exports = router;