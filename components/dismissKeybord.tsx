import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

//@ts-ignore
export default function DismissKeybord({ children }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (Platform.OS !== "web") Keyboard.dismiss();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
