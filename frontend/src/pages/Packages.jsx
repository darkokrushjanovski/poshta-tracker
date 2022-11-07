import { useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PackageItem from "../components/PackageItem";
import SpinnerComponent from "../components/SpinnerComponent";
import { getPackages, reset } from "../features/packages/packageSlice";
function Packages() {
  const { user } = useSelector((store) => store.auth);
  const { packageItems, isLoading } = useSelector((store) => store.packages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPackages());
    dispatch(reset());
    if (!user) {
      navigate("/");
    }
  }, [user, navigate, dispatch]);

  const goToCreateTicket = () => {
    dispatch(reset());
    navigate("/create-package");
  };

  return (
    <Container
      fluid
      className="bg-secondary min-vh-100 d-flex align-items-center justify-content-center p-5 mt-5"
    >
      <Card
        style={{ width: "80%" }}
        border="primary"
        bg="primary"
        className="text-center p-5 "
      >
        {packageItems.length < 1 && (
          <Card.Title className="text-white fs-3">
            No Packages to display
          </Card.Title>
        )}
        <Row>
          {packageItems.map((packageItem) => (
            <Col lg={4} md={6} sm={12} xs={12} key={packageItem._id}>
              <PackageItem packageItem={packageItem} />
            </Col>
          ))}
        </Row>
        {isLoading && (
          <Row>
            <Col>
              <SpinnerComponent />
            </Col>
          </Row>
        )}
        <Button variant="secondary" className="mt-5" onClick={goToCreateTicket}>
          Create new Package
        </Button>
      </Card>
    </Container>
  );
}

export default Packages;
