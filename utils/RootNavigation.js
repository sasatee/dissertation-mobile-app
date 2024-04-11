import React, { createRef } from "react";



export const navigationRef = createRef();


export function navigate(name,params){
  navigate.current?.navigate(name,params)
}