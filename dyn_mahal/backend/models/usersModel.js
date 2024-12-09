const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,'Email is required !'],
            trim:true,
            unique:[true,'Email already in use !'],
            minLength:[5,'Email must have 5 characters long!'],
            lowerCase:true,
        },
        password:{
            type:String,
            required:[true,"Password must be Provided!"],
            trim:true,
            select:false,
        },
        verified:{
            type:Boolean,
            default:false,
        },
        verificationCode: {
			type: String,
			select: false,
		},
        verificationCodeValidation:{
            type:Number,
            select:false,
        },
        forgotPasswordCode:{
            type:String,
            select:false,
        },
        forgotPasswordCodeValidation:{
            type:Number,
            select:false,
        }
    },
        {
            timestamps:true,
        });

module.exports=mongoose.model('User',userSchema);