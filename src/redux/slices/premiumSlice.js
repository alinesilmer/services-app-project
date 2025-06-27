import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUserId: null,
  isPremium: false,
  isPremiumProf: false,
  premiumType: null,
  premiumStatus: "inactive",
  premiumStartDate: null,
  premiumEndDate: null,
  pausedUntil: null,
  planDetails: null,
  trialUsed: false,
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    resetPremiumState: () => ({ ...initialState }),

    initializePremiumForUser: (state, { payload: { userId, premiumData } }) => {
      Object.assign(state, initialState, {
        currentUserId: userId,
        ...(premiumData || {}),
      });
    },

    activatePremium: (
      state,
      { payload: { userId, premiumType, planDetails, userType } }
    ) => {
      if (state.currentUserId !== userId) return;
      const now = new Date();
      let end = new Date(now);

      if (premiumType === "Prueba") {
        end.setDate(end.getDate() + 7);
        state.trialUsed = true;
        state.premiumStatus = "trial";
      } else if (["Mensual", "estandar", "plus"].includes(premiumType)) {
        end.setMonth(end.getMonth() + 1);
        state.premiumStatus = "active";
      } else if (["Anual", "Empresarial"].includes(premiumType)) {
        end.setFullYear(end.getFullYear() + 1);
        state.premiumStatus = "active";
      }

      state.premiumType = premiumType;
      state.planDetails = planDetails;
      state.premiumStartDate = now.toISOString();
      state.premiumEndDate = end.toISOString();
      state.pausedUntil = null;
      if (userType === "professional") state.isPremiumProf = true;
      else state.isPremium = true;
    },

    pausePremium: (state, { payload: { userId, pauseDuration = 6 } }) => {
      if (state.currentUserId !== userId) return;
      const until = new Date();
      until.setMonth(until.getMonth() + pauseDuration);
      state.premiumStatus = "paused";
      state.pausedUntil = until.toISOString();
    },

    resumePremium: (state, { payload: { userId } }) => {
      if (state.currentUserId !== userId) return;
      state.premiumStatus =
        state.trialUsed && state.premiumType === "Prueba" ? "trial" : "active";
      state.pausedUntil = null;
    },

    cancelPremium: (state, { payload: { userId } }) => {
      if (state.currentUserId !== userId) return;
      state.premiumStatus = "cancelled";
      state.isPremium = false;
      state.isPremiumProf = false;
      state.pausedUntil = null;
    },

    expirePremium: (state, { payload: { userId } }) => {
      if (state.currentUserId !== userId) return;
      state.premiumStatus = "expired";
      state.isPremium = false;
      state.isPremiumProf = false;
    },

    renewPremium: (state, { payload: { userId, premiumType } }) => {
      if (state.currentUserId !== userId) return;
      const now = new Date();
      let end = new Date(now);
      if (["Mensual", "estandar", "plus"].includes(premiumType)) {
        end.setMonth(end.getMonth() + 1);
      } else if (["Anual", "Empresarial"].includes(premiumType)) {
        end.setFullYear(end.getFullYear() + 1);
      }
      state.premiumStatus = "active";
      state.premiumStartDate = now.toISOString();
      state.premiumEndDate = end.toISOString();
      state.planDetails = state.planDetails;
      state.premiumType = premiumType;
      state.pausedUntil = null;
      if (state.trialUsed && premiumType === "Prueba") state.trialUsed = false;
    },

    upgradeFromTrial: (
      state,
      { payload: { userId, premiumType, planDetails } }
    ) => {
      if (state.currentUserId !== userId) return;
      const now = new Date();
      let end = new Date(now);
      if (["Mensual", "estandar", "plus"].includes(premiumType)) {
        end.setMonth(end.getMonth() + 1);
      } else if (["Anual", "Empresarial"].includes(premiumType)) {
        end.setFullYear(end.getFullYear() + 1);
      }
      state.premiumType = premiumType;
      state.planDetails = planDetails;
      state.premiumStartDate = now.toISOString();
      state.premiumEndDate = end.toISOString();
      state.premiumStatus = "active";
      state.pausedUntil = null;
      state.trialUsed = true;
    },
  },
});

export const {
  resetPremiumState,
  initializePremiumForUser,
  activatePremium,
  pausePremium,
  resumePremium,
  cancelPremium,
  expirePremium,
  renewPremium,
  upgradeFromTrial,
} = premiumSlice.actions;

export default premiumSlice.reducer;
