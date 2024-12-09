const { signupSchema,signinSchema,acceptCodeSchema,changePasswordSchema,acceptFPCodeSchema } = require("../middlewares/validatore");
const User=require("../models/usersModel");
const { doHash, doHashValidation, hmacProcess } = require("../utils/hashing");
const jwt=require('jsonwebtoken');
const crypto = require('crypto');
const transport=require('../middlewares/sendMail');

//Signup Endpoint
exports.signup = async (req,res)=>{
    const {email,password,confirmPassword} = req.body;
    try{
        const {error,value}=signupSchema.validate({email,password,confirmPassword});

        if(error){
            return res.status(401).json({success:false,message:error.details[0].message})
        }
		if(password!=confirmPassword){
			return res.status(400).json({ success: false, message: "Password and Confirm Password do not match!" });
		}
        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.status(401).json({success:false,message:"Email already exists!"})
        }
        const hashedPassword=await doHash(password,12);
        const newUser=new User({
            email,
            password:hashedPassword,
        })
        const result=await newUser.save();
        result.password=undefined;
        res.status(201).json({
            success:true,
            message:"Your Account has been created successfully",
            result,
        });
    }catch (error){
        console.log("Error: ",error)
    }
};

//SignIn Endpoint
exports.signin=async(req,res)=>{
    const {email,password} = req.body;
    try{
        const {error,value}=signinSchema.validate({email,password});
        if(error){
            return res.status(401).json({success:false,message:error.details[0].message});
        }

        const existingUser=await User.findOne({email}).select('+password');
        if(!existingUser){
            return res.status(401).json({success:false, message:"User does not exists!!"});
        }
        const result=await doHashValidation(password,existingUser.password);
        if(!result){
            return res.status(401).json({success:false, message:"Invalid Credentials. E-Mail or Password does not match!!"});
        }
        const token=jwt.sign({
            userId:existingUser._id,
            email:existingUser.email,
            verified:existingUser.verified,
        },process.env.TOKEN_SECRET,{
            expiresIn:'10m',
        });

        res.cookie('Authorization','Bearer' + token, {expires:new Date(Date.now()+ 8 * 3600000),httpOnly:process.env.NODE_ENV === 'production',
            secure:process.env.NODE_ENV === 'production',
        }).json({
            success:true,
            token,
            message:'Logged in successfully!!'
        });
    }catch(error){
        console.log("Error: ",error);
    }
};

//Logout Endpoint
exports.signout=async(req,res)=>{
    res.clearCookie('Authorization').status(200).json({success:true,message:'You have been logged out successfully!!'});
}

//Send Verification Code through E-Mail Endpoint
exports.sendVerificationCode = async (req, res) => {
	const { email } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res
				.status(404)
				.json({ success: false, message: 'User does not exists!' });
		}
		if (existingUser.verified) {
			return res
				.status(400)
				.json({ success: false, message: 'You are already verified!' });
		}

		const codeValue = Math.floor(Math.random() * 1000000).toString();
		let info = await transport.sendMail({
            from: `"Mahals" <${process.env.NODE_CODE_SENDING_EMAIL_ADDRESS}>`, 
            to: existingUser.email,
            subject: 'Verify Your Account',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #444;">Welcome to [Your Platform Name]!</h2>
                    <p>We're excited to have you on board. To complete your registration, please verify your email address using the code below:</p>
                    <h1 style="background-color: #f8f8f8; color: #2c3e50; padding: 10px; text-align: center; border-radius: 5px;">
                        ${codeValue}
                    </h1>
                    <p>This code is valid for the next 10 minutes. If you did not create this account, please ignore this email.</p>
                    <p>Thank you,<br>The Team</p>
                </div>
            `,
        });
        

		if (info.accepted[0] === existingUser.email) {
			const hashedCodeValue = hmacProcess(
				codeValue,
				process.env.HMAC_VERIFICATION_CODE_SECRET
			);
			existingUser.verificationCode = hashedCodeValue;
			existingUser.verificationCodeValidation = Date.now();
			await existingUser.save();
			return res.status(200).json({ success: true, message: 'Code has been sent to your E-Mail!' });
		}
		res.status(400).json({ success: false, message: 'Couldn`t able to send code!' });
	} catch (error) {
		console.log(error);
	}
};

//Verify Verification Code sent through E-Mail Endpoint
exports.verifyVerificationCode = async (req, res) => {
	const { email, verificationCode  } = req.body;
	try {
		const { error, value } = acceptCodeSchema.validate({ email, verificationCode  });
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}

		const codeValue = verificationCode .toString();
		const existingUser = await User.findOne({ email }).select(
			'+verificationCode +verificationCodeValidation'
		);

		if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: 'User does not exists!' });
		}
		if (existingUser.verified) {
			return res
				.status(400)
				.json({ success: false, message: 'you are already verified!' });
		}

		if (
			!existingUser.verificationCode ||
			!existingUser.verificationCodeValidation
		) {
			return res
				.status(400)
				.json({ success: false, message: 'something is wrong with the code!' });
		}
        // Check the expiry time for the code send through E-Mail. EX: Will expire in 5 mins the code we triggered thorough mail. So checking that corner case here..
		if (Date.now() - existingUser.verificationCodeValidation > 5 * 60 * 1000) {
			return res
				.status(400)
				.json({ success: false, message: 'code has been expired!' });
		}

		const hashedCodeValue = hmacProcess(
			codeValue,
			process.env.HMAC_VERIFICATION_CODE_SECRET
		);

		if (hashedCodeValue === existingUser.verificationCode) {
			existingUser.verified = true;
			existingUser.verificationCode = undefined;
			existingUser.verificationCodeValidation = undefined;
			await existingUser.save();
			return res
				.status(200)
				.json({ success: true, message: 'your account has been verified!' });
		}
		return res
			.status(400)
			.json({ success: false, message: 'unexpected occured!!' });
	} catch (error) {
		console.log(error);
	}
};

//Change Password Endpoint
exports.changePassword=async(req,res)=>{
    const {userId,verified} = req.user;
    const {oldPassword,newPassword} = req.body;
    try{
        const { error, value } = changePasswordSchema.validate({ oldPassword, newPassword });
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}
        if(!verified){
            return res.status(401).json({success:false,message:"You are not verified User! Pls verify the account to Change Password!!"})
        }
        const existingUser=await User.findOne({_id:userId}).select('+password');
        if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: 'User does not exists!' });
		}
        const result=await doHashValidation(oldPassword,existingUser.password);
        if(!result){
            return res.status(401).json({success:false,message:"Invalid Old Password!!"});
        }
        const hashedPassword= await doHash(newPassword,12);
        existingUser.password=hashedPassword;
        await existingUser.save();
        return res.status(200).json({success:true,message:"New Password has been updated successfully!!"})
    }catch(error){
        console.log("Error: ",error);
    }
}

//Send Forgot Password Code sent through E-Mail Endpoint
exports.sendForgotPasswordCode = async (req, res) => {
	const { email } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res
				.status(404)
				.json({ success: false, message: 'User does not exists!' });
		}

		const codeValue = Math.floor(Math.random() * 1000000).toString();
		let info = await transport.sendMail({
            from:  `"Mahals" <${process.env.NODE_CODE_SENDING_EMAIL_ADDRESS}>`,
            to: existingUser.email,
            subject: 'Reset Your Password',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #444;">Forgot Password?</h2>
                    <p>We received a request to reset your password for your account. Use the verification code below to reset your password:</p>
                    <h1 style="background-color: #f8f8f8; color: #2c3e50; padding: 10px; text-align: center; border-radius: 5px;">
                        ${codeValue}
                    </h1>
                    <p>This code is valid for the next 10 minutes. If you did not request a password reset, you can safely ignore this email.</p>
                    <p>Thank you,<br>The Team</p>
                </div>
            `,
        });

		if (info.accepted[0] === existingUser.email) {
			const hashedCodeValue = hmacProcess(
				codeValue,
				process.env.HMAC_VERIFICATION_CODE_SECRET
			);
			existingUser.forgotPasswordCode = hashedCodeValue;
			existingUser.forgotPasswordCodeValidation = Date.now();
			await existingUser.save();
			return res.status(200).json({ success: true, message: 'Code has been sent to your E-Mail!' });
		}
		res.status(400).json({ success: false, message: 'Couldn`t able to send code!' });
	} catch (error) {
		console.log(error);
	}
};

//Verify Forgot Password Code sent through E-Mail Endpoint
exports.verifyForgotPasswordCode = async (req, res) => {
	const { email, verificationCode,password } = req.body;
	try {
		const { error, value } = acceptFPCodeSchema.validate({ email, verificationCode,password });
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}

		const codeValue = verificationCode.toString();
		const existingUser = await User.findOne({ email }).select(
			'+forgotPasswordCode +forgotPasswordCodeValidation'
		);

		if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: 'User does not exists!' });
		}

		if (
			!existingUser.forgotPasswordCode ||
			!existingUser.forgotPasswordCodeValidation
		) {
			return res
				.status(400)
				.json({ success: false, message: 'something is wrong with the code!' });
		}
        // Check the expiry time for the code send through E-Mail. EX: Will expire in 5 mins the code we triggered thorough mail. So checking that corner case here..
		if (Date.now() - existingUser.forgotPasswordCodeValidation > 5 * 60 * 1000) {
			return res
				.status(400)
				.json({ success: false, message: 'code has been expired!' });
		}

		const hashedCodeValue = hmacProcess(
			codeValue,
			process.env.HMAC_VERIFICATION_CODE_SECRET
		);

		if (hashedCodeValue === existingUser.forgotPasswordCode) {
            const hashedPassword=await doHash(password,12);
            existingUser.password=hashedPassword;
			existingUser.forgotPasswordCode = undefined;
			existingUser.forgotPasswordCodeValidation = undefined;
			await existingUser.save();
			return res
				.status(200)
				.json({ success: true, message: 'your Password has been Updated!' });
		}
		return res
			.status(400)
			.json({ success: false, message: 'unexpected occured!!' });
	} catch (error) {
		console.log(error);
	}
};