import React, { useEffect, useState } from 'react';

const Home = () => {
  const [a, seta] = useState([]);
  const urls = [
    "http://20.244.56.144/numbers/primes",
    "http://20.244.56.144/numbers/fibo",
    "http://20.244.56.144/numbers/odd"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const b = urls.map(async (url) => {
        try {
          const c = await fetch(url, { timeout: 500 });
          if (!c.ok) {
            throw new Error('Error fetching data from ${url}');
          }
          const data = await c.json();
          return data.numbers;
        } catch (error) {
          console.error(error);
          return [];
        }
      });

      const d = await Promise.all(b);
      const m = [].concat(...d); 
      const uniq = [...new Set(m)]; 
      const sort = uniq.sort((a, b) => a - b); 
      seta(sort);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <pre>{JSON.stringify({ numbers: a }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Home;