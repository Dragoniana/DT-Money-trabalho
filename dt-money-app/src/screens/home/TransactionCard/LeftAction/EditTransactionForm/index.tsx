import { AppButton } from '@/components/AppButton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { SelectCategoryModal } from '@/components/SelectCategoryModal'
import { TransactionTypeSelector } from '@/components/TransactionTypeSelector'
import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { useTransactionContext } from '@/context/transaction.context'
import { colors } from '@/shared/colors'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { type UpdateTransactionRequest } from '@/shared/interfaces/http/createTransactionRequest'
import { type Transaction } from '@/shared/interfaces/transaction'
import { MaterialIcons } from '@expo/vector-icons'
import { type FC, useState } from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import * as yup from 'yup'

import { transactionSchema } from './schema'

type ValidationErrorsTypes = Partial<
  Record<keyof UpdateTransactionRequest, string>
>

interface EditTransactionFormProps {
  transaction: Transaction
}

export const EditTransactionForm: FC<EditTransactionFormProps> = ({
  transaction: transactionToUpdate,
}) => {
  const { closeBottomSheet } = useBottomSheetContext()
  const { updateTransaction } = useTransactionContext()
  const { errorHandler } = useErrorHandler()

  const [loading, setLoading] = useState(false)

  const [transaction, setTransaction] =
    useState<UpdateTransactionRequest>({
      id: transactionToUpdate.id,
      description: transactionToUpdate.description,
      typeId: transactionToUpdate.typeId,
      categoryId: transactionToUpdate.categoryId,
      value: transactionToUpdate.value,
    })

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsTypes>({})

  const setTransactionData = (
    key: keyof UpdateTransactionRequest,
    value: string | number,
  ) => {
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleUpdateTransaction = async () => {
    try {
      setLoading(true)

      await transactionSchema.validate(transaction, {
        abortEarly: false,
      })

      setValidationErrors({})

      await updateTransaction(transaction)

      closeBottomSheet()
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: ValidationErrorsTypes = {}

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof UpdateTransactionRequest] =
              err.message
          }
        })

        setValidationErrors(errors)
      } else {
        errorHandler(error, 'Falha ao atualizar transação')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="px-8">
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">
          Editar transação
        </Text>

        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons
            name="close"
            color={colors.gray[700]}
            size={20}
          />
        </TouchableOpacity>
      </View>

      <View className="mb-8 mt-8 flex-1">
        <TextInput
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData('description', text)}
        />

        {validationErrors.description && (
          <ErrorMessage>
            {validationErrors.description}
          </ErrorMessage>
        )}

        <CurrencyInput
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData('value', value ?? 0)}
        />

        {validationErrors.value && (
          <ErrorMessage>
            {validationErrors.value}
          </ErrorMessage>
        )}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData('categoryId', categoryId)
          }
        />

        {validationErrors.categoryId && (
          <ErrorMessage>
            {validationErrors.categoryId}
          </ErrorMessage>
        )}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) =>
            setTransactionData('typeId', typeId)
          }
        />

        {validationErrors.typeId && (
          <ErrorMessage>
            {validationErrors.typeId}
          </ErrorMessage>
        )}

        <View>
          <AppButton
            disabled={loading}
            onPress={handleUpdateTransaction}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              'Atualizar'
            )}
          </AppButton>
        </View>
      </View>
    </View>
  )
}