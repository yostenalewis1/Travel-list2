import { useState } from "react";

  const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: true },
];  

export default function App() {
  const [items , setItems]=useState([])
 
function handleAddItems(item)
{
  setItems(items=>[...items,item])
}


 
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌊 FAR AWAY 🍱</h1>;
}

function Form({onAddItems}) {
  const [description, setdescription] = useState("");
 const[quantity,setquantity]=useState(1);


  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return ;
    const newItem= {description , quantity , packed:false , id:Date.now()
    }
 console.log(newItem)
 onAddItems(newItem)
    
     setdescription("")
     setquantity(1)

  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what doyou need for your trip</h3>
      <select value={quantity} onChange={(e)=>setquantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({items}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      You have x item on your list , and you already packed x(x%)
    </footer>
  );
}
