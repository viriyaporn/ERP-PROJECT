import { createSlice } from '@reduxjs/toolkit'

const currentSidebarState = localStorage.getItem("sidebar") ?? false
const initialState = currentSidebarState;

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => !!action.payload,
  }
})

// Action creators are generated for each case reducer function
export const { toggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer