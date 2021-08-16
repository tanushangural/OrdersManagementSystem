'use strict';

const server = require('../server');

server.models.appUser
.create([
    {
        name:"Tony Stark Admin",
        email:"stark@valuefy.com",
        password:"Password@123"
    }
])
.then((data)=>{
    console.log('Admin Created');
})
.catch((err)=>{
    console.log('Admin not created');
})