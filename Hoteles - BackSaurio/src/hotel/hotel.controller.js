'use strict'

const Hotel = require('./hotel.model');
const User = require('../user/user.model');
const Event = require('../event/event.model')
const Bedroom = require('../bedroom/bedroom.model')
const { validateData } = require('../utils/validate');

exports.addHotel = async(req, res)=>{
    try{
        //Obtener datos del usuario (Body)
        let data = req.body;
        //¿Hay una validación?
        //Validar que llegue la categoría

        let newHotel = new Hotel(data);
        await newHotel.save();
        return res.status(201).send({message: 'Hotel saved sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating this Hotel'});
    }
}

exports.updateHotel = async(req, res)=>{
    try{
        //Obtener el id del Hotelo a actualizar
        let hotelId = req.params.id;
        //Obtener la data a actualizar
        let data = req.body;
        //Validar que exista la categoría
        let existUser = await User.findOne({_id: data.user});
        if(!existUser) return res.status(404).send({message: 'User not found'});
        //Actualizar
        let updatedHotel = await Hotel.findOneAndUpdate(
            {_id: hotelId},
            data,
            {new: true}
        ).populate('user')
        if(!updatedHotel) return res.send({message: 'Hotel not found and not updated'});
        return res.send({message: 'Hotel updated:', updatedHotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating Hotel'});
    }
}

exports.delete = async (req, res)=>{
    try {
        let idHotel = req.params.id;
        let deletedHotel = await Hotel.findOneAndDelete({_id: idHotel});
        if(!deletedHotel) return res.status(404).send({message: 'Hotel not found or already deleted'});
        return res.send({message: 'Hotel deleted sucessfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error removing this Hotel'})
    }
}

exports.getHotels = async(req, res)=>{
    try{
        let hotels = await Hotel.find();
        return res.send({hotels});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting hotels'})
    }
}

exports.getHotel = async(req, res)=>{
    try{
        let hotelId = req.params.id;
        let hotel = await Hotel.findOne({_id: hotelId});
        if(!hotel) return res.status(404).send({message: 'Hotel not found'});
        return res.send({message: 'Hotel found:', hotel});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting hotel'})
    }
}

exports.searchForLocation = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            location: data.location 
        }
        let validate = validateData(params);
        if(validate) return res.status(400).send(validate);
        let hotel = await Hotel.find({
            location: {
                $regex: params.location, 
                $options: 'i'
            }
        })
        return res.send({hotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching...'});
    }
}

exports.searchForName = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name 
        }
        
        let hotel = await Hotel.find({
            name: {
                $regex: params.name, 
                $options: 'i'
            }
        })
        return res.send({hotel});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching...'});
    }
}

exports.searchForManager = async (req, res) => {
    try {
      let data = req.body;
      let managerId = data.manager;
      if (!managerId) {
        return res.status(400).send({ message: 'Debe proporcionar un manager' });
      }
      let hotels = await Hotel.find({
        user: managerId
      });
      return res.send({ hotels });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error searching...' });
    }
  };

  exports.searchForEvent = async (req, res) => {
    try {
      let data = req.body;
      let eventId = data.event;
      if (!eventId) {
        return res.status(400).send({ message: 'Debe proporcionar un evento' });
      }
      let hotels = await Hotel.find({
        event: eventId
      });
      return res.send({ hotels });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error searching...' });
    }
  };