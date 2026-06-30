import { useMutation } from '@tanstack/react-query'
import { crearPago } from '@/features/cart/services/paymentService'

export const useCreatePayment = () =>
    useMutation({
        mutationFn: (pedidoId: number) => crearPago(pedidoId),
    })