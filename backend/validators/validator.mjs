export const registerValidator = {
    name:{
        isLength:{
            options:{
                min:5,
                max:32,
            },
            errorMessage:"Username must be atleast 8 to 32 characters "
        },
        isString:{
            errorMessage:"Invalid type,name must be a valid string type"
        },
        
    },
    email:{
        isEmail:{
            errorMessage:"Invalid format input must be a valid email ID"
        }
    },
    password:{
        isStrongPassword:{
            errorMessage:"Password not viable please create a more stronger passsword"
        }
    },
    phone:{
        isLength:{
            options:{
                min:10,
                max:12
            },
            errorMessage:"Invalid phone number must be atleat 10 digits"
        },
        isNumeric:{
            errorMessage:"Invalid type,phone number caanot be a string"
        },
        isMobilePhone:{
            errorMessage:"Invalid format enter a valid Phone Number"
        }
    }
}

export const loginValidator = {
    email:{
    isEmail:{
        errorMessage:"Invalid format input must be a valid email ID"
    }
},
}

export const patientProfileValidator = {
    title:{
        isString:{
            errorMessage:"Title must be of string value"
        },
        isLength:{
            options:{
                min:2,
                max:4
            },
            errorMessage:"title cannot me more than 4 characters or less than 2"
           
        }

    },
    phone:{
        isLength:{
            options:{
                min:10,
                max:12
            },
            errorMessage:"Invalid phone number must be atleat 10 digits"
        },
        isNumeric:{
            errorMessage:"Invalid type,phone number caanot be a string"
        },
        isMobilePhone:{
            errorMessage:"Invalid format enter a valid Phone Number"
        }
    },
    ID:{
        isNumeric:{
            errorMessage:"ID number must be a valid positive number or integer"
        },
        isLength:{
            options:{
                min:7,
                max:8
            },
            errorMessage:"ID number cannot less than 7 digits or more than 8 digits"

        }
    },
    SHA:{
        isNumeric:{
            errorMessage:"SHA or NHIF value must be a valid number"
        }
    }
}