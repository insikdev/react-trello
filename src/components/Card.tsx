import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IBoardItem } from "../atom";

interface IProps {
  index: number;
  data: IBoardItem;
}

const List = styled.li`
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 12px;
  padding: 8px 10px;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 14px;
`;

const Card = ({ data, index }: IProps) => (
  <Draggable draggableId={data.id} index={index} key={data.id}>
    {(p, s) => (
      <List ref={p.innerRef} {...p.dragHandleProps} {...p.draggableProps}>
        <span>{data.text}</span>
      </List>
    )}
  </Draggable>
);

export default React.memo(Card);
