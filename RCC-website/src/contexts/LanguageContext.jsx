import { createContext, useContext, useState } from "react";

const LanguageContext = createContext(undefined);

const translations = {
  // Header
  "nav.home": { en: "Home", si: "මුල් පිටුව" },
  "nav.about": { en: "About", si: "අප ගැන" },
  "nav.academic": { en: "Academic", si: "අධ්‍යයන" },
  "nav.news": { en: "News", si: "පුවත්" },
  "nav.events": { en: "Events", si: "සිදුවීම්" },
  "nav.sports": { en: "Sports", si: "ක්‍රීඩා" },
  "nav.liveStream": { en: "Live Stream", si: "සජීවී විකාශනය" },
  "nav.clubs-societies": { en: "Clubs & Societies", si: "සමාජ හා සංගම්" },
  "nav.contact": { en: "Contact", si: "සම්බන්ධ වන්න" },
  "nav.lms": { en: "LMS", si: "LMS" },

  // Footer
  "footer.schoolName": {
    en: "Rajasinghe Central College",
    si: "රාජසිංහ මධ්‍ය විද්‍යාලය",
  },
  "footer.tagline": {
    en: "Excellence in Education Since 1945",
    si: "1945 සිට අධ්‍යාපනයේ විශිෂ්ටත්වය",
  },
  "footer.quickLinks": { en: "Quick Links", si: "ඉක්මන් සබැඳි" },
  "footer.copyright": {
    en: "© 2025 Rajasinghe Central College. All rights reserved.",
    si: "© 2025 රාජසිංහ මධ්‍ය විද්‍යාලය. සියලුම හිමිකම් ඇවිරිණි.",
  },

  // Home Page
  "home.welcome": { en: "WELCOME TO", si: "ඔබව සාදරයෙන් පිළිගනිමු" },
  "home.schoolName": {
    en: "RAJASINGHE CENTRAL COLLEGE",
    si: "රාජසිංහ මධ්‍ය විද්‍යාලය",
  },
  "home.subtitle": { en: "Ruwanwella", si: "රුවන්වැල්ල" },
  "home.explore": {
    en: "Explore Our Campus",
    si: "අපගේ විද්‍යාලය ගවේෂණය කරන්න",
  },
  "home.motivationTitle": { en: "Our Motivation", si: "අපගේ ආභාෂය" },
  "home.motivationQuote": {
    en: "Education is the most powerful weapon which you can use to change the world.",
    si: "ලෝකය වෙනස් කිරීමට ඔබට භාවිතා කළ හැකි ප්‍රබලතම ආයුධය අධ්‍යාපනයයි.",
  },
  "home.motivationAuthor": { en: "- Nelson Mandela", si: "- නෙල්සන් මැන්ඩෙලා" },
  "home.aboutTitle": { en: "About Our School", si: "අපගේ පාසල ගැන" },
  "home.aboutDesc": {
    en: "Rajasinghe Central College, Ruwanwella, has been a beacon of excellence in education since its establishment. We are committed to nurturing young minds and preparing them for a bright future through quality education and holistic development.",
    si: "රුවන්වැල්ල රාජසිංහ මධ්‍ය විද්‍යාලය, එහි ආරම්භයේ සිටම අධ්‍යාපනයේ විශිෂ්ටත්වයේ ප්‍රදීපයක් වී ඇත. ගුණාත්මක අධ්‍යාපනය සහ සමස්ත සංවර්ධනය තුළින් තරුණ මනස් පෝෂණය කිරීමට සහ දීප්තිමත් අනාගතයක් සඳහා ඔවුන් සූදානම් කිරීමට අපි කැප වී සිටිමු.",
  },
  "home.learnMore": { en: "Learn More", si: "වැඩිදුර දැනගන්න" },
  "home.latestNews": {
    en: "Latest News & Events",
    si: "නවතම පුවත් සහ සිදුවීම්",
  },
  "home.readMore": { en: "Read More", si: "තව කියවන්න" },
  "home.viewAll": { en: "View All News", si: "සියලු පුවත් බලන්න" },
  "home.upcomingEvents": {
    en: "Upcoming Events",
    si: "ඉදිරියට පැමිණෙන සිදුවීම්",
  },
  "home.academicTitle": {
    en: "Academic Excellence",
    si: "අධ්‍යයන විශිෂ්ටත්වය",
  },
  "home.academicDesc": {
    en: "Our academic programs are designed to challenge and inspire students across all grade levels. From Grade 6 to Advanced Level, we provide comprehensive education that prepares students for higher education and professional success.",
    si: "අපගේ අධ්‍යයන වැඩසටහන් සියලුම ශ්‍රේණි මට්ටම්වල සිසුන්ට අභියෝග කිරීමට සහ දිරිගැන්වීමට නිර්මාණය කර ඇත. 6 ශ්‍රේණියේ සිට උසස් පෙළ දක්වා, අපි උසස් අධ්‍යාපනය සහ වෘත්තීය සාර්ථකත්වය සඳහා සිසුන් සූදානම් කරන සවිස්තරාත්මක අධ්‍යාපනයක් සපයන්නෙමු.",
  },
  "home.explorePrograms": {
    en: "Explore Programs",
    si: "වැඩසටහන් ගවේෂණය කරන්න",
  },
  "home.sportsTitle": {
    en: "Sports & Athletics",
    si: "ක්‍රීඩා සහ මලල ක්‍රීඩා",
  },
  "home.sportsDesc": {
    en: "Sports play a vital role in student development at RRCC. Our comprehensive sports program includes volleyball, cricket, rugby, karate, and athletics, helping students develop discipline, teamwork, and leadership skills.",
    si: "RRCC හි සිසු සංවර්ධනයේ ක්‍රීඩාව වැදගත් කාර්යභාරයක් ඉටු කරයි. අපගේ විස්තීර්ණ ක්‍රීඩා වැඩසටහනට වොලිබෝල්, ක්‍රිකට්, රග්බි, කරාටේ සහ මලල ක්‍රීඩා ඇතුළත් වන අතර සිසුන්ට අනුශාසනය, කණ්ඩායම් ක්‍රියාකාරිත්වය සහ නායකත්ව කුසලතා වර්ධනය කිරීමට උපකාරී වේ.",
  },
  "home.lmsTitle": {
    en: "Access Learning Management System",
    si: "ඉගෙනුම් කළමනාකරණ පද්ධතිය වෙත ප්‍රවේශය",
  },
  "home.lmsDesc": {
    en: "Stay connected with your studies through our online Learning Management System. Access course materials, assignments, and stay updated with your academic progress.",
    si: "අපගේ සබැඳි ඉගෙනුම් කළමනාකරණ පද්ධතිය හරහා ඔබේ අධ්‍යයන කටයුතු සමඟ සම්බන්ධව සිටින්න. පාඨමාලා ද්‍රව්‍ය, පැවරුම් වෙත ප්‍රවේශ වී ඔබේ අධ්‍යයන ප්‍රගතිය පිළිබඳව යාවත්කාලීනව සිටින්න.",
  },
  "home.accessLMS": {
    en: "Access LMS Portal",
    si: "LMS ද්වාරය වෙත ප්‍රවේශ වන්න",
  },
  "home.aboutDesc": {
    en: "Ruwanwella Rajasinhge Central College has been a beacon of educational excellence in the Kegalle District since 1945. Our institution is committed to providing a comprehensive education that develops not only academic prowess but also character, creativity, and citizenship.",
    si: "රුවන්වැල්ල රාජසිංහ මධ්‍ය මහා විද්‍යාලය, 1945 වසරේ සිට කෑගල්ල දිස්ත්‍රික්කය තුළ අධ්‍යාපනික විශිෂ්ටත්වයේ ප්‍රදීපාගාරයක් බඳු විය. අප ආයතනය, සිසුන්ගේ අධ්‍යයන කුසලතාවයන් පමණක් නොව, ඔවුන්ගේ චරිත සංවර්ධනය, නිර්මාණශීලීත්වය සහ යහපත් පුරවැසිභාවයද ගොඩනංවන සර්වපාර්ශ්වික අධ්‍යාපනයක් ලබාදීම වෙනුවෙන් කැපවී සිටී.",
  },
  "home.motivationTitle": { en: "Our Motivation", si: "අපගේ ආභාෂය" },
  "home.motivationQuote": {
    en: "For every Rajasinghan, the journey begins with a dream and ends with achievement.",
    si: "සෑම රාජසිංහයෙකු සඳහාම, ගමන ආරම්භ වන්නේ සිහිනයකින් සහ අවසන් වන්නේ ජයග්‍රහණයකිනි.",
  },
  "home.motivationSubtext": {
    en: "Vidya Dadathi Vinayang.",
    si: "විද්‍යා දදාති විනයං.",
  },
  "home.academicIntro": {
    en: "Our academic programs are designed to challenge and inspire students across all grade levels. From Grade 6 to Advanced Level, we provide comprehensive education that prepares students for higher education and professional success.",
    si: "අපගේ අධ්‍යයන වැඩසටහන් සියලුම ශ්‍රේණි මට්ටම්වල සිසුන්ට අභියෝග කිරීමට සහ දිරිගැන්වීමට නිර්මාණය කර ඇත. 6 ශ්‍රේණියේ සිට උසස් පෙළ දක්වා, අපි උසස් අධ්‍යාපනය සහ වෘත්තීය සාර්ථකත්වය සඳහා සිසුන් සූදානම් කරන සවිස්තරාත්මක අධ්‍යාපනයක් සපයන්නෙමු.",
  },

  // Sports Page
  "sports.title": { en: "Sports ", si: "ක්‍රීඩා " },
  "sports.championsTitle": { en: "Champions in Sports", si: "ක්‍රීඩා ශූරයන්" },
  "sports.intro": {
    en: "At RRCC, we believe that sports are essential for developing discipline, teamwork, and leadership. Our comprehensive sports program has produced numerous district and provincial champions who have made our school proud.",
    si: "RRCC හි, අනුශාසනය, කණ්ඩායම් ක්‍රියාකාරිත්වය සහ නායකත්වය වර්ධනය කිරීම සඳහා ක්‍රීඩා අත්‍යවශ්‍ය බව අපි විශ්වාස කරමු. අපගේ විස්තීර්ණ ක්‍රීඩා වැඩසටහන අපගේ පාසල ගෞරවයට පත් කළ බොහෝ දිස්ත්‍රික් සහ පළාත් ශූරයන් බිහි කර ඇත.",
  },
  "sports.weOffer": { en: "Sports We Offer", si: "අප පිරිනමන ක්‍රීඩා" },
  "sports.weOfferDesc": {
    en: "Explore our diverse range of sports programs designed to develop champions in athletics, teamwork, and character.",
    si: "මලල ක්‍රීඩා, කණ්ඩායම් ක්‍රියාකාරිත්වය සහ චරිතය තුළ ශූරයන් වර්ධනය කිරීම සඳහා නිර්මාණය කරන ලද අපගේ විවිධාකාර ක්‍රීඩා වැඩසටහන් ගවේෂණය කරන්න.",
  },
  "sports.volleyball": { en: "Volleyball", si: "වොලිබෝල්" },
  "sports.cricket": { en: "Cricket", si: "ක්‍රිකට්" },
  "sports.rugby": { en: "Rugby", si: "රග්බි" },
  "sports.karate": { en: "Karate", si: "කරාටේ" },
  "sports.others": { en: "Others", si: "අනෙකුරු" },
  "sports.coachingStaff": {
    en: "Expert Coaching Staff",
    si: "ප්‍රවීණ පුහුණු කාර්ය මණ්ඩලය",
  },
  "sports.joinTitle": {
    en: "Join Our Sports Programs",
    si: "අපගේ ක්‍රීඩා වැඩසටහන් වලට එක්වන්න",
  },
  "sports.joinDesc": {
    en: "Whether you're a beginner or aspiring champion, our sports programs are designed to help you reach your full potential. Join us today!",
    si: "ඔබ ආරම්භකයෙක් හෝ අපේක්ෂිත ශූරයෙක් වුවද, අපගේ ක්‍රීඩා වැඩසටහන් නිර්මාණය කර ඇත්තේ ඔබගේ සම්පූර්ණ හැකියාව කරා ළඟා වීමට උපකාර කිරීම සඳහා ය. අද අප හා එක්වන්න!",
  },

  // About Page
  "about.title": { en: "ABOUT_US", si: "අප ගැන" },
  "about.ourHistory": { en: "Our History", si: "අපගේ ඉතිහාසය" },
  "about.missionVision": { en: "Mission & Vision", si: "මෙහෙවර සහ දැක්ම" },
  "about.ourMission": { en: "Our Mission", si: "අපගේ මෙහෙවර" },
  "about.ourVision": { en: "Our Vision", si: "අපගේ දැක්ම" },
  "about.principalMessage": {
    en: "Principal's Message",
    si: "විදුහල්පති පණිවිඩය",
  },
  "about.principal": { en: "Principal", si: "විදුහල්පති" },

  // Academic Page
  "academic.title": { en: "Academic Programs", si: "අධ්‍යයන වැඩසටහන්" },
  "academic.excellence": {
    en: "Academic Excellence",
    si: "අධ්‍යයන විශිෂ්ටත්වය",
  },
  "academic.programs": {
    en: "Our Academic Programs",
    si: "අපගේ අධ්‍යයන වැඩසටහන්",
  },
  "academic.grades69": { en: "Grades 6-9", si: "6-9 ශ්‍රේණි" },
  "academic.oLevel": { en: "Ordinary Level", si: "සාමාන්‍ය පෙළ" },
  "academic.aLevel": { en: "Advanced Level", si: "උසස් පෙළ" },
  "academic.examExcellence": {
    en: "Examination Excellence",
    si: "විභාග විශිෂ්ටත්වය",
  },
  "academic.facilities": { en: "Learning Facilities", si: "ඉගෙනුම් පහසුකම්" },
  "academic.staff": { en: "Academic Staff", si: "අධ්‍යයන කාර්ය මණ්ඩලය" },
  "academic.seeAllStaff": {
    en: "See All Staff Members",
    si: "සියලුම කාර්ය මණ්ඩල සාමාජිකයින් බලන්න",
  },
  "academic.lmsAccess": { en: "LMS Portal Access", si: "LMS ද්වාර ප්‍රවේශය" },
  "academic.accessPortal": {
    en: "Access LMS Portal",
    si: "LMS ද්වාරය වෙත ප්‍රවේශ වන්න",
  },

  // Contact Page
  "contact.title": { en: "Contact Us", si: "අප සමඟ සම්බන්ධ වන්න" },
  "contact.getInTouch": { en: "Get In Touch", si: "සම්බන්ධ වන්න" },
  "contact.info": { en: "Contact Information", si: "සම්බන්ධතා තොරතුරු" },
  "contact.address": { en: "Address", si: "ලිපිනය" },
  "contact.phone": { en: "Phone", si: "දුරකථනය" },
  "contact.email": { en: "Email", si: "විද්‍යුත් තැපෑල" },
  "contact.sendMessage": { en: "Send us a Message", si: "අපට පණිවිඩයක් යවන්න" },
  "contact.yourName": { en: "Your Name", si: "ඔබගේ නම" },
  "contact.yourEmail": { en: "Your Email", si: "ඔබගේ විද්‍යුත් තැපෑල" },
  "contact.subject": { en: "Subject", si: "විෂයය" },
  "contact.message": { en: "Message", si: "පණිවිඩය" },
  "contact.send": { en: "Send Message", si: "පණිවිඩය යවන්න" },
  "contact.location": { en: "Our Location", si: "අපගේ ස්ථානය" },

  // News Page
  "news.title": { en: "News & Updates", si: "පුවත් සහ යාවත්කාලීන" },
  "news.latest": { en: "Latest News", si: "නවතම පුවත්" },

  // Sport Detail Pages - Common
  "sport.about": { en: "About Our", si: "අපගේ" },
  "sport.team": { en: "Team", si: "කණ්ඩායම" },
  "sport.program": { en: "Program", si: "වැඩසටහන" },
  "sport.achievements": {
    en: "Championship Achievements",
    si: "ශූරතා ජයග්‍රහණ",
  },
  "sport.achievementsAlt": { en: "Our Achievements", si: "අපගේ ජයග්‍රහණ" },
  "sport.excellence": {
    en: "Tournament Excellence",
    si: "තරඟාවලි විශිෂ්ටත්වය",
  },
  "sport.recordBreaking": {
    en: "Record-Breaking Achievements",
    si: "වාර්තා බිඳ දැමූ ජයග්‍රහණ",
  },

  // Volleyball
  "volleyball.tagline": {
    en: "Teamwork, Precision, Victory",
    si: "කණ්ඩායම් ක්‍රියාව, නිරවද්‍යතාව, ජයග්‍රහණය",
  },
  "volleyball.desc1": {
    en: "Volleyball has been a prominent sport at Ruwanwella Rajasinghe Central College since 1975. Our volleyball program has produced numerous talented players who have represented the school at district, provincial, and national levels.",
    si: "1975 සිට රුවන්වැල්ල රාජසිංහ මධ්‍ය විද්‍යාලයේ වොලිබෝල් ප්‍රමුඛ ක්‍රීඩාවක් වී ඇත. අපගේ වොලිබෝල් වැඩසටහන දිස්ත්‍රික්, පළාත් සහ ජාතික මට්ටමින් පාසල නියෝජනය කළ දක්ෂ ක්‍රීඩකයින් රැසක් බිහි කර ඇත.",
  },
  "volleyball.desc2": {
    en: "The team trains regularly under professional coaching and participates in various inter-school tournaments throughout the year. We have state-of-the-art indoor and outdoor courts that provide excellent training facilities for our players.",
    si: "කණ්ඩායම වෘත්තීය පුහුණුව යටතේ නිතිපතා පුහුණු වන අතර වසර පුරා විවිධ අන්තර් පාසල් තරඟාවලීන්වල සහභාගී වේ. අපගේ ක්‍රීඩකයින්ට විශිෂ්ට පුහුණු පහසුකම් සපයන අති නවීන ගෘහස්ථ සහ එළිමහන් පිටි අප සතුව ඇත.",
  },
  "volleyball.desc3": {
    en: "Our volleyball team is known for their teamwork, discipline, and competitive spirit. We welcome students from all grades to join our training sessions and be part of this winning tradition.",
    si: "අපගේ වොලිබෝල් කණ්ඩායම ඔවුන්ගේ කණ්ඩායම් ක්‍රියාකාරිත්වය, විනය සහ තරඟකාරී ආත්මය සඳහා ප්‍රසිද්ධය. මෙම ජයග්‍රාහී සම්ප්‍රදායේ කොටසක් වීමට අපගේ පුහුණු සැසිවලට සම්බන්ධ වීමට සියලුම ශ්‍රේණිවල සිසුන්ට සාදරයෙන් පිළිගනිමු.",
  },

  // Cricket
  "cricket.tagline": {
    en: "Tradition, Excellence, Pride",
    si: "සම්ප්‍රදාය, විශිෂ්ටත්වය, ආඩම්බරය",
  },
  "cricket.desc1": {
    en: "Cricket has been the pride of RRCC since 1965. Our cricket program is one of the oldest and most successful sports programs in the school, producing talented cricketers who have gone on to play at national and international levels.",
    si: "1965 සිට ක්‍රිකට් RRCC හි ආඩම්බරය වී ඇත. අපගේ ක්‍රිකට් වැඩසටහන පාසලේ පැරණිතම හා වඩාත්ම සාර්ථක ක්‍රීඩා වැඩසටහන් වලින් එකක් වන අතර ජාතික සහ ජාත්‍යන්තර මට්ටමින් ක්‍රීඩා කිරීමට ගිය දක්ෂ ක්‍රිකට් ක්‍රීඩකයින් බිහි කර ඇත.",
  },
  "cricket.desc2": {
    en: "We have well-maintained turf wickets and modern practice facilities. The team receives professional coaching and participates in various inter-school tournaments including the prestigious Singer Schools Cricket Tournament.",
    si: "අපට හොඳින් නඩත්තු කරන ලද තණකොළ කඩුලු සහ නවීන පුහුණු පහසුකම් ඇත. කණ්ඩායම වෘත්තීය පුහුණුව ලබන අතර කීර්තිමත් සිංගර් පාසල් ක්‍රිකට් තරඟාවලිය ඇතුළු විවිධ අන්තර් පාසල් තරඟාවලීන්වල සහභාගී වේ.",
  },
  "cricket.desc3": {
    en: "Our cricket academy focuses on developing both technical skills and mental toughness, preparing students for competitive cricket at all levels.",
    si: "අපගේ ක්‍රිකට් ඇකඩමිය තාක්ෂණික කුසලතා සහ මානසික ශක්තිය යන දෙකම වර්ධනය කිරීම කෙරෙහි අවධානය යොමු කරන අතර සියලුම මට්ටම්වල තරඟකාරී ක්‍රිකට් සඳහා සිසුන් සූදානම් කරයි.",
  },

  // Rugby
  "rugby.tagline": {
    en: "Strength, Strategy, and Spirit",
    si: "ශක්තිය, උපාය මාර්ග සහ ආත්මය",
  },
  "rugby.desc1": {
    en: "Rugby has been a cornerstone of sporting excellence at RRCC since 1980. Our rugby program emphasizes not just physical prowess, but also mental toughness, strategic thinking, and unwavering team spirit.",
    si: "1980 සිට RRCC හි ක්‍රීඩා විශිෂ්ටත්වයේ මූලික ගලක් ලෙස රග්බි තිබේ. අපගේ රග්බි වැඩසටහන කායික දක්ෂතාව පමණක් නොව, මානසික ශක්තිය, උපායමාර්ගික චින්තනය සහ නොසැලෙන කණ්ඩායම් ආත්මය ද අවධාරණය කරයි.",
  },
  "rugby.desc2": {
    en: "With a dedicated training ground and professional coaching staff, our rugby team competes at the highest levels of school rugby. We participate in the prestigious All-Island Schools Rugby Tournament and various invitational championships.",
    si: "කැප වූ පුහුණු පිටියක් සහ වෘත්තීය පුහුණු කාර්ය මණ්ඩලයක් සමඟ, අපගේ රග්බි කණ්ඩායම පාසල් රග්බි ක්‍රීඩාවේ ඉහළම මට්ටම්වල තරඟ කරයි. අපි කීර්තිමත් සමස්ත දිවයින පාසල් රග්බි තරඟාවලිය සහ විවිධ ආරාධිත ශූරතා තරඟවලට සහභාගී වෙමු.",
  },
  "rugby.desc3": {
    en: "Our rugby academy focuses on developing complete athletes who excel both on the field and in the classroom, embodying the true spirit of rugby values.",
    si: "අපගේ රග්බි ඇකඩමිය රග්බි වටිනාකම්වල සැබෑ ආත්මය මූර්තිමත් කරමින්, පිටියේ සහ පන්ති කාමරයේ යන දෙඅංශයෙන්ම විශිෂ්ට වන සම්පූර්ණ ක්‍රීඩකයින් වර්ධනය කිරීම කෙරෙහි අවධානය යොමු කරයි.",
  },

  // Karate
  "karate.tagline": {
    en: "Discipline, Focus, Excellence",
    si: "විනය, අවධානය, විශිෂ්ටත්වය",
  },
  "karate.desc1": {
    en: "Since 1985, RRCC's karate program has been a beacon of martial arts excellence. We follow the traditional Shotokan style, emphasizing character development alongside technical mastery.",
    si: "1985 සිට, RRCC හි කරාටේ වැඩසටහන සටන් කලාවේ විශිෂ්ටත්වයේ ප්‍රදීපයක් වී ඇත. අපි සාම්ප්‍රදායික ෂොටෝකන් විලාසය අනුගමනය කරන අතර, තාක්ෂණික ප්‍රවීණත්වය සමඟින් චරිත වර්ධනය අවධාරණය කරමු.",
  },
  "karate.desc2": {
    en: "Our students train under certified black belt instructors and regularly compete in national and international tournaments. The dojo is equipped with professional-grade mats and training equipment to ensure safe and effective practice.",
    si: "අපගේ සිසුන් සහතික කළ කළු පටි උපදේශකයින් යටතේ පුහුණු වන අතර ජාතික සහ ජාත්‍යන්තර තරඟාවලීන්වල නිතිපතා තරඟ කරයි. ආරක්ෂිත සහ ඵලදායී පුහුණුව සහතික කිරීම සඳහා ඩෝජෝව වෘත්තීය මට්ටමේ පැදුරු සහ පුහුණු උපකරණ වලින් සමන්විත වේ.",
  },
  "karate.desc3": {
    en: "Beyond competition, our karate program instills values of respect, self-discipline, and perseverance that serve students throughout their lives.",
    si: "තරඟයෙන් ඔබ්බට, අපගේ කරාටේ වැඩසටහන සිසුන්ගේ මුළු ජීවිත කාලය පුරාම ඔවුන්ට සේවය කරන ගෞරවය, ස්වයං විනය සහ ස්ථීරසාරී බව යන වටිනාකම් පැතිරවීමට උපකාරී වේ.",
  },

  // Athletics
  "athletics.tagline": {
    en: "Speed, Strength, Endurance",
    si: "වේගය, ශක්තිය, විඳදරාගැනීම",
  },
  "athletics.desc1": {
    en: "Athletics has been the foundation of sporting culture at RRCC since our establishment. Our comprehensive track and field program covers sprints, middle and long-distance running, jumping events, and throwing disciplines.",
    si: "අපගේ ආරම්භයේ සිටම RRCC හි ක්‍රීඩා සංස්කෘතියේ පදනම මලල ක්‍රීඩා වී ඇත. අපගේ සවිස්තරාත්මක ධාවන පථ සහ පිටි වැඩසටහන කෙටි දුර, මධ්‍ය සහ දිගු දුර ධාවන, පැනීමේ ඉසව් සහ විසි කිරීමේ විෂයයන් ආවරණය කරයි.",
  },
  "athletics.desc2": {
    en: "With a state-of-the-art 400-meter synthetic track and professional training facilities, our athletes train year-round under qualified coaches. We participate in all major athletics meets including the All-Island Schools Championships and Provincial Games.",
    si: "අති නවීන මීටර් 400 කෘතිම ධාවන පථයක් සහ වෘත්තීය පුහුණු පහසුකම් සමඟින්, අපගේ මලල ක්‍රීඩකයින් සුදුසුකම් ලත් පුහුණුකරුවන් යටතේ වසර පුරා පුහුණු වේ. අපි සමස්ත දිවයින පාසල් ශූරතා තරඟාවලිය සහ පළාත් ක්‍රීඩා ඇතුළු සියලුම ප්‍රධාන මලල ක්‍රීඩා තරඟවලට සහභාගී වෙමු.",
  },
  "athletics.desc3": {
    en: "Our athletics program has produced numerous national champions and record holders, with many alumni going on to represent the country at international competitions.",
    si: "අපගේ මලල ක්‍රීඩා වැඩසටහන බොහෝ ජාතික ශූරයන් සහ වාර්තා හිමියන් බිහි කර ඇති අතර, බොහෝ ශිෂ්‍ය ශිෂ්‍යාවන් ජාත්‍යන්තර තරඟවලදී රට නියෝජනය කරමින් සිටී.",
  },

  // Live Stream
  "livestream.title": { en: "Live Stream", si: "සජීවී විකාශනය" },
  "livestream.watch": { en: "Watch Live Events", si: "සජීවී සිදුවීම් නරඹන්න" },
  "livestream.noLive": {
    en: "No Live Stream Currently",
    si: "දැනට සජීවී විකාශනයක් නැත",
  },
  "livestream.upcoming": {
    en: "Upcoming Live Events",
    si: "ඉදිරියට එන සජීවී සිදුවීම්",
  },

  // Contact
  "contact.getInTouch": { en: "Get In Touch", si: "අප හා සම්බන්ධ වන්න" },
  "contact.contactInfo": { en: "Contact Information", si: "සම්බන්ධතා තොරතුරු" },
  "contact.address": { en: "Address", si: "ලිපිනය" },
  "contact.phone": { en: "Phone", si: "දුරකථනය" },
  "contact.email": { en: "Email", si: "විද්‍යුත් තැපෑල" },
  "contact.sendMessage": { en: "Send us a Message", si: "අපට පණිවිඩයක් යවන්න" },
  "contact.yourName": { en: "Your Name", si: "ඔබගේ නම" },
  "contact.yourEmail": { en: "Your Email", si: "ඔබගේ විද්‍යුත් තැපෑල" },
  "contact.subject": { en: "Subject", si: "විෂයය" },
  "contact.message": { en: "Message", si: "පණිවිඩය" },
  "contact.send": { en: "Send Message", si: "පණිවිඩය යවන්න" },
  "contact.location": { en: "Our Location", si: "අපගේ ස්ථානය" },
  "contact.intro": {
    en: "We'd love to hear from you! Whether you have questions about admissions, academic programs, or general inquiries, our team is here to help.",
    si: "ඔබෙන් අසන්නට අපි කැමතියි! ඔබට ප්‍රවේශය, අධ්‍යයන වැඩසටහන් හෝ සාමාන්‍ය විචාරණ පිළිබඳ ප්‍රශ්න තිබේ නම්, අපගේ කණ්ඩායම ඔබට උපකාර කිරීමට මෙහි සිටී.",
  },
  "contact.officeHours": { en: "Office Hours", si: "කාර්යාල වේලාවන්" },

  // About Page
  "about.ourHistory": { en: "Our History", si: "අපගේ ඉතිහාසය" },
  "about.historyDesc": {
    en: "Ruwanwella Rajasinghe Central College was established in 1960 with the vision of providing quality education to students in the Ruwanwella area. Over the past six decades, we have grown from a small school with limited resources to a prestigious educational institution serving thousands of students.",
    si: "රුවන්වැල්ල රාජසිංහ මධ්‍ය විද්‍යාලය 1960 දී රුවන්වැල්ල ප්‍රදේශයේ සිසුන්ට ගුණාත්මක අධ්‍යාපනයක් ලබා දීමේ දැක්මෙන් ස්ථාපිත කරන ලදී. පසුගිය දශක හය තුළ, අපි සීමිත සම්පත් ඇති කුඩා පාසලකින් දහස් ගණන් සිසුන්ට සේවය කරන කීර්තිමත් අධ්‍යාපන ආයතනයක් දක්වා වර්ධනය වී ඇත.",
  },
  "about.missionVision": { en: "Mission & Vision", si: "මෙහෙවර සහ දැක්ම" },
  "about.ourMission": { en: "Our Mission", si: "අපගේ මෙහෙවර" },
  "about.missionDesc": {
    en: "To become the most distingusished college in Sabaragamuwa by providing worthy citizens for the country.",
    si: "රට දැයට වැඩදායක වටිනා දරුවන් හදන සබරගමුවේ විශිෂ්ටතම විදුබිම බවට පත්වීම"
  },
  "about.ourVision": { en: "Our Vision", si: "අපගේ දැක්ම" },
  "about.visionDesc": {
    en: "In accordanance with the national academic goals, with an understanding about the natinal identity, to dedicate as a single body in marking creative disciplined individials to fulfil future needs by giving all the students' affection, security and guidance to develop their qualities, morals and knowledge.",
    si: "ජාතික අධ්‍යාපන අභිමතාර්ථවලට අනුගත ව පාසලේ අනන්‍යතාව සුරකිමින් විදුපියසට පා තබන සියලු දූ පුතුනට සෙනෙහස, රැකවරණය හා මඟපෙන්වීම ලබා දෙමින් සිසුන් තුළ ගුණ, නැණ, බල වඩා අනාගතයට අවශ්‍ය කරන නිර්මාණශීලී, විනයගරුක, අභිමානවත් දූ පුතුන් බිහිකිරීම අපගේ මෙහෙවරයි.",
  },
  "about.principalMessage": {
    en: "Principal's Message",
    si: "විදුහල්පති පණිවිඩය",
  },
  "about.principal": { en: "Principal", si: "විදුහල්පති" },
  "about.principalMsg": {
    en: "Welcome to Ruwanwella Rajasinghe Central College. As the principal, I am honored to lead this esteemed institution that has been shaping young minds for over six decades. Our commitment to academic excellence, character development, and holistic education remains unwavering.",
    si: "රුවන්වැල්ල රාජසිංහ මධ්‍ය විද්‍යාලයට ඔබව සාදරයෙන් පිළිගනිමු. විදුහල්පති ලෙස, දශක හයකට වැඩි කාලයක් තරුණ මනස හැඩගස්වන මෙම කීර්තිමත් ආයතනය මෙහෙයවීමට හැකි වීම ගෞරවයකි. අධ්‍යයන විශිෂ්ටත්වය, චරිත වර්ධනය සහ සමස්ත අධ්‍යාපනය සඳහා වූ අපගේ කැපවීම නොසැලෙන්නකි.",
  },
  "about.principalMsg2": {
    en: "We believe in providing a nurturing environment where every student can discover their potential and pursue their passions. Together with our dedicated staff and supportive parent community, we strive to prepare our students not just for examinations, but for life.",
    si: "සෑම සිසුවෙකුටම තම හැකියාව සොයා ගැනීමට සහ තමන්ගේ ආශාවන් අනුගමනය කිරීමට හැකි පෝෂණීය පරිසරයක් ලබා දීම අපි විශ්වාස කරමු. අපගේ කැපවූ කාර්ය මණ්ඩලය සහ සහාය දක්වන දෙමාපිය ප්‍රජාව සමඟ එක්ව, අපි අපගේ සිසුන් විභාග සඳහා පමණක් නොව, ජීවිතය සඳහා සූදානම් කිරීමට උත්සාහ කරමු.",
  },

  // Academic Page
  "academic.ourPrograms": {
    en: "Our Academic Programs",
    si: "අපගේ අධ්‍යයන වැඩසටහන්",
  },
  "academic.grades69Desc": {
    en: "Foundation education building strong fundamentals in all core subjects",
    si: "සියලුම මූලික විෂයයන්හි ශක්තිමත් මූලධර්ම ගොඩනඟන පදනම් අධ්‍යාපනය",
  },
  "academic.oLevelDesc": {
    en: "Comprehensive preparation for O/L examination across diverse subject streams",
    si: "විවිධ විෂය ප්‍රවාහ හරහා සා/පෙළ විභාගය සඳහා විස්තීර්ණ සූදානම",
  },
  "academic.aLevelDesc": {
    en: "Specialized streams preparing students for university and professional careers",
    si: "විශ්ව විද්‍යාල සහ වෘත්තීය වෘත්ති සඳහා සිසුන් සූදානම් කරන විශේෂිත ප්‍රවාහ",
  },
  "academic.passRate": { en: "Pass Rate", si: "සමත් අනුපාතය" },
  "academic.students9As": { en: "Students with 9As", si: "9A ලබා ගත් සිසුන්" },
  "academic.distinctions": { en: "Distinctions", si: "විශිෂ්ටතා" },
  "academic.topRankers": {
    en: "Island Rankers",
    si: "දිවයින පෙළ ගැස්මේ සිසුන්",
  },
  "academic.facilities": { en: "Learning Facilities", si: "ඉගෙනුම් පහසුකම්" },
  "academic.facilitiesDesc": {
    en: "Our school is equipped with modern facilities including well-stocked libraries, science laboratories, computer labs, and smart classrooms to provide the best learning environment for our students.",
    si: "අපගේ පාසල හොඳින් සන්නද්ධ පුස්තකාල, විද්‍යා රසායනාගාර, පරිගණක රසායනාගාර සහ ස්මාර්ට් පන්ති කාමර ඇතුළු නවීන පහසුකම් වලින් සමන්විත වන අතර අපගේ සිසුන්ට හොඳම ඉගෙනුම් පරිසරය ලබා දීමට හැකිය.",
  },
  "academic.staffDesc": {
    en: "Our experienced and dedicated teaching staff are committed to providing quality education and individual attention to every student.",
    si: "අපගේ පළපුරුදු සහ කැප වූ ගුරු කාර්ය මණ්ඩලය සෑම සිසුවෙකුටම ගුණාත්මක අධ්‍යාපනයක් සහ පුද්ගල අවධානයක් ලබා දීමට කැප වී සිටී.",
  },
  "academic.lmsDesc": {
    en: "Access our comprehensive Learning Management System for study materials, assignments, exam schedules, and more.",
    si: "අධ්‍යයන ද්‍රව්‍ය, පැවරුම්, විභාග කාලසටහන් සහ තවත් දේ සඳහා අපගේ විස්තීර්ණ ඉගෙනුම් කළමනාකරණ පද්ධතිය වෙත ප්‍රවේශ වන්න.",
  },

  // Common
  "common.learnMore": { en: "Learn More", si: "වැඩිදුර දැනගන්න" },
  "common.viewAll": { en: "View All", si: "සියල්ල බලන්න" },
  "common.readMore": { en: "Read More", si: "තව කියවන්න" },
  "common.date": { en: "Date", si: "දිනය" },
  "common.time": { en: "Time", si: "වේලාව" },
  "common.location": { en: "Location", si: "ස්ථානය" },

  // News Items
  "news.item1.title": {
    en: "Science Exhibition 2026",
    si: "විද්‍යා ප්‍රදර්ශනය 2026",
  },
  "news.item1.excerpt": {
    en: "Students showcase innovative projects at the annual science exhibition.",
    si: "වාර්ෂික විද්‍යා ප්‍රදර්ශනයේදී සිසුන් නව්‍ය ව්‍යාපෘති ප්‍රදර්ශනය කරයි.",
  },
  "news.item2.title": {
    en: "Annual Sports Meet Success",
    si: "වාර්ෂික ක්‍රීඩා රැස්වීමේ සාර්ථකත්වය",
  },
  "news.item2.excerpt": {
    en: "Our athletes brought home multiple medals from the district championship.",
    si: "අපගේ ක්‍රීඩක ක්‍රීඩිකාවන් දිස්ත්‍රික් ශූරතාවලියෙන් පදක්කම් රැසක් ගෙන එයි.",
  },
  "news.item3.title": {
    en: "New Computer Lab Opening",
    si: "නව පරිගණක රසායනාගාරය විවෘත කිරීම",
  },
  "news.item3.excerpt": {
    en: "State-of-the-art computer lab equipped with latest technology inaugurated.",
    si: "නවතම තාක්ෂණයෙන් සමන්විත අති නවීන පරිගණක රසායනාගාරය විවෘත කරන ලදී.",
  },
  "news.item4.title": {
    en: "Drama Competition Winners",
    si: "නාට්‍ය තරග ජයග්‍රාහකයින්",
  },
  "news.item4.excerpt": {
    en: "Our drama team wins first place at the provincial level competition.",
    si: "අපගේ නාට්‍ය කණ්ඩායම පළාත් මට්ටමේ තරඟයෙන් පළමු ස්ථානය දිනා ගනී.",
  },

  // Events
  "event1.title": {
    en: "Inter-House Sports Day",
    si: "අන්තර් මන්දිර ක්‍රීඩා දිනය",
  },
  "event1.desc": {
    en: "Join us for an exciting day of athletic competition as our four houses compete for glory!",
    si: "අපගේ මන්දිර හතර ගෞරවය සඳහා තරඟ කරන විට ප්‍රීතිමත් මලල ක්‍රීඩා තරඟයක් සඳහා අප හා එක්වන්න!",
  },
  "event1.location": { en: "School Grounds", si: "පාසල් භූමිය" },
  "event2.title": { en: "Parent-Teacher Meeting", si: "දෙමාපිය-ගුරු රැස්වීම" },
  "event2.desc": {
    en: "Discuss your child's progress and goals with teachers in a collaborative environment.",
    si: "සහයෝගී පරිසරයක් තුළ ඔබේ දරුවාගේ ප්‍රගතිය සහ අරමුණු ගුරුවරුන් සමඟ සාකච්ඡා කරන්න.",
  },
  "event2.location": { en: "Main Hall", si: "ප්‍රධාන ශාලාව" },
  "event3.title": { en: "Mid-Year Examinations", si: "මධ්‍ය වාර්ෂික විභාග" },
  "event3.desc": {
    en: "Important assessment period for all students. Exam schedule available in LMS portal.",
    si: "සියලුම සිසුන් සඳහා වැදගත් තක්සේරු කාලය. විභාග කාලසටහන LMS ද්වාරයේ ඇත.",
  },
  "event3.location": { en: "All Classes", si: "සියලුම පන්ති" },

  // Academic Facilities
  "facility1.title": { en: "Science Laboratories", si: "විද්‍යා රසායනාගාර" },
  "facility1.desc": {
    en: "Modern labs equipped with latest equipment for Physics, Chemistry, and Biology practical sessions.",
    si: "භෞතික විද්‍යාව, රසායන විද්‍යාව සහ ජීව විද්‍යාව ප්‍රායෝගික සැසි සඳහා නවතම උපකරණ වලින් සමන්විත නවීන රසායනාගාර.",
  },
  "facility2.title": { en: "Computer Lab", si: "පරිගණක රසායනාගාරය" },
  "facility2.desc": {
    en: "State-of-the-art computer facilities with high-speed internet for IT education and research.",
    si: "තොරතුරු තාක්ෂණ අධ්‍යාපනය සහ පර්යේෂණ සඳහා අධිවේගී අන්තර්ජාලය සහිත අති නවීන පරිගණක පහසුකම්.",
  },
  "facility3.title": { en: "Library", si: "පුස්තකාලය" },
  "facility3.desc": {
    en: "Extensive collection of books, journals, and digital resources to support academic pursuits.",
    si: "අධ්‍යයන කටයුතු සඳහා සහාය වීමට පොත්, සඟරා සහ ඩිජිටල් සම්පත් වල විශාල එකතුවක්.",
  },

  // Live Stream Events
  "stream1.title": {
    en: "Annual Prize Giving Ceremony",
    si: "වාර්ෂික ත්‍යාග ප්‍රදානෝත්සවය",
  },
  "stream1.desc": {
    en: "Join us for our annual prize giving ceremony celebrating student achievements.",
    si: "සිසුන්ගේ ජයග්‍රහණ සමරන අපගේ වාර්ෂික ත්‍යාග ප්‍රදානෝත්සවය සඳහා අප හා එක්වන්න.",
  },
  "stream2.title": {
    en: "Inter-House Sports Day",
    si: "අන්තර් මන්දිර ක්‍රීඩා දිනය",
  },
  "stream2.desc": {
    en: "Watch live as our students compete in various athletic events.",
    si: "අපගේ සිසුන් විවිධ මලල ක්‍රීඩා ඉසව්වල තරඟ කරන ආකාරය සජීවීව නරඹන්න.",
  },
  "stream3.title": { en: "Science Exhibition", si: "විද්‍යා ප්‍රදර්ශනය" },
  "stream3.desc": {
    en: "Explore innovative science projects created by our talented students.",
    si: "අපගේ දක්ෂ සිසුන් විසින් නිර්මාණය කරන ලද නව්‍ය විද්‍යා ව්‍යාපෘති ගවේෂණය කරන්න.",
  },

  // Volleyball Achievements
  "volleyball.achievement1.title": {
    en: "Provincial Championship Winners",
    si: "පළාත් ශූරතා ජයග්‍රාහකයින්",
  },
  "volleyball.achievement1.desc": {
    en: "Our volleyball team dominated the provincial championship with outstanding teamwork and skill",
    si: "අපගේ වොලිබෝල් කණ්ඩායම විශිෂ්ට කණ්ඩායම් ක්‍රියාකාරිත්වය සහ කුසලතාවන් සමඟ පළාත් ශූරතාවලිය ජය ගත්තේය",
  },
  "volleyball.achievement2.title": {
    en: "District Champions",
    si: "දිස්ත්‍රික් ශූරයින්",
  },
  "volleyball.achievement2.desc": {
    en: "Secured first place in the district level volleyball tournament",
    si: "දිස්ත්‍රික් මට්ටමේ වොලිබෝල් තරඟාවලියෙන් පළමු ස්ථානය ලබා ගත්තා",
  },
  "volleyball.achievement3.title": {
    en: "All-Island Tournament Runners-Up",
    si: "සමස්ත දිවයින තරඟාවලියේ අනු ශූරයින්",
  },
  "volleyball.achievement3.desc": {
    en: "Reached the finals of the prestigious All-Island Schools Volleyball Championship",
    si: "කීර්තිමත් සමස්ත දිවයින පාසල් වොලිබෝල් ශූරතාවලියේ අවසන් මහා තරගය කරා ළඟා විය",
  },

  // Cricket Achievements
  "cricket.achievement1.title": {
    en: "Provincial Under-19 Runners-Up",
    si: "පළාත් වයස අවුරුදු 19 න් පහළ අනු ශූරයින්",
  },
  "cricket.achievement1.desc": {
    en: "Our cricket team secured second place in the provincial tournament with exceptional batting and bowling performances",
    si: "අපගේ ක්‍රිකට් කණ්ඩායම ව්‍යතිරේක පිතිකරණ සහ පන්දු යැවීමේ කාර්ය සාධනයන් සමඟ පළාත් තරඟාවලියේ දෙවන ස්ථානය ලබා ගත්තේය",
  },
  "cricket.achievement2.title": {
    en: "District Champions",
    si: "දිස්ත්‍රික් ශූරයින්",
  },
  "cricket.achievement2.desc": {
    en: "Won the district level cricket championship with an undefeated record",
    si: "අපරාජිත වාර්තාවක් සමඟ දිස්ත්‍රික් මට්ටමේ ක්‍රිකට් ශූරතාවලිය ජයග්‍රහණය කළා",
  },
  "cricket.achievement3.title": {
    en: "Singer Schools Tournament Quarter-Finalists",
    si: "සිංගර් පාසල් තරඟාවලිය අර්ධ අවසන් පූර්ව තරඟකරුවන්",
  },
  "cricket.achievement3.desc": {
    en: "Reached the quarter-finals of Sri Lanka's most prestigious schools cricket tournament",
    si: "ශ්‍රී ලංකාවේ වඩාත්ම කීර්තිමත් පාසල් ක්‍රිකට් තරඟාවලියේ අර්ධ අවසන් පූර්ව මහා තරගය කරා ළඟා විය",
  },

  // Rugby Achievements
  "rugby.achievement1.title": {
    en: "Inter-School Rugby Championship",
    si: "අන්තර් පාසල් රග්බි ශූරතාවලිය",
  },
  "rugby.achievement1.desc": {
    en: "Our rugby team secured the championship title in the inter-school tournament",
    si: "අපගේ රග්බි කණ්ඩායම අන්තර් පාසල් තරඟාවලියේ ශූරතා ශූරතාවලිය ලබා ගත්තේය",
  },
  "rugby.achievement2.title": {
    en: "Provincial Under-17 Runners-Up",
    si: "පළාත් වයස අවුරුදු 17 න් පහළ අනු ශූරයින්",
  },
  "rugby.achievement2.desc": {
    en: "Outstanding performance at the provincial level rugby competition",
    si: "පළාත් මට්ටමේ රග්බි තරඟයේ විශිෂ්ට කාර්ය සාධනය",
  },
  "rugby.achievement3.title": {
    en: "Best Discipline Award",
    si: "හොඳම විනය සම්මානය",
  },
  "rugby.achievement3.desc": {
    en: "Recognized for exceptional sportsmanship and team discipline",
    si: "ව්‍යතිරේක ක්‍රීඩා ශිල්පය සහ කණ්ඩායම් විනය සඳහා පිළිගැනීම ලැබිණි",
  },

  // Karate Achievements
  "karate.achievement1.title": {
    en: "National Schools Karate Championship",
    si: "ජාතික පාසල් කරාටේ ශූරතාවලිය",
  },
  "karate.achievement1.desc": {
    en: "Gold medals in Kata and Kumite categories at the national championship",
    si: "ජාතික ශූරතාවලියේදී කටා සහ කුමිටේ කාණ්ඩවල රන් පදක්කම්",
  },
  "karate.achievement2.title": {
    en: "Provincial Champion - Team Kata",
    si: "පළාත් ශූරයා - කණ්ඩායම් කටා",
  },
  "karate.achievement2.desc": {
    en: "Our team secured first place in synchronized kata performance",
    si: "අපගේ කණ්ඩායම සමකාලීන කටා ප්‍රදර්ශනයේ පළමු ස්ථානය ලබා ගත්තේය",
  },
  "karate.achievement3.title": {
    en: "Individual Excellence Awards",
    si: "පුද්ගල විශිෂ්ටතා සම්මාන",
  },
  "karate.achievement3.desc": {
    en: "Three students qualified for national team selection trials",
    si: "සිසුන් තිදෙනෙකු ජාතික කණ්ඩායම් තෝරා ගැනීමේ අත්හදා බැලීම් සඳහා සුදුසුකම් ලැබීය",
  },

  // Athletics Achievements
  "athletics.achievement1.title": {
    en: "Provincial Track & Field Champions",
    si: "පළාත් ධාවන පථ සහ පිටි ශූරයින්",
  },
  "athletics.achievement1.desc": {
    en: "Dominated the provincial athletics meet with 15 gold medals across various events",
    si: "විවිධ ඉසව්වල රන් පදක්කම් 15 ක් සමඟ පළාත් මලල ක්‍රීඩා රැස්වීම ජය ගත්තේය",
  },
  "athletics.achievement2.title": {
    en: "National Record - 4x100m Relay",
    si: "ජාතික වාර්තාව - මීටර් 4x100 සහය",
  },
  "athletics.achievement2.desc": {
    en: "Our relay team set a new national schools record time of 42.8 seconds",
    si: "අපගේ සහය කණ්ඩායම තත්පර 42.8 කින් නව ජාතික පාසල් වාර්තා කාලය තැබීය",
  },
  "athletics.achievement3.title": {
    en: "Outstanding Athlete Awards",
    si: "කැපී පෙනෙන මලල ක්‍රීඩක සම්මාන",
  },
  "athletics.achievement3.desc": {
    en: "Five students selected for national junior athletics squad",
    si: "සිසුන් පස්දෙනෙකු ජාතික කනිෂ්ඨ මලල ක්‍රීඩා සංචිතය සඳහා තෝරා ගන්නා ලදී",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "si" : "en"));
  };

  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
