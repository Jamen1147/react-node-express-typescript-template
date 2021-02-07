import Button from '../shared/Button';
import Input from '../shared/Input';

const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <Input label="User Name" placeholder="Please enter user name" />
      <br />
      <Input label="Email" placeholder="Please enter user email" />
      <br />
      <Input label="Password" placeholder="Please enter user password" />
      <br />
      <Button>Register</Button>
      <br />
      <br />
      <Button>Login</Button>
      <br />
      <br />
      <Button variant="danger">Logout</Button>
    </div>
  );
};
export default App;
