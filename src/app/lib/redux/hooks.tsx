import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { store, type RootState, type AppDispatch } from "lib/redux/store";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "lib/redux/local-storage";
import { initialResumeState, setResume } from "lib/redux/resumeSlice";
import {
  initialSettings,
  setSettings,
  type Settings,
} from "lib/redux/settingsSlice";
import { deepMerge } from "lib/deep-merge";
import type { Resume } from "lib/redux/types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook to save store to local storage on store change
 */
export const useSaveStateToLocalStorageOnChange = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });
    return unsubscribe;
  }, []);
};

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const state = loadStateFromLocalStorage();
    if (!state) return;
    if (state.resume) {
      // We merge the initial state with the stored state to ensure
      // backward compatibility, since new fields might be added to
      // the initial state over time.
      const mergedResumeState = deepMerge(
        initialResumeState,
        state.resume
      ) as Resume;
      dispatch(setResume(mergedResumeState));
    }
    if (state.settings) {
      // Object.entries(state.settings).reduce<Settings>((acc, [settingKey, settingValue]) => {
      //   const key = settingKey as keyof Settings;
      //
      //   if (!settingValue) {
      //     return acc;
      //   }
      //
      //   if (typeof acc[key] === typeof settingValue) {
      //     switch (typeof settingValue) {
      //       case 'object':
      //         if (Array.isArray(settingValue) && Array.isArray(acc[key])) {
      //           acc[key] = [...acc[key], ...settingValue] as Settings[typeof key]
      //         }
      //         break;
      //       default:
      //         acc[key] = settingValue;
      //     }
      //   }
      //
      //   return acc;
      // }, structuredClone(initialSettings));

      const mergedSettingsState = deepMerge(
        initialSettings,
        state.settings
      );
      dispatch(setSettings(mergedSettingsState));
    }
  }, [dispatch]);
};
