import api from '@/lib/axios'

import type {
  CreateDirectionDto,
  Direction,
} from '@/features/directions/types/direction'

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