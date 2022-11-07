import { Card, Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getPackageByNumber,
  reset,
  updateCurrentPackage,
  deletePackage,
  getPackages,
} from "../features/packages/packageSlice";
import SpinnerComponent from "../components/SpinnerComponent";

const PackageItem = ({ packageItem }) => {
  const { packageDetails, isLoading, isError, isSuccess, currentPackage } =
    useSelector((store) => store.packages);
  const dispatch = useDispatch();

  const onClick = () => {
    console.log(packageItem);
    dispatch(updateCurrentPackage(packageItem._id));
  };

  const deletePackageItem = () => {
    dispatch(
      deletePackage({
        packageId: packageItem._id,
        onDelete: () => dispatch(getPackages()),
      })
    );
  };

  return (
    <Card border="secondary m-2" className="pb-5" style={{}}>
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
          <Button size="lg" variant="secondary" onClick={deletePackageItem}>
            Delete
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>{currentPackage === packageItem._id && <SpinnerComponent />}</Col>
      </Row>
    </Card>
  );
};

export default PackageItem;
