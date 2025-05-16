const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        email: {
            type: String,
            required : [true, 'Email is required!'],
            unique : true,
        },
        password : {
            type : String,
            required : [true, 'Password is required!']
        },
       name: {
        type: String,
        default: '',
       }
    },
     {
        timestamps: true,
    }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt);
}
    
    );

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;