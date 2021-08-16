'use strict';

module.exports = (server)=>{
    server.dataSources.OrdersManagementSystemDb.autoupdate()
    .then((data)=>{
        //console.log('models updated');
        return server.dataSources.OrdersManagementSystemDb.autoupdate();
    })
    .catch((err)=>{
        console.log('models not updated');
        throw err;
    })
}