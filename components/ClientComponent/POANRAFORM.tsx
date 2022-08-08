import React, { Dispatch, SetStateAction, useState, useEffect, SyntheticEvent } from "react";
import { Button, Icon, Modal, TextArea, Form, Loader, Tab } from "semantic-ui-react";
import {
  IPOANRA_FORM,
  IConsigneeSearch,
  IGenerateInput,
  IPOANRA_Response,
  IAutoComplete,
  generateInput,
  poa_nra_form_values,
  EPOA_NRA_DATA,
} from "../../Types/poaNraTypes";

import Details from "../POANRA/Form/Details";
type IProps = {
    formValues: IPOANRA_Response;
    setFormValues: Dispatch<SetStateAction<IPOANRA_Response>>;
    modalAction: (tittle: string, display: boolean, isDelete: boolean) => void;
    customerName: string;
    customerId: number;
    setPageIsLoading: Dispatch<SetStateAction<boolean>>;
  };

  function reducer(state: any, action: { type: string; size?: string | undefined }) {
    switch (action.type) {
      case "close":
        return { open: false };
      case "open":
        return { open: true, size: action.size };
      default:
        throw new Error("Unsupported action...");
    }
  }

const POANRAFORM = ({ formValues, setFormValues, modalAction, customerName, customerId, setPageIsLoading }: IProps) => {
         
    const [state, dispatch] = React.useReducer(reducer, {
        open: false,
        size: undefined,
      });

    type INewObj = {
        [key: string]: string | boolean | Date | number | undefined;
      }; 
      

      const { open, size } = state;
      const [optionData, setOptionData] = useState<IAutoComplete[]>([]);     
const panes = [
  
    {
      menuItem: "Details",
      render: () => (
        <Tab.Pane attached={false}>
          <div style={{ height: 660 }}>
            <Details
              inputFunction={inputFunction}
              setInputFunction={setInputFunction}
              optionData={optionData}
              setOptionData={setOptionData}
              formAction={formAction}
            />
          </div>
        </Tab.Pane>
      ),
    },
  ];

  const handleSubmit = async () => {
    // try {
    //   const newObj: INewObj = {};
    //   for (let i = 0; i < inputFunction.length; i++) {
    //     const name = inputFunction[i].name as string;
    //     newObj[name] = inputFunction[i].value;
    //   }
    //   newObj["consignee_id"] = formValues.consignee_id;
    //   newObj["customer_id"] = formValues.customer_id;
    //   newObj["date_added"] = new Date();
    //   if (formAction === "edit") {
    //     newObj["id"] = rows[indexToEdit].id;
    //   }
    //   const data = newObj as IPOANRA_Response;
    //   data.insurance = newObj.insurance === "Yes" ? true : false;

    //   setIsSaving(true);
    //   setPageIsLoading(true);
    //   if (formAction === "edit") {
    //     console.log(data);
    //     const id = newObj.id as number;
    //     await handleUpdatePOA_NRA_API(data, id);
    //   } else {
    //     await createPONRA_API(data);
    //   }
    //   setIsSaving(false);
    //   setPageIsLoading(false);
    //   closeModal();
    // } catch (e) {
    //   if(e instanceof Error){
    //   setErrorMessage(e.message);
    //   setError(true);
    //   setIsSaving(false);
    //   setPageIsLoading(false);}
    //   setTimeout(() => {
    //     setError(false);
    //   }, 4000);
    // }
  };

  return (
    <div>"HELLO Whats up"</div>
    // <Modal size={size} open={open} onClose={closeModal}>
    //   <Modal.Header>
    //     <div style={{ display: "flex", justifyContent: "space-between" }}>
    //       <div>
    //         <p>{formAction === "edit" ? "Edit" : "New"} POA/NRA Contract</p>
    //       </div>
    //       <div>
    //         <Icon name="close" style={{ cursor: "pointer" }} onClick={closeModal} />
    //       </div>
    //     </div>
    //   </Modal.Header>
    //   <Modal.Content scrolling>
    //     {error && (
    //       <div>
    //         <p style={{ color: "red" }}>{errorMessage}</p>
    //         <p style={{ color: "red" }}>Customer Name and Consignee is required</p>
    //       </div>
    //     )}
    //     <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    //   </Modal.Content>
    //   <Modal.Actions>
    //     <Button primary onClick={handleSubmit} loading={isSaving}>
    //       {formAction === "edit" ? "Update" : "Submit"}
    //     </Button>
    //   </Modal.Actions>
    // </Modal>
  );
};

export default POANRAFORM;

