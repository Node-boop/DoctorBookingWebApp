import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..') // navigate 1 directory up


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
                            format:'passwprd',
                            description:'Strong password entered (min 8 characters)',
                            example:'MyPassword'
                        },
                        password2:{
                            type:'string',
                            format:'passwprd',
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
                            format:'passwprd',
                            description:'Strong password entered (min 8 characters)',
                            example:'MyPassword'
                        },
                    }
                },
                AuthResponse:{
                    typre:'object',
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
                        resfreshToken:{
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
                                role:{type:'string',example:['patient','doctor','admin']}
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
                            format:'passwprd',
                           
                            example:'MyPassword'
                        },
                        newPassword:{
                            type:'string',
                            format:'passwprd',
                            
                            example:'MyPassword'
                        },


                    },
                },
                RefreshTokenRequest:{
                    type:'object',
                    required:['refreshToken'],
                    properties:{
                        type:'string',
                        description:'refresh token',
                        example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....'
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