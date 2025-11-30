import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [], 
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload); 
    },
    removeTask: (state, action) => {
      return state.filter((task) => task._id !== action.payload); 
    },
    setTasks: (state, action) => action.payload, 
  },
});

export const { addTask, removeTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
