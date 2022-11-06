import { Card, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPackageByNumber, reset } from "../features/packages/packageSlice";
import SpinnerComponent from "../components/SpinnerComponent";

const PackageItem = ({ packageItem }) => {
  const { packageDetails, isLoading, isError, isSuccess } = useSelector(
    (store) => store.packages
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onClick = () => {
    dispatch(getPackageByNumber(packageItem.trackingNumber));
    setLoading(true);
  };

  return (
    <Card border="secondary m-2" className="pb-5">
      <Card.Body>
        <Card.Title className="text-center fw-bold">
          {packageItem.name}
        </Card.Title>
        <Card.Text>{packageItem.trackingNumber}</Card.Text>
      </Card.Body>

      <Row>
        <Col>
          <Button size="lg" variant="secondary" onClick={onClick}>
            Track
          </Button>
        </Col>
        <Col>
          <Button size="lg" variant="secondary">
            Delete
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>{packageItem.isLoading && <SpinnerComponent />}</Col>
      </Row>
    </Card>
  );
};

export default PackageItem;
