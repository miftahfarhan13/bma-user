import "@/styles/globals.css";
import "@/styles/style.scss";
import { AuthProvider } from "@/utils/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Figtree } from "next/font/google";
import { Toaster } from "sonner";
import "moment/locale/id";
import NotifyEvent from "@/components/car/Bid/NotifyEvent";
import useEcho from "@/utils/hooks/useEcho";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEcho();
  return (
    <main className={figtree.className}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster richColors />
          <NotifyEvent />
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </main>
  );
}
