import { createSlice } from '@reduxjs/toolkit'

export const ResumeSlice = createSlice({
    name: 'resume',
    initialState: {
        theme: "light",
        loading: false,
        page: 1,
        value: [null]
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        setValue: (state, action) => { state.value = action.payload },
        setTheme: (state, action) => { state.theme = action.payload },
        setPage: (state, action) => { state.page = action.payload },
        resetPage: (state) => { state.page = 1 },
    },
})

export const { setLoading, setValue, setTheme, setPage, resetPage } = ResumeSlice.actions

export default ResumeSlice.reducer