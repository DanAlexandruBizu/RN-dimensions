import { DEVICE_ORIENTATIONS } from "@/constants/DeviceType";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { ScaledSize } from "react-native/Libraries/Utilities/Dimensions";

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState(() => {
    const { width, height } = Dimensions.get("window");
    return width > height
      ? DEVICE_ORIENTATIONS.LANDSCAPE
      : DEVICE_ORIENTATIONS.PORTRAIT;
  });

  function setOrientationBasedOnDimensions({
    window,
    screen,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) {
    console.log({ window, screen });
    const { width, height } = window;

    if (width > height) {
      setOrientation(DEVICE_ORIENTATIONS.LANDSCAPE);
    } else {
      setOrientation(DEVICE_ORIENTATIONS.PORTRAIT);
    }
  }

  useEffect(() => {
    const eventHandler = Dimensions.addEventListener(
      "change",
      setOrientationBasedOnDimensions
    );

    return () => {
      eventHandler.remove();
    };
  }, []);

  return orientation;
}
