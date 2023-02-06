const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const {Schema} =mongoose

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
UserSchema.plugin(uniqueValidator)
const User=mongoose.model('user',UserSchema);
module.exports=User