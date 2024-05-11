import "./globals.css"

export const metadata = {
  title: "SocialWeb",
  description: "Rede social",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="app-container">
          <div className="main-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
