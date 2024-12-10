const Joi=require('joi');

exports.signupSchema=Joi.object({
    email:Joi.string().min(6).max(60).required().email({
        tlds:{allow:['com','net']},
    }).message('Please verify the email that is entered'),
    password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*!]).{9,}$'))
    .message('Password should be of length 8 with one uppercase and lowercase and number with special characters'),
    confirmPassword: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*!]).{9,}$'))
    .message('Password should be of length 8 with one uppercase and lowercase and number with special characters')

});

exports.signinSchema=Joi.object({
    email:Joi.string().min(6).max(60).required().email({
        tlds:{allow:['com','net']},
    }).message('Please verify the email that is entered'),
    password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*!]).{9,}$'))
    .message('Password should be of length 8 with one uppercase and lowercase and number with special characters')

});

exports.acceptCodeSchema=Joi.object({
    email:Joi.string().min(6).max(60).required().email({
        tlds:{allow:['com','net']},
    }),
    verificationCode:Joi.number().required(),
});

exports.changePasswordSchema=Joi.object({
    newPassword: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*!]).{9,}$')),
    oldPassword: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*!]).{9,}$')),
})

exports.acceptFPCodeSchema=Joi.object({
    email:Joi.string().min(6).max(60).required().email({
        tlds:{allow:['com','net']},
    }),
    verificationCode:Joi.number().required(),
    password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*!]).{9,}$')),
})

exports.acceptSearchText = Joi.object({
    searchText: Joi.string()
      .min(1)
      .max(60)
      .required()
      .messages({
        'string.base': 'Search text must be a string',
        'string.empty': 'Search text cannot be empty',
        'string.min': 'Search text must be at least 1 character long',
        'string.max': 'Search text cannot exceed 60 characters',
        'any.required': 'Search text is required',
      }),
  });
  