import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Radio } from "semantic-ui-react";
import { IContainerForm, IRadioBoxArray, IStep } from "../../Types/containerTypes";
import { fetchAutoCompleteAPI, createAutoComplete_API } from "../../actions/poa_nra";
import { IAutoComplete } from "../../Types/poaNraTypes";

type IProps = {
  setFormValues: Dispatch<SetStateAction<IContainerForm>>;
  checkBox: any;
  radioArray: IRadioBoxArray[];
  setRadioArray: Dispatch<SetStateAction<IRadioBoxArray[]>>;
  setCheckBox: Dispatch<SetStateAction<any>>;
  optionData: IAutoComplete[];
  formValues: IContainerForm;
  setOptionData: Dispatch<SetStateAction<IAutoComplete[]>>;
  setDisplayCars: Dispatch<SetStateAction<boolean>>;
  stepForRoro: IStep[];
  setStepForRoro: Dispatch<SetStateAction<IStep[]>>;
  step: IStep[];
  setStep: Dispatch<SetStateAction<IStep[]>>;
  stepObj: IStep[];
};

const ContainerType = ({ setFormValues, formValues,stepObj, radioArray,step,setStep, setDisplayCars,stepForRoro,setStepForRoro, setRadioArray, checkBox, setCheckBox, optionData, setOptionData }: IProps) => {
  useEffect(() => {
    fetchAutoCompleteAPI().then((data) => {
      setOptionData(data);
    });
  }, []);

  const options = (name: string) => {
    const filter = optionData.filter((value) => value.type === name);
    return filter.map((value, index: number) => ({
      key: index,
      text: value.text,
      value: value.text,
    }));
  };

  const handleAddOptions = async (name: string) => {
    //@ts-ignore
    const value = document.getElementById("input_" + name).value;
    if (value !== "") {
      const data = { type: name, text: value };
      setOptionData((prev) => [...prev, data]);
      //@ts-ignore
      document.getElementById("input_" + name).value = "";
      //send to db
      createAutoComplete_API(data);
      //then close
      handleClose(name);
    }
  };

  const handleClose = (name: string) => {
    //@ts-ignore
    document.getElementById("dropDown" + name).style.display = "block";
    //@ts-ignore
    document.getElementById("inputDiv" + name).style.display = "none";
  };

  // const renderInput1 = () => {
  //   return (
  //     <div>
  //       <div id={"dropDownfreight"}>
  //         <Dropdown
  //           placeholder={"Freight"}
  //           search
  //           selection
  //           value={formValues.freight}
  //           options={options("freight")}
  //           style={{ width: 250 }}
  //           name={"freight"}
  //           clearable
  //           onChange={(e, { value, name }) => {
  //             setFormValues((prev: any) => {
  //               return {
  //                 ...prev,
  //                 [name]: value,
  //               };
  //             });
  //           }}
  //         />

  //         <Button
  //           icon
  //           style={{ marginLeft: 5 }}
  //           onClick={() => {
  //             //@ts-ignore
  //             document.getElementById("dropDownfreight").style.display = "none";
  //             //@ts-ignore
  //             document.getElementById("inputDivfreight").style.display = "block";
  //           }}
  //         >
  //           <Icon name="add" />
  //         </Button>
  //       </div>
  //       <div id={"inputDivfreight"} style={{ display: "none" }}>
  //         <Input placeholder="Enter text" id={`input_freight`} />
  //         <Button secondary style={{ marginLeft: 5 }} onClick={handleAddOptions.bind(this, "freight")}>
  //           Save
  //         </Button>
  //         <Button icon style={{ marginLeft: 5 }} onClick={handleClose.bind(this, "freight")} color="red">
  //           <Icon name="close" />
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderInput2 = () => {
  //   return (
  //     <div>
  //       <div id={"dropDownunit"}>
  //         <Dropdown
  //           placeholder={"Unit"}
  //           search
  //           selection
  //           value={formValues.unit}
  //           options={options("unit")}
  //           style={{ width: 250 }}
  //           name={"unit"}
  //           clearable
  //           onChange={(e, { value, name }) => {
  //             setFormValues((prev: any) => {
  //               return {
  //                 ...prev,
  //                 [name]: value,
  //               };
  //             });
  //           }}
  //         />

  //         <Button
  //           icon
  //           style={{ marginLeft: 5 }}
  //           onClick={() => {
  //             //@ts-ignore
  //             document.getElementById("dropDownunit").style.display = "none";
  //             //@ts-ignore
  //             document.getElementById("inputDivunit").style.display = "block";
  //           }}
  //         >
  //           <Icon name="add" />
  //         </Button>
  //       </div>
  //       <div id={"inputDivunit"} style={{ display: "none" }}>
  //         <Input placeholder="Enter text" id={`input_unit`} />
  //         <Button secondary style={{ marginLeft: 5 }} onClick={handleAddOptions.bind(this, "unit")}>
  //           Save
  //         </Button>
  //         <Button icon style={{ marginLeft: 5 }} onClick={handleClose.bind(this, "unit")} color="red">
  //           <Icon name="close" />
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderInput3 = () => {
  //   return (
  //     <div>
  //       <div id={"dropDownin_transit"}>
  //         <Dropdown
  //           placeholder={"In Transit"}
  //           search
  //           selection
  //           value={formValues.in_transit}
  //           options={options("in_transit")}
  //           style={{ width: 250 }}
  //           name={"in_transit"}
  //           clearable
  //           onChange={(e, { value, name }) => {
  //             setFormValues((prev: any) => {
  //               return {
  //                 ...prev,
  //                 [name]: value,
  //               };
  //             });
  //           }}
  //         />

  //         <Button
  //           icon
  //           style={{ marginLeft: 5 }}
  //           onClick={() => {
  //             //@ts-ignore
  //             document.getElementById("dropDownin_transit").style.display = "none";
  //             //@ts-ignore
  //             document.getElementById("inputDivin_transit").style.display = "block";
  //           }}
  //         >
  //           <Icon name="add" />
  //         </Button>
  //       </div>
  //       <div id={"inputDivin_transit"} style={{ display: "none" }}>
  //         <Input placeholder="Enter text" id={`input_in_transit`} />
  //         <Button secondary style={{ marginLeft: 5 }} onClick={handleAddOptions.bind(this, "in_transit")}>
  //           Save
  //         </Button>
  //         <Button icon style={{ marginLeft: 5 }} onClick={handleClose.bind(this, "in_transit")} color="red">
  //           <Icon name="close" />
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      {
        radioArray.map((data:IRadioBoxArray, index:number)=>(
          <Radio
          label={data.label}
          style={{ marginRight: 20 }}
          name={data.value}
          checked={data.isChecked}
          onChange={(e, data) => {
            console.log(step)
            const copyRadioArray = [...radioArray ];
            for (let i = 0; i < radioArray.length; i++) {
              copyRadioArray[i].isChecked = false;
            }
            copyRadioArray[index].isChecked = data.checked ? true : false;
           // checkCopyArray.isChecked = data.checked ? true : false;
            setFormValues((prev: any) => {
              return {
                ...prev,
                ["container_type"]: data.value,
              };
            });
            setRadioArray(copyRadioArray);
            if(data.value === "roro")
             {  
              setDisplayCars(true)
              let array = [...stepForRoro];
                array[3].display = true
                setStep(array)
            }
            else{
              let array = [...stepObj];
              setDisplayCars(false)
                  setStep(array)
            }
          }}
          value={data.value}
          />

        ))
      }
      {/* <Radio
        label={checkBox.label}
        style={{ marginRight: 20 }}
        name={checkBox.value}
	@@ -217,17 +119,17 @@ const ContainerType = ({ setFormValues, formValues, checkBox, setCheckBox, optio
          setCheckBox(checkCopyArray);
        }}
        value={checkBox.value}
      /> */}

      {/* {checkBox.isChecked && (
        <div style={{ height: 400, marginTop: 20 }}>
          <div style={{ display: "flex" }}>
            {renderInput1()}
            {renderInput2()}
            {renderInput3()}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ContainerType;
