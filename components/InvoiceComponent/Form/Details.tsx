import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent } from "react";
import { Input, Button } from "semantic-ui-react";
import { IInvoice_Response } from "../../../Types/invoiceTypes";

type IProps = {
  formAction: string;
  setFormValues: Dispatch<SetStateAction<IInvoice_Response>>;
  formValues: IInvoice_Response;
};

const Details = ({ setFormValues, formValues }: IProps) => {
  const handleInput = (e: ChangeEvent, { name, value }: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <p>
            <strong>Ocean Freight</strong>
          </p>
          <Input focus style={{ width: "100%" }} name="ocean_freight" onChange={handleInput} value={formValues.ocean_freight} />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <p>
            <strong>Truck</strong>
          </p>
          <Input focus style={{ width: "100%" }} name="truck" onChange={handleInput} value={formValues.truck} />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <p>
            <strong>ECTN/BESC</strong>
          </p>
          <Input focus style={{ width: "100%" }} name="ectn_besc" onChange={handleInput} value={formValues.ectn_besc} />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <Input focus style={{ width: "100%" }} name="label_1" placeholder="Label" onChange={handleInput} value={formValues.label_1} />
          <Input
            focus
            style={{ width: "100%" }}
            name="label_1_value"
            placeholder="any text"
            onChange={handleInput}
            value={formValues.label_1_value}
          />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <Input focus style={{ width: "100%" }} name="label_2" placeholder="Label" onChange={handleInput} value={formValues.label_2} />
          <Input
            focus
            style={{ width: "100%" }}
            name="label_2_value"
            placeholder="Charge amount"
            onChange={handleInput}
            value={formValues.label_2_value}
          />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <Input focus style={{ width: "100%" }} name="label_3" placeholder="Label" onChange={handleInput} value={formValues.label_3} />
          <Input
            focus
            style={{ width: "100%" }}
            name="label_3_value"
            placeholder="Charge amount"
            onChange={handleInput}
            value={formValues.label_3_value}
          />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <Input focus style={{ width: "100%" }} name="label_4" placeholder="Label" onChange={handleInput} value={formValues.label_4} />
          <Input
            focus
            style={{ width: "100%" }}
            name="label_4_value"
            placeholder="Charge amount"
            onChange={handleInput}
            value={formValues.label_4_value}
          />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <Input focus style={{ width: "100%" }} name="label_5" placeholder="Label" onChange={handleInput} value={formValues.label_5} />
          <Input
            focus
            style={{ width: "100%" }}
            name="label_5_value"
            placeholder="Charge amount"
            onChange={handleInput}
            value={formValues.label_5_value}
          />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <Input focus style={{ width: "100%" }} name="label_6" placeholder="Label" onChange={handleInput} value={formValues.label_6} />
          <Input
            focus
            style={{ width: "100%" }}
            name="label_6_value"
            placeholder="Charge amount"
            onChange={handleInput}
            value={formValues.label_6_value}
          />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <h3>Invoice total</h3>
          <Input focus style={{ width: "100%" }} name="invoice_total" onChange={handleInput} value={formValues.invoice_total} />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20 }}>
          <h3>Balance due</h3>
          <Input focus style={{ width: "100%" }} name="balance_due" onChange={handleInput} value={formValues.balance_due} />
        </div>
        <div style={{ width: "30%", marginRight: 10, marginBottom: 20, marginTop: 37 }}>
          <Button secondary>Calculate</Button>
        </div>
      </div>
    </div>
  );
};

export default Details;
