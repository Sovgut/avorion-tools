import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const pageAnimationSlice = createSlice({
  initialState: {} as Record<string, true>,
  name: "pageAnimation",
  reducers: {
    start(state, action: PayloadAction<{ page: string; delay: number }>) {
      state[action.payload.page] = true;
    },
  },
});

export const { start: startPageAnimation } = pageAnimationSlice.actions;
export default pageAnimationSlice.reducer;
