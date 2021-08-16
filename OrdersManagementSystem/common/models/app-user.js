'use strict';

module.exports = function(AppUser, app) {
    AppUser.createUser = function(roleId, uname,uemail,upassword, callback) {
        AppUser.create(
            [{
                name:uname,
                email:uemail,
                password:upassword
            }]
        )
        .then(user => {              
            return AppUser.app.models.userRoleMapping.create([{
              fk_id_user: user[0].id,
              fk_id_role: roleId
            }]);                       
          })
          .then(data => {              
            console.log('successfully Created');
            return callback(null, {success: true});
          })
          .catch(error => {
            console.log("failed to create a user");
            return callback({success: false, 'error': error});
          })       
    };    
    AppUser.remoteMethod('createUser', {
        accepts: [{
          arg: 'roleId',
          type: 'number',
          required: true
        },
        {
           arg: 'uname',
          type: 'string',
          required: true
        },
        {
            arg:'uemail',
            type:'string',
            required:true
        },
        {
            arg:'upassword',
            type:'string',
            required:true
        }
        ],
        returns: {
          arg: 'data',
          type: 'object',
          root: true
        },
        http: {
          verb: 'POST',
          path: '/createUser'
        },
        description: 'Create a new user'
      });   

    AppUser.deleteUser = (uId,cb)=>{
      AppUser.findById(uId)
      .then((data)=>{
        if(!data) return cb(new Error('User id not found'));
        AppUser.destroyById(uId,(err)=>{
          if(err) return cb(new Error('Failed to add user'));
          else return cb(null,{success:true});
        })
      })
      .catch((err)=>{
        return cb(new Error('Error occured'));
      })
    }
    AppUser.remoteMethod('deleteUser',{
      accepts:[
        {
          arg:'uId',
          type:'number',
          required:true
        }
      ],
      returns:{
        arg:'data',
        type:'object',
        root:true
      },
      http:{
        verb:'DELETE',
        path:'/deleteUser'
      },
      description:'Delete a User'
    })

};
