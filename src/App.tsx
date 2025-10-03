import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

export default App;