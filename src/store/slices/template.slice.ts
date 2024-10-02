import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
 message_payload: {
  variables: string[];
  name: string;
  open: boolean;
 };

 edit_template: string | null;
 delete_template: string | null;
 view_template: string | null;
 template_details: unknown;
};

const initialState: InitialState = {
 message_payload: {
  variables: [],
  name: "",
  open: false,
 },

 edit_template: null,
 delete_template: null,
 view_template: null,
 template_details: "",
};

const templateSlice = createSlice({
 name: "template",
 initialState,
 reducers: {
  setMessagePayload: (state, action: PayloadAction<InitialState["message_payload"]>) => {
   state.message_payload = action.payload;
  },
  setEditTemplate: (state, action: PayloadAction<InitialState["edit_template"]>) => {
   state.edit_template = action.payload;
  },
  setDeleteTemplate: (state, action: PayloadAction<InitialState["delete_template"]>) => {
   state.delete_template = action.payload;
  },
  setViewTemplate: (
   state,
   action: PayloadAction<{
    view_template: InitialState["view_template"];
    template_details: InitialState["template_details"];
   }>
  ) => {
   state.view_template = action.payload.view_template;
   state.template_details = action.payload.template_details;
  },

  resetTemplateState: (state) => {
   state.message_payload = initialState.message_payload;
   state.edit_template = initialState.edit_template;
   state.delete_template = initialState.delete_template;
   state.view_template = initialState.view_template;
  },
 },
});

const templateReducer = templateSlice.reducer;
export const { setMessagePayload, setEditTemplate, setDeleteTemplate, setViewTemplate } = templateSlice.actions;

export default templateReducer;
