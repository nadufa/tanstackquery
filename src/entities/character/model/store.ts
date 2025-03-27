import { useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";
import { isGenderValueType, isStatusValueType } from "../lib";
import { initialState } from "./constants";
import { ICharacterSettings } from "./types";

export const store = createStore<ICharacterSettings>()(
  immer((set) => ({
    searchState: initialState,
    selectedId: null,
    notification: null,
    setSearchInput: (e) => {
      set((state) => {
        state.searchState.inputText = e.currentTarget.value;
        state.selectedId = null;
      });
    },
    setSearchSelect: (option) => {
      set((state) => {
        state.searchState.inputSelect = option;
        if (state.searchState.inputText) {
          state.selectedId = null;
        }
      });
    },
    setSearchStatus: (value) => {
      set((state) => {
        if (isStatusValueType(value)) {
          state.searchState.statusValue = value;
          state.selectedId = null;
        }
      });
    },
    setSearchGender: (value) => {
      set((state) => {
        if (isGenderValueType(value)) {
          state.searchState.genderValue = value;
          state.selectedId = null;
        }
      });
    },
    setSelectedId: (newId) => {
      set((state) => {
        state.selectedId = state.selectedId === newId ? null : newId;
      });
    },
    setNotification: (value) => {
      set((state) => {
        state.notification = value;
      });
    },
  }))
);

export const useCharacterSettingsStore = <T>(
  selector?: (state: ICharacterSettings) => T
) => {
  return useStore(store, selector!);
};
