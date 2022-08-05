const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    active: { type: Boolean, default: true },
    modifiedOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = { Cart };

// let Str = '123456789123'
// let vis = Str.slice(-4)
// console.log(vis)
// Num = '';
// for(var i = (Str.length)-4; i>0; i--){
//     if(i%3===0){
//         Num += '*-';
//     }else{
//         Num += '*';
//     }
// }
// let num1 = Num+vis

// console.log(num1)
