import { DEVICE_ORIENTATIONS } from '@/constants/DeviceType';
import { useDeviceOrientation } from '@/utilities/useDeviceDimensions';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [orientation, setOrientation] = useState(ScreenOrientation.Orientation.UNKNOWN);
  const hookOrientation = useDeviceOrientation();

  useEffect(() => {
    const getInitialOrientation = async () => {
      const expoOrientation = await ScreenOrientation.getOrientationAsync();
      console.log(expoOrientation);
    }

    getInitialOrientation();

    const orinetationListener = ScreenOrientation.addOrientationChangeListener((p) => {
      console.log({p});
      setOrientation(p.orientationInfo.orientation);
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orinetationListener);
    }
  }, []);

  const isLandscape = () => {
    return orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={[styles.box, { backgroundColor: hookOrientation === DEVICE_ORIENTATIONS.PORTRAIT ? "red" : "green" }]}>
        <Text>{hookOrientation}</Text>
      </View>
      <View style={[styles.box, { backgroundColor: isLandscape() ? "green" : "red" }]}>
        <Text>{orientation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    marginTop: 30,
  }
});
