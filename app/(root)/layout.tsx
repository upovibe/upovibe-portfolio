import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-gray-950 via-gray-900 to-gray-950 ">
  <Header />
  {children}
  <Footer/>
</main>


  );
}
