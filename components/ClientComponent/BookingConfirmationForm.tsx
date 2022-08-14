import React, { Dispatch, SetStateAction, useState, useEffect, SyntheticEvent } from "react";
import { Button, Icon, Modal, TextArea, Form, Loader, Tab } from "semantic-ui-react";
import { IBookingReceipt_FORM, IBookingReceipt_Response, generateInput, booking_receipt_form_values } from "../../Types/bookingReceiptTypes";
import { IConsigneeSearch, IGenerateInput, IAutoComplete } from "../../Types/poaNraTypes";
import { IClientResponse } from "../../Types/clientTypes";
import CustomerForm from "./BookingDetails/CustomerForm";
import CircularProgress from "../SpinnerComponent/CircularProgress";
import Details from "./BookingDetails/Details";
import { findConsigneeByCustomerId } from "../../actions/poa_nra";
import { createBookingReceipt_API, handleUpdateBooking_Receipt_API } from "../../actions/bookingReceipts";


const line = <div style={{ height: 2, border: "1px solid #E0E0E0", marginBottom: 15, marginTop: 5 }} />;

// setOptionData: Dispatch<SetStateAction<IAutoComplete[]>>;
// optionData: IAutoComplete[];
type IProps = {
  formValues: IBookingReceipt_FORM;
  setFormValues: Dispatch<SetStateAction<IBookingReceipt_FORM>>;
  setPageIsLoading: Dispatch<SetStateAction<boolean>>;
  // customerData: IClientResponse[];
  modalAction: (tittle: string, display: boolean, isDelete: boolean) => void;
  customerName: string;
  customerId: number;
  consigneeId: number
  consigneeName: string;
  setDisplayDockReceiptForm: Dispatch<SetStateAction<boolean>>;
};

type INewObj = {
  [key: string]: string | boolean | Date | number | undefined;
};

const BookingConfirmationForm = ({
  customerName,
  customerId,
  consigneeId,
  consigneeName,
  setPageIsLoading,
  modalAction,
  setFormValues,
  setDisplayDockReceiptForm,
  formValues
}: IProps) => {
  const [optionData, setOptionData] = useState<IAutoComplete[]>([]);
  const [inputFunction, setInputFunction] = useState<IGenerateInput[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {

      setInputFunction(generateInput(booking_receipt_form_values));
    
      setFormValues({
        customer_id:customerId,
        consignee_id: consigneeId
      });

  const arr = generateInput(formValues);
 
      setInputFunction(arr);
    }
  , []);

  const renderButtons = () => (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 30 }}>
       <Button color="grey" style={{ marginRight: 10 }} onClick={() => handleSave("saveANDfill")}>
            Save and fill dock reciepts form
          </Button>
          <Button positive onClick={() => handleSave("saveANDclose")}>
            Save and close
          </Button>
    </div>
  );

  const panes = [
    {
      menuItem: "Customer",
      render: () => (
        <Tab.Pane attached={false}>
          <div style={{ height: 460 }}>
            <CustomerForm
              customerName= {customerName}
              consigneeName = {consigneeName}
            />
          
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Details",
      render: () => (
        <Tab.Pane attached={false}>
          <div style={{ height: 460 }}>
            <Details
              inputFunction={inputFunction}
              setInputFunction={setInputFunction}
              optionData={optionData}
              setOptionData={setOptionData}
              formAction={"new"}
              tab="details"
            />
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Others",
      render: () => (
        <Tab.Pane attached={false}>
          <Details
            inputFunction={inputFunction}
            setInputFunction={setInputFunction}
            optionData={optionData}
            setOptionData={setOptionData}
            formAction={"new"}
            tab="others"
          />
        </Tab.Pane>
      ),
    },
  ];

  const handleSave = async (action: string) => {
    try {
      const newObj: INewObj = {};
      for (let i = 0; i < inputFunction.length; i++) {
        const name = inputFunction[i].name as string;
        newObj[name] = inputFunction[i].value;
      }
      newObj["consignee_id"] = formValues.consignee_id;
      newObj["customer_id"] = formValues.customer_id;
      newObj["date_added"] = new Date();
  

      const data = newObj as IBookingReceipt_Response;

      setIsSaving(true);
      setPageIsLoading(true);
      await createBookingReceipt_API(data);  

      if(action === "saveANDclose"){
        setPageIsLoading(true);
        modalAction("", false, false);
      }
      else{
        setDisplayDockReceiptForm(true) 
      }
    } catch (e) {
      if (e instanceof Error) {
        // ✅ TypeScript knows err is Error
        setErrorMessage(e.message);
      setError(true);
      setIsSaving(false);
      setPageIsLoading(false);
      } else {
        console.log('Unexpected error', e);
      }
     
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  return (
     <div style={{  width: 1000, padding: 20, height: 600}} > 
  
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        {line}
  {isSaving ? (
        <div style={{ marginTop: 100, float: "right", padding: 30 }}>
          <CircularProgress />
        </div>
      ) : (
        renderButtons()
      )}
  </div>);
};

export default BookingConfirmationForm;
