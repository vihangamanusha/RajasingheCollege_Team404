import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { LanguageProvider } from "./contexts/LanguageContext";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Academic } from "./pages/Academic";
import { AcademicGrades69 } from "./pages/AcademicGrades69";
import { AcademicOLevel } from "./pages/AcademicOLevel";
import { AcademicALevel } from "./pages/AcademicALevel";
import { StaffGrades69 } from "./pages/StaffGrades69";
import { StaffOLevel } from "./pages/StaffOLevel";
import { StaffALevel } from "./pages/StaffALevel";
import { AllStaff } from "./pages/AllStaff";
import { News } from "./pages/News";
import { Sports } from "./pages/Sports";
import { SportVolleyball } from "./pages/SportVolleyball";
import { SportCricket } from "./pages/SportCricket";
import { SportRugby } from "./pages/SportRugby";
import { SportKarate } from "./pages/SportKarate";
import { SportAthletics } from "./pages/SportAthletics";
import { LiveStream } from "./pages/LiveStream";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="academic" element={<Academic />} />
            <Route path="academic/grades-6-9" element={<AcademicGrades69 />} />
            <Route
              path="academic/ordinary-level"
              element={<AcademicOLevel />}
            />
            <Route
              path="academic/advanced-level"
              element={<AcademicALevel />}
            />
            <Route
              path="academic/staff/grades-6-9"
              element={<StaffGrades69 />}
            />
            <Route
              path="academic/staff/ordinary-level"
              element={<StaffOLevel />}
            />
            <Route
              path="academic/staff/advanced-level"
              element={<StaffALevel />}
            />
            <Route path="academic/all-staff" element={<AllStaff />} />
            <Route path="news" element={<News />} />
            <Route path="sports" element={<Sports />} />
            <Route path="sports/volleyball" element={<SportVolleyball />} />
            <Route path="sports/cricket" element={<SportCricket />} />
            <Route path="sports/rugby" element={<SportRugby />} />
            <Route path="sports/karate" element={<SportKarate />} />
            <Route path="sports/athletics" element={<SportAthletics />} />
            <Route path="live-stream" element={<LiveStream />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
