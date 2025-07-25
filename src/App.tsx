import { AuthProvider } from "./features/auth/authContext";
import AppRouter from "./routes/appRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
