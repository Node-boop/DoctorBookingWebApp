import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'
import { constrainedMemory } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..') // navigate 1 directory up
console.log(projectRoot)

const options = {
    definition:{
        openapi:'3.0.0', //API version,
    
        info:{
            title:"Meddicure API Documentation",
            version:'1.0.0',
            description:'An API to enable patients to book appointemts with a doctor and evaluate the doctor',
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
                        token:{
                            type:'string',
                            description:'JWT token for authorization',
                            example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....',
                        },
                        refreshToken:{
                            type:'string',
                            description:'Refresh Token for renewing access token(If applicable)',
                            example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....'
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
                ErrorResponse:{
                    type:'object',
                    properties:{
                        success:{
                            type:'boolean',
                            example:false
                        },
                        message:{
                            type:'string',
                            description:'Invalid credentials'
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