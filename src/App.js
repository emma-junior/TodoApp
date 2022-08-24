import React,{useState,} from "react";
import { useGlobalContext } from "./context";

function App() {
  const [todo, setTodo] = useState("");
  const {todoitems, setTodoitems} = useGlobalContext();
  const [toggleStatus, setToggleStatus] = useState(true);

  const isCompleted = (id) => {
    console.log(id)
    let completedItem = todoitems.map((Ttodo) => {
      if (Ttodo.id === id) {
        return { ...Ttodo, todostatus: toggleStatus };
      } else {
        return Ttodo;
      }
    });
    setTodoitems(completedItem);
    setToggleStatus(!toggleStatus);
  };

  console.log(todoitems)
  const handleSubmit = (e) => {
    e.preventDefault();
    // let g = toggleStatus
   
    if (todo) {
      const newTodo = { todo, id: new Date().getTime().toString(), todostatus: false};
      setTodoitems([...todoitems, newTodo]);
      setTodo("");
    } else {
      console.log("empty values");
    }
  };
  const removeid = (id) => {
    let newArray = todoitems.filter((array) => array.id !== id)
    setTodoitems(newArray)
  }
  return (
    <div>
      <div className="bg-[url(https://media.istockphoto.com/photos/aerial-sunset-view-at-landmark-81-is-a-super-tall-skyscraper-in-ho-picture-id1346481055?k=20&m=1346481055&s=612x612&w=0&h=btDQpq8MjfyWSzitB1rUJn8wQ-sQyfaW5jaAPoO3uoE=)] bg-cover text-center   bg-blend-normal">
        <div className="overlay">
          <h2 className="text-white py-32 font-bold text-4xl">T O D O</h2>
        </div>
      </div>

      <div className="-mt-20 md:w-1/2 md:mx-auto">
        <div className="flex opacity-100 md:text-center md:w-1/2 md:mx-auto">
          <input
            className="h-8 w-64 mx-auto mb-4 pl-4
            md:w-96 md:-ml-4 rounded-sm"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Create a new todo"
          />
          <button
            className=" text-white -ml-12  mr-4 mb-4
            md:ml-4 md:-mr-24 md:text-white md:bg-[#666] md:p-2 rounded-md "
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
        {todoitems.map((todolist) => {
          const { id, todo, todostatus } = todolist;
          return (
            <div
              className="bg-white w-64 ml-12 p-1 md:mx-auto md:w-96 "
              key={id}
            >
              <div className="flex border-solid border border-b-[#666] h-1/2 my-[auto]">
                <div className="flex ">
                  <input onChange={() => isCompleted(id)} checked={todostatus} type="checkbox" className="my-[auto] mx-2" />
                  <p className={`${todostatus ? "line-through" : ""} w-44 md:w-96`}>{todo}</p>
                </div>
                
                <div
                  onClick={() => removeid(id)}
                  className="flex bg-red-600 text-xs text-white mx-3 px-1 py-[auto] my-[auto] h-4 md:-mx-16 rounded-full cursor-pointer"
                >
                  X
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        {todoitems.length > 0 && (<button className="text-white mt-4 bg-red-600 p-1 rounded-md"
        onClick={() => setTodoitems([])}>Clear Todos</button>)}
      </div>
    </div>
  );
}

export default App;
