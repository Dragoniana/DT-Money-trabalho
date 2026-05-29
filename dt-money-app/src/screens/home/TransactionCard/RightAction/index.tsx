import { useSnackbarContext } from '@/context/snackbar.context'
import { useTransactionContext } from '@/context/transaction.context'
import { colors } from '@/shared/colors'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import * as TransactionService from '@/shared/services/dtMoney/transaction.service'
import { MaterialIcons } from '@expo/vector-icons'
import { type FC, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { DeleteModal } from './DeleteModal'

interface RightActionProps {
  transactionId: number
}

export const RightAction: FC<RightActionProps> = ({ transactionId }) => {
  const { errorHandler } = useErrorHandler()
  const { notify } = useSnackbarContext()
  const { refreshTransactions } = useTransactionContext()

  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  function showModal() {
    setModalVisible(true)
  }

  function hideModal() {
    setModalVisible(false)
  }

  async function handleDeleteTransaction() {
    try {
      setLoading(true)

      await TransactionService.deleteTransaction(transactionId)

      await refreshTransactions()

      notify({
        message: 'Transação deletada com sucesso',
        messageType: 'success',
      })

      hideModal()
    } catch (error) {
      errorHandler(error, 'Falha ao deletar a transação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TouchableOpacity
        className="h-[140px] w-[80px] items-center justify-center rounded-r-xl bg-accent-red-background-primary"
        onPress={showModal}
      >
        <MaterialIcons
          name="delete-outline"
          color={colors.white}
          size={30}
        />
      </TouchableOpacity>

      <DeleteModal
        visible={modalVisible}
        hideModal={hideModal}
        handleDeleteTransaction={handleDeleteTransaction}
        loading={loading}
      />
    </>
  )
}