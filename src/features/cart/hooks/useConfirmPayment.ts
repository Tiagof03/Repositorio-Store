import { useMutation } from '@tanstack/react-query'
import { confirmarPago } from '@/features/cart/services/paymentService'

export const useConfirmPayment = () =>
    useMutation({
        mutationFn: ({
            pedidoId,
            paymentId,
        }: {
            pedidoId: number
            paymentId: number
        }) => confirmarPago(pedidoId, paymentId),
    })