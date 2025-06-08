Installation
==============
Front end- Angular
==========
npm init
npm install
ng serve


Back end- Nodejs(express)
==========
npm init
npm install(if not present)
nodemon server.js



Login Credentials
===================
Admin
-----
email: admin@gmail.com
password: admin123

Admin
-----
email: admin1@gmail.com
password: admin1234

Staff
-----
email: staff@gmail.com
password: staff123



API checklist on Postman
============================

Register
=========

Api:http://127.0.0.1:3002/api/auth/register-post method

Postman
========
Headers
--------
Key: Authorization
Value: Bearer <token>

Body-Json
----------


{
       
        "name": "admin1",
        "email": "admin1@gmail.com",
        "password": "admin1234",
        "role": "admin"
        
    }


Login
=========

Api:http://127.0.0.1:3002/api/auth/login -post method

Postman
========
Headers
--------
Key: Authorization
Value: Bearer <token>

Body-Json
----------


{
        "email": "admin1@gmail.com",
        "password": "admin1234" "role": "admin"
        
    }

Products-post
=========

Api:http://127.0.0.1:3002/api/products

Postman
========
Headers
--------
Key: Authorization
Value: Bearer <token>

Body-Json
----------


{
       
        
     "name": "Pallet Jack",
        "product_code": "PROD001",
        "quantity": 50,
        "price": "200.00",
        "description": "Manual hydraulic pallet jack used for lifting pallets"
        
    }

Products-put
=========

Api:http://127.0.0.1:3002/api/products/9

Postman
========
Headers
--------
Key: Authorization
Value: Bearer <token>

Body-Json
----------


{
       
        
     "name": "Pallet Jack",
        "product_code": "PROD001",
        "quantity": 50,
        "price": "200.00",
        "description": "Manual hydraulic pallet jack used for lifting pallets"
        
    }

Products-delete
=========

Api:http://127.0.0.1:3002/api/products/9

Postman
========
Headers
--------
Key: Authorization
Value: Bearer <token>



