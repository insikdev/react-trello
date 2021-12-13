import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { board_item, board_order } from "../atom";
import Button from "./Button";

interface IForm {
  title: string;
}

const Header = styled.header`
  width: 270px;
  margin: 0 auto;
  padding: 10px;
  background-color: ${(props) => props.theme.boardBackground};
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border-radius: 4px;
  margin: 10px 0px;
  border: none;
  padding: 8px 10px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
  }
`;

const AddList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setBoardOrder = useSetRecoilState(board_order);
  const setBoardItem = useSetRecoilState(board_item);

  const onSubmit = handleSubmit(({ title }) => {
    if (title === "") return;
    setValue("title", "");
    setBoardOrder((prev) => [...prev, title]);
    setBoardItem((prev) => ({ ...prev, [title]: [] }));
  });

  return (
    <Header>
      <Label htmlFor="title">Add another list</Label>
      <Form onSubmit={onSubmit}>
        <Input
          id="title"
          type="text"
          placeholder="Enter list title..."
          {...register("title")}
        />
        <Button text="Add" />
      </Form>
    </Header>
  );
};

export default AddList;
