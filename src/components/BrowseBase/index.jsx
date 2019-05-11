import React, { useEffect, useState, useRef } from "react";
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
import { FilterElements } from "./FilterElements";
import { DeleteElementModal } from "./DeleteElementModal";
import Element from "./Element";

export default ({
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