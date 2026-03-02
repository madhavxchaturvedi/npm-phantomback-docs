import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const GettingStarted = lazy(() => import('./pages/GettingStarted'));
const Configuration = lazy(() => import('./pages/Configuration'));
const ApiReference = lazy(() => import('./pages/ApiReference'));
const Examples = lazy(() => import('./pages/Examples'));
const CliReference = lazy(() => import('./pages/CliReference'));
const RealityMode = lazy(() => import('./pages/RealityMode'));
const Changelog = lazy(() => import('./pages/Changelog'));
const Playground = lazy(() => import('./pages/Playground'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/docs/getting-started" element={<GettingStarted />} />
          <Route path="/docs/configuration" element={<Configuration />} />
          <Route path="/docs/api-reference" element={<ApiReference />} />
          <Route path="/docs/reality-mode" element={<RealityMode />} />
          <Route path="/docs/examples" element={<Examples />} />
          <Route path="/docs/cli" element={<CliReference />} />
          <Route path="/docs/changelog" element={<Changelog />} />
          <Route path="/docs/playground" element={<Playground />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
