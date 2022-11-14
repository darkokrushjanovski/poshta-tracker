import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Spinner, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPackage, reset } from "../features/packages/packageSlice";
import SpinnerComponent from "../components/SpinnerComponent";

const CreatePackage = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.packages
  );

  const [PackageData, setPackageData] = useState({
    name: "",
    trackingNumber: "",
  });
  const { name, trackingNumber } = PackageData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/packages");
    }
    dispatch(reset);
  });

  const onChange = (e) => {
    setPackageData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const PackageData = {
      name,
      trackingNumber,
    };
    dispatch(createPackage(PackageData));
    dispatch(reset());
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }
  return (
    <Container
      fluid
      className="bg-secondary min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Card
        bg="primary"
        className="text-center d-flex p-2"
        style={{ width: "30rem" }}
      >
        <Card.Text className="">Create a package item</Card.Text>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label className="d-flex text-white">Package name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Package name"
              value={name}
              onChange={onChange}
              name="name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label className="d-flex text-white">
              Tracking number
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tracking number"
              value={trackingNumber}
              onChange={onChange}
              name="trackingNumber"
              required
            />
          </Form.Group>

          <Button variant="secondary" type="submit" className="mt-3">
            Create
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreatePackage;
