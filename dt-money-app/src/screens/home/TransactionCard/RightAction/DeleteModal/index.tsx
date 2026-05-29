import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { type FC } from 'react'
import {
  ActivityIndicator,
  GestureResponderEvent,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

interface DeleteModalProps {
  visible: boolean
  hideModal: () => void
  handleDeleteTransaction: () => void
  loading: boolean
}

export const DeleteModal: FC<DeleteModalProps> = ({
  visible,
  hideModal,
  handleDeleteTransaction,
  loading,
}) => {
  function handleContentPress(event: GestureResponderEvent) {
    event.stopPropagation()
  }

  return (
    <View className="absolute flex-1">
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={handleContentPress}>
              <View className="m-5 h-[322px] w-[90%] items-center rounded-[16px] bg-background-secondary p-8 shadow-lg">
                <View className="w-full flex-row items-center justify-between border-b border-gray-300 pb-6">
                  <View className="flex-row items-center gap-6">
                    <MaterialIcons
                      name="error-outline"
                      color={colors.gray[400]}
                      size={25}
                    />

                    <Text className="text-xl text-white">
                      Apagar transação
                    </Text>
                  </View>

                  <TouchableOpacity onPress={hideModal}>
                    <MaterialIcons
                      name="close"
                      color={colors.gray[800]}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex-1 items-center justify-center border-b border-gray-300 p-3">
                  <Text className="text-lg leading-8 text-gray-500">
                    Tem certeza que deseja apagar essa transação? Esta ação não
                    pode ser desfeita.
                  </Text>
                </View>

                <View className="w-full flex-row justify-end gap-4 p-6 pb-0 pr-0">
                  <TouchableOpacity
                    className="w-[100px] items-center justify-center rounded-xl border-2 border-accent-brand p-3"
                    onPress={hideModal}
                    disabled={loading}
                  >
                    <Text className="text-accent-brand">
                      Cancelar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="w-[100px] items-center justify-center rounded-xl bg-accent-red-background-primary p-3"
                    onPress={handleDeleteTransaction}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color={colors.white} />
                    ) : (
                      <Text className="text-white">
                        Apagar
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}