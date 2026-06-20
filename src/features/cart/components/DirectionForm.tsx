import { useState } from 'react'
import type { Direction } from '@/features/directions/types/direction'

interface DirectionFormProps {
  directions: Direction[] | undefined
  selectedDirection: number
  onDirectionChange: (id: number) => void
  onSave: (data: DirectionFormData) => void
  isSaving: boolean
  onUpdate: (id: number, data: DirectionFormData) => void
  isUpdating: boolean
}

export interface DirectionFormData {
  alias: string
  linea1: string
  linea2: string
  ciudad: string
  provincia: string
  codigo_postal: string
}

export default function DirectionForm({ directions, selectedDirection, onDirectionChange, onSave, isSaving, onUpdate, isUpdating }: DirectionFormProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [linea1, setLinea1] = useState('')
  const [linea2, setLinea2] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [provincia, setProvincia] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')

  const resetForm = () => {
    setLinea1('')
    setLinea2('')
    setCiudad('')
    setProvincia('')
    setCodigoPostal('')
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = () => {
    const dir = directions?.find((d) => d.id === selectedDirection)
    if (!dir) return
    setLinea1(dir.linea1)
    setLinea2(dir.linea2 ?? '')
    setCiudad(dir.ciudad)
    setProvincia(dir.provincia)
    setCodigoPostal(dir.codigo_postal)
    setEditingId(dir.id)
    setShowForm(true)
  }

  const handleSave = () => {
    const data: DirectionFormData = { alias: linea1, linea1, linea2, ciudad, provincia, codigo_postal: codigoPostal }
    if (editingId !== null) {
      onUpdate(editingId, data)
    } else {
      onSave(data)
    }
    resetForm()
  }

  return (
    <>
      <div className='space-y-3'>
        <label className='block text-sm font-bold uppercase tracking-[0.2em] text-primary'>Dirección</label>
        <div className='flex gap-2'>
          <select value={selectedDirection} onChange={(e) => onDirectionChange(Number(e.target.value))}
            className='flex-1 border border-outline-variant/30 bg-surface-container-high px-4 py-4 text-on-surface outline-none'>
            {directions?.map((direction) => (
              <option key={direction.id} value={direction.id}>
                {direction.linea1}
              </option>
            ))}
          </select>
          {directions && directions.length > 0 && selectedDirection > 0 && (
            <button type='button' onClick={handleEdit}
              className='border border-outline-variant/30 px-4 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant transition hover:border-primary hover:text-primary cursor-pointer'>
              Editar
            </button>
          )}
        </div>
      </div>

      {!showForm ? (
        <button type='button' onClick={() => setShowForm(true)}
          className='w-full border border-outline-variant/30 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant transition hover:border-primary hover:text-primary cursor-pointer'>
          + Agregar dirección
        </button>
      ) : (
        <div className='space-y-4 border border-outline-variant/20 bg-surface-container-high p-4'>
          <h3 className='text-sm font-bold uppercase tracking-[0.2em] text-primary'>{editingId ? 'Editar dirección' : 'Nueva dirección'}</h3>

          <input type='text' placeholder='Dirección' value={linea1} onChange={(e) => setLinea1(e.target.value)}
            className='w-full border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none' />
          <input type='text' placeholder='Línea 2 (opcional)' value={linea2} onChange={(e) => setLinea2(e.target.value)}
            className='w-full border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none' />
          <input type='text' placeholder='Ciudad' value={ciudad} onChange={(e) => setCiudad(e.target.value)}
            className='w-full border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none' />
          <input type='text' placeholder='Provincia' value={provincia} onChange={(e) => setProvincia(e.target.value)}
            className='w-full border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none' />
          <input type='text' placeholder='Código Postal' value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)}
            className='w-full border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none' />

          <div className='flex gap-3'>
            <button type='button' onClick={resetForm}
              className='flex-1 border border-outline-variant/30 py-3 text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant transition hover:border-primary cursor-pointer'>
              Cancelar
            </button>
            <button type='button' onClick={handleSave} disabled={isSaving || isUpdating}
              className='flex-1 border border-primary py-3 text-sm font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-on-primary disabled:opacity-50 cursor-pointer'>
              {isSaving || isUpdating ? (isUpdating ? 'Actualizando...' : 'Guardando...') : editingId ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
