import { ProgressBar } from "react-native-paper";
import { View } from "react-native";

export default function ProgressBarDummy() {
  return (
    <View>
      <ProgressBar
        progress={1}
        style={{ height: 10, borderRadius: 10, marginTop: 5 }}
        indeterminate={true}
      />
    </View>
  );
}
