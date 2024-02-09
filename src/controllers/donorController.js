const donor = require('../models/donorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getRegistrationPage = (req, res) => {
    res.status(200).render('signin');
}
const getLoginPage = (req, res) => {
    res.status(200).render('templogin');
}
const createDetails = async (req, res) => {
    try {
        if(req.body.password === req.body.cpassword){
            const user = new donor({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phone : req.body.phone,
                address : req.body.address,
                city : req.body.city,
                state : req.body.state,
                profession : req.body.profession,
                password : req.body.password,
                isVerified : 0
            });
            const result = await user.save();
            res.status(201).render('thank', {
                success : true,
                message : 'Registration Successful!',
                details : 'You may Login with your email id and password now.',
                url : '/login',
                button : 'Ok'
            });
        }
        else
            throw new Error('Password not match');
    } catch(err) {
        if(err.code == 11000)
            res.status(400).render('thank', {
                success : false,
                message : 'User already exists',
                details : 'Email or Contact no. already exists.',
                url : '/login',
                button : 'Login'
            });
        else
            res.status(400).render('signin', err);
    }
}
const getUser = async (req, res) => {
    try {
        const username = await donor.findOne({email : req.body.email});
        if(!username)
            throw new Error('Invalid UserDetails!');
        const match = await bcrypt.compare(req.body.password, username.password);
        if(match){
            const token = jwt.sign({_id : username._id, user : 'donor'}, process.env.SECRET_KEY);
            res.cookie('access_token', token, {
                expires : new Date(Date.now() + 2592000000),
                httpOnly : true
            })
            res.status(201).render('thank', {
                success : true,
                message : 'Login Successful!',
                details : 'Congratulations!, You are successfully logged in to your account.',
                url : '/',
                button : 'Ok'
            });
        }
        else
            throw new Error('Invalid UserDetails!');
    } catch (err) {
        res.status(400).render('thank', {
            success : false,
            message : err.message,
            details : 'Fill Correct Details or make sure user already registered',
            url : '/login',
            button : 'Ok'
        });
    }
}
const getProfilePage = async (req, res) => {
    try {
        const user = await donor.findOne({_id : req._id});
        if(!user)
            throw new Error('Authentication Error!!');
        user.donations.sort(function(a, b){return b.date-a.date});
        user.valid = true;
        user.user = req.user;
        res.status(200).render('profile', user);
    } catch (err) {
        res.status(403).render('thank', {
            success : false,
            message : err.message,
            details : 'Make sure your account is logged in!',
            url : '/login',
            button : 'Login'
        });
    }
}
const updateProfile = async (req, res) => {
    try {
        await donor.findByIdAndUpdate(req._id, {
            $set : {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                address : req.body.address,
                phone : req.body.phone,
                profession : req.body.profession,
                bio : req.body.bio,
                city : req.body.city,
                state : req.body.state,
            }
        })
        res.status(201).render('thank', {
            success : true,
            message : 'Profile Updated Successfully',
            details : 'visit your account to see new details',
            url : '/donor/profile',
            button : 'OK'
        })
    } catch (error) {
        res.status(400).redirect('/donor/profile');
    }
}
const updatePassword = async (req, res) => {
    try {
        const user = await donor.findById(req._id);
        const match = await bcrypt.compare(req.body.opassword, user.password);
        if(match){
            if(req.body.password === req.body.cpassword) {
                user.password = req.body.password;
                await user.save();
                res.status(201).render('thank', {
                    success : true,
                    message : 'Password updated successfully',
                    details : 'visit profile to see updated info.',
                    url : '/donor/profile',
                    button : 'Ok'
                })
            }
            else
                throw new Error('Password not matching!');
        }
        else
            throw new Error('Wrong Password!');
    } catch (error) {
        res.status(400).render('thank', {
            success : false,
            message : 'Something went wrong',
            details : error.message,
            url : '/donor/profile',
            button : 'Try again'
        })
    }
}

module.exports = {getRegistrationPage, getLoginPage, createDetails, getUser, getProfilePage, updateProfile, updatePassword};