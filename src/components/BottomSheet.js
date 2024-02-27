import { StyleSheet, Pressable, Image, Text, View, Modal, TouchableWithoutFeedback, Dimensions, Animated, PanResponder, } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App'
import { GAP_SIZE, color, titleStyle } from '../utils/constant'
import { moderateScale } from 'react-native-size-matters'

const BottomSheet = forwardRef(({children, onPressClose, onPressBack, title, isCenterTitle, renderTitle, height = .7}, ref) => {
    const {height: screenHeight} = Dimensions.get("window")
    const panY = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
        isOpen: () => visible
    }))

    const panResponder = useRef(
        PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dy > 0) {
                panY.setValue(gestureState.dy);
            }
        },
        onPanResponderRelease: (e, gestureState) => {
            // console.log("gestureState.dy", gestureState.dy)
            if (gestureState.dy > 0) {
                if (gestureState.dy > 50) {
                setVisible(false)
                    Animated.timing(panY, {
                        toValue: screenHeight,
                        duration: 300,
                        useNativeDriver: false,
                    }).start(({ finished }) => {
                        panY.setValue(0)
                    });
                } else {
                Animated.timing(panY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
                }
            }
        },
        })
    ).current;
    
    return (
        <Modal ref={ref} animationType='slide' transparent statusBarTranslucent visible={visible}>
            <TouchableWithoutFeedback onPress={e => {
                if (e.target === e.currentTarget) {
                    setVisible(false)
                }
            }}>
                <View style={{  
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <Toast config={toastConfig}/>
                        <Animated.View 
                        {...panResponder.panHandlers}
                        style={{
                            height: screenHeight * height,
                            transform: [{ translateY: panY }],
                            backgroundColor: 'white',
                            paddingTop: 16,
                            paddingHorizontal: 16,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16, }}
                        >
                            <View style={{width: moderateScale(70), height: moderateScale(5), borderRadius: moderateScale(5), backgroundColor: color.primary.grey[600], alignSelf: 'center', marginTop: moderateScale(-5), opacity: .4}}/>
                            
                            {title && <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginBottom: GAP_SIZE}}>
                                {onPressBack && <Pressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={onPressBack}><Image source={require('../assets/img/icon/arrowback-black.png')} style={{height: 22, width: 22}}/></Pressable>}
                                
                                {renderTitle ? <>{renderTitle}</> : <Text style={[titleStyle, {flex: 1, textTransform: "uppercase", fontWeight: "bold",textAlign: isCenterTitle ? "center" : "left", marginLeft: onPressBack ? 10 : 0}]}>{title}</Text>}

                                {onPressClose ? <Pressable style={{flex: 0.1}} onPress={onPressClose}>
                                    <Image source={require('../assets/img/icon/close2.png')} />
                                </Pressable> : <View style={{flex: 0.1}}/>}
                            </View>}
                            {children}
                        </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
})

export default BottomSheet

const styles = StyleSheet.create({})