import DropdownSelect from "react-native-input-select";

import { AntDesign } from "@expo/vector-icons";

export default function DropDown({onGenderChange,Gender}) {

  return (
    <DropdownSelect
      placeholder={Gender ? "" : "Select gender"}
      placeholderStyle={{
        color: "black",
      }}
      options={[
        { name: "male", id: "1" },
        { name: "female", id: "2" },
      ]}
      dropdownIcon={<AntDesign name="down" size={20} color="white" />}
      optionLabel={"name"}
      optionValue={"id"}
      selectedValue={Gender}
      onValueChange={(itemValue) => {
        const selectedOption = [
          { name: "male", id: "1" },
          { name: "female", id: "2" },
        ].find((option) => option.id === itemValue);
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
