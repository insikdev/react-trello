import React from "react";
import styled from "styled-components";
import { IBoardItem } from "../atom";

interface IProps {
  key: number;
  data: IBoardItem;
}

const List = styled.li`
  width: 100%;
  background-color: white;
  margin-bottom: 12px;
  padding: 8px 10px;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 14px;
`;

const Card = ({ data }: IProps) => (
  <List>
    <span>{data.text}</span>
  </List>
);

export default React.memo(Card);
