import api from '@/lib/axios'

export async function crearPago(pedidoId: number) {
    const { data } = await api.post('/pagos/crear', { pedido_id: pedidoId })
    return data
}

export async function confirmarPago(pedidoId: number, paymentId: number) {
    const { data } = await api.post('/pagos/confirm', {
        pedido_id: pedidoId,
        payment_id: paymentId,
    })
    return data
}