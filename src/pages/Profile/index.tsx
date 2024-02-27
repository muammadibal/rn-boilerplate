import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { toggleTheme } from '../../redux/actions/appAction'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { appSelector } from '../../redux/reducers'
import { color } from '../../utils/constant'
import Container from '../../components/Container'

const Profile = () => {
  const dispatch = useAppDispatch()
  const {theme} = useAppSelector(appSelector)
  return (
    <Container>
      <Header title='Profile' actions={[
        {
          icon: <FontAwesome5 name={theme === 'dark' ? "moon" : "sun"} color={theme === 'dark' ? color.gold[500] : 'black'} size={20}/>,
          onPress: () => {
            dispatch(toggleTheme())
          }
        }
      ]}/>
      <Text>Profile</Text>
    </Container>
  )
}

export default Profile