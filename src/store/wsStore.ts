import { create } from 'zustand'
import { wsService } from '@/services/websocket.service'
import type { WsMessage } from '@/services/websocket.service'

interface WsState {
  isConnected: boolean
  lastEvent: WsMessage | null
  connect: () => void
  disconnect: () => void
}

export const useWsStore = create<WsState>()((set) => ({
  isConnected: false,
  lastEvent: null,

  connect: () => {
    wsService.onOpenCallback = () => set({ isConnected: true })
    wsService.onCloseCallback = () => set({ isConnected: false })
    wsService.connect()
    set({ isConnected: wsService.isConnected })
  },

  disconnect: () => {
    wsService.onOpenCallback = null
    wsService.onCloseCallback = null
    wsService.disconnect()
    set({ isConnected: false })
  },
}))
