import React from 'react';
import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx";

function App() {

  return (
    <div>
      <Header />
            <main>
                <h2>메인 콘텐츠</h2>
                <p>여기에 콘텐츠가 들어갑니다.</p>
            </main>
      <Footer />
    </div>
  );
}

export default App;