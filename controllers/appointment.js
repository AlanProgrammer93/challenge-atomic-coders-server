const User = require('../models/user');
const Appointment = require('../models/appointment');

const create = async (req, res) => {
    try {
        const id = req.uid;
        const {DateSelected, time} = req.body;

        const exist = await Appointment.findOne({date: DateSelected, time}).exec();
        if(exist){
            return res.json({
                ok: false
            });
        }

        await new Appointment({date: DateSelected, time, patient: id}).save();
        res.json({
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator'
        });
    }
}

const get = async (req, res) => {
    try {
        const {DateSelected} = req.body;
        console.log(DateSelected);

        const dates = await Appointment
            .find({date: DateSelected})
            .populate('patient', '-password')
            .exec();
   
        console.log(dates);
        res.json({
            ok: true,
            dates
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator'
        });
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const id = req.uid;
        const {DateSelected, time} = req.body;
        console.log(DateSelected, time);

        const exist = await Appointment.findOne({date: DateSelected, time}).exec();
        console.log(exist);
        if(!exist){
            return res.json({
                ok: false
            });
        }

        await Appointment.findOneAndDelete({_id: exist._id}).exec()
        res.json({
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator'
        });
    }
}

module.exports = {
    create,
    get,
    deleteAppointment
}
