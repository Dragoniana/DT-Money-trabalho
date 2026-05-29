import { TransactionTypes } from '@/shared/enums/transactionTypes'

import { type TransactionCardType } from '..'

interface CardData {
  label: string
  bgClass: string
}

export const cardData: Record<TransactionCardType, CardData> = {
  [TransactionTypes.expense]: {
    label: 'Saída',
    bgClass: 'bg-background-tertiary',
  },
  [TransactionTypes.revenue]: {
    label: 'Entrada',
    bgClass: 'bg-background-tertiary',
  },
  total: {
    label: 'Total',
    bgClass: 'bg-accent-brand-background-primary',
  },
}