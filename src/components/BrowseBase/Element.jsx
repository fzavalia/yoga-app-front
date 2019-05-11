import React from "react";
import {
  Card,
  CardBody,
  Button
} from "reactstrap";
import { Link } from 'react-router-dom'

export default ({ element, renderContent, updatePage, deleteElementModalRef }) => {
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