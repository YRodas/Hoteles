'use strict'

const Reservation = require('./reservation.model')
const Bedroom = require('../bedroom/bedroom.model')
const infoUser = ['name', 'surname', 'username','email','phone'];

exports.create = async (req, res) => {
    try {
      let data = req.body;
      let reservation = new Reservation(data);
      await reservation.save();
  
      // Actualizar la disponibilidad de la habitación a 'No'
      await Bedroom.findOneAndUpdate({ _id: data.bedroom }, { availability: 'No' });
  
      return res.send({ message: 'Reservation created successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error creating reservation', error: err.message });
    }
  };

exports.get = async(req,res)=>{
    try {
        let reservation = await Reservation.find()
        return res.send({reservation});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error getting reservations'})
    }
}

exports.getRes = async(req,res)=>{
    try {
        let userId = req.body.userId
        let reservation = await Reservation.find({user: userId}).populate('user','bedroom').lean()
        return res.send({reservation});
    } catch (err) {
        return res.status(500).send({message: 'Error getting reservations'})
    }
}

exports.update = async(req, res)=>{
    try {
        let reservationId = req.params.id;
        let data = req.body;
        let reservation = await Reservation.findOne({_id: reservationId})
        if(!reservation) return res.status(404).send({message:'reservation not found and not updated'})
        let updatedReservation = await Reservation.findOneAndUpdate(
            {_id: reservationId},
            data,
            {new: true}
        )
        return res.send({message:'Reservation updated successfully'})
    } catch (err) {
        return res.status(500).send({message: 'Error updating reservation'})
    }
}

exports.delete = async(req, res) =>{
    try {
        let reservationId = req.params.id;
        let reservationDeleted = await Reservation.deleteOne({_id: reservationId})
        if(reservationDeleted.deletedCount === 0) return res.status(404).send({message:'Reservation not found and not deleted'});
        return res.send({message:'Reservation deleted successfully'})
    } catch (err) {
        return res.status(500).send({message:'Error deleting benefit'})
    }
}