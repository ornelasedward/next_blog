import Banner from "../../components/Banner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/globals.css";
import Announcement from "../../components/Announcement";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="mx-auto">
        <Header />
        <Banner />
        {children}
        <Footer />
      </body>
    </html>
  );
}
