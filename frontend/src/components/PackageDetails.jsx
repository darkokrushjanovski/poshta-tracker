import React from "react";
import { Col, Row } from "react-bootstrap";

function PackageDetails({ packageDetail }) {
  return (
    <>
      <p className="text-center">{packageDetail.EMRI}</p>
      <p>{packageDetail.DATA_PERPUNIMIT}</p>
      <p>{packageDetail.ZABELESKA}</p>
    </>
  );
}

export default PackageDetails;
