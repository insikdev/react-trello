# Trello

## Overview

- board 생성
- board에서 item 생성
- item drag and drop
- local storage에 저장 / 예정
- item 삭제 / 예정

##

## Drag & Drop

### DragDropContext

- onDragEnd : dnd 후 결과 처리 함수

### Droppable : drop 가능한 영역

- droppableId : unique string
- innerRef, droppableProps, placeholder 추가

### Draggable : drag 가능한 영역

- draggableId : unique string
- index : number / key와 중복 X
- innerRef
- draggableProps : drag로 움직이는 element
- dragHandleProps : drag를 할 수 있는 element
