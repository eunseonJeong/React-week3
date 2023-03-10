import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setinputValue] = useState({
    title: "",
  });

  const [targetId, setTargetId] = useState(null);
  const [targetText, setTargetText] = useState("");

  //서버통신  = 비동기
  //항상 인자를 받아야 함. async 를 사용하는 이유는 서버통신을 해서 값을 받아와야 하기 때문!!!
  // 값 저장하기
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    // console.log('데이터',data)
    setTodos(data);
  };
  // 값 불러오기
  const onSubmitHandler = async () => {
    await axios.post("http://localhost:3001/todos", inputValue);
    //화면 렌더링 시켜주기(id값이 안읽어와짐)
    // setTodos([...todos, inputValue]);

    //fetch 사용
    fetchTodos();
  };
  //값 삭제하기
  const onDelteHandler = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    //화면 렌더링 시켜주기
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };
  //수정
  const onUpdateHandler = async () => {
    await axios.patch(`http://localhost:3001/todos/${targetId}`,{
      title: targetText,
    })
    // setTodos(todos.map(item => {
    //   (item.id == targetId) ? {...item, title: targetText} : item;
    // }))
    setTodos(todos.map(item =>{
      if (item.id == targetId) {
        return {...item, title:targetText};
      } else {
        return item;
      }
    }))
  }

  useEffect(() => {
    //db로 부터 값을 가져올 것이다.
    fetchTodos();
  }, []);

  const onClickHandler = (e) => {
    setinputValue({ title: e.target.value });
  };

  const onIdHandler = (e) => {
    setTargetId(e.target.value);
  };

  const onTextHandler = (e) => {
    setTargetText(e.target.value);
  };

  return (
    <>
      <div>{/* 수정 영역 */}</div>
      <input
        type="text"
        placeholder="수정할 아이디"
        value={targetId}
        onChange={onIdHandler}
      />

      <input
        type="text"
        placeholder="수정할 내용"
        value={targetText}
        onChange={onTextHandler}
      />

      <button onClick={onUpdateHandler}>수정!</button>

      <h1>Hello</h1>

      {/* input 영역 */}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={inputValue.title}
            onChange={onClickHandler}
          />
          <button onClick={onSubmitHandler}>추가</button>.
        </form>
      </div>
      {/* 데이터 영역 */}
      <div>
        {todos?.map((item) => {
          return (
            <div key={item.id}>
              <h3>
                {item.id} : {item.title}
              </h3>
              <button onClick={() => onDelteHandler(item.id)}>삭제!</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
