# ANIMALL Backend Documentation

### Install modules: `npm i`
### Run Project: `npm start`

### Project Structure
1. Routes: contain all the available routes 
2. DB: contain the model schema to store messages in database 
3. Controllers: contain the logic and implementation of functions called on hitting a route

### Deployment
Project is deployed at: 

`https://animall-backend.herokuapp.com`

to access the image
1. original: 

    `https://animall-backend.herokuapp.com/originalImage/${image_url}`

2. resized:

    `https://animall-backend.herokuapp.com/resizedImage/${resized_image_url}`



### Api

 1. Create Portfolio
    <ul>
    <li> Add Cattle portfolio name and upload image</li>
    <li> Method: POST  </li>
    <li> Route: /portfolio/create 
    </li>
    <li> Body

        {
            name: string,
            photo: file
        }
    </li>
    </ul>    

2. Get Portfolios
    <ul>
    <li> Get list of details of cattle data </li>
    <li> Method: GET  </li>
    <li> Route: /portfolio/get
    </ul>

3. Resize Image
    <ul>
    <li> Background job run using redis after /portfolio/create API </li>
    <li>Resizes image to 140x140</li>
    </ul>
