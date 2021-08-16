'use strict';
const server = require('../server');
const Role = server.models.appRole;

Role.create([
    {
        'name':'Admin'
    },
    {
        'name':'Seller'
    },
    {
        'name':'Customer'
    }
])
.then((data)=>{
    console.log('Roles Added');
})
.catch((err)=>{
    console.log('Rolls not Added');
    throw err;
})