import React from 'react';
import Routes from "./src/routes";
import {StatusBar} from "react-native-web";

export default function App() {
  return (
      <>
        <StatusBar barStyle="light-content" backGroundColor="#7D4OE7"/>
        <Routes/>
      </>
  );
}