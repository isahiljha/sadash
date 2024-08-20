import { configureStore } from "@reduxjs/toolkit"
import moneyReducerfromSlice from "@/features/moneyManagement"


const mystore = configureStore({
    reducer:{
        money: moneyReducerfromSlice,
    }
})


export default mystore;