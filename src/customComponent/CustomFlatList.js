import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const CustomFlatList = () => {
  return (
    <View>
      <FlatList
        data={list}
        renderItem={renderItem}
      />
    </View>
  )
}
const styles = StyleSheet.create({})