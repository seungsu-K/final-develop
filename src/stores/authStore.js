import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearAuth: () => set({ user: null, token: null }),
}));

export const useSignupStore = create((set, get) => ({
  email: '',
  setEmail: (email) => set({ email }),
  password: '',
  setPassword: (password) => set({ password }),
  passwordConfirm: '',
  setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
  verificationCode: '',
  setVerificationCode: (verificationCode) => set({ verificationCode }),

  nickname: '',
  setNickname: (nickname) => set({ nickname }),

  agreeToTerms: { all: false, terms: false, privacy: false, age: false },
  setAgreeToTerms: (updater) =>
    set((state) => ({
      agreeToTerms:
        typeof updater === 'function'
          ? updater(state.agreeToTerms)
          : { ...state.agreeToTerms, ...updater },
    })),

  isPasswordMatching: () => {
    const { password, passwordConfirm } = get();
    return password === passwordConfirm && password.length > 0;
  },

  isNextEnabled: () => {
    const { password, passwordConfirm } = get();
    return password === passwordConfirm && password.length > 0;
  },
}));

export const useInputValue = create((set) => ({
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
  clearInputValue: () => set({ inputValue: '' }),
}));

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const useLoginForm = create((set, get) => ({
  email: '',
  password: '',
  isEmailValid: false,
  setEmail: (email) => {
    set({
      email,
      isEmailValid: isValidEmail(email),
    });
  },
  setPassword: (password) => set({ password }),
  isFormValid: () => {
    const { email, password, isEmailValid } = get();
    return isEmailValid && email.trim() !== '' && password.trim() !== '';
  },
  clearForm: () => set({ email: '', password: '', isEmailValid: false }),
}));
