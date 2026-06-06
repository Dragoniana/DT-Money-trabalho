export interface GetTransactionsParams {
  page: number
  perPage: number
  from?: Date
  to?: Date
  typeId?: number
  categoryIds?: number[]
  searchText?: string
}

export interface Pagination {
  page: number
  perPage: number
  totalRows?: number
  totalPages: number
}