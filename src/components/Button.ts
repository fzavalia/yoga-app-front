import styled from "styled-components";

export default styled.div<{colors: { main: string; selected?: string };}>`
  display: inline-block;
  text-align: center;
  color: ${props => props.colors.main};
  border: 1px solid ${props => props.colors.main};
  border-radius: 5px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: color 500ms, border-color 500ms;
  &.selected,
  &:hover {
    border-color: ${props => props.colors.selected || props.colors.main};
    color: ${props => props.colors.selected || props.colors.main};
  }
  &.sm {
    padding: 0.4rem 0.7rem;
  }
`;
