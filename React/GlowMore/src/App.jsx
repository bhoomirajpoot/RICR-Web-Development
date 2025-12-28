
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      
      <nav className="bg-pink-600 text-white px-6 py-4 flex justify-between">
        <h1 className="font-bold text-xl">GlowMore</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-pink-200">Home</Link>
          <Link to="/about" className="hover:text-pink-200">About</Link>
        </div>
      </nav>

    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center bg-pink-50">
      <h2 className="text-4xl font-bold text-pink-600 mb-4">
        Welcome to GlowMore ✨💖🎀
      </h2>
      <p className="text-gray-600 text-lg">
        Discover beauty with confidence
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center bg-purple-50">
      <h2 className="text-3xl font-bold text-purple-600 mb-4">
        About Us
      </h2>
      <p className="text-gray-600 text-lg max-w-md text-center">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur repudiandae animi fuga ipsam, non, odit quidem tenetur reiciendis quasi quos ratione! Modi, impedit delectus pariatur veritatis odit voluptatum perferendis libero..
      </p>
    </div>
  );
}

export default App;
