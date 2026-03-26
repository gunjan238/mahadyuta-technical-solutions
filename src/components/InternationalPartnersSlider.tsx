import { motion } from "framer-motion";
import SONOTEC from "@/assets/sonotec.jpg";
import SenseGrow from "@/assets/sensegrow.png";
import Training_Center from "@/assets/training_center.jpg";

const partners = [
  { name: "SONOTEC, Germany", logo: SONOTEC },
  { name: "SenseGrow, USA", logo: SenseGrow },
  { name: "Mobius, Australia", logo: Training_Center },
];

// Duplicate for seamless infinite loop
const extendedPartners = [...partners, ...partners];

const InternationalPartnersSlider = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-narrow text-center mb-16">
        <h2 className="text-4xl font-heading font-bold text-orange-500">
          Our International Partners
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {extendedPartners.map((partner, index) => (
            <div
              key={index}
              className="min-w-[350px] flex flex-col items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-24 object-contain mb-6"
              />
              <p className="text-blue-600 text-lg font-medium">
                {partner.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InternationalPartnersSlider;