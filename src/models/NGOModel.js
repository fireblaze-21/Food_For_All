const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// NGO schema define 
const NGOSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        minLength : 2
    },
    address : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true,
        validate(val){
            if(!validator.isEmail(val))
                throw new Error('Invalid Email Id');
        }
    },
    phone : {
        type : String,
        required : [true, 'Contact number required'],
        unique : true,
        minlength : 10,
        maxlength : 10
    },
    govId : {
        type : String,
        trim : true,
        required : true,
        unique : true,
    },
    estd : {
        type : Number,
        min : 1800,
        max : 2100
    },
    city : {
        type : String,
        trim : true,
        required : true
    },
    state : {
        type : String,
        uppercase : true,
        required : true
    },
    description : {
        type : String,
        required : true,
        minlength : 200
    },
    logo : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : [true, 'Password required'],
        validate(val){
            if(!validator.isStrongPassword(val))
                throw new Error('Enter a Strong Password!');
        }
    },
    goal : {
        type : Number,
        required : true,
        min : 12000
    },
    fund : {
        type : Number,
        default : 0
    },
    qr : {
        type : String
    },
    upi : {
        type : String
    },
    activity : {
        type : String,
        minlength : 100
    },
    img : {
        type : String
    },
    isValid : Number,
    donations : [{
        tranId : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true,
        },
        email : {
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

NGOSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// Donor model creation 
const NGO = mongoose.model('NGO', NGOSchema);

module.exports = NGO;