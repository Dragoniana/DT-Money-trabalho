import { useTransactionContext } from '@/context/transaction.context'
import clsx from 'clsx'
import Checkbox from 'expo-checkbox'
import { type FC, useMemo, useState } from 'react'
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

interface SelectCategoryModalProps {
  selectedCategory: number
  onSelect: (categoryId: number) => void
}

export const SelectCategoryModal: FC<SelectCategoryModalProps> = ({
  selectedCategory,
  onSelect,
}) => {
  const { categories } = useTransactionContext()

  const [showModal, setShowModal] = useState(false)

  const selected = useMemo(
    () => categories.find((category) => category.id === selectedCategory),
    [categories, selectedCategory],
  )

  const handleModal = () => {
    setShowModal((prevState) => !prevState)
  }

  const handleSelect = (categoryId: number) => {
    onSelect(categoryId)
    setShowModal(false)
  }

  return (
    <>
      <TouchableOpacity
        className="my-2 h-[50px] justify-center rounded-md bg-background-primary pl-4"
        onPress={handleModal}
      >
        <Text
          className={clsx(
            'text-lg',
            selected ? 'text-white' : 'text-gray-700',
          )}
        >
          {selected?.name || 'Categoria'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={handleModal}
      >
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="max-h-[70%] w-[90%] rounded-xl bg-background-secondary p-4">
            <Text className="mb-4 text-lg text-white">
              Selecione uma categoria
            </Text>

            <FlatList
              data={categories}
              keyExtractor={(item) => `category-${item.id}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="mb-2 flex-row items-center rounded-lg bg-gray-800 p-4"
                  onPress={() => handleSelect(item.id)}
                >
                  <Checkbox
                    value={selected?.id === item.id}
                    onValueChange={() => handleSelect(item.id)}
                    style={{ marginRight: 8 }}
                  />

                  <Text className="text-center text-lg text-white">
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}