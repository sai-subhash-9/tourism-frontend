import aboutImg from "../assets/images/about_img.png";
import { FaExternalLinkAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] max-w-2xl rounded-xl shadow-xl p-6 flex flex-col gap-5 bg-white/90 backdrop-blur-md">
        <h1 className="text-4xl text-center font-semibold text-blue-700">About</h1>

        <div className="flex flex-col items-center gap-2">
          <img src={aboutImg} className="w-40 h-40 rounded-full shadow-md" alt="Team" />
          <h2 className="text-2xl font-semibold text-gray-800">Tourism Explorer Project</h2>
          <p className="text-sm text-gray-600 italic">
            A MERN-based interactive tourism platform showcasing Indian states and their top travel destinations.
          </p>
        </div>

        <div className="bg-gray-100 p-3 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Developed By:</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>23B91A05G5 — Raju</li>
            <li>23B91A05H5 — Sanjay NG</li>
            <li>23B91A05K9 — [Student Name]</li>
            <li>23B91A05L5 — [Student Name]</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-blue-600">Connect With Us:</h3>
          <ul className="list-disc w-max mx-5 text-gray-800">
            <li className="hover:underline hover:text-blue-600 cursor-pointer">
              <a
                className="flex items-center gap-2"
                href="https://github.com/Sanjayng125"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <FaExternalLinkAlt />
              </a>
            </li>
            <li className="hover:underline hover:text-blue-600 cursor-pointer">
              <a
                className="flex items-center gap-2"
                href="https://linkedin.com/in/sanjay-ng-41b64922a"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <FaExternalLinkAlt />
              </a>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 leading-relaxed">
          This web application provides users with a visually engaging and interactive experience to explore
          India’s diverse tourism destinations. It displays states, popular places, their descriptions,
          Google Maps locations, and official booking links — all in one seamless interface.
        </p>
      </div>
    </div>
  );
};

export default About;
