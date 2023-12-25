import { create } from 'zustand'

export const useStore = create((set) => ({
    chatHistory: {
        channelId: null,
        messages: [],
    },
    setChatHistory: (chatHistory) => set({ chatHistory }),

}))