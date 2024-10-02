const mangoose = require(`mongoose`)

const customerSchema = mangoose.Schema(
    {
        name:{
            type:String,
            required:[false,"please enter a name"]
        },
        phoneNumber:{
            type:Number,
            required:[false,"please enter a phone number"]
        },
        email:{
            type:String,
            required:[false,"please enter a email"]
        },
        messages:{
            type:String,
            required:[false,"please enter a message"]
        },
    
    
    }
)
const customer = mangoose.model('Customer',customerSchema);
module.exports = customer;    