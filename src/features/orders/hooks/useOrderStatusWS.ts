import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { wsService } from '@/services/websocket.service'
import { useWsStore } from '@/store/wsStore'
import { queryKeys } from '@/lib/queryKeys'

export function useOrderStatusWS(pedidoId?: number) {
  const queryClient = useQueryClient()
  const disconnect = useWsStore((s) => s.disconnect)

  useEffect(() => {
    wsService.onOpenCallback = () => {
      useWsStore.setState({ isConnected: true })
      queryClient.invalidateQueries({ queryKey: queryKeys.orders })
    }
    wsService.onCloseCallback = () => useWsStore.setState({ isConnected: false })
    wsService.connect(pedidoId)

    const unsubscribe = wsService.onMessage((msg) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders })
      if (pedidoId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.order(pedidoId) })
      }
      useWsStore.setState({ lastEvent: msg })
    })

    return () => {
      unsubscribe()
      disconnect()
    }
  }, [disconnect, queryClient, pedidoId])
}
