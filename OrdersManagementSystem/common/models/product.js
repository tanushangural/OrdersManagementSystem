'use strict'

module.exports = function(Product, app) {
    Product.addProduct = function(pname,pcategory,pquantity, callback) {
        Product.create([
            {
                name:pname,
                category:pcategory
            }
        ])
        .then(product => {              
            return Product.app.models.inventory.create([{
              quantity:pquantity,
              fk_id_product: product[0].id 
            }]);                       
          })
          .then(data => {         
            console.log('Product Succesfully added')     
            return callback(null, {success: true});
          })
          .catch(error => {
            console.log("Failed to add product");
            console.error(error);
            return callback({success: false, 'error': error});
          })        
    }; 
    Product.remoteMethod('addProduct',{
        accepts:[
            {
                arg:'pname',
                type:'string',
                required:true
            },
            {
                arg:'pcategory',
                type:'string',
                required:true
            },
            {
                arg:'pquantity',
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
            verb:'POST',
            path:'/addProduct'
        },
        description:'Add new Product'
    })


    Product.deleteProduct = (pId,cb)=>{
        Product.findById(pId)
        .then((data)=>{
            if(!data) return cb(new Error('Id not found'));
            Product.destroyById(pId,(err)=>{
                if(err)return cb('fail to delete');
                return cb(null,{success:true,data:'successfully delete'});
            })
        })
        .catch((err)=>{
            return cb(err);
        })

    }
    Product.remoteMethod('deleteProduct',{
        accepts:[
            {
                arg:'pId',
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
            path:'/deleteProduct'
        },
        description:'Delete the Product'
    })



    Product.viewProducts = (cb)=>{
        const query = 'SELECT product.`name`,product.`category`,inventory.`quantity` '+
        'FROM product JOIN inventory ON product.`id` = inventory.`fk_id_product` '+
        'WHERE inventory.`quantity`>0';

        const promise = new Promise((resolve,reject)=>{
            Product.app.dataSources.OrdersManagementSystemDb.connector.execute(query,(err,data)=>{
                if(err) return reject(err);
                else return resolve(data);
            })
        })
        
        if(typeof cb === 'function'){
            promise.then((data)=>{
                return cb(null,data);
            })
            .catch((err)=>{
                return cb(err);
            })
        }
        else return promise;
    }
    Product.remoteMethod('viewProducts',{
        returns:{
            arg:'data',
            type:'object',
            root:true
        },
        http:{
            verb:'GET',
            path:'/viewProducts'
        },
        description:'Fetch all products'
    })
};
