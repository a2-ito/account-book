export interface IAccountRequestModel {
  amount: number
  typeId: number
  categoryId: number
  memo?: string
  dateOfUse: Date
}

export interface ICategoryResponseModel {
  id: number
  name: string
}

export interface IAccountResponseModel {
  id: number
  amount: number
  typeId: number
  categoryId: number
  memo?: string
  dateOfUse: Date
  createdAt: string
  updatedAt: string
}
