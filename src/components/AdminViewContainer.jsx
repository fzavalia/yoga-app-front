import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row} from "reactstrap";
import Header from "components/Headers/Header.jsx";

export default ({ title, children }) =>
  <>
    <Header />
    <Container className=" mt--7" fluid>
      <Row>
        <div className=" col">
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">{title}</h3>
            </CardHeader>
            <CardBody>
              {children}
            </CardBody>
          </Card>
        </div>
      </Row>
    </Container>
  </>
