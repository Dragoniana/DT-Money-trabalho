import { colors } from '@/shared/colors'
import { TransactionTypes } from '@/shared/enums/transactionTypes'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { Text, TouchableOpacity, View } from 'react-native'

interface TransactionTypeSelectorProps {
  typeId: number
  setTransactionType: (type: TransactionTypes) => void
}

export const TransactionTypeSelector = ({
  typeId,
  setTransactionType,
}: TransactionTypeSelectorProps) => {
  return (
    <View className="mt-2 flex-row justify-between gap-2">
      <TouchableOpacity
        className={clsx(
          'h-[58px] flex-1 items-center justify-center rounded-lg p-2',
          {
            'bg-accent-brand': typeId === TransactionTypes.revenue,
            'bg-background-tertiary': typeId !== TransactionTypes.revenue,
          },
        )}
        onPress={() => setTransactionType(TransactionTypes.revenue)}
      >
        <MaterialIcons
          name="arrow-circle-up"
          color={
            typeId === TransactionTypes.revenue
              ? colors.white
              : colors['accent-brand-light']
          }
          size={30}
          className="mb-2"
        />

        <Text className="font-bold text-white">
          Entrada
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={clsx(
          'h-[58px] flex-1 items-center justify-center rounded-lg p-2',
          {
            'bg-accent-red': typeId === TransactionTypes.expense,
            'bg-background-tertiary': typeId !== TransactionTypes.expense,
          },
        )}
        onPress={() => setTransactionType(TransactionTypes.expense)}
      >
        <MaterialIcons
          name="arrow-circle-down"
          color={
            typeId === TransactionTypes.expense
              ? colors.white
              : colors['accent-red']
          }
          size={30}
          className="mb-2"
        />

        <Text className="font-bold text-white">
          Saída
        </Text>
      </TouchableOpacity>
    </View>
  )
}