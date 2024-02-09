const NGO = require('../models/NGOModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const getRegistrationPage = (req, res) => {
    res.status(200).render('regisNGO');
}
const getLoginPage = (req, res) => {
    res.status(200).render('tempNGOlogin');
}
const createDetails = async (req, res) => {
    try {
        if(req.body.password === req.body.cpassword){
            const user = new NGO({
                name : req.body.name,
                address : req.body.address,
                email : req.body.email,
                phone : req.body.phone,
                govId : req.body.govId,
                city : req.body.city,
                state : req.body.state,
                goal : req.body.goal,
                description : req.body.description,
                logo : req.file.filename,
                password : req.body.password,
                isValid : 0
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
            throw new Error('Password not match!');
    } catch(err) {
        if(err.code == 11000)
            res.status(400).render('thank', {
                success : false,
                message : 'NGO already exists',
                details : 'Email or Contact no. already exists.',
                url : '/login',
                button : 'Login'
            });
        else
            res.status(400).render('regisNGO', err);
    }
}
const getUser = async (req, res) => {
    try {
        const username = await NGO.findOne({email : req.body.email});
        if(!username)
            throw new Error('Invalid UserDetails');
        const match = await bcrypt.compare(req.body.password, username.password);
        if(match){
            const token = jwt.sign({_id : username._id, user : 'NGO'}, process.env.SECRET_KEY);
            res.cookie('access_token', token, {
                expires : new Date(Date.now() + 2592000000),
                httpOnly : true
            })
            res.status(201).render('thank', {
                success : true,
                message : 'Login Successful!',
                details : 'Congratulations!, You are successfully logged in to your NGO. Update NGO profile with more info.',
                url : '/NGO/profile',
                button : 'Ok'
            });
        }
        else
            throw new Error('Invalid Password!!');
    } catch (err) {
        res.status(400).render('thank', {
            success : false,
            message : err.message,
            details : 'Fill Correct Details or make sure NGO already registered',
            url : '/login',
            button : 'Ok'
        });
    }
}
const getProfilePage = async (req, res) => {
    try {
        const user = await NGO.findOne({_id : req._id});
        if(!user)
            throw new Error('Authentication Error!!');
        user.donations.sort(function(a, b){return b.date-a.date});
        user.valid = true;
        user.user = req.user;
        res.status(200).render('NGOprofile', user);
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
        await NGO.findByIdAndUpdate(req._id, {
            $set : {
                name : req.body.name,
                address : req.body.address,
                phone : req.body.phone,
                estd : req.body.estd,
                city : req.body.city,
                state : req.body.state,
                description : req.body.description,
            }
        })
        res.status(201).render('thank', {
            success : true,
            message : 'Profile Updated Successfully',
            details : 'visit your account to see new details',
            url : '/NGO/profile',
            button : 'OK'
        })
    } catch (error) {
        res.status(400).redirect('/NGO/profile');
    }
}
const updatePassword = async (req, res) => {
    try {
        const user = await NGO.findById(req._id);
        const match = await bcrypt.compare(req.body.opassword, user.password);
        if(match){
            if(req.body.password === req.body.cpassword) {
                user.password = req.body.password;
                await user.save();
                res.status(201).render('thank', {
                    success : true,
                    message : 'Password updated successfully',
                    details : 'visit profile to see updated info.',
                    url : '/NGO/profile',
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
            url : '/NGO/profile',
            button : 'Try again'
        })
    }
}
const updateBank = async (req, res) => {
    try {
        const user = await NGO.findById(req._id);
        if(req.file){
            if(user.qr){
                fs.unlink(path.join(__dirname, `../../public/uploads/${user.qr}`), (err) => {
                    if(err)
                        throw err;
                });
            }
            user.qr = req.file.filename;
        }
        user.upi = req.body.upi;
        await user.save();
        res.status(201).render('thank', {
            success : true,
            message : 'Bank Details Updated Successfully',
            details : 'visit NGO profile to see updated details',
            url : '/NGO/profile',
            button : 'Ok'
        })
    } catch (error) {
        res.status(400).render('thank', {
            success : false,
            message : 'Something went wrong',
            details : error.message,
            url : '/NGO/profile',
            button : 'Try again'
        })
    }
}
const updateActivity = async (req, res) => {
    try {
        const user = await NGO.findById(req._id);
        if(req.files) {
            let filename = '';
            req.files.forEach((file) => {
                filename += file.filename + ','
            });
            filename = filename.substring(0, filename.lastIndexOf(','));
            if(user.img){
                const files = user.img.split(',');
                files.forEach((file) => {
                    fs.unlink(path.join(__dirname, `../../public/uploads/${file}`), (err) => {
                        if(err)
                            throw err;
                    });
                })
            }
            user.img = filename;
        }
        user.activity = req.body.activity;
        await user.save();
        res.status(201).render('thank', {
            success : true,
            message : 'Activities Updated Successfully',
            details : 'visit NGO profile to see updated details',
            url : '/NGO/profile',
            button : 'Ok'
        })
    } catch (error) {
        res.status(400).render('thank', {
            success : false,
            message : 'Something went wrong',
            details : error.message,
            url : '/NGO/profile',
            button : 'Try again'
        })
    }
}

module.exports = {getRegistrationPage, getLoginPage, createDetails, getUser, getProfilePage, updateProfile, updatePassword, updateBank, updateActivity};