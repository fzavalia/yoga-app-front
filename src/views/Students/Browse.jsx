import React, { useEffect, useState, Component, useRef } from "react";
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
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { Link } from 'react-router-dom'
import Header from "components/Headers/Header.jsx";
import api from "../../modules/api";

/**
 * Boton Crear
 * Filtro
 *  Valor
 *  Typo
 * Elementos - Elementos
 *  Elemento - Elemento
 *    Contenido
 *    Editar
 *    Borrar
 * Dialogo de Borrar
 *  Titulo
 *  Descripcion
 *  Confirmar
 *  Cancelar
 */

export default () =>
  <BrowserPage
    title={'Alumnos'}
    fetchElements={(filterValue, filterType) => api.student.list({ where: { [filterType]: filterValue } })}
    deleteElement={(element) => api.student.delete(element.id)}
    updatePage={element => '/admin/students/update/' + element.id}
    createPage={'/admin/students/create'}
    filters={[
      { value: 'name', label: 'Nombre' },
      { value: 'phone_number', label: 'Telefono' },
      { value: 'email', label: 'Email' },
      { value: 'dni', label: 'DNI' },
    ]}
    renderElementContent={element =>
      <div>
        <h2>{element.name}</h2>
        <div>Email: {element.email}</div>
        <div>Telefono: {element.phoneNumber}</div>
        <div>DNI: {element.dni}</div>
      </div>}
    deleteModalTitle='Eliminar Alumno'
    renderDeleteModalContent={element => <span>Desea eliminar al Alumno <b>{element.name}</b>?</span>}
  />

const BrowserPage = ({
  fetchElements,
  deleteElement,
  updatePage,
  createPage,
  title,
  renderElementContent,
  filters,
  deleteModalTitle,
  renderDeleteModalContent
}) => {

  const [elements, setElements] = useState([])

  const deleteElementModalRef = useRef(null)

  const fetchElementsAndSet = (filterValue, filterType) => fetchElements(filterValue, filterType).then(setElements)

  useEffect(() => {
    fetchElementsAndSet('', filters[0].value)
  }, [])

  return (
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
                <Link to={createPage}><Button color="primary" size="sm">Crear</Button></Link>
                <div style={{ height: 20 }}></div>
                <FilterElements filters={filters} fetchElements={fetchElementsAndSet} />
                <div style={{ height: 20 }}></div>
                {elements.map(element =>
                  <Element
                    key={element.id}
                    element={element}
                    renderContent={renderElementContent}
                    updatePage={updatePage}
                    deleteElementModalRef={deleteElementModalRef}
                  />)}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
      <DeleteElementModal
        ref={deleteElementModalRef}
        deleteElement={deleteElement}
        onDelete={deleted => setElements(elements.filter(e => e.id !== deleted.id))}
        title={deleteModalTitle}
        renderContent={renderDeleteModalContent}
      />
    </>
  )
}

class FilterElements extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: '',
      type: props.filters[0].value
    }

    this.previousValue = this.state.value
    this.previousType = this.state.type
  }

  startInterval = () => {
    this.interval = setInterval(() => {

      const { value, type } = this.state

      if (value !== this.previousValue || type !== this.previousType) {
        this.props.fetchElements(value, type)
        this.previousValue = value
        this.previousType = type
      }
    }, 1000)
  }

  resetInterval = () => {
    clearInterval(this.interval)
    this.startInterval()
  }

  render = () =>
    <div style={{ display: 'flex' }}>
      <Input
        style={{ flex: 3 }} onChange={e => {
          this.setState({ value: e.target.value })
          this.resetInterval()
        }}
        value={this.state.value}
      />
      <Input
        style={{ flex: 1 }}
        type='select'
        onChange={e => {
          this.setState({ type: e.target.value })
          this.resetInterval()
        }}
        value={this.state.type}
      >
        {this.props.filters.map(filter => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
      </Input>
    </div>
}

const Element = ({ element, renderContent, updatePage, deleteElementModalRef }) => {
  return (
    <Card style={{ marginBottom: 20 }}>
      <CardBody>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 4, paddingRight: 10 }}>
            {renderContent(element)}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-around' }}>
            <Link to={updatePage(element)}>
              <Button color='info' size='sm'>
                Actualizar
              </Button>
            </Link>
            <Button onClick={() => deleteElementModalRef.current.open(element)} color='danger' size='sm'>
              Eliminar
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

class DeleteElementModal extends Component {

  state = { open: false, element: null }

  open = (element) => {
    this.setState({ open: true, element })
  }

  close = () => {
    this.setState({ open: false, element: null })
  }

  render = () =>
    <Modal isOpen={this.state.open} toggle={this.close}>
      <ModalHeader toggle={this.close}>{this.props.title}</ModalHeader>
      <ModalBody>
        {this.state.element && this.props.renderContent(this.state.element)}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={this.close}>
          Cancelar
        </Button>
        <Button color="primary" onClick={() =>
          this.props.deleteElement(this.state.element)
            .then(() => this.props.onDelete(this.state.element))
            .then(() => this.close())}>
          Confirmar
        </Button>
      </ModalFooter>
    </Modal>
}

// const BrowserView = ({ students, onFilter, onDelete }) => {

//   const [filterValue, setFilterValue] = useState('')
//   const [filterType, setFilterType] = useState('name')

//   const deleteStudentModalRef = useRef(null)

//   useEffect(() => {
//     onFilter(filterValue, filterType)
//   }, [filterValue, filterType])

//   return (
//     <>
//       <Header />
//       <Container className=" mt--7" fluid>
//         <Row>
//           <div className=" col">
//             <Card className=" shadow">
//               <CardHeader className=" bg-transparent">
//                 <h3 className=" mb-0">Alumnos</h3>
//               </CardHeader>
//               <CardBody>
//                 <Link to='/admin/students/create'>
//                   <Button color="primary" size="sm">Crear</Button>
//                 </Link>
//                 <div style={{ height: 20 }}></div>
//                 <Filter onTypeChange={setFilterType} onValueChange={setFilterValue} />
//                 <div style={{ height: 20 }}></div>
//                 {students.map(student => <Student key={student.id} student={student} onDelete={() => deleteStudentModalRef.current.open(student)} />)}
//               </CardBody>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//       <DeleteStudentModal ref={deleteStudentModalRef} onDelete={onDelete} />
//     </>
//   )
// }

// class DeleteStudentModal extends Component {

//   state = { open: false, student: null }

//   open = (student) => {
//     this.setState({ open: true, student })
//   }

//   close = () => {
//     this.setState({ open: false, student: null })
//   }

//   render = () =>
//     <Modal isOpen={this.state.open} toggle={this.close}>
//       <ModalHeader toggle={this.close}>Modal title</ModalHeader>
//       <ModalBody>
//         {this.state.student && `Eliminar alumno ${this.state.student.name}?`}
//       </ModalBody>
//       <ModalFooter>
//         <Button color="secondary" onClick={this.close}>Cancelar</Button>
//         <Button
//           color="primary"
//           onClick={() =>
//             api.student.delete(this.state.student.id)
//               .then(() => this.props.onDelete(this.state.student))
//               .then(() => this.close())}
//         >
//           Confirmar
//         </Button>
//       </ModalFooter>
//     </Modal>
// }

// const Filter = ({ onValueChange, onTypeChange }) =>
//   <InputGroup>
//     <FilterValue onChange={onValueChange} />
//     <InputGroupAddon addonType='prepend'>
//       <FilterType onChange={onTypeChange} />
//     </InputGroupAddon>
//   </InputGroup>


// const FilterType = ({ onChange }) =>
//   <Input
//     type='select'
//     onChange={e => onChange(e.target.value)}
//   >
//     <option value={'name'}>Nombre</option>
//     <option value={'email'}>Email</option>
//     <option value={'phoneNumber'}>Teléfono</option>
//     <option value={'dni'}>DNI</option>
//   </Input>

// class FilterValue extends Component {

//   state = { value: '', previous: '' }

//   componentDidMount = () => {
//     this.startInterval()
//   }

//   componentWillUnmount = () => {
//     this.stopInterval()
//   }

//   startInterval = () => {
//     this.interval = setInterval(() => {
//       if (this.state.value === this.state.previous) {
//         return
//       }
//       this.props.onChange(this.state.value)
//       this.setState({ previous: this.state.value })
//     }, 1000);
//   }

//   stopInterval = () => {
//     clearInterval(this.interval)
//   }

//   resetInterval = () => {
//     this.stopInterval()
//     this.startInterval()
//   }

//   render = () =>
//     <Input
//       onChange={e => {
//         this.setState({ value: e.target.value })
//         this.resetInterval()
//       }}
//       value={this.state.value}
//     />
// }

// const Student = ({ student, onDelete }) =>
//   useIsScreenSmall()
//     ? <SmallScreenStudent student={student} onDelete={onDelete} />
//     : <NormalScreenStudent student={student} onDelete={onDelete} />

// const useIsScreenSmall = () => {

//   const isScreenSmall = () => window.screen.width < 767

//   const [isSmall, setIsSmall] = useState(isScreenSmall())

//   useEffect(() => {

//     const handleResize = () => setIsSmall(isScreenSmall())

//     window.addEventListener('resize', handleResize)

//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   })

//   return isSmall
// }

// const SmallScreenStudent = ({ student, onDelete }) =>
//   <Card style={{ marginBottom: 20 }}>
//     <CardBody>
//       <StudentInfo student={student} />
//       <SmallScreenButtonsContainer student={student} onDelete={onDelete} />
//     </CardBody>
//   </Card>

// const NormalScreenStudent = ({ student, onDelete }) =>
//   <Card style={{ marginBottom: 20 }}>
//     <CardBody>
//       <div style={{ display: 'flex', width: '100%' }}>
//         <StudentInfo student={student} style={{ flex: 1 }} />
//         <NormalScreenButtonsContainer student={student} onDelete={onDelete} />
//       </div>
//     </CardBody>
//   </Card>

// const SmallScreenButtonsContainer = ({ student, onDelete }) =>
//   <ButtonsContainer style={{ marginTop: 20 }}>
//     <SmallScreenUpdateButton student={student} />
//     <i onClick={onDelete} style={{ cursor: 'pointer' }} className="fas fa-trash text-danger" />
//   </ButtonsContainer>

// const NormalScreenButtonsContainer = ({ student, onDelete }) =>
//   <ButtonsContainer style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
//     <NormalScreenUpdateButton student={student} />
//     <div onClick={onDelete}><i style={{ cursor: 'pointer' }} className="fas fa-trash text-danger" /></div>
//   </ButtonsContainer>

// const ButtonsContainer = ({ children, style = {} }) =>
//   <div style={{ textAlign: 'right', ...style }}>{children}</div>

// const SmallScreenUpdateButton = ({ student }) =>
//   <UpdateButton student={student} iStyle={{ marginRight: 40 }} />

// const NormalScreenUpdateButton = ({ student }) =>
//   <UpdateButton student={student} />

// const UpdateButton = ({ student, iStyle = {} }) =>
//   <Link to={`/admin/students/update/${student.id}`}><i style={{ cursor: 'pointer', ...iStyle }} className="fas fa-pen text-primary" /></Link>

// const StudentInfo = ({ student, style = {} }) =>
//   <div style={style}>
//     <h2>{student.name}</h2>
//     <div><i>Email:</i> {student.email || '-'}</div>
//     <div><i>Teléfono:</i> {student.phoneNumber || '-'}</div>
//     <div><i>DNI:</i> {student.dni || '-'}</div>
// </div>