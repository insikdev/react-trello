import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import AddList from "./components/AddList";
import { useRecoilState } from "recoil";
import { recoil_board, saveBoard } from "./atom";
import Board from "./components/Board";
import { useEffect } from "react";

const Main = styled.main`
  width: min-content;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
`;

const Trash = styled.div`
  background-color: #ff20fa;
  width: 500px;
  height: 500px;
`;

function App() {
  const [board, setBoard] = useRecoilState(recoil_board);

  const onDragEnd = (data: DropResult) => {
    console.log(data);
    const { source, destination, type } = data;

    if (!destination || !source) return;
    if (type === "board") {
      setBoard((prev) => {
        const new_board = Object.entries(prev);
        const [temp] = new_board.splice(source.index, 1);
        new_board.splice(destination.index, 0, temp);

        const new_state = new_board.reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value,
          }),
          {}
        );
        console.log(new_state);
        return new_state;
      });
    } else if (type === "card") {
      if (source.droppableId === destination.droppableId) {
        const new_arr = [...board[source.droppableId]];
        const [temp] = new_arr.splice(source.index, 1);
        new_arr.splice(destination.index, 0, temp);
        setBoard((prev) => ({ ...prev, [source.droppableId]: new_arr }));
      } else {
        const first_arr = [...board[source.droppableId]];
        const second_arr = [...board[destination.droppableId]];
        const [temp] = first_arr.splice(source.index, 1);
        second_arr.splice(destination.index, 0, temp);
        setBoard((prev) => ({
          ...prev,
          [source.droppableId]: first_arr,
          [destination.droppableId]: second_arr,
        }));
      }
    }
  };

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  return (
    <>
      <GlobalStyle />
      <AddList />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="board">
          {(p) => (
            <Main ref={p.innerRef} {...p.droppableProps}>
              {Object.keys(board).map((item, index) => (
                <Board title={item} key={index} index={index} />
              ))}
              {p.placeholder}
            </Main>
          )}
        </Droppable>

        <Droppable droppableId="trash" direction="vertical">
          {(magic) => (
            <>
              <Trash ref={magic.innerRef} {...magic.droppableProps}>
                delete
              </Trash>
              {magic.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
