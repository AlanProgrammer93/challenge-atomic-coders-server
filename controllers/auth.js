const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../utils/jwt');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const exist = await User.findOne({ email });
        if ( exist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Mail already exists'
            });
        }

        const user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();
        user.password = '';

        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator'
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password);
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        const token = await generateJWT( userDB.id );
        userDB.password = '';

        res.json({
            ok: true,
            user: userDB,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator'
        });
    }
}

module.exports = {
    register,
    login
}
