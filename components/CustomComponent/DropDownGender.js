import React from "react";
import DropdownSelect from "react-native-input-select";
import { AntDesign } from "@expo/vector-icons";

export default function DropDown({ onGenderChange, Gender }) {
  const options = [
    { name: "male", id: "1" },
    { name: "female", id: "2" },
  ];

  return (
    <DropdownSelect
      placeholder={Gender ? "" : "Select gender"}
      placeholderStyle={{
        color: "white",
      }}
      options={options}
      dropdownIcon={<AntDesign name="down" size={20} color="white" />}
      optionLabel={"name"}
      optionValue={"id"}
      selectedValue={Gender}
      onValueChange={(itemValue) => {
        const selectedOption = options.find((option) => option.id === itemValue);
        onGenderChange(selectedOption ? selectedOption.name : null);
      }}
      dropdownTextStyle={{ color: "black" }}
      dropdownStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0,
        borderRadius: 12,
      }}
      dropdownErrorTextStyle={{
        color: "red",
        paddingLeft: 10,
      }}
      // error={Gender ? "" : "Gender is required"}
      primaryColor={"green"}
      hideModal={true}
    />
  );
}
