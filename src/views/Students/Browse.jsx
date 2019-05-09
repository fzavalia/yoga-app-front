import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
} from "reactstrap";
import { Link } from 'react-router-dom'
import Header from "components/Headers/Header.jsx";

const students = [
  {
    id: 1,
    name: 'Fernando Zavalia',
    email: 'zavaliafernando@gmail.com',
    phoneNumber: '1131952988',
    dni: '37989060'
  },
  {
    id: 2,
    name: 'Fernando Zavalia',
    email: 'zavaliafernando@gmail.com',
    phoneNumber: '1131952988',
  },
  {
    id: 3,
    name: 'Fernando Zavalia',
    email: 'zavaliafernando@gmail.com',
    phoneNumber: '1131952988',
    dni: '37989060'
  },
  {
    id: 3,
    name: 'Fernando Zavalia',
    email: 'zavaliafernando@gmail.com',
    phoneNumber: '1131952988',
    dni: '37989060'
  },
  {
    id: 4,
    name: 'Fernando Zavalia',

    phoneNumber: '1131952988',
    dni: '37989060'
  },
  {
    id: 5,
    name: 'Fernando Zavalia',
    email: 'zavaliafernando@gmail.com',
    phoneNumber: '1131952988',
    dni: '37989060'
  },
  {
    id: 6,
    name: 'Fernando Zavalia',
    email: 'zavaliafernando@gmail.com',
    dni: '37989060'
  },
]

export default () =>
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
              <div style={{ height: 20 }}></div>
              {students.map(student => <Student key={student.id} student={student} />)}
            </CardBody>
          </Card>
        </div>
      </Row>
    </Container>
  </>

const Student = (props) => {

  const isScreenSmall = () => window.screen.width < 767

  const [hasToUseSmallStudent, setHasToUseSmallStudent] = useState(isScreenSmall())

  useEffect(() => {

    const handleResize = () => setHasToUseSmallStudent(isScreenSmall())

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return hasToUseSmallStudent ? <SmallScreenStudent {...props} /> : <NormalScreenStudent {...props} />
}

const SmallScreenStudent = ({ student }) =>
  <Card style={{ marginBottom: 20 }}>
    <CardBody>
      <div>
        <h2>{student.name}</h2>
        <div><i>Email:</i> {student.email || '-'}</div>
        <div><i>Teléfono:</i> {student.phoneNumber || '-'}</div>
        <div><i>DNI:</i> {student.dni || '-'}</div>
      </div>
      <div style={{ textAlign: 'right', marginTop: 20 }}>
        <i style={{ marginRight: 40, cursor: 'pointer' }} className="fas fa-pen text-blue" />
        <i style={{ cursor: 'pointer' }} className="fas fa-trash text-red" />
      </div>
    </CardBody>
  </Card>

const NormalScreenStudent = ({ student }) =>
  <Card style={{ marginBottom: 20 }}>
    <CardBody>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <h2>{student.name}</h2>
          <div><i>Email:</i> {student.email || '-'}</div>
          <div><i>Teléfono:</i> {student.phoneNumber || '-'}</div>
          <div><i>DNI:</i> {student.dni || '-'}</div>
        </div>
        <div style={{
          flex: 1,
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}>
          <div><i style={{ cursor: 'pointer' }} className="fas fa-pen text-blue" /></div>
          <div><i style={{ cursor: 'pointer' }} className="fas fa-trash text-red" /></div>
        </div>
      </div>
    </CardBody>
  </Card>