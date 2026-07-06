import React from "react";
import { createBrowserRouter } from "react-router";

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
import { StaffScience } from "./pages/StaffScience";
import { AllStaff } from "./pages/AllStaff";
import { News } from "./pages/News";
import { Sports } from "./pages/Sports";
import { SportVolleyball } from "./pages/SportVolleyball";
import { SportCricket } from "./pages/SportCricket";
import { SportRugby } from "./pages/SportRugby";
import { SportKarate } from "./pages/SportKarate";
import { SportAthletics } from "./pages/SportAthletics";
import { ClubsSocieties } from "./pages/clubs-societies";
import { LiveStream } from "./pages/LiveStream";
import { Contact } from "./pages/Contact";
import { Downloads } from "./pages/Download";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "academic", element: <Academic /> },
      { path: "academic/grades-6-9", element: <AcademicGrades69 /> },
      { path: "academic/ordinary-level", element: <AcademicOLevel /> },
      { path: "academic/advanced-level", element: <AcademicALevel /> },
      { path: "academic/staff/grades-6-9", element: <StaffGrades69 /> },
      { path: "academic/staff/ordinary-level", element: <StaffOLevel /> },
      { path: "academic/staff/advanced-level", element: <StaffALevel /> },
      { path: "academic/staff/science", element: <StaffScience /> },
      { path: "academic/AllStaff", element: <AllStaff /> },
      { path: "news", element: <News /> },
      { path: "sports", element: <Sports /> },
      { path: "sports/volleyball", element: <SportVolleyball /> },
      { path: "sports/cricket", element: <SportCricket /> },
      { path: "sports/rugby", element: <SportRugby /> },
      { path: "sports/karate", element: <SportKarate /> },
      { path: "sports/athletics", element: <SportAthletics /> },
      { path: "clubs-societies", element: <ClubsSocieties /> },
      { path: "live-stream", element: <LiveStream /> },
      { path: "downloads", element: <Downloads /> },
      
      { path: "contact", element: <Contact /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
