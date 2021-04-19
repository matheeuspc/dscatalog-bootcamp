import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Updates from 'expo-updates';
import Routes from "./src/routes";


const App: React.FC = () => {

  async function checkUpdates() {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable){
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  useEffect(() => {
    checkUpdates();
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}



export default App;