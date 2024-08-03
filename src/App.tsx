import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/sonner";

import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";
import { Provider } from "react-redux";
import { store } from "./store/store";
import VerifyEmailPage from "./pages/verify-email-page";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/verifyemail/:verifycode",
    element: <VerifyEmailPage />,
  },
  {
    path: "/verifyemail",
    element: <VerifyEmailPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
