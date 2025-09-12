import styled from "styled-components";

const Container = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  margin: 0px 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 15px;
`;

const Title = styled.div`
  color: #aaa;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NoAlertText = styled.div`
  color: #aaa;
`

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

const Badge = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  color: ${(props) =>
    props.type === "active"
      ? "#21ce99"
      : props.type === "triggered"
      ? "#f5a623"
      : "#ff6b6b"};
  background: ${(props) =>
    props.type === "active"
      ? "rgba(33,206,153,0.15)"
      : props.type === "triggered"
      ? "rgba(245,166,35,0.15)"
      : "rgba(255,107,107,0.15)"};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
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

const AlertNotification = ({
  currency,
  alerts,
  updateAlertStatus,
  removeAlert,
}) => {
  const handleDismiss = (id) => updateAlertStatus(id, "dismissed");
  const handleReactivate = (id) => updateAlertStatus(id, "active");

  return (
    <Container>
      <Header>
        <Title>Alerts</Title>
      </Header>
      {alerts.length === 0 && <NoAlertText>No alerts yet</NoAlertText>}
      {alerts.length > 0 && (
        <List>
          {alerts.map((alert) => (
            <ListItem key={alert.id}>
              <span className="white">
                {alert.coin} {alert.condition} {alert.targetPrice} {currency}
                &nbsp;
                <Badge type={alert.status || "active"}>
                  {(alert.status || "active").toUpperCase()}
                </Badge>
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
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default AlertNotification;
