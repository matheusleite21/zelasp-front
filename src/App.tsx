import { Outlet } from "react-router";

// Estrutura inicial: o layout completo (Header e Footer) entra no próximo passo
export default function App() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-zela-700">ZelaSP</h1>
      <Outlet />
    </main>
  );
}
