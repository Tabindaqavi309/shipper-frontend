import React, { useEffect, useState } from "react";
import ClientComponent from "../../components/ClientComponent";
import ClientForm from "../../components/ClientComponent/ClientForm";
import SearchSection from "../../components/ClientComponent/SearchSection";
import ModalComponent from "../../components/ModalComponent";
import { IClientForm, clientFormObj, IClientResponse } from "../../Types/clientTypes";
import SnackBar from "../../components/SnackBar";
import { fetchCustomers, handleDeleteCustomerApi } from "../../actions/customer";
import CircularProgress from "../../components/SpinnerComponent/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { handleModal } from "../../store/actions/modal";
import { handleSnackBar, ISnackBar } from "../../store/actions/snackBar";
import ConsigneeForm from "../../components/ClientComponent/ConsigneeForm";
import { consigneeFormObj, IConsigneeForm } from "../../Types/consigneeTypes";

const Client = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formAction, setFormAction] = useState<string>("");
  const [formValues, setFormValues] = useState<IClientForm>(clientFormObj);
  const [rows, setRows] = useState<IClientResponse[]>([]);
  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.modalReducer);
  const [indexToDelete, setIndexToDelete] = useState<number>(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [offset, setOffset] = useState<number>(0);
  const [displayConsigneeForm, setDisplayConsigneeForm] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<number>(0);
  const [formValues_consignee, setFormValues_consignee] = useState<IConsigneeForm>(consigneeFormObj);
  const [rowCount, setRowCount] = useState<number>(0);
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const { data, count }: any = await fetchCustomers(offset, rowsPerPage);
      setIsLoading(false);
      setRowCount(count);
      setRows(data);
    };
    fetch();
  }, [rowsPerPage, offset, pageIsLoading]);

  const modalAction = (heading: string, display: boolean, isDelete: boolean, isDeleting: boolean = false) => {
    const data = {
      display_modal: display,
      heading: heading,
      isDelete,
      isDeleting,
    };
    dispatch(handleModal(data));
  };

  const openModalForm = () => {
    setFormAction("new");
    modalAction("New Customer", true, false);
    setFormValues(clientFormObj);
  };

  const handleDelete = (indexId: number) => {
    setIndexToDelete(indexId);
    modalAction("Delete Data", true, true);
  };

  const confirmDelete = async () => {
    //send to api then handle UI
    const snackObj: ISnackBar = {
      display_snackBar: false,
      message: "",
      isError: false,
    };

    try {
      modalAction("Delete Data", true, true, true);
      const array = [...rows];
      await handleDeleteCustomerApi(array[indexToDelete].id);
      array.splice(indexToDelete, 1);
      setRows(array);
      modalAction("", false, false);
      snackObj.display_snackBar = true;
      snackObj.message = "Customer deleted";
      dispatch(handleSnackBar(snackObj));
    } catch (e) {
      snackObj.display_snackBar = true;
      snackObj.message = "Error deleting customer";
      snackObj.isError = true;
      dispatch(handleSnackBar(snackObj));
      modalAction("", false, false);
    }
  };

  const renderForm = () =>
    !displayConsigneeForm ? (
      <ClientForm
        formValues={formValues}
        formAction={formAction}
        setFormValues={setFormValues}
        setRows={setRows}
        rows={rows}
        modalAction={modalAction}
        setCustomerId={setCustomerId}
        setDisplayConsigneeForm={setDisplayConsigneeForm}
        setPageIsLoading={setPageIsLoading}
      />
    ) : (
      <ConsigneeForm
        formValues={formValues_consignee}
        setFormValues={setFormValues_consignee}
        modalAction={modalAction}
        customerName={formValues.full_name}
        customerId={customerId}
        setPageIsLoading={setPageIsLoading}
      />
    );

  return (
    <div style={{ padding: 20 }}>
      <h2>Clients ({rowCount})</h2>
      <div style={{ marginBottom: 20 }}>
        <SearchSection openModalForm={openModalForm} setRows={setRows} setRowCount={setRowCount} />
      </div>
      {modalState.display_modal && <ModalComponent confirmDelete={confirmDelete}>{renderForm()}</ModalComponent>}

      {isLoading ? (
        <div style={{ marginTop: 200, padding: 30, justifyContent: "center", display: "flex" }}>
          <CircularProgress />
        </div>
      ) : (
        <ClientComponent
          setRows={setRows}
          rows={rows}
          setFormValues={setFormValues}
          setFormAction={setFormAction}
          modalAction={modalAction}
          handleDelete={handleDelete}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setOffset={setOffset}
          rowCount={rowCount}
        />
      )}

      <SnackBar />
    </div>
  );
};

export default Client;
