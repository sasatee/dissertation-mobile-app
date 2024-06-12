import { View, Text } from 'react-native'
import React from 'react'

const VideoProvider = ({children}) => {
  return (
    <View>
      <>{children}</>
    </View>
  )
}

export default VideoProvider