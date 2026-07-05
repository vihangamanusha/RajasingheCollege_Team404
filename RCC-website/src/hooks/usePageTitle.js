import { useEffect } from "react";
import { useLocation } from "react-router";

const SCHOOL = "Rajasinghe Central College";

const PAGE_TITLES = {
  "/": SCHOOL,
  "/about": `About | ${SCHOOL}`,
  "/academic": `Academic | ${SCHOOL}`,
  "/academic/grades-6-9": `Grades 6–9 | ${SCHOOL}`,
  "/academic/ordinary-level": `O/Level | ${SCHOOL}`,
  "/academic/advanced-level": `A/Level | ${SCHOOL}`,
  "/academic/staff/grades-6-9": `Staff – Grades 6–9 | ${SCHOOL}`,
  "/academic/staff/ordinary-level": `Staff – O/Level | ${SCHOOL}`,
  "/academic/staff/advanced-level": `Staff – A/Level | ${SCHOOL}`,
  "/academic/staff/science": `Staff – Science | ${SCHOOL}`,
  "/academic/AllStaff": `All Staff | ${SCHOOL}`,
  "/news": `News | ${SCHOOL}`,
  "/sports": `Sports | ${SCHOOL}`,
  "/sports/volleyball": `Volleyball | ${SCHOOL}`,
  "/sports/cricket": `Cricket | ${SCHOOL}`,
  "/sports/rugby": `Rugby | ${SCHOOL}`,
  "/sports/karate": `Karate | ${SCHOOL}`,
  "/sports/athletics": `Athletics | ${SCHOOL}`,
  "/clubs-societies": `Clubs & Societies | ${SCHOOL}`,
  "/live-stream": `Live Stream | ${SCHOOL}`,
  "/downloads": `Downloads | ${SCHOOL}`,
  "/contact": `Contact | ${SCHOOL}`,
};

export function usePageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[pathname] ?? SCHOOL;
    document.title = title;
  }, [pathname]);
}
