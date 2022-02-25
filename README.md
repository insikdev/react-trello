# Trello Clone

## Overview

- [링크](https://insikdev.github.io/react-trello/)
- trello의 board, card drag & drop 기능을 구현

## Features

- board, card 생성 및 삭제
- drag & drop 통한 board, card 이동 및 삭제
- recoil을 사용하여 state 관리
- localStorage에 정보를 저장, 불러옴

## Dependencies

- `create-react-app-typescript`
- `react-beautiful-dnd`
- `react-hook-form`
- `recoil`
- `styled-components`

## Drag & Drop

### DragDropContext

- onDragEnd : dnd 후 결과 처리 함수

### Droppable : drop 가능한 영역

- droppableId : unique string
- innerRef, droppableProps, placeholder 추가

### Draggable : drag 가능한 영역

- draggableId : unique string
- index : number / key와 중복 X
- innerRef, draggableProps, dragHandleProps 추가
- draggableProps : drag로 움직이는 element
- dragHandleProps : drag를 할 수 있는 element

## 문제

- type을 하나씩만 지정 가능 -> 삭제 버튼을 만들기 힘듬
- object의 key의 순서 -> Object.entries => reduce로 다시 object로 반환
