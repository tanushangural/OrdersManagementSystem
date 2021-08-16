'use strict';

module.exports = function(app,cb){
    const Role = app.models.Role;

    app.models.appRole.find()
    .then(function(roles){
        roles.forEach(role => {
            //console.log(role);
            Role.registerResolver(role.name,function(r,context,next){
                let reqId = context.remotingContext.req.headers['x-role-id'];
                //console.log(reqId,role.id);
                if(reqId == role.id)return next(null,true);
                else return next(false);
            })

        });
        return cb(null);
    })
    .catch((err)=>{
        return cb(err);
    })
}