const router = require("express").Router();
const { response } = require("express");
let booking = require("../models/booking");


router.route("/add").post((req,res)=>{

    const username = req.body.username;
    const vehicleNo = req.body.vehicleNo;
    const startDate =  req.body.startDate;
    const endDate = req.body.endDate;

    const newBooking  = new booking({

        username,
        vehicleNo,
        startDate,
        endDate
      
    })


    newBooking.save().then(()=>{
        res.json("Booking Added");
    }).catch((err)=>{
        console.log(err);
    })
}) 


// fetch data

router.route("/").get((req, res) => {

    booking.find().then((booking)=>{
        res.json(booking)
    
    }).catch((err)=>{
        console.log(err)
    })

})

//update
router.put('/update/:id',(req,res) =>{
    booking.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{
            if(err){
                return res.status(500).json({error:err});

            }

            return res.status(200).json({
                success:"Updated Successful"
            });
        }
    );

});
//delete

router.route('/delete/:id').delete(async(req,res)=>{
    let userId = req.params.id;

    await booking.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Booking deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data",error:err.message});
   })
 })
//get one  data
router.get("/get/:id",(req,res) =>{
    let userId = req.params.id;
    
    booking.findById(userId,(err,post) =>{
        if(err){
            return res.status(500).json({success:false,err});

        }

        return res.status(200).json({
                success:true,
                post
            });
     
    });
});

module.exports = router;