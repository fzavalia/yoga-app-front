import styled from "styled-components";

const foo = (props: { dark?: Boolean }) => props.dark ? 'var(--color-primary)' : 'var(--color-secondary)'

const bar = (props: { dark?: Boolean }) => props.dark ? 'var(--color-secondary)' : 'var(--color-primary)'

export default styled.div<{ dark?: Boolean }>`
  color: ${foo};
  border: 1px solid ${foo};
  border-radius: 5px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  &.selected {
    background-color: ${foo};
    border-color: ${bar};
    color: ${bar};
  }
`;
