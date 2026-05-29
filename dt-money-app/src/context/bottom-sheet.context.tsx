import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { View } from 'react-native'

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void
  closeBottomSheet: () => void
}

export const BottomSheetContext = createContext({} as BottomSheetContextType)

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [content, setContent] = useState<React.ReactNode | null>(null)

  const snapPoints = useMemo(() => ['55%', '85%'], [])

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setContent(newContent)

      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index)
      })
    },
    [],
  )

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      <View className="flex-1">
        {children}

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={{
            backgroundColor: '#202024',
          }}
          handleIndicatorStyle={{
            backgroundColor: '#7C7C8A',
          }}
          onClose={() => setContent(null)}
        >
          <BottomSheetView>
            {content}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </BottomSheetContext.Provider>
  )
}

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext)

  return context
}