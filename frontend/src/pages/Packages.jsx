import { useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PackageItem from "../components/PackageItem";
import { getPackages, reset } from "../features/packages/packageSlice";
function Packages() {
  const { user } = useSelector((store) => store.auth);
  const { packageItems } = useSelector((store) => store.packages);
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
        border="primary"
        bg="primary"
        className="text-center p-5 d-flex flex-wrap"
      >
        <Row>
          {packageItems.map((packageItem) => (
            <Col xs={12} key={packageItem._id}>
              <PackageItem packageItem={packageItem} />
            </Col>
          ))}
        </Row>
        <Button variant="secondary" className="mt-5" onClick={goToCreateTicket}>
          Create new Package
        </Button>
      </Card>
    </Container>
  );
}

//   return (
//     <Container
//       fluid
//       className="bg-secondary min-vh-100 d-flex align-items-center justify-content-center p-5 mt-5"
//     >
//       <Card
//         bg="primary"
//         className="text-center d-flex p-5"
//         style={{ width: "60rem" }}
//       >
//      {packageItems.map((packageItem)=>{
//           return <PackageItem packageItem={packageItem} key={packageItem.id}/>
//      })}
//      <Button variant='secondary' className="mt-5" onClick={goToCreateTicket}>Create new Package</Button>
//       </Card>

//     </Container>
//   );
// }

export default Packages;
