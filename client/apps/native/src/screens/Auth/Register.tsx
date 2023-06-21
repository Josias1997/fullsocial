import * as React from "react";

import Screen from "../../components/Screen";
import { Button, Input, Title } from "ui";
import { colors } from "theme";
import { StyleSheet, Text, View } from "react-native";
import ErrorText from "../../components/ErrorText";
import { StackScreenProps } from "../../types/navigation";
import RadioButton from "../../components/RadioButton";
import { Picker } from "@react-native-picker/picker";
import PhoneInput from "react-native-phone-input";
import { register } from "api";
import { Gender } from "types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Register = ({ navigation }: StackScreenProps) => {
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
    gender: Gender.MALE,
    error: "",
    birthDate: new Date().getDate(),
    birthMonth: MONTHS[new Date().getMonth()],
    birthYear: new Date().getFullYear() - 18,
    loading: false,
  });

  const phoneRef = React.useRef<any>();

  const signUp = async () => {
    setUserData({
      ...userData,
      error: "",
      loading: true,
    });
    try {
      await register({
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone_number: userData.phoneNumber,
        gender: userData.gender,
        birth_date: `${userData.birthDate}/${userData.birthMonth}/${userData.birthYear}`,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.passwordConfirmation,
      });
      navigation.navigate("ValidationCode", { email: userData.email });
    } catch (error: any) {
      setUserData({
        ...userData,
        error: error.response.data.message,
        loading: false,
      });
    }
  };

  const handleDataChange = (
    key: string,
    value: string | number | typeof Gender
  ) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const { error, gender, birthDate, birthMonth, birthYear } = userData;

  return (
    <Screen customStyles={styles.container}>
      <Title
        title={"FullSocial Registration"}
        subtitle={"Fill in your informations"}
      />
      {error && <ErrorText text={error} />}
      <View style={styles.formInputs}>
        <Input
          placeholder={"FirstName"}
          onChange={(text: string) => handleDataChange("firstName", text)}
          customStyles={styles.input}
        />
        <Input
          placeholder={"Surname"}
          onChange={(text: string) => handleDataChange("lastName", text)}
          customStyles={styles.input}
        />
        <Input
          placeholder={"Email Address"}
          onChange={(text: string) => handleDataChange("email", text)}
          customStyles={styles.input}
        />
        <Input
          placeholder={"New Password"}
          onChange={(text: string) => handleDataChange("password", text)}
          customStyles={styles.input}
          secureTextEntry
        />
        <Input
          placeholder={"Confirm Password"}
          onChange={(text: string) =>
            handleDataChange("passwordConfirmation", text)
          }
          customStyles={styles.input}
          secureTextEntry
        />
        <PhoneInput
          ref={(ref) => {
            phoneRef.current = ref;
          }}
          initialCountry={"MA"}
          onChangePhoneNumber={(value: string) =>
            handleDataChange("phoneNumber", value)
          }
          textProps={{
            placeholder: "Enter a phone number...",
          }}
          style={styles.phoneInput}
        />
        <View style={styles.radioGroups}>
          <View style={styles.radioGroup}>
            <Text style={styles.label}>Female</Text>
            <RadioButton
              onClick={() => handleDataChange("gender", "female")}
              selected={gender === "female" ? true : false}
            />
          </View>
          <View style={styles.radioGroup}>
            <Text style={styles.label}>Male</Text>
            <RadioButton
              onClick={() => handleDataChange("gender", "male")}
              selected={gender === "male" ? true : false}
            />
          </View>
        </View>
        <Text style={styles.label}>Date Of Birth</Text>
        <View style={styles.birthDateContainer}>
          <Picker
            selectedValue={birthDate}
            onValueChange={(value) => handleDataChange("birthDate", value)}
            style={styles.picker}
          >
            {new Array(31).fill(0).map((_, index) => (
              <Picker.Item
                key={index}
                label={`${index + 1}`}
                value={index + 1}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={birthMonth}
            onValueChange={(value) => handleDataChange("birthMonth", value)}
            style={styles.picker}
          >
            {MONTHS.map((month) => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
          <Picker
            selectedValue={birthYear}
            onValueChange={(value) => handleDataChange("birthYear", value)}
            style={styles.picker}
          >
            {new Array(100).fill(0).map((_, index) => (
              <Picker.Item
                key={index}
                label={`${new Date().getFullYear() - 18 - index}`}
                value={new Date().getFullYear() - 18 - index}
              />
            ))}
          </Picker>
        </View>
      </View>
      <Button
        text="Register"
        customStyles={styles.next}
        onClick={signUp}
        loading={userData.loading}
      />
      <Button
        text="Already have an account?"
        onClick={() => navigation.navigate("Login")}
        customStyles={styles.transparentButton}
        textStyles={styles.transparentButtonText}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  birthDateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  formInputs: {
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.light,
    marginTop: 5,
  },
  inputContainer: {
    width: "45%",
  },
  inputsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  label: {
    color: colors.medium,
  },
  next: {
    width: "90%",
    alignSelf: "center",
  },
  phoneInput: {
    height: 50,
    borderBottomColor: colors.mediumLight,
    borderBottomWidth: 0.5,
  },
  picker: {
    width: "33%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.light,
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  radioGroups: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  transparentButton: {
    backgroundColor: colors.transparent,
  },
  transparentButtonText: {
    color: colors.primary,
  },
});

export default Register;
