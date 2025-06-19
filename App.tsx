import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { loadUser } from './src/redux/userSlice'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser()); // Load stored user on app start
  }, []);
  return (
    <SafeAreaView style={styles.fullscreen}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
})