export default function App() {
  return (
    <div>
      <Logo />
      <Form />
    </div>
  );
}

function Logo() {
  return <h1> 🌊 FAR AWAY 🍱</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip</h3>
    </div>
  );
}
