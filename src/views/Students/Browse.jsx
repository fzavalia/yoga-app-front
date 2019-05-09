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

const Student = ({ student }) => useIsScreenSmall()
  ? <SmallScreenStudent student={student} />
  : <NormalScreenStudent student={student} />

const useIsScreenSmall = () => {

  const isScreenSmall = () => window.screen.width < 767

  const [isSmall, setIsSmall] = useState(isScreenSmall())

  useEffect(() => {

    const handleResize = () => setIsSmall(isScreenSmall())

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return isSmall
}

const SmallScreenStudent = ({ student }) =>
  <Card style={{ marginBottom: 20 }}>
    <CardBody>
      <StudentInfo student={student} />
      <SmallScreenButtonsContainer student={student} />
    </CardBody>
  </Card>

const NormalScreenStudent = ({ student }) =>
  <Card style={{ marginBottom: 20 }}>
    <CardBody>
      <div style={{ display: 'flex', width: '100%' }}>
        <StudentInfo student={student} style={{ flex: 1 }} />
        <NormalScreenButtonsContainer student={student} />
      </div>
    </CardBody>
  </Card>

const SmallScreenButtonsContainer = ({ student }) =>
  <ButtonsContainer style={{ marginTop: 20 }}>
    <SmallScreenUpdateButton student={student} />
    <i style={{ cursor: 'pointer' }} className="fas fa-trash text-danger" />
  </ButtonsContainer>

const NormalScreenButtonsContainer = ({ student }) =>
  <ButtonsContainer style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
    <NormalScreenUpdateButton student={student} />
    <div><i style={{ cursor: 'pointer' }} className="fas fa-trash text-danger" /></div>
  </ButtonsContainer>

const ButtonsContainer = ({ children, style = {} }) =>
  <div style={{ textAlign: 'right', ...style }}>{children}</div>

const SmallScreenUpdateButton = ({ student }) =>
  <UpdateButton student={student} iStyle={{ marginRight: 40 }} />

const NormalScreenUpdateButton = ({ student }) =>
  <UpdateButton student={student} />

const UpdateButton = ({ student, iStyle = {} }) =>
  <Link to={`/admin/students/update/${student.id}`}><i style={{ cursor: 'pointer', ...iStyle }} className="fas fa-pen text-primary" /></Link>

const StudentInfo = ({ student, style = {} }) =>
  <div style={style}>
    <h2>{student.name}</h2>
    <div><i>Email:</i> {student.email || '-'}</div>
    <div><i>Teléfono:</i> {student.phoneNumber || '-'}</div>
    <div><i>DNI:</i> {student.dni || '-'}</div>
  </div>