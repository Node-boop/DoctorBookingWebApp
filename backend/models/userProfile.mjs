import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    contact:{
        phoneNumber:{
            type:String,
            match:[/^\+?\d[10,14]$/,'Please enter a valid phone number'],
            required:true
        },
        otherNumber:{
            type:String,
            match:[/^\+?\d[10,14]$/,'Please enter a valid phone number']

        },
        emergencyNumber:{
            type:String,
            match:[/^\+?\d[10,14]$/,'Please enter a valid phone number'],
            required:true

        },
    },
    nextOfKin:[{
        name:{
            type:String,
            trim:true,
            required:true

        },
        relationShip:{
            type:String,
            trim:true,
            required:true
        },
        phoneNumber:{
            type:String,
            
            required:true

        }
    }],
    address:[{
        
        county:{
            type:String,
            trim:true,
            required:true
        },
        subCounty:{
            type:String,
            trim:true,
            required:true
        },
        ward:{
            type:String,
            trim:true,
            required:true
        },
        location:{
            type:String,
            trim:true,
            required:true
        },
        subLocation:{
            type:String,
            trim:true,
            required:true
        },
        estate:{

            type:String,
            trim:true,
            required:true

        }


    }],
    medicalInformation:[{
        allergies:[{
            name:{
                type:String,
            }

        }],
        seriousCondition:[{
            condtion:{
                name:{type:String},
                detail:{type:String}

            }
        }]

    }],
    identification:[{
        nationalIdNumber:{
            type:String,
            maxLength:8,
            minLength:8,
            required:true,
            trim:true,
        },
        Image:{
            type:Array,
            required:true
        },
        kraPin:{type:String,required:true},
        kraImage:{type:String},
    }],
    insuranceInformation:[{
        shaNumber:{type:String},
        otherInsurance:[{
            companyName:{type:String},
            insuranceType:{type:String},
            isActive:{type:Boolean,default:false},
            expiryDate:{typ:Date,}
        }]
    }]
    
})

const userProfile = mongoose.models.userProfile || mongoose.model('userProfile',userProfileSchema)

export default userProfile