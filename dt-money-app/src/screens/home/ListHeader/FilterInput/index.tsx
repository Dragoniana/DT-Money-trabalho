import { useTransactionContext } from '@/context/transaction.context'
import { colors } from '@/shared/colors'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export const FilterInput = () => {
  const {
    pagination,
    searchText,
    setSearchText,
    fetchTransactions,
  } = useTransactionContext()

  const { errorHandler } = useErrorHandler()

  const [text, setText] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(text)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [text, setSearchText])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTransactions({
          page: 1,
        })
      } catch (error) {
        errorHandler(error, 'Falha ao buscar transações')
      }
    }

    fetchData()
  }, [searchText])

  return (
    <View className="mb-3 mt-4 w-[90%] self-center">
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">
          Transações
        </Text>

        <Text className="text-base text-gray-700">
          {pagination.totalRows}{' '}
          {pagination.totalRows === 1 ? 'item' : 'itens'}
        </Text>
      </View>

      <TouchableOpacity className="mt-6 flex-row items-center justify-between">
        <TextInput
          className="h-[50px] w-full bg-background-primary pl-4 text-lg text-white"
          placeholder="Busque uma transação"
          placeholderTextColor={colors.gray[600]}
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity className="absolute right-0 mr-3">
          <MaterialIcons
            name="filter-list"
            color={colors['accent-brand-light']}
            size={26}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}