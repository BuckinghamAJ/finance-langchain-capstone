import { HashRouter, Route } from "@solidjs/router";

import "@fontsource/inter";
import Home from "./routes/Home";
import Items from "./routes/Items";
import AppShell from "./layouts/AppShell";

export default function App() {
  return (
    <HashRouter root={AppShell}>
      <Route path="/" component={Home} />
      <Route path="/items" component={Items} />
    </HashRouter>
  );
}
