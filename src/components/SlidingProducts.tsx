// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { ArrowRight } from "lucide-react";

// import BearingInspection from "@/assets/Bearing-Inspection.jpg";
// import ChemicalLess from "@/assets/Chemical-Less- Anti-Scaling-De-Scaling-Devices.jpeg";
// import ElectricalAsset from "@/assets/Electrical-Asset-Condition-Monitoring.png";
// import LeakDetection from "@/assets/Leak-Detection.png";
// import SteamTrap from "@/assets/steam-trap-inspection.jpg";
// import Thermography from "@/assets/Thermography.png";
// import UltraSound from "@/assets/Ultra-Sound-Testing-Devices.jpg";

// const products = [
//   { title: "Bearing Inspection", img: BearingInspection },
//   { title: "Chemical-Less Anti Scaling Devices", img: ChemicalLess },
//   { title: "Electrical Asset Monitoring", img: ElectricalAsset },
//   { title: "Leak Detection", img: LeakDetection },
//   { title: "Steam Trap Inspection", img: SteamTrap },
//   { title: "Thermography", img: Thermography },
//   { title: "Ultra Sound Testing Devices", img: UltraSound },
// ];

// const CARD_WIDTH = 380; // adjust if needed
// const VISIBLE_CARDS = 3;

// const SlidingProducts = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) =>
//         prev >= products.length - VISIBLE_CARDS ? 0 : prev + 1
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="py-20 bg-white overflow-hidden">
//       <div className="container-narrow">
//         <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-orange-500">
//           Our Products
//         </h2>

//         <div className="overflow-hidden">
//           <motion.div
//             animate={{ x: -index * (CARD_WIDTH + 24) }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className="flex gap-6"
//           >
//             {products.map((product, i) => (
//               <div
//                 key={i}
//                 className="min-w-[380px] bg-gray-50 border rounded-lg shadow-sm hover:shadow-lg transition-all"
//               >
//                 <img
//                   src={product.img}
//                   alt={product.title}
//                   className="w-full h-64 object-cover"
//                 />

//                 <div className="p-6">
//                   <h3 className="text-lg font-semibold mb-6">
//                     {product.title}
//                   </h3>

//                   <div className="flex justify-between items-center border-t pt-4">
//                     <span className="text-sm text-gray-600">
//                       Read More
//                     </span>
//                     <div className="bg-orange-500 w-10 h-10 flex items-center justify-center text-white">
//                       <ArrowRight size={18} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SlidingProducts;





import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

import BearingInspection from "@/assets/Bearing-Inspection.jpg";
import ChemicalLess from "@/assets/Chemical-Less- Anti-Scaling-De-Scaling-Devices.jpeg";
import ElectricalAsset from "@/assets/Electrical-Asset-Condition-Monitoring.png";
import LeakDetection from "@/assets/Leak-Detection.png";
import SteamTrap from "@/assets/steam-trap-inspection.jpg";
import Thermography from "@/assets/Thermography.png";
import UltraSound from "@/assets/Ultra-Sound-Testing-Devices.jpg";

const products = [
  { title: "Bearing Inspection", img: BearingInspection },
  { title: "Chemical-Less Anti Scaling Devices", img: ChemicalLess },
  { title: "Electrical Asset Monitoring", img: ElectricalAsset },
  { title: "Leak Detection", img: LeakDetection },
  { title: "Steam Trap Inspection", img: SteamTrap },
  { title: "Thermography", img: Thermography },
  { title: "Ultra Sound Testing Devices", img: UltraSound },
];

const CARD_WIDTH = 380;
const VISIBLE_CARDS = 3;

const SlidingProducts = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev >= products.length - VISIBLE_CARDS ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-orange-500">
          Our Products
        </h2>

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: -index * (CARD_WIDTH + 24) }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex gap-6"
          >
            {products.map((product, i) => (
              <div
                key={i}
                className="min-w-[380px] bg-gray-50 border rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-6">
                    {product.title}
                  </h3>

                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-sm text-gray-600">
                      Read More
                    </span>
                    <div className="bg-orange-500 w-10 h-10 flex items-center justify-center text-white">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SlidingProducts;