const express = require('express');
const cloud_desktop_communication = express.Router();
import { testEnvironmentVariable } from '../settings';
const spendHost = "bgames-SpendAttributesService:3008"

const wrap = fn => (...args) => fn(...args).catch(args[2])
const axios = require('axios').default;
var bodyParser =require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()


cloud_desktop_communication.get("/", (req,res) =>{
    res.status(200).json({ message: testEnvironmentVariable})

});

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
    var path ='/spend_attributes_apis'     

    var url = "http://"+spendHost + path;
    const MEDIUM_POST_URL = url;
    console.log("URL "+url);
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

