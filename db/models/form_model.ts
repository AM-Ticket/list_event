import { formModelSchema } from '../schemas/form_schema'
import { IFormSchema } from '../../interfaces/api/schema'
import { model, models } from 'mongoose'

export const FormModel =
	models.form_model || model<IFormSchema>('form_model', formModelSchema)
