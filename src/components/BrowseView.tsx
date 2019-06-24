import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { History } from "history";
import DatePicker from "react-datepicker";
import helpers from "../helpers";
import Button from "./Button";
import { PaginatedResult } from "../modules/api/impl/ApiModelRequest";
import {
  InputContainer,
  InputName,
  CustomDatePickerInput
} from "./FormBuilder/FormBuilder";
import Input from "./FormBuilder/Input";

export enum FilterType {
  TEXT,
  MONTH
}

export interface FilterDefinition {
  name: string;
  label: string;
  type?: FilterType;
}

interface BrowseViewProps {
  title: String;
  history: History;
  createItemPath: string;
  mapItem: (
    item: any
  ) => { title: string; props: { label: string; value: any }[] };
  loadMore: (
    page: number,
    filters?: { [name: string]: any }
  ) => Promise<PaginatedResult<any>>;
  updateItemPath: (item: any) => string;
  deletePromise: (item: any) => Promise<void>;
  deleteMessage: (item: any) => string;
  filters?: FilterDefinition[];
}

type FiltersState = { [filterName: string]: any } | undefined;

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
  const [filters, setFilters] = useState<FiltersState>(filtersFromProps);

  // Render Filter inputs depending on the ones provided via props,
  const renderFilters = () => {
    if (!props.filters) {
      return null;
    }
    return (
      <section className="browse-view-filters" style={{ margin: "1rem 0" }}>
        {props.filters.map((filter, key) => (
          <Filter
            key={key}
            filter={filter}
            onChange={newFilterValue => {
              // Clean items
              setItems([]);
              // Update the filters object with a new one containing the same values except for the modified one
              setFilters({ ...filters, [filter.name]: newFilterValue });
              // Reset the infinite scroller loaded page so a new search can be done without an offset
              setHasMore(true);
            }}
          />
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
          // Due to the statefull nature of this component, in order to reset the loaded page to 0
          // the key needs to be different, As I only want to reset the page when a filter changes, I
          // can use the filter object as key.
          key={JSON.stringify(filters)}
          pageStart={0}
          hasMore={hasMore}
          useWindow={false}
          getScrollParent={() =>
            document.getElementById("admin-content-container")
          }
          loadMore={async page => {
            const res = await props.loadMore(page, filters);
            setHasMore(res.hasMore);
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

const Filter = (props: {
  filter: FilterDefinition;
  onChange: (newFilterValue: any) => void;
}) => {
  const { filter, onChange } = props;
  const [currentValue, setCurrentValue] = useState<any>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentValue !== undefined) {
        onChange(currentValue);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentValue]);

  switch (filter.type) {
    case FilterType.MONTH:
      return (
        <DatePicker
          selected={currentValue}
          onChange={date => setCurrentValue(date)}
          showMonthYearPicker
          dateFormat="MM/yyyy"
          customInput={<CustomDatePickerInput emptyLabel="Seleccione el Mes" />}
          isClearable
        />
      );
    default:
      return (
        <InputContainer>
          <InputName>{filter.label}</InputName>
          <Input
            name={filter.name}
            value={currentValue}
            type="text"
            onChange={(_, v) => setCurrentValue(v)}
          />
        </InputContainer>
      );
  }
};
