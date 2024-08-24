// Redux Slice
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// create initial state of invoice's data
const initialState = {
    moneyData: [],
    paginatedData: [],
    invoiceLoading: false,
    paginationLoading: false,
    error: null,
}

// fetch full data
export const fetchInvoiceData = createAsyncThunk('user/fetchInvoiceData', async () => {
    const myToken = 'eyJhbGlKI6IkpvaG4gRG9lNiIsInR5cCI6IkpXVCJ9_eyJzdWIIk6yJV_a4fwpMeJf36POciOiJxwRJSMeKKF2QTY3OiwiaWF0IjoxNTE2MjM5MDIyfQ_Sf1iOiIxMjM0NTdQssw5c';
    const response = await fetch('https://silver-chough-461551.hostingersite.com/api/fetchMoneyentry.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${myToken}`
        }
    });
    return response.json();
});

// fetch paginated data
export const fetchPaginatedInvoiceData = createAsyncThunk('user/fetchPaginatedInvoiceData', async ({ page, limit }) => {
    const myToken = 'eyJhbGlKI6IkpvaG4gRG9lNiIsInR5cCI6IkpXVCJ9_eyJzdWIIk6yJV_a4fwpMeJf36POciOiJxwRJSMeKKF2QTY3OiwiaWF0IjoxNTE2MjM5MDIyfQ_Sf1iOiIxMjM0NTdQssw5c';
    let url = 'https://silver-chough-461551.hostingersite.com/api/CustomfetchMoneyentry.php';

    // Check if pagination is provided
    if (page !== undefined && limit !== undefined) {
        url += `?page=${page}&limit=${limit}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${myToken}`
        }
    });
    return response.json();
});

const moneySlice = createSlice({
    name: 'moneyInvoice',
    initialState,
    reducers: {},
    extraReducers: (mybuilder) => {
        mybuilder
            .addCase(fetchInvoiceData.pending, (state) => {
                state.invoiceLoading = true;
            })
            .addCase(fetchInvoiceData.fulfilled, (state, action) => {
                state.invoiceLoading = false;
                state.moneyData = action.payload;
            })
            .addCase(fetchInvoiceData.rejected, (state, action) => {
                state.invoiceLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchPaginatedInvoiceData.pending, (state) => {
                state.paginationLoading = true;
            })
            .addCase(fetchPaginatedInvoiceData.fulfilled, (state, action) => {
                state.paginationLoading = false;
                state.paginatedData = action.payload;
            })
            .addCase(fetchPaginatedInvoiceData.rejected, (state, action) => {
                state.paginationLoading = false;
                state.error = action.error.message;
            })
    }
});

export default moneySlice.reducer;
