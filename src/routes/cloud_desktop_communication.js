const express = require('express');
const cloud_desktop_communication = express.Router();
import { testEnvironmentVariable } from '../settings';


const wrap = fn => (...args) => fn(...args).catch(args[2])
const axios = require('axios').default;
var bodyParser =require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()


cloud_desktop_communication.get("/", (req,res) =>{
    res.status(200).json({ message: testEnvironmentVariable})

});

// PARA ESTE MICROSERVICIO SE NECESITA INGRESAR LOS DATOS DE LA SIGUIENTE MANERA:
/* Ejemplo de Json del Body para el POST
    {
    "id_player": 2,
    "nameat": "Resistencia",
    "namecategory": "Físico",
    "data": 1,
    "data_type": "in.off",
    "input_source": "xlr8_podometer",
    "date_time": "2019-05-16 13:17:17"
    }
*/
/*
Input:  
  var dataChanges ={  
        "id_player": getJob.id_player,   
        "sensor_endpoint_id_online_sensor": getJob.sensor_endpoint_id_online_sensor,
        "id_sensor_endpoint": getJob.id_sensor_endpoint,
        "watch_parameters":getJob.watch_parameters,                                             
        "data_changes": arrayChanges
    }
Output: Void (stores the data in the db)
Description: Calls the b-Games-ApirestPostAtt service 
*/
cloud_desktop_communication.post('/spend_attributes_player', jsonParser, wrap(async(req,res) => { 
    var id_player = req.body.id_player
    var id_videogame = req.body.id_videogame
    // [2,20,4,0,0]
    var id_modifiable_mechanic = req.body.id_modifiable_mechanic
    // Ej: ['chess_blitz,records,win', 'elo','puzzle_challenge,record','puzzle_rush','chess_rapid,record,win']
    var data = req.body.data
    const spend_attribute_data = {
        "id_player":id_player,
        "id_videogame": id_videogame,
        "id_modifiable_mechanic":id_modifiable_mechanic,
        "data":data
    }

    var options = {
        host : '164.90.156.141:3008',
        path: ('/spend_attributes_apis')       
    };
    var url = "https://"+options.host + options.path;
    console.log("URL "+url);
    // construct the URL to post to a publication
    const MEDIUM_POST_URL = url;
    try {
       
        const response = await axios.post(MEDIUM_POST_URL, spend_attribute_data);
        res.status(200).json({ message: 'Gasto listo', response: response })
        
    } 
    catch (error) {
        console.error(error);
        res.status(400).json({ message: 'No se tienen los suficientes atributos' })

    } 


}))


export default cloud_desktop_communication;

