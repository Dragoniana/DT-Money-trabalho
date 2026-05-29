import { colors } from '@/shared/colors'
import { TransactionTypes } from '@/shared/enums/transactionTypes'
import { type Transaction } from '@/shared/interfaces/transaction'
import { moneyMapper } from '@/shared/utils/moneyMapper'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { format } from 'date-fns'
import { type FC } from 'react'
import { Text, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

import { LeftAction } from './LeftAction'
import { RightAction } from './RightAction'

interface TransactionCardParams {
  transaction: Transaction
}

export const TransactionCard: FC<TransactionCardParams> = ({
  transaction,
}) => {
  const isExpense = transaction.type.id === TransactionTypes.expense

  return (
    <Swipeable
      containerStyle={{
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'visible',
        width: '90%',
      }}
      renderRightActions={() => (
        <RightAction transactionId={transaction.id} />
      )}
      renderLeftActions={() => (
        <LeftAction transaction={transaction} />
      )}
      friction={0.8}
      overshootRight={false}
      overshootLeft={false}
    >
      <View className="mb-4 h-[140px] w-full rounded-xl bg-background-tertiary p-6">
        <Text className="text-base text-white">
          {transaction.description}
        </Text>

        <Text
          className={clsx(
            'mt-2 text-2xl font-bold',
            isExpense ? 'text-accent-red' : 'text-accent-brand-light',
          )}
        >
          {isExpense && '- '}
          R$ {moneyMapper(transaction.value)}
        </Text>

        <View className="w-full flex-row justify-between">
          <View className="mt-3 flex-row items-center">
            <MaterialIcons
              name="label-outline"
              color={colors.gray[700]}
              size={23}
            />

            <Text className="ml-2 text-base text-gray-700">
              {transaction.category.name}
            </Text>
          </View>

          <View className="mt-3 flex-row items-center">
            <MaterialIcons
              name="calendar-today"
              color={colors.gray[700]}
              size={20}
            />

            <Text className="ml-2 text-base text-gray-700">
              {format(new Date(transaction.createdAt), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  )
}