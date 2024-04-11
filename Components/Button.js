import { Button } from 'react-native'
import React from 'react'

export default function ButtonComponent({title,handleOnPress}) {
  return (
    <Button title={title} onPress={handleOnPress}/>
  )
}