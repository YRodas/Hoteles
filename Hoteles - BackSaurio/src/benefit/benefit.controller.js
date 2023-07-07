'use strict'

const Benefit = require('./benefit.model');

exports.defaultBenefits = async () => {
  try {
    const defaultBenefits = [
      {
        name: 'Camaras las 24 horas',
        description: 'Un servicio que proporciona una vigilancia todo el dia asegurando su seguridad',
        price: '700.00'
      },
      {
        name: 'Puerta con clave/tarjeta',
        description: 'Este servicio esta hecho para cumplir con una seguridad basica pero eficaz',
        price: '300.00'
      },
      {
        name: 'Aire acondicionado',
        description: 'Se proporciona este servicio para evitarle al consumidor cualquier tipo de problema con la temperatura',
        price: '400.00'
      },
    ];

    for (const benefits of defaultBenefits) {
      const existBenefit = await Benefit.findOne({ name: benefits.name });
      if (existBenefit) {
        console.log(`Default benefit ${benefits.name} already created`);
      } else {
        const createdBenefit = new Benefit(benefits);
        await createdBenefit.save();
        console.log(`Default benefits ${benefits.name} created`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

exports.test = (req, res)=>{
    return res.send({message: 'test function is running'});
}

exports.create = async(req, res)=>{
    try {
        let data = req.body;
        let benefit = new Benefit(data);
        await benefit.save();
        return res.send({message: 'Benefit created successfully'});
    } catch (err) {
        return res.status(500).send({message:'Error creating benefit'})
    }
}

exports.get = async(req, res)=>{
    try {
        let benefits = await Benefit.find()
        return res.send({benefits});
    } catch (err) {
        return res.status(500).send({message:'Error getting benefits'})        
    }
}

exports.update = async(req, res)=>{
    try {
        let benefitId = req.params.id;
        let data = req.body;
        let benefit = await Benefit.findOne({_id: benefitId});
        if(!benefit) return res.status(404).send({message: 'Benefit not found'});
        let updatedBenefit = await Benefit.findOneAndUpdate(
            {_id: benefitId},
            data,
            {new: true}
        )
        return res.send({message: 'Benefit updated successfully'})
    } catch (err) {
        return res.status(500).send({message: 'Error updating benefit'})
    }
}

exports.delete = async(req, res)=>{
    try {
        let benefitId = req.params.id;
        let benefitDeleted = await Benefit.deleteOne({_id: benefitId});
        if(benefitDeleted.deletedCount === 0) return res.status(404).send({message:'Benefit not found and not deleted'});
        return res.send({message:'Benefit deleted successfully'})
    } catch (err) {
        return res.status(500).send({message:'Error deleting benefit'})
    }
}

exports.getBenefit= async(req, res)=>{
    try{

        let benefitId = req.params.id;
        let benefit = await Benefit.findOne({_id: benefitId})
        
        if(!benefit) return res.status(404).send({message: 'benefit not found'});
        return res.send({mesasge: 'Benefit found:', benefit});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting benefit'});
    }
}

exports.defaultBenefits = async () => {
    try {
      const defaultBenefits = [
        {
          name: 'Camas extra',
          description: 'Un servicio que proporciona una cama extra para más espacio',
          price: '120.00'
        },
        {
          name: 'Tele de alta definicion',
          description: 'Este servicio esta hecho para darles más comodidad a los consumidores',
          price: '175.00'
        },
        {
          name: 'Aire acondicionado',
          description: 'Se proporciona este servicio para evitarle al consumidor cualquier tipo de problema con la temperatura',
          price: '400.00'
        },
      ];
  
      for (const benefits of defaultBenefits) {
        const existBenefit = await Benefit.findOne({ name: benefits.name });
        if (existBenefit) {
          console.log(`Default benefit ${benefits.name} already created`);
        } else {
          const createdBenefit = new Benefit(benefits);
          await createdBenefit.save();
          console.log(`Default benefits ${benefits.name} created`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }