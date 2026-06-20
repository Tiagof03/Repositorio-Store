import { create } from 'zustand'

type PaymentStatus = 'idle' | 'processing' | 'approved' | 'rejected' | 'error'

interface PaymentState {
  status: PaymentStatus
  paymentId: string | null
  orderId: number | null
  errorMessage: string | null
  startPayment: (orderId: number) => void
  approvePayment: (paymentId: string) => void
  rejectPayment: (error: string) => void
  resetPayment: () => void
}

export const usePaymentStore = create<PaymentState>()((set) => ({
  status: 'idle',
  paymentId: null,
  orderId: null,
  errorMessage: null,

  startPayment: (orderId) => set({
    status: 'processing',
    orderId,
    paymentId: null,
    errorMessage: null,
  }),

  approvePayment: (paymentId) => set({
    status: 'approved',
    paymentId,
    errorMessage: null,
  }),

  rejectPayment: (error) => set({
    status: 'rejected',
    errorMessage: error,
  }),

  resetPayment: () => set({
    status: 'idle',
    paymentId: null,
    orderId: null,
    errorMessage: null,
  }),
}))
