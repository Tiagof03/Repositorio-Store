export interface Direction {

  id: number

  alias: string

  linea1: string

  linea2: string

  ciudad: string

  provincia: string

  codigo_postal: string

  latitud: number

  longitud: number

  es_principal: boolean

}

export interface CreateDirectionDto {

  alias: string

  linea1: string

  linea2: string

  ciudad: string

  provincia: string

  codigo_postal: string

  latitud: number

  longitud: number

  es_principal: boolean

}