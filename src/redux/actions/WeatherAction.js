import {
    SET_STEP,
    LOAD_STATE_SESSIONSTORAGE,
    UPDATE_FORM,
  } from "../types/weatherFormTypes";

export const setStep = (step) => {
    return {
        type: SET_STEP,
        payload: {
            step
        },
    };
};

export const loadStateFromSessionStorage = (state) => {
    return {
        type: LOAD_STATE_SESSIONSTORAGE,
        payload: state,
    };
};

export const updateForm = (stateType, value) => {
    return {
        type: UPDATE_FORM,
        payload: {
            stateType,
            value,
        },
    };
};
