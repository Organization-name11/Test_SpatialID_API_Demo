import { useState } from 'react';

export default function Home() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [zoom, setZoom] = useState('25');
  const [alt, setAlt] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const params = new URLSearchParams({ lat, lon, zoom });
      if (alt) params.append('alt', alt);

      const res = await fetch(`/api/spatial-id?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'エラーが発生しました');
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError('通信エラー: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Spatial ID 計算ツール</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>緯度(lat): </label>
          <input value={lat} onChange={(e) => setLat(e.target.value)} required />
        </div>
        <div>
          <label>経度(lon): </label>
          <input value={lon} onChange={(e) => setLon(e.target.value)} required />
        </div>
        <div>
          <label>ズーム(zoom): </label>
          <input value={zoom} onChange={(e) => setZoom(e.target.value)} />
        </div>
        <div>
          <label>高度(alt): </label>
          <input value={alt} onChange={(e) => setAlt(e.target.value)} />
        </div>
        <button type="submit">計算</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>結果</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}