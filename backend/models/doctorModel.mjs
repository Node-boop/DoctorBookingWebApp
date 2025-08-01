import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:[true],
        unique:true
    },
    dateOfBirth:{
        type:Date,
        required:true,

    },
    natinality:{
        type:String,
        required:true,
        trim:true,
        default:'Kenyan'
    },
    nationalIdNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    kraPin:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/^[A-Z0-9]+$/, 'Kra pin must alphanumeric']
    },
    phoneNumber:{
        type:String,
        unique:true,
        trim:true,
        match:[/^\+?\d[10,14]$/,'Please enter a valid phone number']
    },
    address:{
        County:{
            type:String,
            trim:true
        },
        Street:{
            type:String,
            trim:true
        },
        city:{
            type:String,
            trim:true
        },
        postalCode:{
            type:String,
            trim:true
        }
    },
    workExperience:[
        {
            institutionName:{
                type:String,
                required:true,
                trim:true
            },
            position:{
                type:String,
                required:true,
                trim:false
            },
            startDate:{
                type:Date,
                required:[true, "Start date is required"]
            },
            endDate:{
                type:Date,
                required:[true]
            },
            isCurrent:{
                type:Boolean,
                default:false
            }
        }
    ],
    professionalIndemnity:{
        policyNumber:{
            type:String,
            trim:true
        },
        insurer:{
            type:String,
            trim:true

        },
        expiryDate:{
            type:Date
        },
        certificateUrl:{
            type:String
        }
    },
    kmpduExams:{
        examType:{
            type:String,
            enum:['IQE','Pre-Registration','Assesment'],
            required:true
        }
    },
    profesionalStatement:{
        type:String,
        required:[true],
        minLength:100,
        maxLength:500
    },
    consoltationFee:{
        type:Number,
        min:0
    },
    cdpPoints:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:1

    },

    profilePicture:{
        type:String,
        default:'default_avator.png'
    },
    certificateOFGoodConduct:{
        type:String,
        required:true
    },
    kmpdulicenseNumber:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        match:[/^M\d{4,6}(?:\/\d{2})?$/,'Invalid license number']
    },
    registrationDate:{
        type:Date,
        required:[true, 'Registration date is required'],

    },
    registrationStatus:{
        type:String,
        enum:['Provisional','Full','Specialist','Suspended','De-registered'],
        default:'Provisional',

    },
    isLicenseActive:{
        type:Boolean,
        default:false,
    },
    licenseExpiry:{
        type:Date,
        required:function(){this.isLicenseActive;}
    },
    educationBackground:[{
        degree:{
            type:String,
            required:true,
            trim:true,
        },
        university:{
            type:String,
            required:true,
            trim:true
        },
        country:{
            type:String,
            required:true,
            trim:true,
            default:'Kenya'
        },
        graduationYear:{
            type:Number,
            required:true,
            trim:true
        },
        isKMPDURecognized:{
            type:Boolean,
            default:false
        },

    }],
    internShipDetails:{
        hospitalName:{
            type:String,
            required:true,
            trim:true
        },
        startDate:{
            type:Date
        },
        endDate:{
            type:Date
        },
        isCompleted:{
            type:Boolean,
            default:false,

        },
        cerficateUrl:{
            type:String,
            required:true
        },
    },
    indentificationDocuments:{
        type:Array,
        required:[true, 'Front photo of the id and back photo required ']
    },
    licenceImage:{
        type:Array,
        required:[true, 'License image is required']
    },
    academicDocuments:{
        type:Array,
        required:[true, 'Academic documents needed']
    },
    createdAt:{
        type:Date,
        default:new Date
    },
    updatedAt:{
        type:Date,
        default:new Date
    }
    


})

const doctorModel = mongoose.models.doctorModel || mongoose.model('doctorModel',DoctorSchema)

export default doctorModel