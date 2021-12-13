import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { board_item, IBoardItem } from "../atom";
import Button from "./Button";
import Card from "./Card";

interface IForm {
  text: string;
}

interface IProps {
  title: string;
  index: number;
}

const Container = styled.section`
  width: 100%;
  background-color: ${(props) => props.theme.boardBackground};
  border-radius: 4px;
  padding: 10px;
  height: min-content;
`;

const TitleText = styled.div`
  color: ${(props) => props.theme.boardTitle};
  padding: 5px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Btn = styled.button`
  width: 100%;
  padding: 6px 0px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.1s ease-in;
  &:hover {
    background: rgba(92, 93, 94, 0.1);
    cursor: pointer;
  }
  color: #636e72;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  border-radius: 4px;
  border: none;
  outline: none;
  padding: 8px;
  height: 54px;
  overflow-wrap: break-word;
  margin-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Board = ({ title, index }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [boardItem, setBoardItem] = useRecoilState(board_item);

  const onSubmit = handleSubmit(({ text }) => {
    if (text === "") return;

    const new_arr = [...boardItem[title]];
    const id = new Date().toDateString();
    new_arr.push({ id, text });
    setBoardItem((prev) => ({ ...prev, [title]: new_arr }));
    setValue("text", "");
  });

  return (
    <Draggable draggableId={title} index={index} key={title}>
      {(magic) => (
        <Container
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <TitleText> {title}</TitleText>
          <ul>
            {boardItem[title].map((data: IBoardItem, index) => (
              <Card key={index} data={data} />
            ))}
          </ul>
          {isOpen ? (
            <Form onSubmit={onSubmit}>
              <TextArea
                placeholder="Enter a title for this card..."
                {...register("text")}
              />
              <Button text="Add card" />
            </Form>
          ) : (
            <Btn onClick={() => setIsOpen(true)}>+ Add a card</Btn>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default React.memo(Board);
