import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface loaderprops {}

export default function Loader(props: loaderprops) {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      {/* <LottieView
        source={require("../assets/loading.json")}
        autoPlay={true}
        loop={true}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
});
