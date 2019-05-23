import React from "react";
import Button from "./Button";
import helpers from "../helpers";
import styled from "styled-components";

export default (props: {
  items: any[];
  mapItem: (
    item: any
  ) => { title: string; props: { label: string; value: any }[] };
  onCreateClick: () => void;
  onUpdateClick: (item: any) => void;
  onDeleteClick: (item: any) => void;
}) => (
  <>
    <CreateButton onClick={props.onCreateClick} />
    <ItemsContainer>
      {props.items.map((item, key) => {
        const mapped = props.mapItem(item);
        return (
          <Item key={key}>
            <h3>{mapped.title}</h3>
            <section>
              {mapped.props.map((prop, key) => (
                <ItemValue>
                  <span>{prop.label}: </span>
                  <span>{prop.value}</span>
                </ItemValue>
              ))}
            </section>
            <br />
            <ItemButtonsContainer>
              <ItemButton onClick={() => props.onUpdateClick(item)}>
                Editar
              </ItemButton>
              <ItemButton onClick={() => props.onDeleteClick(item)}>
                Borrar
              </ItemButton>
            </ItemButtonsContainer>
          </Item>
        );
      })}
    </ItemsContainer>
  </>
);

const CreateButton = (props: { onClick: () => void }) => (
  <Button
    style={{ width: "100%" }}
    onClick={props.onClick}
    colors={{
      main: helpers.color.secondary,
      selected: helpers.color.secondaryLight
    }}
  >
    Crear
  </Button>
);

const ItemsContainer = styled.ul``;

const Item = styled.li`
  padding: 0 0 1rem;
  border-bottom: solid 1px;
`;

const ItemValue = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemButtonsContainer = styled.div`
  text-align: right;
`;

const ItemButton = (props: { onClick: () => void; children: any }) => (
  <Button
    className="sm"
    style={{ marginLeft: "1rem" }}
    colors={{ main: helpers.color.secondary }}
    onClick={props.onClick}
  >
    {props.children}
  </Button>
);