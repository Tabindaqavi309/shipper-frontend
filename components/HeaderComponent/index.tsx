import React, { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "../../utils/cookie";
import { Input, Menu, Divider } from "semantic-ui-react";
import { fetchCustomers } from "../../actions/customer";

export default function HeaderComponent(this: any) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");

  const handleRouteChange = (route: string) => {
    if (getCookie() !== "") {
      // router.push(`/${route}`, undefined, { shallow: true });
      window.location.href = route;
    } else {
      window.location.href = "/signin?session=expired";
    }
  };

  const handleItemClick = (e: SyntheticEvent, { name }: any) => {
    if (name === "home") {
      setActiveItem(name);
      handleRouteChange("/");
    } else if (name === "POA/NRA Contract") {
      setActiveItem("poa_nra");
      handleRouteChange("poa_nra");
    } else if (name === "Booking Confirmation") {
      setActiveItem("booking_confirmation");
      handleRouteChange("booking_receipts");
    } else if (name === "Dock Receipts") {
      setActiveItem("dock_receipts");
      handleRouteChange("dock_receipts");
    } else if (name === "Invoice") {
      setActiveItem("invoice");
      handleRouteChange("invoice");
    } else {
      setActiveItem(name);
      handleRouteChange(name);
    }
  };

  return (
    <Menu secondary style={{ padding: 20 }}>
      <Menu.Item name="home" active={activeItem === "home"} onClick={handleItemClick} />
      <Menu.Item name="clients" active={activeItem === "clients"} onClick={handleItemClick} />

      <Menu.Item name="consignee" active={activeItem === "consignee"} onClick={handleItemClick} />
      <Menu.Item name="POA/NRA Contract" active={activeItem === "poa_nra"} onClick={handleItemClick} />

      <Menu.Item name="container" active={activeItem === "container"} onClick={handleItemClick} />
      <Menu.Item name="Booking Confirmation" active={activeItem === "booking_confirmation"} onClick={handleItemClick} />
      <Menu.Item name="Dock Receipts" active={activeItem === "dock_receipts"} onClick={handleItemClick} />
      <Menu.Item name="Invoice" active={activeItem === "invoice"} onClick={handleItemClick} />
    </Menu>
  );
}

{
  /* <Menu.Menu position="right">
<Menu.Item>
  <Input icon="search" placeholder="Search..." />
</Menu.Item>
<Menu.Item name="logout" active={activeItem === "logout"} onClick={handleItemClick} />
</Menu.Menu> */
}
