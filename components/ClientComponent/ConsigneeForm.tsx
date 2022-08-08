import React, { useState, Dispatch, SetStateAction } from "react";
import { IConsigneeForm, IConsigneeResponse, consigneeFormObj } from "../../Types/consigneeTypes";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import Button from "@material-ui/core/Button";
import { Button } from "semantic-ui-react";
import { handleSaveAPI } from "../../actions/consignee";
import CircularProgress from "../SpinnerComponent/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { handleSnackBar, ISnackBar } from "../../store/actions/snackBar";
import "semantic-ui-css/semantic.min.css";
import countries from "../ConsigneeComponent/countries.json";
import POANRA from "../../pages/poa_nra";
import POANRAFORM from "./POANRAFORM";
import { IPOANRA_Response, poa_nra_form_values } from "../../Types/poaNraTypes";

type IProps = {
  formValues: IConsigneeForm;
  setFormValues: Dispatch<SetStateAction<IConsigneeForm>>;
  modalAction: (tittle: string, display: boolean, isDelete: boolean) => void;
  setRows: Dispatch<SetStateAction<IConsigneeResponse[]>>;
  rows: Array<Object>;
  customerName: string;
  customerId: number;
  setPageIsLoading: Dispatch<SetStateAction<boolean>>;
};



const line = <div style={{ height: 2, border: "1px solid #E0E0E0", marginBottom: 15, marginTop: 5 }} />;

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "30%",
    marginRight: 10,
  },
  formControlCountry: {
    width: "50%",
    marginRight: 10,
  },
}));

const ConsigneeForm = ({ formValues, setFormValues, modalAction, customerName, customerId, setRows, rows, setPageIsLoading }: IProps): JSX.Element => {
  const classes = useStyles();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const snackBar = useSelector((state: any) => state.snackBarReducer);
  const countriesData: any = [...countries];

  const [displayPoaNraForm, setDisplayPoaNraForm] = useState<boolean>(false);
  const [formValues_POA_NRA, setFormValues_POA_NRA] = useState<IPOANRA_Response>(poa_nra_form_values);
  const handleChange = (event: any) => {
    const { value, name } = event.target;

    setFormValues((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const handleSaveAction = (data: any) => {
   // setRows((prev: any) => [...prev, data]);
    setFormValues(consigneeFormObj);
  };


  const handleSave = async (action: string) => {
    try {
      setIsSaving(false);
            const newValues = { ...formValues };
            newValues.customer_id = customerId;
            setIsSaving(true);
       const data: any = await handleSaveAPI(newValues);
      setIsSaving(false);
      const snackObj: ISnackBar = { ...snackBar };
      snackObj.display_snackBar = true;
      snackObj.message = "Consignee added";
      dispatch(handleSnackBar(snackObj));
      if (action === "saveANDclose") {
  
      setPageIsLoading(true);
      modalAction("", false, false);
    }   
      else {
        setPageIsLoading(true);
        setDisplayPoaNraForm(true);
      }
    } catch (e) {
      if(e instanceof Error){
        setIsSaving(false);
      setError(e.message);
      }
    }
  };

  const renderButtons = () => (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 30 }}>
   
      <Button color="grey" style={{ marginRight: 10 }} onClick={() => handleSave("saveANDfill")}>
            Save and fill poa/nra
          </Button>
          <Button positive onClick={() => handleSave("saveANDclose")}>
            Save and close
          </Button>
    </div>
  );

  const renderCountry = () => {
    return (
      <FormControl variant="outlined" className={classes.formControlCountry}>
        <Select
          native
          value={formValues.country}
          onChange={handleChange}
          label="Country"
          inputProps={{
            name: "country",
            id: "outlined-city-native-simple",
          }}
        >
          <option aria-label="None" value="">
            Select a country
          </option>
          {countriesData.map((result: any, index: number) => (
            <option aria-label="None" value={result.name} key={index}>
              {result.name}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <div>
      {!displayPoaNraForm ?<div style={{ width: 700, padding: 20 }}>
      <p style={{ color: "red" }}>{error}</p>
      <div>
        <p style={{ marginBottom: 5, fontSize: 20 }}>
          Adding Consignee for <strong>{customerName}</strong>
        </p>
        {line}
        <div>
          <TextField
            label="Full name"
            style={{ width: "100%" }}
            onChange={handleChange}
            value={formValues.full_name}
            name="full_name"
            variant="outlined"
          />
        </div>
        <form autoComplete={"off"} style={{ display: "flex", marginTop: 15 }}>
          <TextField
            label="Phone number"
            style={{ width: "50%", marginRight: 10 }}
            onChange={handleChange}
            value={formValues.phone_number}
            name="phone_number"
            variant="outlined"
          />
          <TextField label="Email" style={{ width: "50%" }} onChange={handleChange} value={formValues.email} name="email" variant="outlined" />
        </form>
        <TextField
          label="Care Of"
          style={{ width: "100%", marginTop: 15 }}
          onChange={handleChange}
          value={formValues.care_of}
          name="care_of"
          variant="outlined"
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <p style={{ fontWeight: 400 }}>Address</p>
        {line}
        <TextField
          label="Address"
          style={{ width: "100%", marginRight: 10 }}
          onChange={handleChange}
          value={formValues.address}
          name="address"
          variant="outlined"
        />
        <form autoComplete={"off"} style={{ display: "flex", marginTop: 15 }}>
          {renderCountry()}
          <TextField label="City" style={{ width: "48%" }} onChange={handleChange} value={formValues.city} name="city" variant="outlined" />
        </form>
        <div style={{ display: "flex", marginTop: 15 }}>
          <TextField label="State" style={{ width: "50%" }} onChange={handleChange} value={formValues.state} name="state" variant="outlined" />
          <TextField
            label="Postal Code"
            style={{ width: "48%", marginLeft: 20 }}
            onChange={handleChange}
            value={formValues.zipcode}
            name="zipcode"
            variant="outlined"
          />
        </div> 
      </div>

      {isSaving ? (
        <div style={{ marginTop: 30, float: "right", padding: 30 }}>
          <CircularProgress />
        </div>
      ) : (
        renderButtons()
      )}
    </div> : <POANRAFORM
         formValues={formValues_POA_NRA}
         setFormValues={setFormValues_POA_NRA}
         modalAction={modalAction}
         customerName={formValues.full_name}
         customerId={customerId}
         setPageIsLoading={setPageIsLoading}/> }
    </div> 
  );
};

export default ConsigneeForm;
