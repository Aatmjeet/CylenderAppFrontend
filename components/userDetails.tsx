import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  Title,
  Text,
  Surface,
  List,
  Checkbox,
  Button,
} from "react-native-paper";
import { updateUser } from "../api/userApi";
import { serviceTypes } from "./serviceTypes";

export default function UserDetails({ route, navigation }) {
  const { details } = route.params;
  const [userDetails, setUserDetails] = useState(details[0]);

  const updateHistoy = async (id, updatedUser) => {
    try {
      const { data } = await updateUser(id, updatedUser);

      setUserDetails(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNewService = (selectedIt, total: number) => {
    const dummyUserDetails = userDetails;
    const dummyHistory = [
      ...dummyUserDetails.history,
      {
        service: selectedIt,
        charge: total,
        doneAt: new Date(),
      },
    ];
    dummyUserDetails.history = dummyHistory;
    updateHistoy(dummyUserDetails._id, dummyUserDetails);
  };

  useEffect(() => {}, []);
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f4c2c2",
            borderRadius: 10,
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          <Surface style={styles.surface}>
            <Image
              style={{ borderRadius: 10 }}
              source={{
                width: 100,
                height: 100,
                uri: "https://picsum.photos/200",
              }}
            />
          </Surface>

          <Title
            style={{
              margin: 10,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {details[0].name}
          </Title>
        </View>
        <View style={{ width: "100%" }}>
          <DetailsList
            number={details[0].phone}
            address={details[0].address}
            uniqueID={details[0].uniqueID}
          />
          <NewServiceList handleNewService={handleNewService} />
          <HistoryList history={details[0].history} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

function DetailsList({ number, uniqueID, address }) {
  return (
    <List.AccordionGroup>
      <List.Accordion
        style={{ borderRadius: 10 }}
        title="User Details"
        id="details"
        left={(props) => <List.Icon {...props} icon="card-account-details" />}
      >
        <View
          style={{
            margin: 5,
          }}
        >
          <Text
            style={{
              marginBottom: 5,
              fontSize: 15,
            }}
          >
            Mobile Number: {number}
          </Text>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 15,
            }}
          >
            ID: {uniqueID}
          </Text>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 15,
            }}
          >
            Address: {address}
          </Text>
        </View>
      </List.Accordion>
    </List.AccordionGroup>
  );
}
function HistoryList({ history }) {
  return (
    <List.AccordionGroup>
      <List.Accordion
        style={{ borderRadius: 10 }}
        title="History"
        id="history"
        left={(props) => <List.Icon {...props} icon="folder" />}
      >
        {history.length ? (
          history.map((hisEle, index) => {
            return (
              <View key={index + hisEle.charge} style={{ marginTop: 5 }}>
                <Text style={{ fontWeight: "600" }}>
                  {index + 1}. Services provided
                </Text>
                {hisEle.service.map((ele, indx) => (
                  <View key={indx + ele.cost}>
                    <Text style={{ marginTop: 5 }}>
                      {ele.name} @ ₹{ele.cost}
                    </Text>
                  </View>
                ))}
                <Text style={{ marginTop: 5 }}>
                  on{" "}
                  {`${hisEle.doneAt.toString().split("T")[0]} ${
                    hisEle.doneAt.toString().split("T")[1].split(".")[0]
                  }`}
                </Text>
                <Text style={{ marginTop: 5 }}>Total: ₹{hisEle.charge}</Text>
              </View>
            );
          })
        ) : (
          <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: "500" }}>
            No Service History Found
          </Text>
        )}
      </List.Accordion>
    </List.AccordionGroup>
  );
}

function NewServiceList(props) {
  const { handleNewService } = props;
  const [selectedItems, setSelectedItems] = useState({
    regularService: false,
    burnerCleaning: false,
    pipeChange: false,
    regulatorChange: false,
    burnerChange: false,
  });
  const [totalValue, setTotalValue] = useState(0);

  const handleCheckBox = (serviceType: string, serviceCost: number) => {
    const currSelected = { ...selectedItems };
    currSelected[serviceType] = !currSelected[serviceType];
    setSelectedItems(currSelected);
    currSelected[serviceType]
      ? setTotalValue((val) => val + serviceCost)
      : setTotalValue((val) => val - serviceCost);
  };

  const resetCheckboxselection = useCallback(() => {
    const currSelected = { ...selectedItems };
    for (const i in currSelected) {
      if (currSelected[i]) currSelected[i] = !currSelected[i];
    }
    setTotalValue(0);
    setSelectedItems(currSelected);
  }, [setSelectedItems]);

  return (
    <List.AccordionGroup>
      <List.Accordion
        style={{ borderRadius: 10 }}
        title="New Service"
        id="service"
        left={(props) => <List.Icon {...props} icon="account-wrench" />}
      >
        <View style={{ marginRight: "20%", marginTop: 10 }}>
          <Text style={{ fontWeight: "500", fontSize: 12 }}>
            Select Service Type
          </Text>
          {serviceTypes.map((sType, indx) => {
            return (
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
                key={sType.cost + indx}
              >
                <Checkbox
                  status={
                    selectedItems[sType.serviceType] ? "checked" : "unchecked"
                  }
                  onPress={() => handleCheckBox(sType.serviceType, sType.cost)}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{sType.name}</Text>
                  <Text style={{ marginLeft: 5 }}>₹{sType.cost}</Text>
                </View>
              </View>
            );
          })}

          <Text style={{ marginTop: 2, fontWeight: "600" }}>
            Total: ₹{totalValue}
          </Text>
          <Button
            icon="send-check-outline"
            mode="contained"
            style={{ marginTop: 10 }}
            onPress={() => {
              let selectedIt = [];
              if (totalValue === 0) {
                alert("Add items before checkout!");
                return;
              }
              serviceTypes.forEach((el) => {
                if (selectedItems[el.serviceType]) selectedIt.push(el);
              });
              resetCheckboxselection();
              handleNewService(selectedIt, totalValue);
            }}
          >
            Checkout
          </Button>
        </View>
      </List.Accordion>
    </List.AccordionGroup>
  );
}

const styles = StyleSheet.create({
  surface: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    borderRadius: 10,
  },
});
