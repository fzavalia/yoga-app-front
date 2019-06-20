import React, { useState, useCallback, useMemo, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import helpers from "../helpers";
import Button from "./Button";
import { PaginatedResult } from "../modules/api/impl/ApiModelRequest";
import { History } from "history";
import { InputContainer, InputName } from "./FormBuilder/FormBuilder";
import Input from "./FormBuilder/Input";

interface BrowseViewProps {
  title: String;
  history: History;
  createItemPath: string;
  mapItem: (
    item: any
  ) => { title: string; props: { label: string; value: any }[] };
  loadMore: (
    page: number,
    filters?: { [name: string]: string }
  ) => Promise<PaginatedResult<any>>;
  updateItemPath: (item: any) => string;
  deletePromise: (item: any) => Promise<void>;
  deleteMessage: (item: any) => string;
  filters?: { name: string; label: string }[];
}

export default (props: BrowseViewProps) => {
  // Used to handle the state of the filters values
  const filtersFromProps = props.filters
    ? props.filters.reduce(
        (filters, next) => {
          filters[next.name] = "";
          return filters;
        },
        {} as any
      )
    : undefined;

  // State
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<
    { [filterName: string]: string } | undefined
  >(filtersFromProps);

  // Reference the infinite scroller to clear the current items when a filter changes
  const infiniteScrollerRef = useRef<any>(null);

  // Render Filter inputs depending on the ones provided via props,
  const renderFilters = () => {
    if (!props.filters || !filters) {
      return null;
    }
    return (
      <section className="browse-view-filters" style={{ margin: "1rem 0" }}>
        {props.filters.map((filter, key) => (
          <InputContainer key={key}>
            <InputName>{filter.label}</InputName>
            <Input
              name={filter.name}
              value={filters[filter.name]}
              type="text"
              onChange={(_, v) => {
                // Reset the infinite scroller loaded page so a new search can be done without an offset
                if (infiniteScrollerRef.current) {
                  infiniteScrollerRef.current.pageLoaded = 0;
                  setHasMore(true);
                  setItems([]);
                }
                // Update the filters object with a new one containing the same values except for the modified one
                setFilters({ ...filters, [filter.name]: v });
              }}
            />
          </InputContainer>
        ))}
      </section>
    );
  };

  return (
    <>
      {/** Title */}
      <h1 style={{ textAlign: "center", color: helpers.color.secondaryDark }}>
        {props.title}
      </h1>
      <CreateButton onClick={() => props.history.push(props.createItemPath)} />
      {renderFilters()}
      {/** Elements */}
      <ul>
        <InfiniteScroll
          ref={infiniteScrollerRef}
          pageStart={0}
          hasMore={hasMore}
          useWindow={false}
          getScrollParent={() =>
            document.getElementById("admin-content-container")
          }
          loadMore={async page => {
            const res = await props.loadMore(page, filters);
            if (
              res.data.length === 0 ||
              res.total <= res.data.length + items.length
            ) {
              setHasMore(false);
            }
            setItems(items.concat(res.data));
          }}
        >
          {items.length === 0 && <p>No hay elementos para mostrar.</p>}
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
  <li
    style={{
      padding: `0 0 1rem`,
      borderBottom: "solid 1px",
      color: helpers.color.secondaryDark
    }}
  >
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
