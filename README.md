# Sass restuarant busines.

## Project Purpose 
To build a multi tenant business to business system which by then to be used by the
businesses to serve their clients as business to consumer. Something like Shopify.com. The
Industry to be served will be the restaurant business.
This project is intended to be the first step in a bigger project that will be done in the future as
Phase II. Therefore, we will need to build a running MVP that will have the basic features for the
application.

## Technology Stack 
- Django as a backend web framework
- Django Rest Framework
- Authentication will be used the Django Rest framework’s token system
- Reactjs will be the frontend library with Redux as the state management tool.
- Use of Axios library for rest api calls
- Use React Semantic UI if possible but not necessary
- Postgresql as the backend database.
- Nginx as a webserver. Configure for subdomains setup.

## Business Logic 
### Restaurant owner signs up (http://www.example.com/signup)
- Business name (this will be the subdomain i.e. http://business.example.com/)
- Email
- Password
- First name
- Last name
- Phone number

### Restaurant owner logs in (http://www.example.com/login)
- Email
- password

### Owners dashboard to contain the following 3 functions (http://business.example.com/manager):
- Products: 
1. List products 
2. Add a product 
3. Delete a product 
4. Update a product 

- Customers: 
1. List Customers 
2. Update a customer 
3. Delete a customer or suspend a customer 

- Profile 
1. Change password 
2. Update details 
    - Email 
    - First name 
    - Last name 
    - Password 

- Customer signup (the sign up page will be for business.example.com/signup)
    - Email 
    - Password 
    - First name 
    - Last name 
    - Phone number 

- Customer login (http://business.example.com/login):
    - Email
    - password

- Customers can view products for each business individually in their sub domain url:
    - View products in http://business.example.com/product

    
