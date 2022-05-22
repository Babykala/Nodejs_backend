const mongoose=require('mongoose'); 

module.exports = {
    async connectMongoose(){
        try{
            mongoose.connect('mongodb+srv://Babykala:m2c2UObwUjB59sUX@cluster0.qy289.mongodb.net/vbrs?retryWrites=true&w=majority',{ useNewUrlParser: true });
            console.log('connection success');
        }
        catch(e){
            console.log(e)
        }
    }
}
