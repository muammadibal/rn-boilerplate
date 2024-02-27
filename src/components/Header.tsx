import React from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import useHardwareBackPress from '../hooks/useHardwareBackPress';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isTabActive, tabs } from '../navigation';
import { theme } from '../utils/constant';
import { appSelector } from '../redux/reducers';
import { useAppSelector } from '../redux/hooks';

interface IActions {
    icon: any;
    onPress: (((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void) & (() => void) & ((e: GestureResponderEvent) => void)) | undefined
}
type TypeHeader = {
    onBack?: (((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void) & (() => void) & ((e: GestureResponderEvent) => void)) | undefined
    title: string;
    actions?: IActions[]
}

const Header = ({onBack, title, actions}: TypeHeader) => {
    const {theme: appTheme} = useAppSelector(appSelector)
    const backBtnBgColor = appTheme === 'dark' ? "#292929": theme.background.light
    const backgroundColor = appTheme === 'dark' ? theme.background.dark : theme.background.light
    const navigation = useNavigation()
    const route = useRoute()
    const isMainApp = tabs.find(v => v.name === route.name)

    return (
        <Appbar.Header mode='center-aligned' style={{ backgroundColor }}>
        {isMainApp ? null : <Appbar.BackAction size={18} style={{ backgroundColor: backBtnBgColor, borderRadius: 10 }} onPress={() => {
            if (onBack) onBack()
            else navigation.goBack()
        }} />}
        <Appbar.Content title={title} />
        {actions?.map(v => {
            return <Appbar.Action icon={typeof v.icon === 'string' ? v.icon : () => v.icon} onPress={v.onPress} />
        })}
        </Appbar.Header>
    )
}

export default Header

const styles = StyleSheet.create({})