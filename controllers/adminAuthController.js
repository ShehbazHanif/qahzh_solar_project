const Admin = require('../models/admin');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: 400,
                data: [],
                message: "user is not found"
            })
        };

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {

            return res.status(400).json({
                status: 400,
                data: [],
                message: "invalid password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1d' // Valid for 7 days
            }
        );

        return res.status(200).json({
            status: 200,
            data: [],
            token,
            message: "admin login successfull"
        })

    } catch (error) {

        console.log(error);


    }
}


module.exports = login;