import { ThemeProvider } from "../components/theme-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();


function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>{children}</Router>
        </ThemeProvider>
      </Provider>
     </QueryClientProvider>
  );
}

export default AppProvider;
