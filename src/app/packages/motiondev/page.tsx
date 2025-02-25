"use client";
import { motion } from "framer-motion";

const Page: React.FC = () => {
  return (
    <>
      <motion.div
        className="w-20 h-20 bg-red-500"
        animate={{ x: 100 }}
        transition={{ duration: 0.5 }}
      />
      <h1>This is a Motiondev</h1>
    </>
  );
};

export default Page;
