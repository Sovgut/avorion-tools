import {configureStore} from "@reduxjs/toolkit";
import turretsReducer from "@/reducers/turrets";

export const store = configureStore({
    reducer: {
        turrets: turretsReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;