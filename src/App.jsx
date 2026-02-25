import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import Configuration from './pages/Configuration';
import ApiReference from './pages/ApiReference';
import Examples from './pages/Examples';
import CliReference from './pages/CliReference';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/docs/getting-started" element={<GettingStarted />} />
        <Route path="/docs/configuration" element={<Configuration />} />
        <Route path="/docs/api-reference" element={<ApiReference />} />
        <Route path="/docs/examples" element={<Examples />} />
        <Route path="/docs/cli" element={<CliReference />} />
      </Route>
    </Routes>
  );
}
