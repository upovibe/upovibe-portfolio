import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<main className="min-h-screen flex flex-col items-center justify-betwee ">
  <Header />
  {children}
  <Footer/>
</main>


  );
}
