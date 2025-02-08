const bcryptjs = require('bcryptjs');
const User = require('../Module/userModule.js');

// register user
const registerUser = async (req, res) => {
    try {
        let { name, email, userName, password, phoneNumber, sex, maritalStatus } =
        req.body;

    // validate required fields
    if (
        !name||
        !email||
        !userName||
        !password||
        !phoneNumber||
        !sex||
        !maritalStatus
    ) {
        return res
            .status(400)
            .json({ message: 'All Required Fields Must Be Provided' });
    }

    // Hash the password
    const saltround = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, saltround);

    // save user in database
    const newUser = new User ({
        name,
        email,
        userName,
        password: hashedpassword,
        phoneNumber,
        sex,
        maritalStatus,
    });

    // Register User in Database
    const registeredUser = await newUser.save();
        res.status(201).json(registeredUser);
    }   catch (err) {
        console.error('registration Error', err);

    // handle duplicate key errors
    if (err.code === 11000) {
        return res.status(400).json({
            message: 'user already exist',
            field: Object.keys(err.keyValue),
        });
    }
    res
    .status(500)
    .json({ messsage: 'Error registration user', err: err.message });

    }
};

// login user

const loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res
            .status(400)
            .json({ message: 'phoneNumber and password are required' });
        }

        //find the user by phoneNumber
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'phoneNumber not found' });
        }
        console.log(user);
        //COMPARE PASSWORD
        const isMatch = await bcryptjs.compare(phoneNumber, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        //Exclude the password before returning user details
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(200).json(userResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

//update user

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        //find user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found'});
        }

        //find user fields
        const updatedData = req.body;

        //only hash password if its being updated
        if (updatedData.password) {
            const saltround = await bcryptjs.genSalt(10);
            updatedData.password = await bcryptjs.hash(updatedData.password, saltround);
        }
        //update user in the database
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true, // return the updated document 
            runValidators: true, // enforce validators rule
        });
        res
        .status(200)
        .json({ message: 'User Updated Successfully', updatedUser });
    } catch (err) {
        console.error('Error updating user', err);
        res
        .status(500)
        .json({ message: 'Error Updated User', err: err.message });
    }
}

// get all Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }   catch (error) {
        res.status(500).json ({ message: error.message });
    }
};

// get user by id
const getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await User.findById(id);
        res.status(200).json(users);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};

let deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        //check if user exists
        const user = await User. findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        //Delete the User
        await user.deleteOne();
        res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
        console.error('Error deleting user', error);
        res
        .status(500)
        .json({ message: 'Error deleting user', error: error.
    message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser, 
    getAllUsers,
    getUsersById,
    deleteUser
}