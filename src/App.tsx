import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/hooks/use-wallet";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Quests from "@/pages/quests";
import Raffles from "@/pages/raffles";
import Feed from "@/pages/feed";
import Staking from "@/pages/staking";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import Admin from "@/pages/admin";
import Leaderboard from "@/pages/leaderboard";

// Survival Queue
import SurvivalLanding from "@/pages/survival/survival-landing";
import SurvivalLeaderboard from "@/pages/survival/survival-leaderboard";

function Router() {
  return (
    <Switch>
      {/* Main FUXEL */}
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/quests" component={Quests} />
      <Route path="/raffles" component={Raffles} />
      <Route path="/feed" component={Feed} />
      <Route path="/staking" component={Staking} />
      <Route path="/chat" component={Chat} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin" component={Admin} />
      <Route path="/leaderboard" component={Leaderboard} />

      {/* Survival Queue */}
      <Route path="/survival" component={SurvivalLanding} />
      <Route path="/survival/leaderboard" component={SurvivalLeaderboard} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WalletProvider>
      <TooltipProvider>
        <WouterRouter base="">
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </WalletProvider>
  );
}

export default App;
