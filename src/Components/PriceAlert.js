import { useState } from "react";
import styled from "styled-components";
import { showNotification } from "./Notifications";

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #555;
  border-radius: 6px;
  background: #404042;
  color: white;
  cursor: pointer;
  min-width: 100px;

  &:focus {
    outline: none;
    border-color: #21ce99;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #555;
  border-radius: 8px;
  background: #404042;
  color: white;
  font-size: 16px;
  min-width: 160px;
  flex: 1;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #21ce99;
    box-shadow: 0 0 0 2px rgba(33, 206, 153, 0.2);
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #555;
  border-radius: 20px;
  background: ${(props) => (props.active ? "#21ce99" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#aaa")};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background: ${(props) => (props.active ? "#21ce99" : "#404042")};
    border-color: #21ce99;
  }
`;

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;

const AlertsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AlertItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #333;
`;

const Actions = styled.span`
  display: flex;
  gap: 8px;
`;

const Badge = styled.span`
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 10px;
  background: ${(props) =>
    props.status === "active"
      ? "#143d2f"
      : props.status === "triggered"
      ? "#3d2b14"
      : "#3d1414"};
  color: ${(props) =>
    props.status === "active"
      ? "#21ce99"
      : props.status === "triggered"
      ? "#f5a623"
      : "#ff6b6b"};
`;

const PriceAlert = ({
  coin,
  currency = "USD",
  alerts = [],
  addAlert = () => {},
  updateAlertStatus = () => {},
  removeAlert = () => {},
}) => {
  const filteredAlerts = alerts.filter(
    (alert) => alert.coin === coin.toUpperCase()
  );

  const [form, setForm] = useState({ condition: "above", targetPrice: "" });

  const handleAdd = async () => {
    const condition = form.condition === "below" ? "below" : "above";
    const targetPrice = parseFloat(form.targetPrice);

    if (!Number.isFinite(targetPrice) || targetPrice <= 0) {
      showNotification("error", "Please enter a valid target price");
      return;
    }

    addAlert({
      coin: coin.toUpperCase(),
      condition,
      targetPrice,
    });
  };

  const handleDismiss = (id) => updateAlertStatus(id, "dismissed");
  const handleReactivate = (id) => updateAlertStatus(id, "active");

  const statusBadge = (status) => {
    if (status === "active") return <Badge status="active">Active</Badge>;
    if (status === "triggered")
      return <Badge status="triggered">Triggered</Badge>;
    return <Badge status="dismissed">Dismissed</Badge>;
  };

  return (
    <Container className="price-alerts">
      <h3 className="white">Price Alerts</h3>

      <Form className="price-alerts__form">
        <Select
          value={form.condition}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, condition: e.target.value }))
          }
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </Select>

        <Input
          type="number"
          step="0.00000001"
          placeholder={`Target price (${currency})`}
          value={form.targetPrice}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, targetPrice: e.target.value }))
          }
        />

        <Button onClick={handleAdd}>Add Alert</Button>
      </Form>

      {filteredAlerts.length !== 0 && (
        <AlertsList>
          {filteredAlerts.map((alert) => (
            <AlertItem key={alert.id}>
              <span className="white">
                {alert.coin} {alert.condition} {alert.targetPrice} {currency}
                &nbsp;{statusBadge(alert.status)}
              </span>
              <Actions>
                {alert.status !== "active" && (
                  <Button onClick={() => handleReactivate(alert.id)}>
                    Reactivate
                  </Button>
                )}
                {alert.status !== "dismissed" && (
                  <Button onClick={() => handleDismiss(alert.id)}>
                    Dismiss
                  </Button>
                )}
                <Button onClick={() => removeAlert(alert.id)}>Remove</Button>
              </Actions>
            </AlertItem>
          ))}
        </AlertsList>
      )}
    </Container>
  );
};

export default PriceAlert;
