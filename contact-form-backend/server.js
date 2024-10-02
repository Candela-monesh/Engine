const express = require(`express`);
const mangoose = require(`mongoose`);
const nodemailer = require('nodemailer');
const Customers = require(`./models/customerModel`);
const cors = require('cors'); 
const app =express()
const port = 9099;

app.use(express.json())
app.use(cors());
//routes
app.get('/',(req,res)=>{
    res.send('welcome to premium used engine..')
})

//create a record
app.post('/customer',async(req,res)=>{
   try{
  const customers = await Customers.create(req.body);
  res.status(200).json(customers);

  //Customer Mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vmoneshkumar38@gmail.com',
      pass: 'sruj mnxc vnpf qwtq'
    }
  });
  
  const mailOptions = {
    from: 'vmoneshkumar38@gmail.com',
    to: req.body.email,
    cc:'admin@premiumusedautoparts.com',
    subject: `Thank you for Submitting Us - ${req.body.name}`,
    text: 'My Service Team will connact you as soon.'
 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });  
  
  //Sales/admin mail
  const transporterSales = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vmoneshkumar38@gmail.com',
      pass: 'sruj mnxc vnpf qwtq'
    }
  });
  
  const mailOptionsSales = {
    from: 'vmoneshkumar38@gmail.com',
    to: 'sales@premiumusedautoparts.com,admin@premiumusedautoparts.com',
    cc:'admin@premiumusedautoparts.com',
    subject: `Premium Used Engine- enquiry from - ${req.body.name}`,
    text:`
    name: ${req.body.name}
    Mail Id: ${req.body.email}
    Mobile Nunber: ${req.body.number}
    Message: ${req.body.messages}

    This Mail has been sent from (https://premiumusedengine.com)
   `
  };
  
  transporterSales.sendMail(mailOptionsSales, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
}
   catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message});
    
  }
})

//get all records
app.get('/customer',async(req,res)=>{
    try{
   const customers = await Customers.find({});
   res.status(200).json(customers);
    }
    catch(error){
     console.log(error.message);
     res.status(500).json({message:error.message});
    }
 })
 //get a record by ID
 app.get('/customer/:id',async(req,res)=>{
    try{
        const {id} = req.params;
   const customers = await Customers.findById(id);
   res.status(200).json(customers);
    }
    catch(error){
     console.log(error.message);
     res.status(500).json({message:error.message});
    }
 })
mangoose.set("strictQuery", false)
mangoose
.connect(`mongodb+srv://Monesh:Monesh1234@puapcontact.mhmff.mongodb.net/puapcontact?retryWrites=true&w=majority&appName=puapcontact`)
// mongodb+srv://Monesh:<db_password>@puapcontact.mhmff.mongodb.net/?retryWrites=true&w=majority&appName=puapcontact
.then(()=>{
    console.log('connected to mongoose db')
    app.listen(port,()=>{
        console.log(`welcome to PUAP -${port}`)
    })
}).catch((error)=>{
    console.log(error)
})