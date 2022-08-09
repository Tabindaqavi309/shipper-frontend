import React, { Dispatch, SetStateAction } from "react";
import { Dropdown, Button, Icon, Input } from "semantic-ui-react";
import { IGenerateInput, IAutoComplete } from "../../../Types/poaNraTypes";
import { createAutoComplete_API } from "../../../actions/poa_nra";

type IProps = {
  result: IGenerateInput;
  setInputFunction: Dispatch<SetStateAction<IGenerateInput[]>>;
  setOptionData: Dispatch<SetStateAction<IAutoComplete[]>>;
  optionData: IAutoComplete[];
  handleInput: (index: number, value: string) => void;
  mainIndex: number;
  formAction: string;
};

const DropDown = ({ result, setInputFunction, optionData, setOptionData, handleInput, mainIndex, formAction }: IProps) => {
  const options = optionData.map((value, index: number) => ({
    key: index,
    text: value.text,
    value: value.text,
  }));

  const newValue: string = result.value as string;

  console.log(newValue);

  const handleAddOptions = async () => {
    //@ts-ignore
    const value = document.getElementById("input_" + result.name).value;
    if (value !== "") {
      const data = { type: result.name, text: value };
      setOptionData((prev) => [...prev, data]);
      //@ts-ignore
      document.getElementById("input_" + result.name).value = "";
      //send to db
      createAutoComplete_API(data);
      //then close
      handleClose();
    }
  };

  const handleClose = () => {
    //@ts-ignore
    document.getElementById("dropDown" + result.name).style.display = "block";
    //@ts-ignore
    document.getElementById("inputDiv" + result.name).style.display = "none";
  };

  return (
    <div>
      <div id={"dropDown" + result.name}>
        <Dropdown
          placeholder={result.label}
          search
          selection
          value={newValue}
          options={options}
          style={{ width: 250 }}
          name={result.name}
          clearable
          onChange={(e, { value, name }) => {
            const val = value as string;
            handleInput(mainIndex, val);
          }}
        />

        <Button
          icon
          style={{ marginLeft: 5 }}
          onClick={() => {
            //@ts-ignore
            document.getElementById("dropDown" + result.name).style.display = "none";
            //@ts-ignore
            document.getElementById("inputDiv" + result.name).style.display = "block";
          }}
        >
          <Icon name="add" />
        </Button>
      </div>
      <div id={"inputDiv" + result.name} style={{ display: "none" }}>
        <Input placeholder="Enter text" id={`input_${result.name}`} />
        <Button secondary style={{ marginLeft: 5 }} onClick={handleAddOptions}>
          Save
        </Button>
        <Button icon style={{ marginLeft: 5 }} onClick={handleClose} color="red">
          <Icon name="close" />
        </Button>
      </div>
    </div>
  );
};

export default DropDown;
