import { validateOrReject } from 'class-validator'

export async function validadeObject(object: any) {
  try {
    await validateOrReject(object)
  } catch (error) {
    error.message = 'validation-error'
    throw error
  }
}
