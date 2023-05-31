import mongoose from "mongoose";

const connectmongo = handler => async(req, res)=>{
    mongoose.set('strictQuery', false);
    if(mongoose.connections[0].readyState){
        return handler(req, res)
    }
    mongoose.connect(process.env.mongouri)
    return handler(req, res)
}

export default connectmongo;