import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Board from "./components/board/board";
import Dashboard from "./page/dashboard/dashboard";
import Feeder from "./page/feeder/feeder";
import {
  LoadingProvider,
  useLoading,
} from "./components/loading/loadingContext";
import Lottie from "react-lottie";
import loadingAnimation from "./assets/loading.json";
import Grafik from "./page/monitoring/monitoring";

function App() {
  return (
    <LoadingProvider>
      <AppRoutes />
    </LoadingProvider>
  );
}

function AppRoutes() {
  const { isLoading } = useLoading();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000055] bg-opacity-20 z-50 flex justify-center items-center">
          <Lottie options={defaultOptions} height={100} width={100} />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Board />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/table" element={<Feeder />} />
          <Route path="/grafik" element={<Grafik />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
