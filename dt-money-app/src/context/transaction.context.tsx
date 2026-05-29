import {
  type CreateTransactionRequest,
  type UpdateTransactionRequest,
} from '@/shared/interfaces/http/createTransactionRequest'
import { type Pagination } from '@/shared/interfaces/http/get-transactions-request'
import { type TransactionCategory } from '@/shared/interfaces/http/transaction-category-response'
import { type TotalTransactions } from '@/shared/interfaces/total-transactions'
import { type Transaction } from '@/shared/interfaces/transaction'
import * as TransactionService from '@/shared/services/dtMoney/transaction.service'
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

interface FetchTransactionsParams {
  page: number
}

interface Loadings {
  initial: boolean
  refresh: boolean
  loadMore: boolean
}

interface HandleLoadingsParams {
  key: keyof Loadings
  value: boolean
}

type TransactionContextType = {
  fetchCategories: () => Promise<void>
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>
  refreshTransactions: () => Promise<void>
  loadMoreTransactions: () => Promise<void>
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>
  categories: TransactionCategory[]
  transactions: Transaction[]
  totalTransactions: TotalTransactions
  pagination: Pagination
  loadings: Loadings
  handleLoadings: (params: HandleLoadingsParams) => void
  searchText: string
  setSearchText: (text: string) => void
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchText, setSearchText] = useState('')

  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  })

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  })

  const [totalTransactions, setTotalTransactions] =
    useState<TotalTransactions>({
      expense: 0,
      revenue: 0,
      total: 0,
    })

  const handleLoadings = ({ key, value }: HandleLoadingsParams) => {
    setLoadings((prevValues) => ({
      ...prevValues,
      [key]: value,
    }))
  }

  const fetchCategories = async () => {
    const categoriesResponse =
      await TransactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  const fetchTransactions = useCallback(
    async ({ page }: FetchTransactionsParams) => {
      const transactionResponse = await TransactionService.getTransactions({
        page,
        perPage: pagination.perPage,
        searchText,
      })

      if (page === 1) {
        setTransactions(transactionResponse.data)
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionResponse.data,
        ])
      }

      setTotalTransactions(transactionResponse.totalTransactions)

      setPagination((prevState) => ({
        ...prevState,
        page,
        totalRows: transactionResponse.totalRows,
        totalPages: transactionResponse.totalPages,
      }))
    },
    [pagination.perPage, searchText],
  )

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination

    const transactionResponse = await TransactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
      searchText,
    })

    setTransactions(transactionResponse.data)
    setTotalTransactions(transactionResponse.totalTransactions)

    setPagination((prevState) => ({
      ...prevState,
      page,
      totalRows: transactionResponse.totalRows,
      totalPages: transactionResponse.totalPages,
    }))
  }, [pagination, searchText])

  const loadMoreTransactions = useCallback(async () => {
    if (
      loadings.loadMore ||
      pagination.page >= pagination.totalPages
    ) {
      return
    }

    await fetchTransactions({
      page: pagination.page + 1,
    })
  }, [
    loadings.loadMore,
    pagination.page,
    pagination.totalPages,
    fetchTransactions,
  ])

  const createTransaction = async (
    transaction: CreateTransactionRequest,
  ) => {
    await TransactionService.createTransaction(transaction)

    await refreshTransactions()
  }

  const updateTransaction = async (
    transaction: UpdateTransactionRequest,
  ) => {
    await TransactionService.updateTransaction(transaction)

    await refreshTransactions()
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        transactions,
        totalTransactions,
        pagination,
        loadings,
        handleLoadings,
        searchText,
        setSearchText,
        fetchCategories,
        fetchTransactions,
        refreshTransactions,
        loadMoreTransactions,
        createTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)

  return context
}