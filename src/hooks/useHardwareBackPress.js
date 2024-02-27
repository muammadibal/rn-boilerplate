import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useHardwareBackPress = (onBack) => {
  
  const navigator = useNavigation()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (onBack) {
          onBack();
        } else {
          navigator.goBack();
        }
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigator]);
};

export default useHardwareBackPress;
