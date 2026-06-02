import { useState } from 'react'
import type { Direction } from '@/features/directions/types/direction'

interface DirectionFormProps {
  directions: Direction[] | undefined
  selectedDirection: number
  onDirectionChange: (id: number) => void
  onSave: (data: DirectionFormData) => void
  isSaving: boolean
}

export interface DirectionFormData {
  alias: string
  linea1: string
  linea2: string
  ciudad: string
  provincia: string
  codigo_postal: string
}

export default function DirectionForm({ directions, selectedDirection, onDirectionChange, onSave, isSaving }: DirectionFormProps) {
  const [alias, setAlias] = useState('')
  const [linea1, setLinea1] = useState('')
  const [linea2, setLinea2] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [provincia, setProvincia] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')

  const handleSave = () => {
    onSave({ alias, linea1, linea2, ciudad, provincia, codigo_postal: codigoPostal })
    setAlias('')
    setLinea1('')
    setLinea2('')
    setCiudad('')
    setProvincia('')
    setCodigoPostal('')
  }

  return (
    <>
      <div className='space-y-4 border border-outline-variant/30 bg-surface-container-high p-4'>
        <h3 className='text-label-md text-primary font-bold uppercase tracking-wider'>Nueva dirección</h3>

        <input type='text' placeholder='Alias' value={alias} onChange={(e) => setAlias(e.target.value)}
          className='w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40' />
        <input type='text' placeholder='Dirección' value={linea1} onChange={(e) => setLinea1(e.target.value)}
          className='w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40' />
        <input type='text' placeholder='Línea 2 (opcional)' value={linea2} onChange={(e) => setLinea2(e.target.value)}
          className='w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40' />
        <input type='text' placeholder='Ciudad' value={ciudad} onChange={(e) => setCiudad(e.target.value)}
          className='w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40' />
        <input type='text' placeholder='Provincia' value={provincia} onChange={(e) => setProvincia(e.target.value)}
          className='w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40' />
        <input type='text' placeholder='Código Postal' value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)}
          className='w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40' />

        <button type='button' onClick={handleSave} disabled={isSaving}
          className='w-full border border-primary text-primary text-label-md font-bold uppercase tracking-wider py-3 hover:bg-primary hover:text-on-primary transition-all cursor-pointer'>
          {isSaving ? 'Guardando...' : 'Guardar dirección'}
        </button>
      </div>

      <div className='space-y-3'>
        <label className='block text-label-md text-primary font-bold uppercase tracking-wider'>Dirección</label>
        <select value={selectedDirection} onChange={(e) => onDirectionChange(Number(e.target.value))}
          className='w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary'>
          {directions?.map((direction) => (
            <option key={direction.id} value={direction.id}>
              {direction.alias} - {direction.linea1}
            </option>
          ))}
        </select>
      </div>
    </>
  )

}
