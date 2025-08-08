export const registerValidator = {
    firstName:{
        isLength:{
            options:{
                min:4,
                max:32,
            },
            errorMessage:"FirstName must be atleast 8 to 32 characters "
        },
        isString:{
            errorMessage:"Invalid type,name must be a valid string type"
        },
        
    },
    lastName:{
        isLength:{
            options:{
                min:4,
                max:32,
            },
            errorMessage:"LastName must be atleast 8 to 32 characters "
        },
        isString:{
            errorMessage:"Invalid type,name must be a valid string type"
        },
        
    },
    gender:{
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

export const doctorProfileValidator = {
    phoneNumber:{
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
    nationalIdNumber:{
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
    kmpdulicenseNumber:{
        isString:{
            errorMessage:"Invalid data type licence number must be a valid string"
        },
        isLength:{
            options:{
                min:10,
                max:32
            },
            errorMessage:"Invalid license number length"
        }
    },
    speciality:{
        isString:{
            errorMessage:"Invalid data type,this field must be a string"
        }
    },
    qualifications:{
        isString:{
            errorMessage:"Invalid data type,this field must be a string"
        },
        isLength:{
            options:{
                min:20,
                max:30,
            },
            errorMessage:"Below minimum required characters on the field must be atleast 20 and 30 "
        }
    },
    experience:{
        isNumeric:{
            errorMessage:"Invalid data type experience must be a valid data type of integer"
        }
    },
    Bio:{
        isString:{
            errorMessage:"Invalid data type bio must be a valid data type of string"

        },
        isLength:{
            options:{
                min:50,
                max:200
            },
            errorMessage:"Words must be atleat 50 to 200 characters"
        }
    }
}

export const medicinePostValidator = {
    name:{
        isString:{
            errorMessage:"The name field must be of data type string"
        }
    },
    category:{
        isString:{
            errorMessage:"The category field must be of data type string"
        }
    },
    
}