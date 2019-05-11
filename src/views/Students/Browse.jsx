import React, { useEffect, useState, Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal
} from "reactstrap";
import { Link } from 'react-router-dom'
import Header from "components/Headers/Header.jsx";
import api from "../../modules/api";

export default () => {

  const [students, setStudents] = useState([])

  const fetchStudents = (value, type) =>
    api.student.list({
      where: {
        [type]: value
      }
    })
      .then(students => setStudents(students))

  useEffect(() => {
    fetchStudents('', 'name')
  }, [])

  return (
    <BrowserView
      students={students}
      onFilter={(value, type) => fetchStudents(value, type)}
      onDelete={deletableStudent =>
        api.student.delete(deletableStudent.id)
          .then(() => setStudents(students.filter(student => student.id !== deletableStudent.id)))}
    />
  )
}

const BrowserView = ({ students, onFilter, onDelete }) => {

  const [filterValue, setFilterValue] = useState('')
  const [filterType, setFilterType] = useState('name')

  useEffect(() => {
    onFilter(filterValue, filterType)
  }, [filterValue, filterType])

  return (
    <>
      <Header />
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
                <Filter onTypeChange={setFilterType} onValueChange={setFilterValue} />
                <div style={{ height: 20 }}></div>
                {students.map(student => <Student key={student.id} student={student} onDelete={() => onDelete(student)} />)}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

const Filter = ({ onValueChange, onTypeChange }) =>
  <InputGroup>
    <FilterValue onChange={onValueChange} />
    <InputGroupAddon addonType='prepend'>
      <FilterType onChange={onTypeChange} />
    </InputGroupAddon>
  </InputGroup>


const FilterType = ({ onChange }) =>
  <Input
    type='select'
    onChange={e => onChange(e.target.value)}
  >
    <option value={'name'}>Nombre</option>
    <option value={'email'}>Email</option>
    <option value={'phoneNumber'}>Teléfono</option>
    <option value={'dni'}>DNI</option>
  </Input>

class FilterValue extends Component {

  state = { value: '', previous: '' }

  componentDidMount = () => {
    this.startInterval()
  }

  componentWillUnmount = () => {
    this.stopInterval()
  }

  startInterval = () => {
    this.interval = setInterval(() => {
      if (this.state.value === this.state.previous) {
        return
      }
      this.props.onChange(this.state.value)
      this.setState({ previous: this.state.value })
    }, 1000);
  }

  stopInterval = () => {
    clearInterval(this.interval)
  }

  resetInterval = () => {
    this.stopInterval()
    this.startInterval()
  }

  render = () =>
    <Input
      onChange={e => {
        this.setState({ value: e.target.value })
        this.resetInterval()
      }}
      value={this.state.value}
    />
}

const Student = ({ student, onDelete }) =>
  useIsScreenSmall()
    ? <SmallScreenStudent student={student} onDelete={onDelete} />
    : <NormalScreenStudent student={student} onDelete={onDelete} />

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

const SmallScreenStudent = ({ student, onDelete }) =>
  <Card style={{ marginBottom: 20 }}>
    <CardBody>
      <StudentInfo student={student} />
      <SmallScreenButtonsContainer student={student} onDelete={onDelete} />
    </CardBody>
  </Card>

const NormalScreenStudent = ({ student, onDelete }) =>
  <Card style={{ marginBottom: 20 }}>
    <CardBody>
      <div style={{ display: 'flex', width: '100%' }}>
        <StudentInfo student={student} style={{ flex: 1 }} />
        <NormalScreenButtonsContainer student={student} onDelete={onDelete} />
      </div>
    </CardBody>
  </Card>

const SmallScreenButtonsContainer = ({ student, onDelete }) =>
  <ButtonsContainer style={{ marginTop: 20 }}>
    <SmallScreenUpdateButton student={student} />
    <i onClick={onDelete} style={{ cursor: 'pointer' }} className="fas fa-trash text-danger" />
  </ButtonsContainer>

const NormalScreenButtonsContainer = ({ student, onDelete }) =>
  <ButtonsContainer style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
    <NormalScreenUpdateButton student={student} />
    <div onClick={onDelete}><i style={{ cursor: 'pointer' }} className="fas fa-trash text-danger" /></div>
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