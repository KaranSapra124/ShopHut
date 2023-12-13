// import { validatePaymentVerification , validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const md5 = require('md5')
const cors = require('cors')
const Razorpay = require("razorpay")
const { validatePaymentVerification, validateWebhookSignature } = require("../node_modules/razorpay/dist/utils/razorpay-utils")
const app = express()

// const { Url, Key_Id, Key_Secret } = require("../src/Secret/Secret")
// const { MongoDBUrl } = require("../src/Secret/Secret");
// console.log(process.env.MongoDBUrl);
mongoose.connect(process.env.MONGODB_uRL)
    .then(() => {
        return console.log("MongoDb Successfully Connected");
    })
    .catch((err) => {
        return console.log("Connection Error", err);
    })

app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))


const NewUser = new mongoose.Schema({
    UserName: String,
    UserEmail: String,
    Password: String,
    UserAddress: String,
    UserCart: Array,
    UserOrders: Array
})

const New_User = new mongoose.model('New_User', NewUser)

// API Routes
app.post("/Login", (req, res) => {
    const { UserEmail, Password } = req.body
    // console.log(UserEmail, Password);
    New_User.findOne({ UserEmail: UserEmail })
        .then((docs) => {
            if (docs.Password === md5(md5(Password))) {
                res.status(200).json({ message: docs })
            } else {
                console.log("Not Matched");
                return;
            }
        })
        .catch((err) => {
            console.log("Wrong Password");
        })

})
app.post("/SignIn", async (req, res) => {
    const { UserName, Password, UserEmail } = req.body
    // console.log(UserName, UserEmail, Password);
    const New__User = new New_User({ UserName: UserName, UserEmail: UserEmail, UserAddress: "", Password: md5(md5(Password)) });
    await New__User.save().then(() => {
        return res.json({ message: "User Created!!" })
    })
})
app.post("/EditForm", (req, res) => {
    const { UserEmail, UserAddress, UserName } = req.body
    New_User.findOne({ UserEmail: UserEmail })
        .then(async (docs) => {
            docs.UserName = UserName
            docs.UserEmail = UserEmail
            docs.UserAddress = UserAddress
            await docs.save()
            return res.status(200).json({ message: "Data Updated" })
        })
        .catch((err) => {
            return res.status(404).json({ message: "User Not Found!!" })
        })
})
app.post("/CheckAuthentication", (req, res) => {
    const { UserEmail } = req.body
    // console.log(UserEmail);
    New_User.findOne({ UserEmail: UserEmail })
        .then((docs) => {
            res.status(200).json({ message: docs })
        })
        .catch((err) => {
            console.log("Can't authenticate", err);
        })

})
app.post("/Cart", (req, res) => {
    const { cartData, UserEmail } = req.body;
    // console.log(cartData);
    New_User.findOne({ UserEmail: UserEmail })
        .then((docs) => {
            const ItemExist = docs.UserCart.find((data) => {
                return data.id === cartData.id
            })

            // console.log(ItemExist);

            if (ItemExist) {
                // notify("Select a new item")
                res.status(200).json({ message: "Item already exists!!" })
            } else {
                docs.UserCart = [...docs.UserCart, cartData];
                docs.save()
                return res.status(200).json({ message: "Item Pushed" })
            }


        })
        .catch((err) => {
            console.log("Can't authenticate", err);
        });
});
app.post("/CartData", (req, res) => {
    const { UserEmail } = req.body
    // console.log(UserEmail);
    New_User.findOne({ UserEmail: UserEmail })
        .then((docs) => {
            if (docs?.UserCart?.length !== 0) {

                res.status(200).json({ message: docs?.UserCart })
            } else {
                return;
            }
        })
        .catch((err) => {
            console.log("Cart Empty!!", err);
        })
})
app.post("/ModifyCart", (req, res) => {
    const { UserEmail, ProdQuant, ProdId, FilteredArr } = req.body;
    // console.log(UserEmail, ProdQuant + "////", ProdId + '+++');
    console.log(FilteredArr, ProdQuant);
    if (ProdQuant !== "" && ProdQuant !== 0 && ProdQuant !== undefined) {
        New_User.updateOne({ UserEmail: UserEmail, 'UserCart.id': ProdId }, { $set: { 'UserCart.$.Quantity': ProdQuant } })
            .then(() => {
                res.status(200).json({ message: "Quantity Updated" });
            })
            .catch((err) => {
                console.log("Error updating quantity:", err);
            });
    } else {
        New_User.updateOne({ UserEmail: UserEmail }, { $set: { 'UserCart': FilteredArr } })
            .then(() => {
                res.status(200).json({ message: "Cart Updated" });
            })
            .catch((err) => {
                console.log("Error updating quantity:", err);
            });
    }
})
app.post("/Buy", async (req, res) => {
    const { amount, currency, payment_capture } = req.body;
    console.log(amount);
    try {
        var instance = new Razorpay({ key_id: process.env.Key_Id, key_secret: process.env.Key_Secret });
        console.log(process.env.Key_Id);
        const orderCreationResponse = await instance.orders.create({
            amount: amount * 100,
            currency: currency,
            payment_capture: payment_capture,
        });

        // console.log(orderCreationResponse);

        return res.status(200).json({ message: orderCreationResponse });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);

        // You can customize the error response based on the type of error
        return res.status(500).json({ error: "You Got An Error , LOL" });
    }
});
app.post("/CallBack_Url", async (req, res) => {
    const { razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature } = req.body;

    try {
        const IsPaymentSuccessfull = validatePaymentVerification({ order_id: razorpay_order_id, payment_id: razorpay_payment_id }, razorpay_signature, process.env.Key_Secret)
        // console.log(IsPaymentSuccessfull);
        if (IsPaymentSuccessfull) {
            return res.status(200).json({ PaymentStatus: IsPaymentSuccessfull })
        }
        else {
            return res.status(400).json({ PaymentStatus: IsPaymentSuccessfull })

        }
    }
    catch {
        return res.status(500).json({ message: "Went Into Some Error!!" })
    }


})
app.post("/Order", (req, res) => {
    const { ProdData, UserEmail } = req.body;
    // console.log(ProdData, UserEmail);
    New_User.findOne({ UserEmail: UserEmail })
        .then((docs) => {
            docs.UserOrders = [...docs.UserOrders, ProdData];
            docs.save()
            return res.status(200).json({ message: "Item Pushed" })
        })
        .catch((err) => {
            console.log("Can't Make Your Purchase!!", err);
        });

})
app.post("/CancelOrder", (req, res) => {
    const { ProdData, UserEmail } = req.body;
    // console.log(ProdData, UserEmail);
    New_User.findOne({ UserEmail: UserEmail })
        .then((docs) => {
            const FilteredOrders = docs.UserOrders.filter((elem) => {
                return elem.title !== ProdData
            })
            docs.UserOrders = FilteredOrders
            docs.save()
            return res.json({ message: docs.UserOrders })
        })
        .catch((err) => {
            console.log("Can't Delete!!", err);
        });

})
app.post("/FetchOrders", (req, res) => {
    const {UserEmail} = req.body;
    // console.log(ProdData, UserEmail);
    New_User.findOne({ UserEmail: UserEmail })
        .then((docs) => {
            return res.status(200).json({ message: docs?.UserOrders })
        })
        .catch((err) => {
            console.log("Can't Make Your Purchase!!", err);
        });

})
app.post("/DeleteProfile",(req,res)=>{
    const {UserEmail} = req.body;
    // console.log(UserEmail);
    New_User.findOneAndDelete({UserEmail:UserEmail})
    .then(()=>{
        res.status(200).json({message:"Profile Deleted Successfully"})
    })
    .catch((err)=>{
        res.status(404).json({message:"Profile Not Found!!"})
    })
})





app.listen("3000", () => {
    console.log("Listening on 3000");
})
