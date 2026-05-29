import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { colors } from '@/shared/colors'
import { type Transaction } from '@/shared/interfaces/transaction'
import { MaterialIcons } from '@expo/vector-icons'
import { type FC } from 'react'
import { View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'

import { EditTransactionForm } from './EditTransactionForm'

interface LeftActionProps {
  transaction: Transaction
}

export const LeftAction: FC<LeftActionProps> = ({ transaction }) => {
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <Pressable
      onPress={() =>
        openBottomSheet(
          <EditTransactionForm transaction={transaction} />,
          1,
        )
      }
    >
      <View className="h-[140px] w-[80px] items-center justify-center rounded-l-xl bg-accent-blue-dark">
        <MaterialIcons
          name="edit"
          size={30}
          color={colors.white}
        />
      </View>
    </Pressable>
  )
}