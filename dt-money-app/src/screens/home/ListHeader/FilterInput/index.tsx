import {
  type TransactionFilters,
  useTransactionContext,
} from '@/context/transaction.context'
import { colors } from '@/shared/colors'
import { TransactionTypes } from '@/shared/enums/transactionTypes'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import {
  FlatList,
  Modal,
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
    categories,
    filters,
    setFilters,
  } = useTransactionContext()

  const { errorHandler } = useErrorHandler()

  const [text, setText] = useState(searchText)
  const [showModal, setShowModal] = useState(false)
  const [localFilters, setLocalFilters] =
    useState<TransactionFilters>(filters)

  const handleOpenModal = () => {
    setLocalFilters(filters)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSetType = (typeId: number) => {
    setLocalFilters((prevState) => ({
      ...prevState,
      typeId: prevState.typeId === typeId ? undefined : typeId,
    }))
  }

  const handleSetCategory = (categoryId: number) => {
    setLocalFilters((prevState) => ({
      ...prevState,
      categoryId:
        prevState.categoryId === categoryId ? undefined : categoryId,
    }))
  }

  const handleApplyFilters = () => {
    setFilters(localFilters)
    setShowModal(false)
  }

  const handleClearFilters = () => {
    setText('')
    setSearchText('')
    setLocalFilters({})
    setFilters({})
    setShowModal(false)
  }

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
  }, [searchText, filters, fetchTransactions, errorHandler])

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

      <View className="mt-6 flex-row items-center justify-between rounded-md bg-background-primary">
        <TextInput
          className="h-[50px] flex-1 pl-4 pr-14 text-lg text-white"
          placeholder="Busque uma transação"
          placeholderTextColor={colors.gray[600]}
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity
          className="absolute right-0 mr-3 h-[50px] w-[45px] items-center justify-center"
          onPress={handleOpenModal}
        >
          <MaterialIcons
            name="filter-list"
            color={colors['accent-brand-light']}
            size={26}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-end bg-black/60">
          <View className="rounded-t-3xl bg-background-secondary px-6 pb-8 pt-6">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">
                Filtrar transações
              </Text>

              <TouchableOpacity onPress={handleCloseModal}>
                <MaterialIcons
                  name="close"
                  color={colors.gray[700]}
                  size={24}
                />
              </TouchableOpacity>
            </View>

            <Text className="mb-3 text-base font-bold text-white">
              Tipo
            </Text>

            <View className="mb-6 flex-row gap-3">
              <TouchableOpacity
                className={clsx(
                  'h-[48px] flex-1 items-center justify-center rounded-lg',
                  localFilters.typeId === TransactionTypes.revenue
                    ? 'bg-accent-brand'
                    : 'bg-background-primary',
                )}
                onPress={() => handleSetType(TransactionTypes.revenue)}
              >
                <Text className="font-bold text-white">
                  Entrada
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={clsx(
                  'h-[48px] flex-1 items-center justify-center rounded-lg',
                  localFilters.typeId === TransactionTypes.expense
                    ? 'bg-accent-red'
                    : 'bg-background-primary',
                )}
                onPress={() => handleSetType(TransactionTypes.expense)}
              >
                <Text className="font-bold text-white">
                  Saída
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="mb-3 text-base font-bold text-white">
              Categoria
            </Text>

            <FlatList
              data={categories}
              keyExtractor={(item) => `filter-category-${item.id}`}
              className="max-h-[220px]"
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={clsx(
                    'mb-2 h-[45px] justify-center rounded-lg px-4',
                    localFilters.categoryId === item.id
                      ? 'bg-accent-brand'
                      : 'bg-background-primary',
                  )}
                  onPress={() => handleSetCategory(item.id)}
                >
                  <Text className="text-white">
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <View className="mt-6 flex-row gap-3">
              <TouchableOpacity
                className="h-[50px] flex-1 items-center justify-center rounded-xl border border-accent-brand"
                onPress={handleClearFilters}
              >
                <Text className="font-bold text-accent-brand">
                  Limpar filtro
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="h-[50px] flex-1 items-center justify-center rounded-xl bg-accent-brand"
                onPress={handleApplyFilters}
              >
                <Text className="font-bold text-white">
                  Filtrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}