import api from '@/lib/axios'

import type { CreateDirectionDto, UpdateDirectionDto, Direction } from '@/features/directions/types/direction'

export const getDirections =
  async (): Promise<Direction[]> => {

    const { data } =
      await api.get('/mis-direcciones')

    return data
  }

export const createDirection =
  async (
    payload: CreateDirectionDto
  ): Promise<Direction> => {

    const { data } =
      await api.post(
        '/mis-direcciones',
        payload
      )

    return data
  }

export const updateDirection =
  async (
    id: number,
    payload: UpdateDirectionDto
  ): Promise<Direction> => {

    const { data } =
      await api.patch(
        `/mis-direcciones/${id}`,
        payload
      )

    return data
  }

export const deleteDirection = 
  async (
    id: number
  ): Promise<void> => {
  await api.delete(`/mis-direcciones/${id}`)
}