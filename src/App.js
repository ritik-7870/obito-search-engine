
import './App.css';
import {useState} from 'react'
function App() {

  const[search, setSearch] = useState("");
  const[results, setResults]= useState([]);
 
  const[searchInfo, setSearchInfo] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === '') return;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&
    prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch==${search}`;

    const response = await fetch(endpoint)
    console.log(response)

    if(!response.ok) {
      throw Error(response.statusText)
    }
    const json = await response.json()
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  }

  return (
    <>
    <div className="App">
     <header>
      <h1>OBITO ENGINE</h1>
      <form className="search-box" onSubmit={handleSearch}>
        <input type="search" value={search}
        onChange={(e) => {setSearch(e.target.value)}}
        placeholder="What are you looking for"/>
        
      </form>
      {(searchInfo.totalhits) ? <p>Search Results: {searchInfo.totalhits}</p> : "" }
     </header>
     <div className="results">
      {results.map((result, i) => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`
       return (
        <>
      <div className="result" key={i}>
        <h3 style={{marginBottom:'15px'}}>{result.title}</h3>

        <p dangerouslySetInnerHTML={{ __html: result.snippet}}></p>
        <a href={url} target="_blank" rel='nofollow'> read more</a>
      </div>
     </>
     )})}
     </div>
    </div>
    </>
  );
}

export default App;
