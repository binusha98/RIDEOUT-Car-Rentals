const router = require("express").Router();
let driver = require("../models/driver");

router.route("/add").post((req,res)=>{

    
    const  driver_name = req.body.driver_name;
    const  email = req.body. email;
    const  nic  = req.body.nic ;
    const  phone_number = req.body.phone_number;
    const  gender= req.body.gender;


    const newDriver = new driver({
        
        driver_name,
        email,
        nic,
        phone_number,
        gender

    })


    newDriver.save().then(()=>{
        res.json("driver Added");
    }).catch((err)=>{
        console.log(err);
    })
}) 

router.route("/").get((req,res)=>{
    driver.find().then((driver)=>{
            res.json(driver)
    }).catch((err)=>{
            console.log(err)
    })
})

router.put('/update/:id',(req,res) =>{
    driver.findByIdAndUpdate(
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

router.route('/delete/:id').delete(async(req,res)=>{
    let userId = req.params.id;

    await driver.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Driver deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data",error:err.message});
   })
 })

 router.get("/get/:id",(req,res) =>{
    let userId = req.params.id;
    
    driver.findById(userId,(err,post) =>{
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