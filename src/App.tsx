import { Toaster }                          from "@/components/ui/toaster";
import { Toaster as Sonner }                from "@/components/ui/sonner";
import { TooltipProvider }                  from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route }    from "react-router-dom";

import Layout from "./components/Layout";

/* ── Core pages ── */
import Index    from "./pages/Index";
import About    from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Gallery  from "./pages/Gallery";
import Contact  from "./pages/Contact";
import NotFound from "./pages/NotFound";

/* ── Training — each dropdown section is its own page ── */
import CentreOfExcellence  from "./pages/Training/CentreOfExcellence";
import SkillDevelopment    from "./pages/Training/SkillDevelopment";
import OneDayPrograms      from "./pages/Training/OneDayPrograms";
import ThreeDayPrograms    from "./pages/Training/ThreeDayPrograms";
import FiveDayPrograms     from "./pages/Training/FiveDayPrograms";
import CertificationCourses from "./pages/Training/CertificationCourses";

/* ── Energy Optimization ── */
import CompressedAir      from "./pages/Services/compressedAir";
import HydraulicPneumatic from "./pages/Services/internalHydraulic";
import SteamTrap          from "./pages/Services/steamTrapAudit";
import AirWaterTight      from "./pages/Services/Airwatertight";
import UndergroundLeak    from "./pages/Services/UndergroundLeak";
import EnergyOptimization from "./pages/Services/EnergyOptimization";

/* ── Predictive Analytics ── */
import Partialdischargedetection  from "./pages/Services/Partialdischargedetection";
import InfraredThermography       from "./pages/Services/InfraredThermography";
import BearingConditionAssessment from "./pages/Services/Bearingconditionassessment";
import Hullintegrityassessment    from "./pages/Services/Hullintegrityassessment";
import Thermalmonitoring          from "./pages/Services/Thermalmonitoring";
import PredictiveAnalytics from "./pages/Services/PredictiveAnalytics";

/* ── IT Services ── */
import IIoTBasedCBM from "./pages/Services/IIotBasedCBM";
import Unifiednetworkcommunication from "./pages/Services/Unifiednetworkcommunication";
import Cloudservices from "./pages/Services/Cloudservices";
import Surveillancesaccesscontrol from "./pages/Services/Surveillancesaccesscontrol";
import Backupfacility from "./pages/Services/Backupfacility";
import ManagedITServices from "./pages/Services/Manageditservices";
import Ultrasonictestingdevices from "./pages/Products/Ultrasonictestingdevices";
import MonitoringSystems from "./pages/Products/MonitoringSystems";
import ScrollToTop from "./components/ScrollToTop";
import LubricationManagement from "./pages/Services/LubricationManagement";
import VibrationMonitoring from "./pages/Services/VibrationMonitoring";
import NanoWaterConverterDevice from "./pages/Products/Nanowaterconverterdevice";
import Thermalmonitoringautomationproduct from "./pages/Products/Thermalmonitoringautomationproduct";
import ThermalCamerasProduct from "./pages/Products/ThermalCamera";
import AdvancedThermalHotspotMonitoring from "./pages/Products/AdvancedThermalMonitoring";
import IndustrialEndoscopy from "./pages/Services/IndustrialEndoscopy";
import EnIndustrialEndoscopy from "./pages/Services/IndustrialEndoscopy";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Layout>
          <Routes>

            {/* ── Core ── */}
            <Route path="/"         element={<Index    />} />
            <Route path="/about"    element={<About    />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery"  element={<Gallery  />} />
            <Route path="/contact"  element={<Contact  />} />

            {/* ── Training — each section is its own dedicated page ── */}
            
            <Route path="/centre"             element={<CentreOfExcellence   />} />
            <Route path="/skill-programs"     element={<SkillDevelopment     />} />
            <Route path="/one-day"            element={<OneDayPrograms       />} />
            <Route path="/three-day"          element={<ThreeDayPrograms     />} />
            <Route path="/five-day"           element={<FiveDayPrograms      />} />
            <Route path="/certification"      element={<CertificationCourses />} />

            {/* ── Energy Optimization ── */}
            <Route path="/services/energy-optimization" element={<EnergyOptimization />} />
            <Route path="/services/compressed-air"      element={<CompressedAir      />} />
            <Route path="/services/hydraulic-pneumatic" element={<HydraulicPneumatic />} />
            <Route path="/services/steam-trap"          element={<SteamTrap          />} />
            <Route path="/services/air-water-tight"     element={<AirWaterTight      />} />
            <Route path="/services/underground-leak"    element={<UndergroundLeak    />} />

            {/* ── Predictive Analytics ── */}
            <Route path="/services/predictive-analytics" element={<PredictiveAnalytics />} />
            <Route path="/services/partial-discharge"     element={<Partialdischargedetection  />} />
            <Route path="/services/infrared-thermography" element={<InfraredThermography       />} />
            <Route path="/services/bearing-inspection"    element={<BearingConditionAssessment />} />
            <Route path="/services/hull-integrity"        element={<Hullintegrityassessment    />} />
            <Route path="/services/thermal-monitoring"    element={<Thermalmonitoring          />} />
            <Route path="/services/lubrication-management" element={<LubricationManagement />} />
            <Route path="/services/vibration-monitoring" element={<VibrationMonitoring />} />

            {/* ── IT Services ── */}
            <Route path="/services/iiot-based-cbm" element={<IIoTBasedCBM />} />
            <Route path="/services/network-communication" element={<Unifiednetworkcommunication />} />
            <Route path="/services/cloud-services" element={<Cloudservices />} />
            <Route path="/services/access-control" element={<Surveillancesaccesscontrol />} />
            <Route path="/services/backup-facility" element={<Backupfacility />} />
            <Route path="/services/it-consultancy" element={<ManagedITServices />} />

            <Route path="/services/industrial-endoscopy" element={<EnIndustrialEndoscopy />} />


            <Route path="/products/ultrasound-device" element={<Ultrasonictestingdevices />} />
            <Route path="/products/monitoring-systems" element={<MonitoringSystems />} />
            <Route path="/products/scaling-devices" element={<NanoWaterConverterDevice />} />
            <Route path="/products/automated-thermal-monitoring" element={<Thermalmonitoringautomationproduct />} />
            <Route path="/products/thermal-cameras" element={<ThermalCamerasProduct />} />
            <Route path="/products/thermal-hotspot-monitoring" element={<AdvancedThermalHotspotMonitoring />} />
            
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;