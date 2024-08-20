const { createSlice , createAsyncThunk } = require("@reduxjs/toolkit");

// create initial state of invoice's data
const initialState = {
    moneyData: [],
    invoiceLoading: false,
    error: null,
}


// fetch data from db use async await
export const fetchInvoiceData = createAsyncThunk('user/fetchInvoiceData', async (page, limit) => {
    
    const myToken = 'eyJhbGlKI6IkpvaG4gRG9lNiIsInR5cCI6IkpXVCJ9_eyJzdWIIk6yJV_a4fwpMeJf36POciOiJxwRJSMeKKF2QTY3OiwiaWF0IjoxNTE2MjM5MDIyfQ_Sf1iOiIxMjM0NTdQssw5c';
    const dynamicUrl = 'https://silver-chough-461551.hostingersite.com/api/addwealthentry.php';

        // Check if pagination is provided
        if (page !== undefined && limit !== undefined) {
            url += `?page=${page}&limit=${limit}`;
        }

    const response = await fetch(dynamicUrl,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${myToken}`
        }
    });
    return response.json();
  });


const moneySlice = createSlice({
    name: 'moneyInvoice',
    initialState,
    reducers: {

    },
    extraReducers: (mybuilder) => {
        mybuilder
        .addCase(fetchInvoiceData.pending,(state)=>{
            state.invoiceLoading = true;
        })
        .addCase(fetchInvoiceData.fulfilled,(state,action)=>{
            state.invoiceLoading = false;
            state.moneyData = action.payload;
        })
        .addCase(fetchInvoiceData.rejected,(state,action)=>{
            state.invoiceLoading = false;
            state.error = action.error.message;
        })
    }
});

export default moneySlice.reducer;