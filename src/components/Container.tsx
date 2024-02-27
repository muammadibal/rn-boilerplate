import { View, Text } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { appSelector } from '../redux/reducers'
import { theme } from '../utils/constant'

const Container = ({children}: {children: React.ReactNode}) => {
    const {theme: appTheme} = useAppSelector(appSelector)
    const backgroundColor = appTheme === 'dark' ? theme.background.dark : theme.background.light

    return (
        <View style={{ flex: 1, backgroundColor }}>
            {children}
        </View>
    )
}

export default Container