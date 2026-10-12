import CoursesSection from "./CoursesSection";
import WhyChooseUs from "./WhyChooseUs";
import MediaGallery from "./Gallery";
import CareerBenefits from "./Build";
import CoursesScroll from "../utlis/CourseLoop";
import { ContactSection } from "./Contact";
import { ContactBranches } from "./ContactBranches";
import StudentTestimonials from "./Student";
import { VideoShowcaseSection } from "./Video";
import StudentDetails from "./WeakOf";
import HeroSection from "./Home/HeroSection";
import TestimonialSection from "./TestM";
import Faculty from "./Faculty";
import HiringPartners from "./HiringPartners";
import Faq from "./Faq";
import Reveal from "./effects/Reveal";

const HomeSection = () => {
  return (
    <>
      <HeroSection />
      <div>
        <Reveal><CoursesSection /></Reveal>
        <Reveal><WhyChooseUs /></Reveal>
        <Faculty />
        <Reveal><StudentDetails /></Reveal>
        <HiringPartners />
        <Reveal><TestimonialSection /></Reveal>
        <Reveal><MediaGallery /></Reveal>
        <Reveal><StudentTestimonials /></Reveal>
        <Reveal><ContactBranches /></Reveal>
        <Reveal><VideoShowcaseSection /></Reveal>
        <Reveal><CareerBenefits /></Reveal>
        <Faq />
        <Reveal><ContactSection /></Reveal>
        <CoursesScroll />
      </div>
    </>
  );
};

export default HomeSection;
