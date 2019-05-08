import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button
} from "reactstrap";
import { Link } from 'react-router-dom'
import Header from "components/Headers/Header.jsx";

export default () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className=" mt--7" fluid>
        <Row>
          <div className=" col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className=" mb-0">Alumnos</h3>
              </CardHeader>
              <CardBody>
                <Link to='/admin/students/create'>
                  <Button color="primary" size="sm">Crear</Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}