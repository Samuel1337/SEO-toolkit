import logo from './logo.svg';
import './App.css';
import WebsiteList from './components/websiteList/websiteList';
import WebsiteMeta from './components/websiteMeta/websiteMeta';
import ChatGPT from './components/chatGPT/chatGPT';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <WebsiteList/>
        <WebsiteMeta/>
        <ChatGPT/>
      </header>
    </div>
  );
}

export default App;
