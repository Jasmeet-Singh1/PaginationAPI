import { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState([]);
  const [next, setNext] = useState();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then((res) => res.json())
      .then((res) => {
        setData(res.results);
        setNext(res.next);
      });
  }, []);

  const loadMore = async () => {
    const more = fetch(next)
      .then((res) => res.json())
      .then((res) => {
        setData((prev) => [...prev, ...res.results]);
        setNext(res.next);
      });
  };

  console.log('data', data);
  console.log('next', next);

  return (
    <div className='bg-slate-700 text-cyan-50 min-h-0 pt-8 min-h-screen'>
      <h1 className='flex font-serif text-4xl justify-center'>Pagination API React</h1>
      <ul className='flex flex-col ml-10 text-xl'>
        {data.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <button className='flex border border-2 border-black text-2xl' onClick={loadMore}>
        Load More
      </button>
    </div>
  );
}

export default App;
