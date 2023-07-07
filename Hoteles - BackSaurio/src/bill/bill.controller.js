'use strict'

const Bill = require('./bill.model');

exports.test = async(req, res)=>{
    return res.sen({message: 'Test function is running'});
}

exports.createBill = async(req, res)=>{
    try{
        let data = req.body;
        let bill = new Bill(data);
        await bill.save()
        return res.send({message: 'Bill created successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error creating bill'});
    }
}

exports.get = async(req, res)=>{
    try {
        let bills = await Bill.find()
        return res.send({bills});
    } catch (err) {
        return res.status(500).send({message:'Error getting bills'})        
    }
}

exports.getBillByUser = async(req, res)=>{
    try{
        let billId = req.params.id;
        let bill = await Bill.findOne({_id: billId});
        if(!bill) return res.status(404).send({message: 'Bill not found '});
        return res.send({message: 'bill found: ', bill});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting a bill'});
    }
}

exports.delete = async(req, res)=>{
    try{
        let billId = req.params.id;
        let billDeleted = await Bill.deleteOne({_id: billId});
        if(billDeleted.deletedCount === 0) return res.status(404).send({message: 'Bill not found and not updated'});
        return res.send({message: 'Bill deleted succesfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting bill'});
    }
}