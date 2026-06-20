import { create } from 'zustand'

interface UiState {
  confirmCancelId: number | null
  setConfirmCancelId: (id: number | null) => void
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUiStore = create<UiState>()((set) => ({
  confirmCancelId: null,
  setConfirmCancelId: (id) => set({ confirmCancelId: id }),
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}))
