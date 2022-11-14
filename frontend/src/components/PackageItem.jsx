import { Card, Button, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getPackageByNumber,
  reset,
  updateCurrentPackage,
  deletePackage,
  getPackages,
} from "../features/packages/packageSlice";
import SpinnerComponent from "../components/SpinnerComponent";
import PackageDetails from "./PackageDetails";

const PackageItem = ({ packageItem }) => {
  const { isLoading, isError, isSuccess, currentPackage, packageDetails } =
    useSelector((store) => store.packages);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(updateCurrentPackage(packageItem.trackingNumber));
    dispatch(getPackageByNumber(packageItem.trackingNumber));
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
        <Col>
          {currentPackage === packageItem.trackingNumber && (
            <SpinnerComponent />
          )}
        </Col>
      </Row>

      <Row className="p-3">
        {packageDetails.currentPackage === packageItem.trackingNumber &&
          packageDetails.details.map((packageDetail) => (
            <Col className="text-center">
              <PackageDetails packageDetail={packageDetail} />
            </Col>
          ))}
      </Row>
    </Card>
  );
};

export default PackageItem;
