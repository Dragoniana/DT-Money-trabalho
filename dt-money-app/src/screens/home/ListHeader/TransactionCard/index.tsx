import { useTransactionContext } from '@/context/transaction.context'
import { TransactionTypes } from '@/shared/enums/transactionTypes'
import { moneyMapper } from '@/shared/utils/moneyMapper'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { type FC } from 'react'
import { Text, View } from 'react-native'

import { cardData } from './strategies/cardDataStrategy'
import { icons } from './strategies/iconStrategy'

export type TransactionCardType = TransactionTypes | 'total'

interface TransactionCardProps {
  type: TransactionCardType
  amount: number
}

export const TransactionCard: FC<TransactionCardProps> = ({
  amount,
  type,
}) => {
  const { transactions } = useTransactionContext()

  const iconData = icons[type]
  const data = cardData[type]

  const lastTransaction =
    type !== 'total'
      ? transactions.find(
          ({ type: transactionType }) => transactionType.id === type,
        )
      : undefined

  const lastTransactionMessage = lastTransaction?.createdAt
    ? `Última ${data.label.toLowerCase()} em ${format(
        new Date(lastTransaction.createdAt),
        "d 'de' MMMM",
        {
          locale: ptBR,
        },
      )}`
    : 'Nenhuma transação encontrada'

  return (
    <View
      className={clsx(
        'mr-6 min-w-[280px] justify-between rounded-xl px-8 py-6',
        data.bgClass,
        {
          'mr-12': type === 'total',
        },
      )}
    >
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-base text-white">
          {data.label}
        </Text>

        <MaterialIcons
          name={iconData.name}
          color={iconData.color}
          size={26}
        />
      </View>

      <View>
        <Text className="text-2xl font-bold text-gray-400">
          R$ {moneyMapper(amount)}
        </Text>

        {type !== 'total' && (
          <Text className="text-gray-700">
            {lastTransactionMessage}
          </Text>
        )}
      </View>
    </View>
  )
}