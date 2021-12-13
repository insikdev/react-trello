import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import AddList from "./components/AddList";
import { useRecoilState } from "recoil";
import { board_order } from "./atom";
import Board from "./components/Board";

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(10, 270px);
  gap: 10px;
  margin-top: 20px;
`;

function App() {
  const [boardOrder, setBoardOrder] = useRecoilState(board_order);

  const onDragEnd = ({
    type,
    draggableId,
    source,
    destination,
  }: DropResult) => {
    if (!destination || !source) return;

    if (type === "board") {
      setBoardOrder((prev) => {
        const new_state = [...prev];
        const [temp] = new_state.splice(source.index, 1);
        new_state.splice(destination?.index, 0, temp);
        return new_state;
      });
    }
  };
  return (
    <>
      <GlobalStyle />
      <AddList />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="board" direction="horizontal">
          {(p) => (
            <Main ref={p.innerRef} {...p.droppableProps}>
              {boardOrder.map((item, index) => (
                <Board title={item} key={index} index={index} />
              ))}
              {p.placeholder}
            </Main>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
