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
    resetPremiumState: (state) => {
      return { ...initialState };
    },

    initializePremiumForUser: (state, action) => {
      const { userId, premiumData } = action.payload;

      if (state.currentUserId && state.currentUserId !== userId) {
        Object.assign(state, initialState);
      }

      state.currentUserId = userId;

      if (premiumData) {
        Object.assign(state, premiumData, { currentUserId: userId });
      }
    },

    setPremiumStatus: (state, action) => {
      const {
        userId,
        isPremium,
        isPremiumProf,
        premiumType,
        premiumStatus,
        premiumStartDate,
        premiumEndDate,
        planDetails,
        trialUsed,
      } = action.payload;

      if (userId && state.currentUserId !== userId) {
        return;
      }

      state.isPremium = isPremium || false;
      state.isPremiumProf = isPremiumProf || false;
      state.premiumType = premiumType;
      state.premiumStatus = premiumStatus;
      state.premiumStartDate = premiumStartDate;
      state.premiumEndDate = premiumEndDate;
      state.planDetails = planDetails;
      state.trialUsed = trialUsed || state.trialUsed;
    },

    activatePremium: (state, action) => {
      const { premiumType, planDetails, userType, userId } = action.payload;

      if (userId && state.currentUserId !== userId) {
        return;
      }

      const startDate = new Date().toISOString();
      const endDate = new Date();

      if (premiumType === "Prueba") {
        endDate.setDate(endDate.getDate() + 7);
        state.premiumStatus = "trial";
        state.trialUsed = true;
      } else if (
        premiumType === "Mensual" ||
        premiumType === "estandar" ||
        premiumType === "plus"
      ) {
        endDate.setMonth(endDate.getMonth() + 1);
        state.premiumStatus = "active";
      } else if (premiumType === "Anual") {
        endDate.setFullYear(endDate.getFullYear() + 1);
        state.premiumStatus = "active";
      } else if (premiumType === "Empresarial") {
        endDate.setFullYear(endDate.getFullYear() + 1);
        state.premiumStatus = "active";
      }

      state.premiumType = premiumType;
      state.premiumStartDate = startDate;
      state.premiumEndDate = endDate.toISOString();
      state.planDetails = planDetails;
      state.pausedUntil = null;

      if (userType === "professional") {
        state.isPremiumProf = true;
      } else {
        state.isPremium = true;
      }
    },

    pausePremium: (state, action) => {
      const { pauseDuration = 6, userId } = action.payload;

      if (userId && state.currentUserId !== userId) {
        return;
      }

      const pausedUntil = new Date();
      pausedUntil.setMonth(pausedUntil.getMonth() + pauseDuration);

      state.premiumStatus = "paused";
      state.pausedUntil = pausedUntil.toISOString();
    },

    resumePremium: (state, action) => {
      const { userId } = action.payload || {};

      if (userId && state.currentUserId !== userId) {
        return;
      }

      state.premiumStatus =
        state.trialUsed && state.premiumType === "Prueba" ? "trial" : "active";
      state.pausedUntil = null;

      if (state.premiumEndDate) {
        const endDate = new Date(state.premiumEndDate);
        const pausedTime = state.pausedUntil
          ? new Date(state.pausedUntil) - new Date()
          : 0;
        if (pausedTime > 0) {
          endDate.setTime(endDate.getTime() + pausedTime);
          state.premiumEndDate = endDate.toISOString();
        }
      }
    },

    cancelPremium: (state, action) => {
      const { userId } = action.payload || {};

      if (userId && state.currentUserId !== userId) {
        return;
      }

      state.premiumStatus = "cancelled";
      state.isPremium = false;
      state.isPremiumProf = false;
      state.pausedUntil = null;
    },

    expirePremium: (state, action) => {
      const { userId } = action.payload || {};

      if (userId && state.currentUserId !== userId) {
        return;
      }

      state.premiumStatus = "expired";
      state.isPremium = false;
      state.isPremiumProf = false;
    },

    renewPremium: (state, action) => {
      const { premiumType, userId } = action.payload;

      if (userId && state.currentUserId !== userId) {
        return;
      }

      const startDate = new Date().toISOString();
      const endDate = new Date();

      if (premiumType === "Mensual") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (premiumType === "Anual") {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      state.premiumStatus = "active";
      state.premiumStartDate = startDate;
      state.premiumEndDate = endDate.toISOString();
      state.isPremium = true;
    },

    upgradeFromTrial: (state, action) => {
      const { premiumType, planDetails, userId } = action.payload;

      if (userId && state.currentUserId !== userId) {
        return;
      }

      const endDate = new Date();

      if (premiumType === "Mensual") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (premiumType === "Anual") {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      state.premiumType = premiumType;
      state.premiumStatus = "active";
      state.premiumEndDate = endDate.toISOString();
      state.planDetails = planDetails;
    },
  },
});

export const {
  resetPremiumState,
  initializePremiumForUser,
  setPremiumStatus,
  activatePremium,
  pausePremium,
  resumePremium,
  cancelPremium,
  expirePremium,
  renewPremium,
  upgradeFromTrial,
} = premiumSlice.actions;

export default premiumSlice.reducer;
