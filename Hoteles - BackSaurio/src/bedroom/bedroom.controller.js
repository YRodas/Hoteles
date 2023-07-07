'use strict'

const Bedroom = require('./bedroom.model');
const Hotel = require('../hotel/hotel.model');

exports.test = (req, res)=>{
    return res.send({message: 'test function is running'});
}

exports.create = async(req, res)=>{
    try{
        let data = req.body;
        let bedroom = new Bedroom(data);
        await bedroom.save();
        return res.send({message: 'bedroom created successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating a bedroom'});
    }
}

exports.getBedrooms = async(req, res)=>{
    try{
        let bedrooms = await Bedroom.find();
        return res.send({bedrooms});
    }catch(err){
        console.error(err);
        return res.status(500).send({message:'Error getting bedrooms'});
    }
}

exports.getBedroom = async(req, res)=>{
    try{
        let roomId = req.params.id;
        let room = await Bedroom.findOne({_id: roomId});
        if(!room) return res.status(404).send({message: 'Bedroom not found'});
        return res.send({message: 'Room found:', room});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting room'})
    }
}

exports.getBedrooms = async(req, res)=>{
    try{
        let bedrooms = await Bedroom.find();
        return res.send({bedrooms});
    }catch(err){
        console.error(err);
        return res.status(500).send({message:'Error getting bedrooms'});
    }
}

exports.getRoomByHotel = async(req, res)=>{
    try{
        let hotelId = req.params.id;
        let room = await Bedroom.find({hotel: hotelId})
        
        return res.send({room});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting bedrooms'});
    }
}

exports.updateBedroom = async(req, res)=>{
    try {
        let bedroomId = req.params.id;
        let data = req.body;
        let updateBedroom = await Bedroom.findOneAndUpdate(
            {_id: bedroomId},
            data,
            {new: true}
        )
        if(!updateBedroom) return res.status(404).send({message: 'Bedroom not found and not updated'});
        return res.send({message: 'Bedroom updated:', updateBedroom});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error updating bedroom'});
    }
}

exports.deleteBedroom = async(req, res)=>{
    try{
        let idBedroom = req.params.id;
        let deleteBedroom = await Bedroom.findOneAndDelete({_id: idBedroom});
        if(!deleteBedroom) return res.status(404).send({message: 'Bedroom not found or already deleted'});
        return res.send({message: 'Bedroom deleted sucessfully'})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting bedroom'})
    }
}

