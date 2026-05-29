import { dtMoneyApi } from '@/shared/api/dtmoney'
import {
  type CreateTransactionRequest,
  type UpdateTransactionRequest,
} from '@/shared/interfaces/http/createTransactionRequest'
import { type GetTransactionsParams } from '@/shared/interfaces/http/get-transactions-request'
import { type GetTransactionsResponse } from '@/shared/interfaces/http/get-transactions-response'
import { type TransactionCategory } from '@/shared/interfaces/http/transaction-category-response'
import qs from 'qs'

export const getTransactionCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    '/transaction/categories',
  )

  return data
}

export const createTransaction = async (
  transaction: CreateTransactionRequest,
): Promise<void> => {
  await dtMoneyApi.post('/transaction', transaction)
}

export const getTransactions = async (
  params: GetTransactionsParams,
): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionsResponse>(
    '/transaction',
    {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          arrayFormat: 'repeat',
        }),
    },
  )

  return data
}

export const deleteTransaction = async (
  transactionId: number,
): Promise<void> => {
  await dtMoneyApi.delete(`/transaction/${transactionId}`)
}

export const updateTransaction = async (
  transaction: UpdateTransactionRequest,
): Promise<void> => {
  await dtMoneyApi.put('/transaction', transaction)
}