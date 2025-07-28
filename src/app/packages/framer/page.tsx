"use client";
import { motion } from "framer-motion";

const Page = () => {
  console.log("Page component rendered!");
  return (
    <>
      <motion.div
        className="w-20 h-20 bg-red-500"
        animate={{ scale: 1.2 }}
        transition={{ duration: 0.5 }}
      />
      <h2>This is a framer</h2>
    </>
  );
};

export default Page;
