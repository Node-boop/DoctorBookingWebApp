import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'
import { constrainedMemory } from 'process'
import { type } from 'os'
import { deserialize } from 'v8'
import { stringify } from 'querystring'
import { profile } from 'console'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..') // navigate 1 directory up
console.log(projectRoot)

const options = {
    
    definition:{
        openapi:'3.0.0', //API version,


    
        info:{
            customSiteTitle: 'My App Name - API Docs',

            title:"Meddicure API Documentation",

            version:'1.0.0',

            description:"This is the API documentation for the Meddicure application, which provides endpoints for user registration, authentication, doctor profiles, pharmacy management, and more.",
            termsOfService:'http://localhost:5500/terms',
            license:{
                name:'MIT',
                url:'https://opensource.org/license/mit-license/'
            },


            contact:{
                name:"Francis Kamau",
                url:'http://localhost:5500',
                email:'javaking254@gmail.com'
            },
        },
    
        servers:[
            {
                url:`http://localhost:${process.env.PORT}`,
                description:'Local development server',
            },

        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:'http',
                    scheme:'bearer',
                    bearerFormat:'JWT'
                },
            },
            schemas:{
                User: {
                    type: 'object',
                    required: [
                        'userId',
                        'name',
                        'email', // Assuming email is required for a complete User object
                        'role'
                    ],
                    properties: {
                        userId: {
                            type: 'string',
                            description: 'The unique identifier for the user (e.g., MongoDB ObjectId)',
                            example: '60d5ec49c6d4a20015f3a0a1',
                        },
                        name: {
                            type: 'string',
                            description: 'The full name of the user',
                            example: 'John Doe',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'The user\'s email address',
                            example: 'john.doe@example.com',
                        },
                        role: {
                            type: 'string',
                            description: 'The user\'s role (e.g., \'admin\', \'doctor\', \'patient\')',
                            enum: ['admin', 'doctor', 'patient'], // Example of an enum
                            example: 'patient',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the user was created',
                            example: '2025-07-26T14:30:00Z', // Using current date for example
                        },
                    },
                },
                ListOfUsers: {  //Added the ListOfUsers schema here to be referenced
                    "type": "array",
                    "items": {
                        "$ref": "#/components/schemas/User"
                },
                    "description": "A list of user objects"
                },
                UserRegisterRequest:{
                    type:'object',
                    required:['name','email','password','password2'],
                    properties:{
                        name:{
                            type:'string',
                            description:'Full name for the user',
                            example:'John Snoop'
                        },
                        email:{
                            type:'string',
                            format:'email',
                            description:'Unique Email address of the User',
                            example:'snoopjohn@mediccure.com'
                        },
                        password:{
                            type:'string',
                            format:'password',
                            description:'Strong password entered (min 8 characters)',
                            example:'MyPassword'
                        },
                        password2:{
                            type:'string',
                            format:'password',
                            description:'Repeat password to confirm',
                            example:'MyPassword'
                        }
                    }
                },
                UserLoginRequest:{
                    type:'object',
                    required:['email','password'],
                    properties:{
                        email:{
                            type:'string',
                            format:'email',
                            description:'Unique Email address of the User',
                            example:'snoopjohn@mediccure.com'
                        },
                        password:{
                            type:'string',
                            format:'password',
                            description:'Strong password entered (min 8 characters)',
                            example:'MyPassword'
                        },
                    }
                },
                DoctorProfile:{
                    type:'object',
                    required:['ID','licenceNumber','DOB','phone','speciality','experience','qualifications','title','Bio','clinicAddress'],
                    properties:{
                        title:{
                            type:'string',
                            description:'User preffered use title',
                            example: 'Dr'
                        },
                        clinicAddress:{
                            type:'object',
                            required:['name','location','level'],
                            properties:{
                                name:{
                                    type:'string',
                                    description: 'Name of the medical facility',
                                    example:'Kenyatta National Hospital'
                                },
                                location:{
                                    type:'object',
                                    required:['city','constituency','ward','contact'],
                                    properties:{
                                        city:{
                                            type:'string',
                                            description:'Name of the city or town',
                                            example: 'Nairobi'
                                        },
                                        constituency:{
                                            type:'string',
                                            description:'The constituency the hospital is located at',
                                            example:'Nairobi West'
                                        },
                                        ward:{
                                            type:'string',
                                            description:'Ward of location',
                                            example:'Makadara'
                                        },
                                        contact:{
                                            type:'string',
                                            description: 'Hospital public reachable contact',
                                            example:'08-808-000'

                                        }
                                    }
                                }
                            }
                        },
                        ID:{
                            type:'number',
                            description: 'National Identificaion number',
                            example: '392029292'
                        },
                        licenseNumber:{
                            type:'string',
                            description: 'KMPDU license number',
                            example: 'KM-20292222'
                        },
                        DOB:{
                            type:'string',
                            description:'Date of Birth of the user',
                            example: '1990-05-05'
                        },
                        phone:{
                            type:'string',
                            description:'Users unique and valid personnal phone number',
                            example:'254704034126'
                        },
                        speciality:{
                            type:'string',
                            description:'Field of Specialization',
                            example:"Dentist"
                        },
                        experience:{
                            type:'number',
                            description: 'Number of years as a medical practitioner',
                            example: 10

                        },
                        qualifications:{
                            type:'string',
                            description: 'Highest level of education',
                            example: 'Masters degree or post graduate'
                            
                        }
                        
                    }
                },
                DoctorProfileResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:'Describes the outcome status of the request',
                            example:true
                        },
                        message:{
                            type:'string',
                            description:'Message after a successfull request',
                            example:'Profile updated successfully'
                        },
                       
                    }
                },
                DoctorProfileError:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:'response status of the request',
                            example:false
                        },
                        message:{
                            type:'string',
                            description:'Error Message after failed request',
                            example:'Profile setting failed'
                        }
                    }
                },
                UserAccountVerification:{
                    type:'object',
                    required:'otp',
                    properties:{
                        otp:{
                            type:'number',
                            description: 'Auto generated 8 digit otp',
                            example:33446756
                        }
                    }
                },
                BookingModel:{
                    type:'object',
                    required:['doctorID','userTime','reason'],
                    properties:{
                        doctorID:{
                            type:'string',
                            description:"ID to identify a specific doctor ",
                            example:'60830393h30202cc'
                        },
                        userTime:{
                            type:'string',
                            description:'User given time & date object to make object',
                            example:"2025-01-01,0900AM"
                        },
                        reason:{
                            type:'string',
                            description:'Patient reason for an appointment',
                            example:'For my last chemotherapy session'
                        }

                    },
                },
                BookingResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'Boolean',
                            description:'Shows that a booking process was successfull',
                            example:true
                        },
                        message:{
                            type:'string',
                            description:'Message to the user after a successfull placement',
                            example:'Booking successfull redirecting you your profile'
                        }
                    }
                },
                BookingError:{
                    type:'object',
                    properties:{
                        success:{
                            type:'Boolean',
                            description:"Error status or placement outcome",
                            example:false
                        },
                        message:{
                            type:'string',
                            description:"Message to indicate the outcome of the request",
                            example:'Failed to place the booking'
                        }
                    },
                },
                PharmacyModel:{
                    type:'object',
                    required:['medicineName','category','price','instock','image'],
                    properties:{
                        medicineName:{
                            type:'string',
                            description:'Name of the medicine',
                            example:'Paracetamol'
                        },
                        category:{
                            type:'string',
                            description:'Category of the medicine',
                            example:'Pain Reliever'
                        },
                        price:{
                            type:'number',
                            description:'Price of the medicine',
                            example: 100.00
                        },
                        instock:{
                            type:'number',
                            description:'Number of items in stock',
                            example: 50
                        },
                        image:{
                            type:'array',
                            items:{
                                type:'string',
                                format:'uri',
                                description:'Image URL of the medicine',
                                example:'https://example.com/image.jpg'
                            },
                            description:'Array of image URLs for the medicine'
                        },
                        available:{
                            type:'boolean',
                            description:'Availability status of the medicine',
                            example:true
                        },
                        createdAt:{
                            type:'number',
                            description:'Timestamp when the medicine was added',
                            example: 1700000000 // Example timestamp
                        },
                        updatedAt:{
                            type:'number',
                            description:'Timestamp when the medicine was last updated',
                            example: 1700000000 // Example timestamp
                        }
                    }
                },
                PharmacyResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:'Indicates that the medicine was added successfully',
                            example:true
                        },
                        message:{
                            type:'string',
                            description:'Message indicating the result of the operation',
                            example:'Medicine added successfully'
                        },
                        medicineId:{
                            type:'string',
                            description:'ID of the added medicine',
                            example:'60d5ec49c6d4a20015f3a0a1'
                        }
                    }
                },
                PharmacyError:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:'Indicates that the operation failed',
                            example:false
                        },
                        message:{
                            type:'string',
                            description:'Error message indicating the reason for failure',
                            example:'Failed to add medicine due to validation error'
                        }
                    }
                },
                PharmacyListResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean', 
                            description:'Indicates that the list was retrieved successfully',
                            example:true
                        },
                        message:{
                            type:'string',
                            description:'Message indicating the result of the operation',
                            example:'Pharmacy list retrieved successfully'
                        },
                        medicines:{
                            type:'array',
                            items:{
                                $ref:'#/components/schemas/PharmacyModel'
                            },
                            description:'Array of pharmacy items'
                        }
                    }
                },
                PharmacyListError:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:'Indicates that the operation failed',
                            example:false
                        },
                        message:{
                            type:'string', 
                            description:'Error message indicating the reason for failure',
                            example:'Failed to retrieve pharmacy list due to server error'
                        }
                    }
                },
                CartItem:{
                    type:'object',
                    required:['productId','quantity'],
                    properties:{
                        productId:{
                            type:'string',
                            description:'ID of the product in the cart',
                            example:'60d5ec49c6d4a20015f3a0a1'
                        },
                        quantity:{
                            type:'number',
                            description:'Quantity of the product in the cart',
                            example:2
                        }
                    }
                }, 
                UpdateCartRequest:{
                    type:'object',
                    required:['userId','productId','quantity'],
                    properties:{
                        userId:{
                            type:'string',
                            description:'ID of the user whose cart is being updated',
                            example:'60d5ec49c6d4a20015f3a0a1'
                        },  
                        productId:{
                            type:'string',
                            description:'ID of the product to be updated in the cart',
                            example:'60d5ec49c6d4a20015f3a0a2'
                        },
                        quantity:{
                            type:'number',
                            description:'New quantity of the product in the cart',
                            example:3
                        }
                    }
                },
                UpdateCartResponse:{
                    type:'object',
                    properties:{
                        message:{
                            type:'string',
                            description:'Message indicating the result of the operation',
                            example:'Cart updated successfully'
                        },  
                        updatedCart:{
                            type:'array',
                            items:{
                                $ref:'#/components/schemas/CartItem'
                            },
                            
                            description:'Array of updated cart items'
                        }
                    }   
                },
                UpdateCartError:{
                    type:'object',
                    properties:{
                        error:{
                            type:'string',
                            description:'Error message indicating the reason for failure',
                            example:'Failed to update cart due to validation error'

                        }
                    }   
                },
                RemoveCartItemRequest:{
                    type:'object',
                    required:['userId','productId'],
                    properties:{
                        userId:{
                            type:'string',
                            description:'ID of the user whose cart item is being removed',
                            example:'60d5ec49c6d4a20015f3a0a1'
                        },
                        productId:{
                            type:'string',
                            description:'ID of the product to be removed from the cart',
                            example:'60d5ec49c6d4a20015f3a0a2'
                        }
                    }
                },
                RemoveCartItemResponse:{
                    type:'object',
                    properties:{
                        message:{  
                            type:'string',
                            description:'Message indicating the result of the operation',
                            example:'Cart item removed successfully'
                        },  
                        removedItemId:{
                            type:'string',
                            description:'ID of the removed cart item',
                            example:'60d5ec49c6d4a20015f3a0a2'
                        }   
                    }   
                },

                CartResponse:{
                    type:'object',
                    properties:{
                        message:{
                            type:'string',
                            description:'Message indicating the result of the operation',
                            example:'Cart retrieved successfully'
                        },
                        cartData:{
                            type:'array', 
                            items:{
                                $ref:'#/components/schemas/CartItem'
                            }, 
                            description:'Array of items in the cart'
                        }   
                    }
                },
                CartError:{
                    type:'object', 
                    properties:{
                        error:{
                            type:'string',
                            description:'Error message indicating the reason for failure',  
                            example:'Failed to retrieve cart due to server error'
                        }
                    }
                },
                AddToCartRequest:{
                    type:'object',
                    required:['userId','productId','quantity'],
                    properties:{
                        userId:{    
                            type:'string',
                            description:'ID of the user adding the product to the cart',
                            example:'60d5ec49c6d4a20015f3a0a1'
                        },
                        productId:{
                            type:'string',
                            description:'ID of the product to be added to the cart',
                            example:'60d5ec49c6d4a20015f3a0a2'
                        },
                        quantity:{
                            type:'number',
                            description:'Quantity of the product to be added to the cart',
                            example:1
                        }
                    }
                },
                AddToCartResponse:{   
                    type:'object',
                    properties:{
                        message:{   
                            type:'string',
                            description:'Message indicating the result of the operation',
                            example:'Product added to cart successfully'
                        },
                        userId:{
                            type:'string',
                            description:'ID of the user who added the product to the cart',
                            example:'60d5ec49c6d4a20015f3a0a1'
                        },
                        productId:{
                            type:'string',
                            description:'ID of the product that was added to the cart',
                            example:'60d5ec49c6d4a20015f3a0a2'
                        }
                    }
                },
                AddToCartError:{
                    type:'object',
                    properties:{
                        error:{
                            type:'string',  
                            description:'Error message indicating the reason for failure',
                            example:'Failed to add product to cart due to validation error'
                        }
                    }
                },
                UserProfileRequest:{
                    type:'object',
                    required:['userID'],
                    properties:{
                        userID:{
                            type:'string',
                            description:'ID of the user whose profile is being requested',
                            example:'60d5ec49c6d4a20015f3a0a1'
                        }
                    }
                },
                UserProfileResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean', 
                            description:'Indicates that the profile was retrieved successfully',
                            example:true
                        },
                        message:{
                            type:'string',
                            description:'Message indicating the result of the operation',
                            example:'User profile retrieved successfully'
                        },
                        userProfile:{
                            type:'object',
                            properties:{
                                userId:{
                                    type:'string',
                                    description:'ID of the user',
                                    example:'60d5ec49c6d4a20015f3a0a1'
                                },
                                name:{  
                                    type:'string',
                                    description:'Full name of the user',
                                    example:'John Doe'
                                },
                                email:{
                                    type:'string',
                                    format:'email',
                                    description:'Email address of the user',
                                    example:'johndoe@gmail.com',
                                },
                                phone:{
                                    type:'string',
                                    description:'Phone number of the user',
                                    example:'254704034126'
                                },
                                address:{
                                    type:'array',
                                    items:{
                                        type:'object',
                                        properties:{
                                            county:{
                                                type:'string',
                                                description:'County of the user\'s address',
                                                example:'Nairobi'
                                            },
                                            subCounty:{
                                                type:'string',
                                                description:'Sub-county of the user\'s address',
                                                example:'Westlands'
                                            },
                                            ward:{
                                                type:'string',
                                                description:'Ward of the user\'s address',
                                                example:'Parklands'
                                            },
                                            location:{
                                                type:'string',
                                                description:'Location of the user\'s address',
                                                example:'Kilimani'
                                            },
                                            subLocation:{
                                                type:'string',
                                                description:'Sub-location of the user\'s address',
                                                example:'Kilimani Estate'
                                            },
                                            estate:{
                                                type:'string',  
                                                description:'Estate of the user\'s address',
                                                example:'Kilimani Estate'
                                            }   
                                        }
                                    },
                                    description:'Array of address objects for the user'
                                },
                                nextOfKin:{
                                    type:'array',
                                    items:{
                                        type:'object',  
                                        properties:{
                                            name:{
                                                type:'string',
                                                description:'Name of the next of kin',
                                                example:'Jane Doe'
                                            },  
                                            relationShip:{
                                                type:'string',
                                                description:'Relationship to the user',
                                                example:'Sister'
                                            },
                                            phoneNumber:{
                                                type:'string',
                                                description:'Phone number of the next of kin',
                                                example:'254704034126'
                                            }
                                        }
                                    },
                                    description:'Array of next of kin objects for the user'
                                }
                            }
                        }
                    }
                },
                UserProfileError:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:'Indicates that the profile retrieval failed',
                            example:false
                        },
                        message:{
                            type:'string',  
                            description:'Error message indicating the reason for failure',
                            example:'Failed to retrieve user profile due to server error'
                        }
                    }
                },
                UserProfileUpdateRequest:{
                    type:'object',
                    required:['userId'],
                    properties:{
                        userId:{
                            type:'string',
                            description:'ID of the user whose profile is being updated',
                            example:'60d5ec49c6d4a20015f3a0a1'
                        },
                        name:{
                            type:'string',
                            description:'Full name of the user',
                            example:'John Doe'
                        },
                        email:{
                            type:'string',
                            format:'email',
                            description:'Email address of the user',
                            example:'johndoe@gmail.com',
                        },
                        phone:{
                            type:'string',
                            description:'Phone number of the user',
                            example:'254704034126'  
                        },
                        address:{
                            type:'array',
                            items:{ 
                                type:'object',
                                properties:{
                                    county:{
                                        type:'string',
                                        description:'County of the user\'s address',
                                        example:'Nairobi'
                                    },
                                    subCounty:{
                                        type:'string',
                                        description:'Sub-county of the user\'s address',
                                        example:'Westlands'
                                    },
                                    ward:{
                                        type:'string',
                                        description:'Ward of the user\'s address',
                                        example:'Parklands'
                                    },  
                                    location:{
                                        type:'string',
                                        description:'Location of the user\'s address',
                                        example:'Kilimani'
                                    },
                                    subLocation:{
                                        type:'string',
                                        description:'Sub-location of the user\'s address',
                                        example:'Kilimani Estate'
                                    },
                                    estate:{
                                        type:'string',
                                        description:'Estate of the user\'s address',
                                        example:'Kilimani Estate'
                                    }
                                }
                            },
                            description:'Array of address objects for the user'
                        },
                        nextOfKin:{
                            type:'array',
                            items:{
                                type:'object',
                                properties:{
                                    name:{
                                        type:'string',
                                        description:'Name of the next of kin',
                                        example:'Jane Doe'
                                    },
                                    relationShip:{
                                        type:'string',
                                        description:'Relationship to the user',
                                        example:'Sister'
                                    },
                                    phoneNumber:{   
                                        type:'string',
                                        description:'Phone number of the next of kin',
                                        example:'254704034126'
                                    }
                                }
                            },  
                            description:'Array of next of kin objects for the user'
                        }
                    }
                },

                                    
                VerificationResponse:{  
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description: 'Indicates account verification success',
                            example:true
                        },
                         message:{
                            type:'string',
                            description:'A message regarding th operation result',
                            example:'User verified successfully'
                        },
                    }
                },
                LoginResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:"Indicates that the process was a success",
                            example:true
                        },
                        message:{
                            type:'string',
                            description:'A message regarding th operation result',
                            example:'User Registered successfully'
                        },
                        token:{
                            type:'string',
                            description:'JWT token for authorization',
                            example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....',
                        },
                    }

                },
                RegistrationConflictError:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:'response status',
                            example:false,
                        },
                        message:{
                            type:'string',
                            description:'Error message from the request',
                            example:'User already exists'
                        }
                    }
                },
                LoginError:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:"Indicates that the process was a success",
                            example:false
                        },
                        message:{
                            type:'string',
                            description:'A message regarding th operation result',
                            example:'User not Found or Invalid credentials'
                        },
                    }

                },
                AuthResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:"Indicates that the process was a success",
                            example:true
                        },
                        message:{
                            type:'string',
                            description:'A message regarding th operation result',
                            example:'User Registered successfully'
                        },
                        
                        user:{
                            type:'object',
                            properties:{
                                id:{type:'string',example:'68odjsommd944m9393'},
                                name:{type:'string',example:'John Doe'},
                                email:{type:'string',format:'email',example:'joona@gmail.com'},
                                role:{
                                    type:'string',
                                    example:"patient"
                                }
                            }
                        }


                    }
                },
                DoctorAuthResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            description:"Indicates that the process was a success",
                            example:true
                        },
                        message:{
                            type:'string',
                            description:'A message regarding th operation result',
                            example:'User Registered successfully'
                        },
                        
                        user:{
                            type:'object',
                            properties:{
                                id:{type:'string',example:'68odjsommd944m9393'},
                                name:{type:'string',example:'John Doe'},
                                email:{type:'string',format:'email',example:'joona@gmail.com'},
                                role:{
                                    type:'string',
                                    example:"doctor"
                                }
                            }
                        }


                    }
                },
                VerificationError:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            example:false
                        },
                        message:{
                            type:'string',
                            description:'Invalid credentials',
                            example:'Invalid OTP or Expired'
                        },
                    },

                },
                ErrorResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            example:false
                        },
                        message:{
                            type:'string',
                            description:'Invalid credentials',
                            example:'Invalid login credentials'
                        },
                    },

                },
                ChangePasswordRequest:{
                    type:'object',
                    required:['currentPassword','newPassword'],
                    properties:{
                        currentPassword:{
                            type:'string',
                            format:'password',
                           
                            example:'MyPassword'
                        },
                        newPassword:{
                            type:'string',
                            format:'password',
                            
                            example:'MyPassword'
                        },


                    },
                },
                RefreshTokenRequest:{
                    type:'object',
                    required:['refreshToken'],
                    properties:{
                        refreshToken:{
                        type:'string',
                        description:'refresh token',
                        example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....'}
                    },
                }

            }
        },
        security:[
            {
                bearerAuth:[]
            }
    
        ]
    },
    apis:[
        path.join(projectRoot,'routes','*.mjs'),
        path.join(projectRoot, 'routes', '**', '*.mjs'),
        path.join(projectRoot,'server.mjs')
    ]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec