import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import AddList from "./components/AddList";
import { useRecoilState } from "recoil";
import { recoil_board, saveBoard } from "./atom";
import Board from "./components/Board";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Main = styled.main`
  width: min-content;
  display: flex;
  justify-content: flex-start;
  margin-top: 50px;
`;

const Trash = styled.div`
  position: absolute;
  top: 0;

  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [board, setBoard] = useRecoilState(recoil_board);

  const onDragEnd = (data: DropResult) => {
    const { source, destination, type } = data;

    if (!destination || !source) return;

    if (destination.droppableId === "trash") {
      if (type === "card")
        setBoard((prev) => {
          const new_item = [...board[source.droppableId]];
          new_item.splice(source.index, 1);
          return { ...prev, [source.droppableId]: new_item };
        });
      return;
    }

    if (type === "board") {
      setBoard((prev) => {
        const new_board = Object.entries(prev);
        const [temp] = new_board.splice(source.index, 1);
        new_board.splice(destination.index, 0, temp);
        return new_board.reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value,
          }),
          {}
        );
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

        <Droppable droppableId="trash" direction="vertical" type="card">
          {(p, s) => (
            <Trash ref={p.innerRef} {...p.droppableProps}>
              <FontAwesomeIcon
                icon={faTrash}
                size={s.isDraggingOver ? "4x" : "2x"}
                color={s.isDraggingOver ? "red" : "white"}
              />
            </Trash>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
