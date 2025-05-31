import React from "react";
import { motion } from "framer-motion";
import {
  FaSearchLocation,
  FaRegCalendarCheck,
  FaFileSignature,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSearchLocation className="text-4xl text-white mb-4" />,
    title: "Search Properties",
    desc: "Explore verified listings by location, budget, or type. Use filters to find what suits you best.",
  },
  {
    icon: <FaRegCalendarCheck className="text-4xl text-white mb-4" />,
    title: "Book a Site Visit",
    desc: "Select your preferred time & date. Our agent will assist you with guided walkthroughs.",
  },
  {
    icon: <FaFileSignature className="text-4xl text-white mb-4" />,
    title: "Finalize & Move In",
    desc: "Complete the documentation and registration with our legal help. Move in stress-free!",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 px-6 sm:px-10 font-serif">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-serif font-bold text-[#112757] mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-[#112757] max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          We simplify the property buying journey with a quick, guided, and
          secure process.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-[#112757] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }} // ✅ updated here
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-white text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
