import React, { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import helpers from "../helpers";
import Button from "./Button";
import { PaginatedResult } from "../modules/api/impl/ApiModelRequest";
import { History } from "history";

export default (props: {
  history: History;
  createItemPath: string;
  mapItem: (
    item: any
  ) => { title: string; props: { label: string; value: any }[] };
  loadMore: (page: number) => Promise<PaginatedResult<any>>;
  updateItemPath: (item: any) => string;
  deletePromise: (item: any) => Promise<void>;
  deleteMessage: (item: any) => string;
}) => {
  const [items, setItems] = useState<any[]>([]);

  const [hasMore, setHasMore] = useState(true);

  return (
    <>
      <CreateButton onClick={() => props.history.push(props.createItemPath)} />
      <ul>
        <InfiniteScroll
          pageStart={0}
          hasMore={hasMore}
          useWindow={false}
          getScrollParent={() =>
            document.getElementById("admin-content-container")
          }
          loadMore={async page => {
            const res = await props.loadMore(page);
            if (
              res.data.length === 0 ||
              res.total <= res.data.length + items.length
            ) {
              setHasMore(false);
            }
            setItems(items.concat(res.data));
          }}
        >
          {items.map((item, key) => {
            const mapped = props.mapItem(item);
            return (
              <Item key={key}>
                <h3>{mapped.title}</h3>
                <section>
                  {mapped.props.map((prop, key) => (
                    <ItemValue key={key}>
                      <span>{prop.label}: </span>
                      <span>{prop.value}</span>
                    </ItemValue>
                  ))}
                </section>
                <br />
                <ItemButtonsContainer>
                  <ItemButton
                    onClick={() =>
                      props.history.push(props.updateItemPath(item))
                    }
                  >
                    Editar
                  </ItemButton>
                  <ItemButton
                    onClick={() => {
                      if (window.confirm(props.deleteMessage(item))) {
                        props
                          .deletePromise(item)
                          .then(() =>
                            setItems(items.filter(_item => item !== _item))
                          );
                      }
                    }}
                  >
                    Borrar
                  </ItemButton>
                </ItemButtonsContainer>
              </Item>
            );
          })}
        </InfiniteScroll>
      </ul>
    </>
  );
};

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
