const express = require('express');
const app = express();
const port = 3000;

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sample',
    port: 3306,
    connectionLimit: 5
});

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const options = {
    swaggerDefinition: {
        info: {
            title: 'Swagger document-Rest API',
            version: '1.0.0',
            description: 'ITIS-6177-Assignment08 : REST API autogenerated by swagger doc',
        },
        host: '68.183.123.32:3000',
        basepath: '/',
    },
    apis: ['./server.js'],
};
const specs = swaggerJsdoc(options);
app.use('/swaggerdoc', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

const { check, validationResult } = require('express-validator');
const sanitizeNvalidate = [check('company_id').exists().isInt().withMessage('Id is mandatory and is a number').trim().escape(), check('company_city').isAlpha('en-US', { ignore: ' ' }).withMessage('city only takes alphabets').isLength({ min: 2 }).withMessage('city must Contain atleast 2 characters').trim().escape()];

module.exports = pool;
app.use(express.json());
app.set('json spaces', 2);

/**
* @swagger
* paths:
*  /api.v1.ITIS6177rest.com/company:
*   get:
*    tags:
*       - "Company"
*    description: Returns all companies present in DB. Company_Id,Company_name,Company_city are the details returned for each company.
*    produces:
*      - application/json
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
*   post:
*    tags:
*     - "Company"
*    description: Adds a new company object. Id can only be an integer value and city needs to be atleast 2 characters length.
*    consumes:
*      - application/json
*    produces:
*      - application/json
*    parameters:
*      - in: "body"
*        name: "body"
*        description: "company object that needs to added"
*        required: true
*        schema:
*           $ref: "#/definitions/postReq"
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
*      422:
*         description: Sanitization and validation error!
*  /api.v1.ITIS6177rest.com/company/{company_id}:                                                                                                      
*   put:                                                                                                                                               
*    tags:                                                                                                                                             
*     - "Company"                                                                                                                                      
*    description: Updates all details of an existing company object.Id can only be an integer value and city needs to be atleast 2 characters length.  
*    consumes:                                                                                                                                         
*      - application/json                                                                                                                              
*    produces:                                                                                                                                         
*      - application/json                                                                                                                              
*    parameters:                                                                                                                                       
*      - name: "company_id"                                                                                                                            
*        in: "path"                                                                                                                                    
*        description: "id of the company that needs to be added"                                                                                       
*        required: true                                                                                                                                
*        type: "integer"                                                                                                                               
*        format: "int64"                                                                                                                               
*      - in: "body"                                                                                                                                    
*        name: "body"                                                                                                                                  
*        description: "company object details that needs an update"                                                                                    
*        required: true                                                                                                                                
*        schema:                                                                                                                                       
*           $ref: "#/definitions/putReq"                                                                                                               
*    responses:                                                                                                                                        
*      200:                                                                                                                                            
*         description: Success operation!                                                                                                              
*      404:                                                                                                                                            
*         description: Error!                                                                                                                          
*      422:                                                                                                                                            
*         description: Sanitization and validation error!                                                                                              
*   patch:
*    tags:
*     - "Company"
*    description: Updates only few selected set of fields(city) of an existing company object.Id can only be an integer value and city needs to be of atleast 2 characters length.
*    consumes:
*      - application/json
*    produces:
*      - application/json
*    parameters:
*      - name: "company_id"
*        in: "path"
*        description: "id of the company that needs to be updated"
*        required: true
*        type: "integer"
*        format: "int64"
*      - in: "body"
*        name: "body"
*        description: "company city info that needs an update"
*        required: true
*        schema:
*           $ref: "#/definitions/patchReq"
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
*      422:
*         description: Sanitization and validation error!
*   delete:
*    tags:
*     - "Company"
*    description: deletes the record of an existing company object.Id can only be an integer value.
*    produces:
*      - application/json
*    parameters:
*      - name: "company_id"
*        in: "path"
*        description: "id of the company that needs to be deleted"
*        required: true
*        type: "integer"
*        format: "int64"
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
*      422:
*         description: Sanitization and validation error!
*  /api.v1.ITIS6177rest.com/company/{city}:
*   get:
*    tags:
*       - "Company"
*    description: Returns all companies in a specific city. Company_Id,Company_name,Company_city are the details provided for each company.
*    produces:
*      - application/json
*    parameters:
*      - name: "city"
*        in: "path"
*        description: "To filter the companies based on the city"
*        required: true
*        type: "string"
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
* definitions:
*      postReq:
*       type: "object"
*       properties:
*        company_id:
*         type: "integer"
*         format: "int64"
*         example: 48
*        company_name:
*         type: "string"
*         example: "test API"
*        company_city:
*         type: "string"
*         example: "Florida"
*      putReq:
*       type: "object"
*       properties:
*        company_name:
*         type: "string"
*         example: "Rest API"
*        company_city:
*         type: "string"
*         example: "FL"
*      patchReq:
*       type: "object"
*       properties:
*        company_city:
*         type: "string"
*         example: "Seattle"
*/

app.post('/api.v1.ITIS6177rest.com/company', sanitizeNvalidate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }); }
    else {
        try {
            const r = req.body;
            const result = await pool.query("INSERT INTO company values (?,?,?)", [r.company_id, r.company_name, r.company_city]);
            res.header('Content-Type', 'application/json');
            res.set('Cache-control', 'public, max-age=300');
            res.status(200).json(result);
        } catch (ex) {
            res.status(404).send(res.statusCode + ':' + ex.message);
            throw ex;
        }
    }
});

app.put('/api.v1.ITIS6177rest.com/company/:company_id', sanitizeNvalidate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }); }
    else {
        try {
            const r = req.body;
            const result = await pool.query("UPDATE company set company_name = ?,company_city = ? where company_id = ?", [r.company_name, r.company_city, req.params.company_id]);
            res.header('Content-Type', 'application/json');
            res.status(200).json(result);
        } catch (ex) {
            res.status(404).send(res.statusCode + ':' + ex.message);
            throw ex;
        }
    }
});

app.patch('/api.v1.ITIS6177rest.com/company/:company_id', sanitizeNvalidate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }); }
    else {
        try {
            const result = await pool.query("UPDATE company set company_city=? where company_id=?", [req.body.company_city, req.params.company_id]);
            res.header('Content-Type', 'application/json');
            res.status(200).json(result);
        } catch (ex) {
            res.status(404).send(res.statusCode + ':' + ex.message);
            throw ex;
        }
    }
});

const sanNval = [check('company_id').exists().isInt().withMessage('Id is mandatory and is a Number').trim().escape()];

app.delete('/api.v1.ITIS6177rest.com/company/:company_id', sanNval, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }); }
    else {
        try {
            const result = await pool.query("delete from company where company_id = (?)", req.params.company_id);
            res.header('Content-Type', 'application/json');
            res.status(200).json(result);
        } catch (ex) {
            res.status(404).send(res.statusCode + ':' + ex.message);
            throw ex;
        }
    }
});

app.get('/api.v1.ITIS6177rest.com/company', async (req, res) => {
    try {
        const result = await pool.query("select * from company");
        res.header('Content-Type', 'application/json');
        res.set('Cache-control', 'public, max-age=300');
        res.status(200).json(result);
    } catch (ex) {
        res.status(404).send(res.statusCode + ':' + ex.message);
        throw ex;
    }
});


app.get('/api.v1.ITIS6177rest.com/company/:city', async (req, res) => {
    try {
        const location = req.params.city;
        const result = await pool.query("select * from company WHERE company_city like '%" + location + "%'");
        res.header('Content-Type', 'application/json');
        res.set('Cache-control', 'public, max-age=300');
        res.status(200).json(result);
    } catch (ex) {
        res.status(404).send(res.statusCode + ':' + ex.message);
        throw ex;
    }
});

/**
* @swagger
* paths:
*  /api.v1.ITIS6177rest.com/agents:
*   get:
*    tags:
*       - "Agents"
*    description: Returns total agents in each location.
*    produces:
*      - application/json
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
*  /api.v1.ITIS6177rest.com/agents/{workingArea}:
*   get:
*    tags:
*       - "Agents"
*    description: Returns all agents in a specific location.
*    produces:
*      - application/json
*    parameters:
*      - name: "workingArea"
*        in: "path"
*        description: "To filter the agents based on the location"
*        required: true
*        type: "string"
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
*/

app.get('/api.v1.ITIS6177rest.com/agents', async (req, res) => {
    try {
        const result = await pool.query('select rtrim(working_area) as Location,count(*) as TotalAgents from agents group by working_area');
        res.header('Content-Type', 'application/json');
        res.set('Cache-control', 'public, max-age=300');
        res.status(200).json(result);
    } catch (ex) {
        res.status(404).send(res.statusCode + ':' + ex.message);
        throw ex;
    }
});

app.get('/api.v1.ITIS6177rest.com/agents/:workingArea', async (req, res) => {
    try {
        const id = req.params.workingArea;
        const result = await pool.query("select rtrim(AGENT_CODE) as AGENT_CODE,rtrim(AGENT_NAME) as AGENT_NAME,rtrim(WORKING_AREA) as WORKING_AREA,rtrim(PHONE_NO) as PHONE_NO from agents where working_area like '%" + id + "%'");
        res.header('Content-Type', 'application/json');
        res.set('Cache-control', 'public, max-age=300');
        res.status(200).json(result);
    } catch (ex) {
        res.status(404).send(res.statusCode + ':' + ex.message);
        throw ex;
    }
});

/**
* @swagger
* paths:
*  /api.v1.ITIS6177rest.com/foods:
*   get:
*    tags:
*       - "Foods"
*    description: Returns all food items.
*    produces:
*      - application/json
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
*  /api.v1.ITIS6177rest.com/foods/{name}:
*   get:
*    tags:
*       - "Foods"
*    description: Returns filtered food item.
*    produces:
*      - application/json
*    parameters:
*      - name: "name"
*        in: "path"
*        description: "To filter the items based on the item name"
*        required: true
*        type: "string"
*    responses:
*      200:
*         description: Success operation!
*      404:
*         description: Error!
*/

app.get('/api.v1.ITIS6177rest.com/foods', async (req, res) => {
    try {
        const result = await pool.query('select * from foods');
        res.header('Content-Type', 'application/json');
        res.set('Cache-control', 'public, max-age=300');
        res.status(200).json(result);
    } catch (ex) {
        res.status(404).send(res.statusCode + ':' + ex.message);
        throw ex;
    }
});

app.get('/api.v1.ITIS6177rest.com/foods/:name', async (req, res) => {
    try {
        const id = req.params.name;
        const result = await pool.query("select * from foods where item_name like '%" + id + "%'");
        res.header('Content-Type', 'application/json');
        res.set('Cache-control', 'public, max-age=300');
        res.status(200).json(result);
    } catch (ex) {
        res.status(404).send(res.statusCode + ':' + ex.message);
        throw ex;
    }
});

app.listen(port, () => {
    console.log(`Server is running and listening at http://68.183.123.32:${port}`)
});