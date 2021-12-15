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

const TrashBox = styled.section`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.3);
    svg {
      color: red;
    }
  }
`;

const Trash = styled.div`
  width: 50px;
  height: 100px;
`;

function App() {
  const [board, setBoard] = useRecoilState(recoil_board);

  const onDragEnd = (data: DropResult) => {
    const { source, destination, type } = data;

    if (!destination || !source) return;

    if (destination.droppableId === "trash-card") {
      setBoard((prev) => {
        const new_item = [...board[source.droppableId]];
        new_item.splice(source.index, 1);
        return { ...prev, [source.droppableId]: new_item };
      });
      return;
    } else if (destination.droppableId === "trash-board") {
      setBoard((prev) => {
        const new_board = { ...prev };
        delete new_board[data.draggableId];
        return new_board;
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
        <TrashBox>
          <Droppable droppableId="trash-card" type="card">
            {(p) => (
              <Trash ref={p.innerRef} {...p.droppableProps}>
                {p.placeholder}
              </Trash>
            )}
          </Droppable>

          <FontAwesomeIcon icon={faTrash} size={"2x"} color={"white"} />

          <Droppable droppableId="trash-board" type="board">
            {(p) => (
              <Trash ref={p.innerRef} {...p.droppableProps}>
                {p.placeholder}
              </Trash>
            )}
          </Droppable>
        </TrashBox>
      </DragDropContext>
    </>
  );
}

export default App;
