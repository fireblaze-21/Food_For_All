const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// Donor schema define 
const donorSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true,
        uppercase : true,
        required : [true, 'First Name required'],
        minLength : 2
    },
    lastName : {
        type : String,
        trim : true,
        uppercase : true,
        required : [true, 'Last Name required'],
        minLength : 2
    },
    email : {
        type : String,
        lowercase : true,
        required : [true, 'Email id required'],
        unique : [true, 'Email id already exist!!'],
        validate(val){
            if(!validator.isEmail(val))
                throw new Error('Invalid Email Id');
        }
    },
    isVerified : {
        type : Number,
        required : true,
        enum : [0, 1]
    },
    phone : {
        type : String,
        minlength : 10,
        maxlength : 10,
        unique : true
    },
    avatar : String,
    address : String,
    city : {
        type : String,
        uppercase : true,
        required : true
    },
    state : {
        type : String,
        uppercase : true,
        required : true
    },
    profession : String,
    bio : String,
    password : {
        type : String,
        required : [true, 'Password required'],
        validate(val){
            if(!validator.isStrongPassword(val))
                throw new Error('Enter a Strong Password!');
        }
    },
    totalAmount : {
        type : Number,
        default : 0
    },
    donations : [{
        tranId : {
            type : String,
            required : true
        },
        NGOName : {
            type : String,
            required : true,
        },
        NGOId : {
            type : String,
            required : true
        },
        amount : {
            type : Number,
            required : true,
            min : 50
        },
        date : {
            type : Date,
            required : true
        }
    }]
})

donorSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// Donor model creation 
const donor = mongoose.model('Donor', donorSchema);

module.exports = donor;