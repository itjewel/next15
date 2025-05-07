// pages/index.tsx
import type { NextPage } from "next";
// import CardForm from "../components/CardForm";
import CardForm from "./components/CardForm";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CardForm />
    </div>
  );
};

export default Home;
