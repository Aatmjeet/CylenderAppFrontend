import {
  Title,
  TextInput,
  Button,
  Snackbar,
  HelperText,
} from "react-native-paper";
import { SafeAreaView, View, Keyboard } from "react-native";
import { useCallback, useState } from "react";
import axios from "axios";
import DismissKeybord from "./dismissKeybord";
import ProgressBarDummy from "./progressBar";

export default function UserIDPage({ navigation }) {
  const [userID, setUserID] = useState("");
  const [snackMessage, setSnakeMessage] = useState("");
  const [loader, setLoader] = useState(false);

  // for the snackbar
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible((vis) => !vis);
  const onDismissSnackBar = () => setVisible(false);
  const onToggleLoader = () => setLoader((vis) => !vis);

  const userAPI = "https://cylender-app.vercel.app/user/";

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    if (userID.length === 0) {
      setSnakeMessage("UserID can not be empty");
      onToggleSnackBar();
      onToggleLoader();
      return;
    }

    // API called
    axios.get(userAPI + userID).then((resp) => {
      if (resp.data.length !== 0) {
        navigation.navigate("UserDetails", { details: resp.data });
        onToggleLoader();
      } else {
        // If user Not found!!
        setSnakeMessage("No user found, Retry!");
        onToggleSnackBar();
        onToggleLoader();
      }
    });
  }, [userID]);

  const handleTextChange = useCallback(
    (text: any) => {
      setUserID(text);
    },
    [setUserID, userID]
  );

  return (
    <>
      <DismissKeybord>
        <SafeAreaView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Title
            style={{
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Enter User ID
          </Title>

          <View>
            <TextInput
              style={{ maxHeight: 60 }}
              label="User ID"
              value={userID}
              onChangeText={(text) => handleTextChange(text)}
            />
            <HelperText type="error" visible={visible}>
              {snackMessage}
            </HelperText>
            <Button
              disabled={loader}
              icon="account"
              mode="contained"
              style={{ marginTop: 0 }}
              onPress={() => {
                onToggleLoader();
                handleSubmit();
              }}
            >
              Get User Profile
            </Button>
            <View>{loader && <ProgressBarDummy />}</View>
          </View>
          <Snackbar
            style={{ elevation: 4 }}
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={1000}
          >
            {snackMessage}
          </Snackbar>
        </SafeAreaView>
      </DismissKeybord>
    </>
  );
}
