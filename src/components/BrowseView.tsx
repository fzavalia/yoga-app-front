import React from "react";
import helpers from "../helpers";
import Button from "./Button";

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
    <ul>
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
    </ul>
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

const Item = (props: { children: any }) => (
  <li style={{ padding: `0 0 1rem`, borderBottom: "solid 1px" }}>
    {props.children}
  </li>
);

const ItemValue = (props: { children: any }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {props.children}
  </div>
);

const ItemButtonsContainer = (props: { children: any }) => (
  <div style={{ textAlign: "right" }}>{props.children}</div>
);

const ItemButton = (props: { onClick: () => void; children: any }) => (
  <Button
    size="sm"
    style={{ marginLeft: "1rem" }}
    colors={{ main: helpers.color.secondary }}
    onClick={props.onClick}
  >
    {props.children}
  </Button>
);
