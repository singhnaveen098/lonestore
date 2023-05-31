import Product from '../../../models/Product'
import connectmongo from '../../../middleware/db'

const handler = async(req, res)=>{
    const {category} = req.query    
    let products = await Product.find({ category : category})
    let prodvariant = {}
    for( let item of products){
        if(item.name in prodvariant){
            if(!prodvariant[item.name].color.includes(item.color) && item.availableqty>0){
                prodvariant[item.name].color.push(item.color)
            }
            if(!prodvariant[item.name].size.includes(item.size) && item.availableqty>0){
                prodvariant[item.name].size.push(item.size)
            }
        }
        else{
            // if(item.availableqty>0){
                prodvariant[item.name] = JSON.parse(JSON.stringify(item))
                prodvariant[item.name].color = [item.color]
                prodvariant[item.name].size = [item.size]
            // }
            // else{
            //     prodvariant[item.name].color = []
            //     prodvariant[item.name].size = []
            // }
        }
    }
    res.status(200).json({ prodvariant })
}

export default connectmongo(handler)