import React, {
  useState,
  useEffect,
  useRef,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  memo,
} from "react";

// --- Asset URLs ---
const logoUrl = "/WW Forward.png";

// --- SVG Icons (as functional components) ---
const IconMail: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />{" "}
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />{" "}
  </svg>
);
const IconCalendar: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconClock: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconMapMarker: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconUsers: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);
const IconCheckCircle: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconChevronDown: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconChevronUp: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconExternalLink: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />{" "}
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />{" "}
  </svg>
);
const IconLightBulb: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />{" "}
  </svg>
);
const IconMicrophone: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconDocument: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconRecycle: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />{" "}
  </svg>
);
const IconPhotograph: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconInfo: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IconFacebook: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {" "}
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />{" "}
  </svg>
);
const IconInstagram: FC = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z" />
    <path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z" />
  </svg>
);
const IconX: FC = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 300 271"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
  </svg>
);
const IconMenu: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />{" "}
  </svg>
);
// ADD THIS NEW ICON COMPONENT
const IconClipboard: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 110 2h2a1 1 0 110-2H8z" />
  </svg>
);
const IconClose: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />{" "}
  </svg>
);
const IconUserCheck: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a3 3 0 100-6 3 3 0 000 6z" />
    <path
      fillRule="evenodd"
      d="M19.707 14.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L15 17.586l3.293-3.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
const IconBallotBox: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`h-5 w-5 ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
    />
  </svg>
);
const IconVideoCamera: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`h-5 w-5 ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);
const IconCurrencyDollar: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.162-.328 2.5 2.5 0 00-1.162.328V7.151c.221.07.409.164.567.267zM10 18a8 8 0 100-16 8 8 0 000 16zm1.567-4.849V7.151c.221.07.409.164.567.267v1.698a2.5 2.5 0 00-1.162-.328 2.5 2.5 0 00-1.162.328v4.273a2.5 2.5 0 001.162.328 2.5 2.5 0 001.162-.328z" />
  </svg>
);
const IconScale: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm.293 3.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 111.414 1.414L11.414 11l4.293 4.293a1 1 0 01-1.414 1.414L10 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 11 4.293 6.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
const IconYouTube: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
  </svg>
);
const IconTag: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 012 10V4a1 1 0 011-1h6a1 1 0 01.707.293l7 7zM6 7a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);
const IconSearch: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Type Definitions ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
interface DotPatternProps {
  className?: string;
  dotColor?: string;
  rows?: number;
  cols?: number;
}
interface CardProps {
  children: ReactNode;
  className?: string;
  noHoverEffect?: boolean;
  hasDotPattern?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
interface ButtonProps {
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "primary" | "secondary" | "success" | "warning";
  className?: string;
  icon?: ReactNode;
  isSubmit?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}
type PageName =
  | "Home"
  | "About"
  | "Projects"
  | "Election"
  | "Contact"
  | "ProjectDetails";
interface Project {
  id: number;
  slug: string;
  title: string;
  shortGoal: string;
  status: string;
  description: string;
  image: string;
  partnerOrganizations?: string[];
  supportingOrganizations?: string[];
  redirectTo?: PageName;
  goal?: string;
  impact?: string;
  timeline?: { stage: string; details: string; completed: boolean }[];
  getInvolved?: string;
  fundingSources?: string[];
  initiatives?: {
    title: string;
    description: string;
    icon: ReactNode;
    status: string;
  }[];
}
interface NavbarProps {
  setActivePage: (page: PageName, project?: Project | null) => void;
  activePage: PageName;
  selectedProject: Project | null;
}
interface PageProps {
  setActivePage: (page: PageName, project?: Project | null) => void;
}
interface ProjectCardProps {
  project: Project;
  setActivePage: (page: PageName, project?: Project | null) => void;
}
interface ProjectDetailPageProps {
  project: Project | null;
  setActivePage: (page: PageName, project?: Project | null) => void;
}
interface FooterProps {
  setActivePage: (page: PageName) => void;
}
// Add Election Question Type
type OfficeType = "Mayor" | "Township Council";
interface ElectionQuestion {
  id: string;
  text: string;
  office: OfficeType | OfficeType[]; // Can be single or array
}

// --- Helper Components ---
const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <IconClose />
        </button>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
};

const DotPattern: FC<DotPatternProps> = memo(
  ({
    className = "",
    dotColor = "text-sky-200 opacity-5",
    rows = 6,
    cols = 8,
  }) => {
    const dots = useMemo(() => {
      const totalDots = Math.min(rows * cols * 4, 100);
      return Array.from({ length: totalDots }).map((_, i) => ({
        id: i,
        left: `${(i % (cols * 2)) * 12.5 + Math.random() * 5}%`,
        top: `${Math.floor(i / (cols * 2)) * 25 + Math.random() * 15 + 10}%`,
        delay: `${(i % 10) * 0.2}s`,
      }));
    }, [rows, cols]);

    return (
      <div
        className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 will-change-transform">
          {dots.map((dot) => (
            <div
              key={dot.id}
              className={`absolute w-1 h-1 sm:w-1.5 sm:h-1.5 ${dotColor} rounded-full animate-pulse-slow`}
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.delay,
                transform: "translateZ(0)",
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
);

const Card: FC<CardProps> = memo(
  ({
    children,
    className = "",
    noHoverEffect = false,
    hasDotPattern = false,
    onClick,
  }) => (
    <div
      className={`relative bg-white shadow-lg rounded-xl mb-6 sm:mb-8 border border-gray-200 ${
        hasDotPattern ? "overflow-hidden" : ""
      } ${
        noHoverEffect
          ? ""
          : "transition-all duration-300 hover:shadow-2xl hover:border-sky-400 hover:scale-[1.01] will-change-transform"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      style={{ transform: "translateZ(0)" }}
    >
      {hasDotPattern && <DotPattern dotColor="text-sky-500 opacity-5" />}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  )
);

const Button: FC<ButtonProps> = memo(
  ({
    children,
    onClick,
    type = "primary",
    className = "",
    icon,
    isSubmit = false,
    disabled = false,
    size = "md",
    href,
  }) => {
    const baseStyle = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-103 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-md hover:shadow-lg will-change-transform ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`;
    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm",
      lg: "px-6 py-3 text-sm sm:text-base",
    };
    const typeStyle =
      type === "primary"
        ? "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500"
        : type === "secondary"
        ? "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400"
        : type === "success"
        ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
        : type === "warning"
        ? "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500"
        : "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400";

    const content = (
      <>
        {icon && !children && <span>{icon}</span>}
        {icon && children && <span className="mr-2">{icon}</span>}
        {children}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={`${baseStyle} ${typeStyle} ${sizeStyles[size]} ${className}`}
          style={{ transform: "translateZ(0)" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick && !disabled) {
          onClick(e);
        }
      },
      [onClick, disabled]
    );

    return (
      <button
        onClick={handleClick}
        className={`${baseStyle} ${typeStyle} ${sizeStyles[size]} ${className}`}
        disabled={disabled}
        style={{ transform: "translateZ(0)" }}
      >
        {content}
      </button>
    );
  }
);

// --- Data ---
const forumData = {
  title: "West Windsor Forward 2025 Candidate Forum",
  date: "Thursday, September 25th, 2025",
  time: "7:00 PM - 9:15 PM",
  arrivalTime: "6:30 PM for candidates",
  location: "Kelsey Theatre @ Mercer County Community College",
  positions: [
    "Mayor of West Windsor Township",
    "2 seats on West Windsor Township Council",
  ],
  status: "Cancelled",
  panelists: [
    {
      id: "micah-rasmussen",
      name: "Micah Rasmussen",
      title: "Director, Rebovich Institute for NJ Politics",
      imageUrl: "/micah.png",
      bio: "Micah Rasmussen is the director of the Rebovich Institute for New Jersey Politics at Rider University. He has worked in the New Jersey General Assembly and managed several political campaigns. After completing his undergraduate studies at Rider under his mentor David Rebovich, the namesake of the institute he now leads, Rasmussen earned his Master of Arts in Political Science from the Eagleton Institute of Politics at Rutgers University. Rasmussen is a panelist for the state's biggest political debates-- twice so far this year in the race to elect New Jersey's next governor, and in the only debate last year between now Senator Andy Kim and First Lady Tammy Murphy. He is regularly included on New Jersey's political power and higher education influencer lists. One called him \"the go-to guy for the media to comment on what's happening in New Jersey politics-- and what it means\".",
      note: "",
    },
    {
      id: "david-matthau",
      name: "David Matthau",
      title: "WHYY NJ Reporter",
      imageUrl: "/matthau.png",
      bio: "David Matthau is a WHYY New Jersey reporter covering the Statehouse and general assignments in the Garden State. Prior to joining WHYY, David was lead investigative reporter for NJ 101.5 News, winning multiple Associated Press and Society of Professional Journalists awards, the National Association of Broadcasters Service to Community Award, and contributed to the National Edward R. Murrow Best Newscast award. David is a graduate of the University of Southern California.",
    },
  ],
  forumParts: [
    {
      id: 1,
      title: "Panelist Q&A Sessions",
      description:
        "Equal time Q&A sessions for Mayoral and Council candidates with questions from our distinguished panelists",
      location: "Main Theatre",
      iconType: "microphone",
    },
    {
      id: 2,
      title: "Town Hall Q&A",
      description:
        "Community-driven Q&A where residents can submit questions for candidates to address",
      location: "Main Theatre",
      iconType: "users",
    },
  ],
  requirements: {
    council:
      "At least 3 council candidates participating OR candidates from at least 2 different tickets with minimum 3 total candidates running",
    mayor: "At least 2 mayoral candidates participating",
  },
  pressCoverage: [
    {
      id: 1,
      title: "Civic group plans forum for 2025 election",
      source: "West Windsor Plainsboro News",
      url: "https://issuu.com/communitynewsservice/docs/6-25_wwp/4",
    },
    {
      id: 4,
      title:
        "West Windsor civic group to host Sept. 25 candidate forum (Revised)",
      source: "West Windsor Plainsboro News",
      url: "https://www.communitynews.org/towns/west-windsor-plainsboro-news/west-windsor-civic-group-to-host-sept-25-candidate-forum-revised/article_89bdf018-35c6-417c-a3ba-dd46adad7094.html",
    },
    {
      id: 2,
      title: "2025 West Windsor Candidate Forum Announced",
      source: "West Windsor Peeps",
      url: "https://westwindsorpeeps.com/west-windsor-candidate-forum/",
    },
    {
      id: 3,
      title:
        "West Windsor to Host First Candidate Forum in Over a Decade at the Kelsey Theatre",
      source: "CentralJersey.com",
      url: "https://centraljersey.com/2025/05/05/west-windsor-candidate-forum-kelsey-theatre/",
    },
  ],
};

const projectsData: Project[] = [
  {
    id: 1,
    slug: "candidate-forum-2025",
    title: "2025 Election Hub & Forum Archive",
    shortGoal: "Ensuring an informed electorate.",
    status: "Completed",
    description:
      "Following the cancellation of our candidate forum, we pivoted to create a comprehensive, non-partisan voter hub. This initiative provides direct access to candidate interviews, financial data, and key voting information to ensure residents remain informed.",
    image: "/2025 Forum Graphic.png",
    supportingOrganizations: [
      "League of Women Voters of the Greater Princeton Area",
    ],
    redirectTo: "Election",
  },
  {
    id: 2,
    slug: "princeton-junction-station-improvement",
    title: "Princeton Junction Station Improvement Project",
    shortGoal: "Revitalizing our key transit hub.",
    goal: "To transform the Princeton Junction Station into a welcoming, aesthetically appealing, and culturally reflective community hub that serves all users.",
    status: "Early Planning & Proposal Development",
    description:
      "This is a proposed comprehensive project to transform Princeton Junction Station—a vital asset serving over 4,000 NJ TRANSIT passengers daily and 123,000+ Amtrak passengers annually—into a vibrant community hub. We are developing plans for beautification efforts, community art installations, environmental initiatives, and programming to enhance the daily experience for thousands of commuters while fostering community pride and connectivity. Currently in early planning stages with proposals being developed for potential partnerships.",
    impact:
      "Enhanced commuter experience for thousands of daily users, strengthened community identity through public art, environmental benefits through recycling and beautification programs, increased community engagement through events and programming, and preserved infrastructure value through maintenance and improvements.",
    timeline: [
      {
        stage: "Completed: Concept Development & Research",
        details:
          "Initial research completed on station usage, community needs, and potential improvement opportunities. Concept proposal drafted.",
        completed: true,
      },
      {
        stage: "In Progress: Stakeholder Outreach & Partnership Development",
        details:
          "Reaching out to NJ TRANSIT, West Windsor Parking Authority, and community organizations to gauge interest and explore potential partnerships.",
        completed: false,
      },
      {
        stage: "Upcoming: Community Input & Proposal Refinement",
        details:
          "Gathering community feedback on proposed improvements and refining plans based on resident input and partnership possibilities.",
        completed: false,
      },
      {
        stage: "Upcoming: Implementation Planning",
        details:
          "If partnerships are established, develop detailed implementation timeline and begin coordination with relevant authorities.",
        completed: false,
      },
    ],
    getInvolved:
      "Share your ideas for station improvements, express interest in volunteering for future cleanup or beautification efforts, connect us with relevant community organizations, or let us know what would make your commuting experience better.",
    image:
      "https://www.westwindsorhistory.com/uploads/1/2/3/1/123111196/2018-12-08-pj-train-station-ticket-building_orig.jpg",
    partnerOrganizations: [],
    fundingSources: [],
    initiatives: [
      {
        title: "Beautification & Maintenance",
        description:
          "Potential regular cleanup, landscaping, and seasonal decorations",
        icon: <IconLightBulb />,
        status: "Concept Phase",
      },
      {
        title: "Art & Cultural Enhancement",
        description:
          "Proposed community murals, decorative elements, and cultural programming",
        icon: <IconPhotograph />,
        status: "Concept Phase",
      },
      {
        title: "Environmental Initiatives",
        description:
          "Exploring recycling programs and sustainable improvements",
        icon: <IconRecycle />,
        status: "Concept Phase",
      },
      {
        title: "Community Programming",
        description: "Ideas for events and community engagement opportunities",
        icon: <IconUsers />,
        status: "Concept Phase",
      },
    ],
  },
];

// Data sourced from candidate websites & ELEC reports
const electionData = {
  candidates: [
    {
      id: "marathe",
      name: "Hemant Marathe",
      office: "Mayor" as OfficeType,
      slate: "Proven Leaders for West Windsor",
      bio: "Hemant Marathe is Mayor since 2018, and previously was a Council member since 2015. He previously served on the West Windsor Plainsboro Board of education for 12 years (2001-13), with 9 as president (2004-13). He has been very active in the community for decades, and is a member of the West Windsor Arts Council, West Windsor Bicycle and Pedestrian Alliance, Friends of West Windsor Open Space, and the West Windsor Lions Club. Hemant and his wife are 31-year residents of West Windsor, with four daughters educated in the West Windsor-Plainsboro (WWP) school system.",
      image:
        "https://teammarathe4ww.com/gallery_gen/6e782a690de846b828dfb2b33b95b6c8_920x920_95x78_1154x1731_crop.jpg?ts=1759854688",
      website: "http://teammarathe4ww.com",
    },
    {
      id: "geevers",
      name: "Linda Geevers",
      office: "Township Council" as OfficeType,
      slate: "Proven Leaders for West Windsor",
      bio: "Linda Geevers has been a member of the Council since 2005, including several years as President and Vice President. She also served on the West Windsor Planning Board for nine years. Linda was previously elected twice (1999-2005) to the West Windsor-Plainsboro Regional Board of Education and held many leadership roles. As an active community member, Linda currently serves as a Fire Police Officer with the West Windsor Volunteer Fire Co. #1 and on the Board of Directors of the West Windsor Lions Club. Linda and her husband have been residents for 30 years. Their three children were educated K-12 in the WW-P School District.",
      image:
        "https://teammarathe4ww.com/gallery_gen/0842ea9083c15e7b9de333940d1628f3_920x920_87x75_1155x1731_crop.jpg?ts=1759854689",
      website: "http://teammarathe4ww.com",
    },
    {
      id: "charles",
      name: "Joe Charles",
      office: "Township Council" as OfficeType,
      slate: "Proven Leaders for West Windsor",
      bio: "Joe Charles is a CPA with 29 years of practical business experience in the world of accounting and finance, where he leads teams of people on a daily basis. He has served on the boards of several not-for-profit organizations, and has volunteered as a coach/assistant coach for local youth sports. As the Vice-Chair of Keep West Windsor NonPartisan (“Vote No”), he passionately and successfully advocated for keeping partisan politics out of West Windsor. Joe and his wife are 17-year residents, with 2 children currently in the WWP school system.",
      image:
        "https://teammarathe4ww.com/gallery_gen/97106c0b2e54b919d004ddbc58fa3cae_920x920_85x62_1154x1731_crop.jpg?ts=1759854690",
      website: "http://teammarathe4ww.com",
    },
    {
      id: "singh",
      name: "Sujit Singh",
      office: "Mayor" as OfficeType,
      slate: "West Windsor Together",
      bio: "A resident since 2011, Sujit brings over 30 years of leadership across technology, entrepreneurship, and nonprofit service. His campaign rests on one idea: West Windsor deserves smarter choices by new energized voices. An engaged community leader, a person who understands the real challenges our families faces. He is committed to transparent leadership, sustainable planning, and solutions that serve all residents for the betterment of community.\n\nSujit says \"Leadership starts with listening. I'm running to bring fresh energy , data-driven decisions, and a deep sense of responsibility. Together we'll build a West Windsor that works for everyone - not just today, but for the future.\" Sujit holds a degree in Electronics Engineering and an Entrepreneurship Development certificate from MIT Sloan. Mr. Singh submitted his name to empty council seat at Township Council Inauguration meeting on Jan 01, 2018. But didn’t get the enough vote for council seat. He served for five years on nonprofit board Beacon Specialized Living of New Jersey (Formally known as Enable, Inc.). Mr. Singh provided strategic guidance and board oversight to senior leadership, including to CEO and COO. Mr. Singh is widely recognized for championing equity and mental health.",
      image: "/singh.png",
      website: "https://www.wwtogether.org/",
    },
    {
      id: "tomar",
      name: "Ajay Tomar",
      office: "Township Council" as OfficeType,
      slate: "West Windsor Together",
      bio: "Ajay Tomar has proudly called West Windsor home since 2007. As a longtime resident, husband, and father to a West Windsor North graduate, Ajay understands the values, challenges, and aspirations of local families because he’s lived them himself. His deep connection to the township and unwavering belief in its potential drive his candidacy for West Windsor Council.\n\nWith over two decades of experience in technology and business development at companies like Oracle, Smartsheet, and Blue Prism, Ajay brings an exceptional combination of innovation, financial discipline, and operational efficiency to public service. He’s led multimillion-dollar portfolios, driven strategic growth, and consistently exceeded performance goals; all skills that will directly benefit West Windsor’s budgeting, planning, and governance.",
      image: "/tomar.png",
      website: "https://www.wwtogether.org/",
    },
    {
      id: "winters",
      name: "Andrew Winters",
      office: "Township Council" as OfficeType,
      slate: "West Windsor Together",
      bio: "Andrew Winters is running for West Windsor Town Council with a clear purpose: to help shape a future that honors what makes this township special while planning wisely for what lies ahead. As a parent of young children, a professional, and a proud West Windsor resident, Andrew is deeply invested in building a community where families can thrive now and for generations to come.\n\nWith a background in corporate strategy, financial planning, and sustainable growth, Andrew brings a disciplined, data-driven approach to local governance. His focus is on delivering long-term solutions that safeguard West Windsor’s quality of life while adapting to the township’s evolving needs.",
      image: "/winters.png",
      website: "https://www.wwtogether.org/",
    },
  ],
  issues: [
    {
      id: "opening",
      title: "Opening Statements",
      questions: [
        {
          id: "q0-opening",
          text: "Each slate provides an opening statement.",
          office: ["Mayor", "Township Council"] as OfficeType[],
        },
      ] as ElectionQuestion[],
    },
    {
      id: "vision",
      title: "Vision & Qualifications",
      questions: [
        {
          id: "q1-vision",
          text: "How would you describe the role of a Mayor and what does the position of Mayor mean to you personally. Why do you believe you are the best-qualified candidate to lead West Windsor?",
          office: "Mayor",
        },
        {
          id: "q1-council-vision", // New unique ID for council question
          text: "How would you describe the role of a Council member in West Windsor’s Mayor-Council form of government? What does this position mean to you personally, and why do you believe you are the best-qualified candidates to serve on the Council?",
          office: "Township Council",
        },
        {
          id: "q2-vision", // This question overlaps
          text: "Looking back at the last four years, how would you assess the Township's direction? What letter grade would you give the current administration's performance? Are there any specific successes and missteps that justify that grade?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q3-vision",
          text: "West Windsor is incredibly fortunate to be consistently ranked as one of the best places to live, with strong schools and train access to NY. In your view, what are the top three core attributes that make our town appealing, and what do you see as the three things residents are the most frustrated with?",
          office: "Mayor", // Mayoral only
        },
        {
          id: "q4-council-vision", // New unique ID for council question
          text: "In West Windsor's government, the Council serves as a check and balance on the Mayor's administration. Can you describe your philosophy on this relationship and when, if ever, you would vote against a proposal from a Mayor?",
          office: "Township Council",
        },
      ] as ElectionQuestion[], // Type assertion
    },
    {
      id: "future",
      title: "The Future & Major Challenges",
      questions: [
        {
          id: "q1-future", // This question overlaps
          text: "Residents want to know how you will address their concerns. What concerns/improvements would you prioritize in your first 100 days in office? What do you hope residents will be able to say you have done by April of next year?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q2-future", // This question overlaps
          text: "Looking long term now, residents are looking for a leader that will make meaningful, proactive improvements to our town. What are your long-term goals for the Township, and what would success under your leadership look like for the residents of West Windsor 2 and 4 years from now?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
      ] as ElectionQuestion[], // Type assertion
    },
    {
      id: "warehouses",
      title: "Warehouses & Development",
      questions: [
        {
          id: "q1-warehouse", // This question overlaps
          text: "The most controversial topic recently in West Windsor has been the topic of warehouses, spurred by a boom in online shopping, and development obligations. We want to get your brief recap of the timeline of the Howard Hughes site specifically and how we got to the current stage we are in now: seven warehouses approved by the Township, awaiting county and state approval.",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q2-warehouse", // This question overlaps
          text: "Considering that West Windsor residents move about the region and not just the township, how would your administration plan to address the community's concerns about the Bridge Point 8 Project, considering potential negative impacts on traffic, infrastructure, and quality of life and potential positive impact like rateables. How can residents independently verify the data on things like rateables and traffic?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q3-warehouse",
          text: "Looking ahead to the future, what would your specific policy be regarding any new proposals for warehouse development in West Windsor?",
          office: "Mayor", // Mayoral only
        },
        {
          id: "q4-council-warehouse", // New unique ID for council question
          text: "The warehouse issue is a zoning issue, and the Council is responsible for all zoning ordinances. What specific changes, if any, would you propose to West Windsor’s zoning code or Master Plan?",
          office: "Township Council",
        },
      ] as ElectionQuestion[], // Type assertion
    },
    {
      id: "taxes",
      title: "Affordability & Taxes",
      questions: [
        {
          id: "q1-taxes",
          text: "For young residents, how do you ensure that we can return to West Windsor after finishing our schooling and are able to afford a home here while balancing the need to protect current residents' home values?",
          office: "Mayor", // Mayoral only
        },
        {
          id: "q2-taxes", // This question overlaps
          text: "As you know, property taxes are top of mind for most residents. What is your specific plan for the municipal portion of the tax rate, and how would you fund services and infrastructure improvements with or without raising it?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q3-taxes",
          text: "Many of our neighbors in our area have also kept municipal taxes flat in recent years, including the county with a decrease this year in taxes by 6%. One of these towns is Robbinsville, who recently has had their school districts improve rapidly, have developed a fledgling downtown, and according to their Mayor are beginning to have homes with positive residential rateables even with schoolgoing children. What, if anything, can West Windsor learn from the fiscal and development strategies of our neighboring towns?",
          office: "Mayor", // Mayoral only
        },
        {
          id: "q4-council-taxes", // New unique ID for council question
          text: "Looking back at the most recent municipal budget that the Council voted on, what is one specific addition you would have advocated for, and one specific reduction you would have proposed, and why?",
          office: "Township Council",
        },
      ] as ElectionQuestion[], // Type assertion
    },
    {
      id: "infrastructure",
      title: "Infrastructure & Safety",
      questions: [
        {
          id: "q1-infra", // This question overlaps
          text: "As West Windsor has rapidly grown in recent years, residents frequently talk about the condition of our roads and traffic congestion. What is your plan to systematically improve our roads and alleviate traffic hotspots?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q2-infra", // This question overlaps
          text: "Another topic that comes up often is safety. There's a growing desire to make our town more walkable and bikeable, with organizations like the WWBPA leading the charge. How would you create a more connected and safer network for pedestrians and cyclists, and would you increase funding/efficiency for these projects?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q3-infra", // This question overlaps
          text: "What is your assessment of our current public safety services—our Police, Fire, and EMS—and do they have the resources they need to keep our community safe?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
      ] as ElectionQuestion[], // Type assertion
    },
    {
      id: "governance",
      title: "Governance & Community",
      questions: [
        {
          id: "q1-gov",
          text: "Transparency gets thrown around a lot, particularly recently in West Windsor. Could you provide two specific, concrete examples of things you would do to make our local government's operations more transparent and accessible to the average resident?",
          office: "Mayor", // Mayoral only
        },
        {
          id: "q2-gov", // This question overlaps
          text: "To that end, would you support implementing a '311-style' system or app for resident service requests (such as pot holes, broken township equipment) to improve communication and efficiency?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q7-council-gov", // Keep original council Q here
          text: "The Council is responsible for 'Advice and Consent' on the Mayor's appointments to boards like the Planning Board. What criteria will you use to evaluate these appointments?",
          office: "Township Council",
        },
        {
          // NEW QUESTION ADDED HERE
          id: "q8-council-disagreement",
          text: "How would you handle a disagreement with your fellow council members and are there any items where you deviate from your running mates?",
          office: "Township Council",
        },
        {
          id: "q3-gov", // This question overlaps
          text: "Residents, particularly young residents, are concerned about climate change and are wondering what our town can do to preserve open space and protect our environment. What is your vision for balancing the preservation of our beautiful open spaces with the enhancement of our parks and the promotion of environmental sustainability?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q4-gov", // This question overlaps
          text: "What kind of development would you like to see in West Windsor? Which types of houses, restaurants, and businesses should residents expect to see and how will you attract that type of development?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q5-gov", // This question overlaps
          text: "Many residents share a vision for a more vibrant town center, a 'Main Street' for West Windsor. Most see our downtown as 571, around the train station area, but hope to see further development of that area as a walkable area with diverse local options. Do you believe this is a feasible goal, and if so, what is your plan to make it a reality?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q6-gov", // This question overlaps
          text: "Our library is a vital resource, run by the county, however many feel that our library isn’t a space modern, large or centrally located enough support students and our community. Do you have a vision for improving our local branch, perhaps by collaborating with the county or exploring a township-run model like Plainsboro's successful library/community center?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
      ] as ElectionQuestion[], // Type assertion
    },
    {
      id: "regional",
      title: "Regional Leadership",
      questions: [
        {
          id: "q1-regional",
          text: "We know that West Windsor doesn't exist in a bubble; our biggest challenges often cross town lines. Describe your approach to working with leaders in neighboring towns and at the county and state level to find regional solutions.",
          office: "Mayor", // Mayoral only
        },
      ] as ElectionQuestion[], // Type assertion
    },
    {
      id: "closing",
      title: "Closing Questions",
      questions: [
        {
          id: "q1-closing", // This question overlaps (wording slightly different, but same intent)
          text: "In the spirit of a healthy debate and to clarify the choices for voters, if you could ask your opponent(s) one question, what would it be?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q2-closing", // This question overlaps
          text: "To end on a personal note, what is your single favorite thing about West Windsor?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q3-closing", // This question overlaps
          text: "What is your favorite local restaurant?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
        {
          id: "q4-closing", // This question overlaps
          text: "And finally, what does a perfect weekend spent entirely in West Windsor look like to you?",
          office: ["Mayor", "Township Council"], // Changed to array
        },
      ] as ElectionQuestion[], // Type assertion
    },
  ],
};

// --- Main Page Components ---
const Navbar: FC<NavbarProps> = ({
  setActivePage,
  activePage,
  selectedProject,
}) => {
  const navItems = [
    "Home",
    "About",
    "Projects",
    "Budget",
    "Contact",
  ] as const;
  type NavItem = (typeof navItems)[number];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleNav = (item: NavItem) => {
    // The Budget Visualizer is hosted as static pages on this same site.
    if (item === "Budget") {
      window.location.href = "/budget/";
      return;
    }
    setActivePage(item);
  };
  const handleMobileNav = (item: NavItem) => {
    handleNav(item);
    setIsMobileMenuOpen(false);
  };
  const handleLogoClick = () => {
    handleNav("Home");
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(
          'button[aria-label="Open navigation menu"]'
        )
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-slate-900 text-white p-3 sm:p-4 shadow-lg sticky top-0 z-50 print:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src={logoUrl}
            alt="West Windsor Forward Logo"
            className="h-10 sm:h-12 mr-2 sm:mr-3 rounded bg-white p-1.5"
            loading="eager"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (
                e.target as HTMLImageElement
              ).src = `https://placehold.co/48x48/FFFFFF/0C4A6E?text=WWF`;
            }}
          />
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 p-2 rounded-md"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
        <ul className="hidden sm:flex flex-wrap justify-end space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => handleNav(item)}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 ${
                  (activePage as string) === item && !selectedProject
                    ? "bg-sky-500 text-white shadow-md"
                    : "text-gray-300 hover:bg-sky-700 hover:text-white"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="sm:hidden absolute top-full left-0 right-0 bg-slate-800 shadow-xl z-40 animate-slideDown"
        >
          <ul className="flex flex-col items-start p-3 space-y-1.5">
            {navItems.map((item) => (
              <li key={item} className="w-full">
                <button
                  onClick={() => handleMobileNav(item)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ease-in-out ${
                    (activePage as string) === item && !selectedProject
                      ? "bg-sky-500 text-white"
                      : "text-gray-300 hover:bg-sky-600 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

const Footer: FC<FooterProps> = memo(({ setActivePage }) => {
  return (
    <footer className="bg-slate-900 text-gray-300 print:hidden">
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div className="md:col-span-1 space-y-4">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setActivePage("Home")}
            >
              <img
                src={logoUrl}
                alt="West Windsor Forward Logo"
                className="h-10 rounded bg-white p-1.5"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (
                    e.target as HTMLImageElement
                  ).src = `https://placehold.co/40x40/FFFFFF/0C4A6E?text=WWF`;
                }}
              />
              <span className="text-xl font-bold text-white">
                West Windsor Forward
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A dedicated coalition igniting positive change and working
              collaboratively to build a better future for West Windsor.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61575121893868"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors"
                aria-label="Facebook"
              >
                <IconFacebook />
              </a>
              <a
                href="https://instagram.com/westwindsorforward"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                href="https://x.com/westwindsorfwd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors"
                aria-label="X"
              >
                <IconX />
              </a>
              <a
                href="mailto:contact@westwindsorforward.org"
                className="text-slate-400 hover:text-sky-400 transition-colors"
                aria-label="Email"
              >
                <IconMail className="" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-md font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-y-3">
              <li>
                <button
                  onClick={() => setActivePage("Home")}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("About")}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("Projects")}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full"
                >
                  Our Initiatives
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("Election")}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full"
                >
                  2025 Election
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("Contact")}
                  className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="md:col-span-1">
            <h3 className="text-md font-semibold text-white uppercase tracking-wider mb-4">
              Get In Touch
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Have questions, ideas, or want to volunteer? We'd love to hear
              from you.
            </p>
            <Button
              onClick={() => setActivePage("Contact")}
              type="primary"
              className="w-full sm:w-auto"
              icon={<IconMail />}
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} West Windsor Forward. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

const ForumHeader: FC = () => {
  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-sky-800 to-indigo-900 text-white py-12 sm:py-16 md:py-20 px-4 rounded-b-2xl shadow-2xl overflow-hidden">
      <DotPattern dotColor="text-sky-700 opacity-10" rows={8} cols={10} />
      <div className="relative z-10 container mx-auto text-center">
        <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
          {" "}
          EVENT CANCELLED{" "}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {" "}
          2025 Candidate Forum{" "}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-sky-200 mb-6 max-w-3xl mx-auto">
          {" "}
          Empowering West Windsor voters with direct access to candidates for
          Mayor and Township Council{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            {" "}
            <div className="font-semibold line-through">
              {forumData.date}
            </div>{" "}
            <div className="text-sm text-sky-200">
              Originally Scheduled Date
            </div>{" "}
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            {" "}
            <div className="font-semibold">Kelsey Theatre</div>{" "}
            <div className="text-sm text-sky-200">@ MCCC West Windsor</div>{" "}
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            {" "}
            <div className="font-semibold">{forumData.status}</div>{" "}
            <div className="text-sm text-sky-200">Event Status</div>{" "}
          </div>
        </div>
      </div>
    </header>
  );
};

const DocumentComparisonSection: FC = () => (
  <div className="container mx-auto px-4 pt-8">
    <Card noHoverEffect>
      <div className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 text-center">
          Forum Format Agreements
        </h2>
        <p className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">
          The forum was cancelled because the two campaigns were unable to agree
          on a single, final format. All other aspects of the forum, including
          the date, time, venue, and panelists, were accepted by both campaigns.
          To provide full transparency on this specific point of disagreement,
          we are sharing the final format terms each campaign provided.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
            <h3 className="font-bold text-slate-700 mb-2">
              TeamMarathe4WW Agreed Format (Original)
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              The final rules and format agreement from the Marathe campaign.
            </p>
            <Button
              type="secondary"
              icon={<IconDocument />}
              href="/TeamMarathe4WW Agreed Format (Original) .pdf"
            >
              View Terms (PDF)
            </Button>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
            <h3 className="font-bold text-slate-700 mb-2">
              WW Together Agreed Format (Counterproposal)
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              The final rules and format agreement from the WW Together
              campaign.
            </p>
            <Button
              type="secondary"
              icon={<IconDocument />}
              href="/West Windsor Together Agreed Format (Counterproposal) .pdf"
            >
              View Terms (PDF)
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const StatementsSection: FC = () => (
  <div className="container mx-auto px-4">
    <Card noHoverEffect className="p-0 overflow-hidden">
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 via-sky-900 to-indigo-900">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
          Official Statements
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-700/50 p-6 rounded-lg border border-sky-700 text-center flex flex-col">
            <h3 className="font-bold text-white mb-2">
              Our Official Statement
            </h3>
            <p className="text-sm text-slate-300 mb-4 flex-grow">
              The official statement from West Windsor Forward regarding the
              forum's cancellation.
            </p>
            <Button
              type="secondary"
              icon={<IconDocument />}
              href="/West Windsor Forward - 2025 Candidate Forum Cancellation.pdf"
            >
              View Statement (PDF)
            </Button>
          </div>
          <div className="bg-slate-700/50 p-6 rounded-lg border border-sky-700 text-center flex flex-col">
            <h3 className="font-bold text-white mb-2">
              League of Women Voters Statement
            </h3>
            <p className="text-sm text-slate-300 mb-4 flex-grow">
              A statement from the League of Women Voters of the Greater
              Princeton Area, who supported the forum initiative.
            </p>
            <Button
              type="secondary"
              icon={<IconDocument />}
              href="/Cancellation of West Windsor Candidates.pdf"
            >
              View Statement (PDF)
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const ForumFormatSection: FC = () => {
  const getIcon = (iconType: string) => {
    if (iconType === "microphone") return <IconMicrophone className="" />;
    if (iconType === "users") return <IconUsers className="" />;
    if (iconType === "lightbulb") return <IconLightBulb className="" />;
    return <IconLightBulb />;
  };
  return (
    <Card hasDotPattern className="p-0">
      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
          {" "}
          Forum Format & Structure{" "}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {forumData.forumParts.map((part) => (
            <div
              key={part.id}
              className="relative bg-gradient-to-br from-slate-50 to-sky-50 p-6 rounded-xl border border-sky-200 hover:shadow-lg transition-all duration-300 w-full max-w-md"
            >
              <div className="flex items-center mb-4">
                <div className="bg-sky-600 text-white p-2 rounded-lg mr-3 flex justify-center items-center">
                  {" "}
                  {getIcon(part.iconType)}{" "}
                </div>
                <div>
                  <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
                    {" "}
                    Part {part.id}{" "}
                  </div>
                  <h3 className="font-semibold text-slate-800">{part.title}</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{part.description}</p>
              <div className="flex items-center text-xs text-slate-500">
                {" "}
                <IconMapMarker className="h-3 w-3 mr-1" /> {part.location}{" "}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
            {" "}
            <IconDocument className="h-5 w-5 mr-2" /> Forum Requirements{" "}
          </h3>
          <div className="space-y-2 text-sm text-amber-700">
            <p>
              {" "}
              <strong>Council:</strong> {forumData.requirements.council}{" "}
            </p>
            <p>
              {" "}
              <strong>Mayor:</strong> {forumData.requirements.mayor}{" "}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const PressCoverageSection: FC = () => (
  <Card className="p-0">
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
        {" "}
        In the News{" "}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {forumData.pressCoverage.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center transition-all duration-300 hover:shadow-lg hover:border-sky-300 flex flex-col h-full">
              <h3 className="text-lg font-semibold text-sky-700 mb-2 flex-grow">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 italic mb-4">
                Source: {article.source}
              </p>
              <Button
                type="secondary"
                size="sm"
                className="mt-auto mx-auto"
                icon={<IconExternalLink />}
              >
                Read Article
              </Button>
            </div>
          </a>
        ))}
      </div>
    </div>
  </Card>
);

const PanelistSection: FC = () => {
  const [selectedPanelistId, setSelectedPanelistId] = useState<string | null>(
    null
  );
  return (
    <Card className="p-0">
      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
          {" "}
          Distinguished Panelists{" "}
        </h2>
        <div className="flex flex-wrap justify-center items-start gap-6">
          {forumData.panelists.map((panelist) => (
            <div key={panelist.id} className="flex flex-col w-full max-w-sm">
              <div
                className={`text-center p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col h-full ${
                  selectedPanelistId === panelist.id
                    ? "border-sky-500 bg-sky-50 shadow-lg"
                    : "border-gray-200 hover:border-sky-300 hover:shadow-md"
                }`}
                onClick={() =>
                  setSelectedPanelistId(
                    selectedPanelistId === panelist.id ? null : panelist.id
                  )
                }
              >
                <img
                  src={
                    panelist.imageUrl ||
                    `https://placehold.co/150x150/E0F2FE/0C4A6E?text=${panelist.name.substring(
                      0,
                      1
                    )}${
                      panelist.name.split(" ")[1]?.substring(0, 1) || ""
                    }&font=Lora`
                  }
                  alt={panelist.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-sky-200 object-cover object-center shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (
                      e.target as HTMLImageElement
                    ).src = `https://placehold.co/150x150/CCCCCC/FFFFFF?text=Panelist&font=Lora`;
                  }}
                />
                <div className="flex-grow flex flex-col">
                  <h3 className="font-semibold text-sky-700 mb-1 min-h-[1.5rem]">
                    {panelist.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-1 flex-grow">
                    {panelist.title}
                  </p>
                  {panelist.note && (
                    <p className="text-xs text-amber-600 italic mb-1 flex items-center justify-center">
                      {panelist.note}
                    </p>
                  )}
                  {!panelist.note && <div className="mb-1"></div>}
                </div>
                <button className="text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center justify-center mx-auto mt-auto">
                  {selectedPanelistId === panelist.id ? "Hide Bio" : "View Bio"}
                  {selectedPanelistId === panelist.id ? (
                    <IconChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <IconChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
              </div>
              {selectedPanelistId === panelist.id && (
                <div className="bg-white p-4 -mt-2 rounded-b-xl shadow-lg border border-t-0 border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {panelist.bio}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const KeyInformationSection: FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const infoSections = [
    {
      id: "attendance",
      title: "For Attendees",
      icon: <IconUsers className="" />,
      content: (
        <div className="space-y-4">
          {" "}
          <div>
            {" "}
            <h4 className="font-semibold text-slate-800 mb-2">
              Why Attend?
            </h4>{" "}
            <ul className="space-y-2 text-sm text-slate-600">
              {" "}
              <li>
                • Hear directly from candidates beyond campaign materials
              </li>{" "}
              <li>
                {" "}
                • Get answers to community questions during town hall session{" "}
              </li>{" "}
              <li>
                • Engage with fellow residents on important local issues
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          <div>
            {" "}
            <h4 className="font-semibold text-slate-800 mb-2">
              {" "}
              What to Expect{" "}
            </h4>{" "}
            <p className="text-sm text-slate-600">
              {" "}
              In-person admission to the forum is free. The event will be
              live-streamed on YouTube for those unable to attend in person.
              Audience members are expected to maintain respectful behavior
              during moderated portions.{" "}
            </p>{" "}
          </div>{" "}
        </div>
      ),
    },
    {
      id: "candidates",
      title: "For Candidates",
      icon: <IconMicrophone className="" />,
      content: (
        <div className="space-y-4">
          {" "}
          <div>
            {" "}
            <h4 className="font-semibold text-slate-800 mb-2">
              {" "}
              Participation Benefits{" "}
            </h4>{" "}
            <ul className="space-y-2 text-sm text-slate-600">
              {" "}
              <li>
                • Present your platform to an engaged community audience
              </li>{" "}
              <li>• Reach a broader audience through live streaming</li>{" "}
              <li>• Participate in a fair, moderated discussion format</li>{" "}
            </ul>{" "}
          </div>{" "}
          <div>
            {" "}
            <h4 className="font-semibold text-slate-800 mb-2">
              Requirements
            </h4>{" "}
            <p className="text-sm text-slate-600">
              {" "}
              Candidates must arrive by 6:30 PM for briefing, agree to ground
              rules including professional conduct and time limits, and sign a
              participation agreement.{" "}
            </p>{" "}
          </div>{" "}
        </div>
      ),
    },
    {
      id: "rules",
      title: "Ground Rules & Guidelines",
      icon: <IconDocument className="" />,
      content: (
        <div className="space-y-4">
          {" "}
          <div>
            {" "}
            <h4 className="font-semibold text-slate-800 mb-2">
              {" "}
              Candidate Conduct{" "}
            </h4>{" "}
            <ul className="space-y-2 text-sm text-slate-600">
              {" "}
              <li>• Strict time limits enforced by moderator</li>{" "}
              <li>• Equal speaking opportunities for all candidates</li>{" "}
              <li>• One rebuttal opportunity per question</li>{" "}
              <li>• Professional attire required (no political slogans)</li>{" "}
              <li>• No personal attacks or derogatory comments</li>{" "}
              <li>• Electronic devices silenced during forum</li>{" "}
            </ul>{" "}
          </div>{" "}
          <div>
            {" "}
            <h4 className="font-semibold text-slate-800 mb-2">
              {" "}
              Audience Guidelines{" "}
            </h4>{" "}
            <ul className="space-y-2 text-sm text-slate-600">
              {" "}
              <li>• Silent observation during moderated portions</li>{" "}
              <li>• Questions submitted in writing only</li>{" "}
              <li>• No political displays or materials in theatre</li>{" "}
              <li>• Recording prohibited (except official stream)</li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>
      ),
    },
  ];
  return (
    <Card className="p-0">
      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
          {" "}
          Important Information{" "}
        </h2>
        <div className="space-y-4">
          {infoSections.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  {" "}
                  <div className="text-sky-600 mr-3">{section.icon}</div>{" "}
                  <span className="font-semibold text-slate-800">
                    {section.title}
                  </span>{" "}
                </div>
                {expandedSection === section.id ? (
                  <IconChevronUp className="text-gray-400" />
                ) : (
                  <IconChevronDown className="text-gray-400" />
                )}
              </button>
              {expandedSection === section.id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// --- Pages ---
const HomePage: FC<PageProps> = memo(({ setActivePage }) => (
  <div className="animate-fadeIn">
    <header
      className="relative bg-gradient-to-br from-slate-900 via-sky-800 to-indigo-900 text-white py-16 sm:py-20 md:py-28 px-4 text-center rounded-b-2xl shadow-2xl overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #0f172a, #075985, #312e81)",
      }}
    >
      <DotPattern dotColor="text-sky-700 opacity-10" rows={8} cols={10} />
      <div className="relative z-10 container mx-auto">
        <img
          src={logoUrl}
          alt="West Windsor Forward Logo"
          className="h-16 sm:h-20 md:h-24 mx-auto mb-4 sm:mb-6 rounded-lg shadow-md bg-white p-1.5 sm:p-2"
          loading="eager"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (
              e.target as HTMLImageElement
            ).src = `https://placehold.co/96x96/FFFFFF/0C4A6E?text=WWF`;
          }}
        />
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tight">
          {" "}
          West Windsor Forward{" "}
        </h1>
        <p className="text-sm sm:text-md md:text-xl text-sky-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
          {" "}
          A dedicated coalition of residents igniting positive change and
          working collaboratively to build a better future for West Windsor.{" "}
        </p>
        <div className="space-y-2 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
          <Button
            onClick={() => setActivePage("About")}
            className="w-full sm:w-auto text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5"
          >
            {" "}
            Learn About Us{" "}
          </Button>
          <Button
            onClick={() => setActivePage("Projects")}
            type="secondary"
            className="w-full sm:w-auto text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5"
          >
            {" "}
            Explore Our Initiatives{" "}
          </Button>
        </div>
      </div>
    </header>
    <section className="py-10 md:py-12 px-4 bg-white">
      <div className="container mx-auto text-center">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            {" "}
            Igniting Progress in West Windsor{" "}
          </h2>
          <p className="text-sm sm:text-md text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed">
            {" "}
            West Windsor Forward is committed to empowering our neighbors,
            advocating for impactful projects, and injecting fresh energy into
            our community. We believe in responsive, accountable, and
            transparent leadership.{" "}
          </p>
          <Button onClick={() => setActivePage("About")}>
            {" "}
            Learn About Our Approach{" "}
          </Button>
        </div>
      </div>
    </section>
    <section className="bg-slate-100 py-10 md:py-12 px-4 relative overflow-hidden">
      <DotPattern dotColor="text-sky-500 opacity-5" rows={10} cols={12} />
      <div className="container mx-auto relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center">
            {" "}
            Key Initiatives{" "}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <Card className="p-0">
              <div className="p-4 sm:p-6 md:p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-sky-700">
                    2025 Election Hub & Forum Archive
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Following the cancellation of our candidate forum, we've
                    created a comprehensive, non-partisan voter hub with
                    interviews, data, and key information to ensure residents
                    can make an informed choice.
                  </p>
                </div>
                <Button
                  onClick={() => setActivePage("Election")}
                  type="secondary"
                  className="w-full sm:w-auto text-xs"
                >
                  {" "}
                  Visit the Election Hub{" "}
                </Button>
              </div>
            </Card>
            <Card className="p-0">
              <div className="p-4 sm:p-6 md:p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-sky-700">
                    {" "}
                    Princeton Junction Station Improvement Project{" "}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    {" "}
                    Transforming our vital transit hub into a welcoming,
                    beautiful, and vibrant community space through
                    beautification, art, and programming.{" "}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    const stationProject = projectsData.find(
                      (p) => p.slug === "princeton-junction-station-improvement"
                    );
                    if (stationProject) {
                      setActivePage("ProjectDetails", stationProject);
                    }
                  }}
                  type="secondary"
                  className="w-full sm:w-auto text-xs"
                >
                  {" "}
                  Project Information{" "}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
    <section className="py-10 md:py-12 px-4 bg-white">
      <div className="container mx-auto text-center">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            {" "}
            Get Involved & Make an Impact{" "}
          </h2>
          <p className="text-sm sm:text-md text-gray-700 max-w-2xl mx-auto mb-6 leading-relaxed">
            {" "}
            Your participation is crucial. Join us in mobilizing residents,
            organizations, and resources to create a West Windsor where every
            resident can thrive.{" "}
          </p>
          <div className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <Button
              onClick={() => setActivePage("Contact")}
              className="w-full sm:w-auto"
            >
              {" "}
              Volunteer With Us{" "}
            </Button>
            <Button
              onClick={() => setActivePage("Contact")}
              type="secondary"
              className="w-full sm:w-auto"
            >
              {" "}
              Contact & Support{" "}
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
));

const AboutPage: FC = memo(() => {
  const teamMembers = useMemo(
    () => [
      {
        name: "Parth Gupta",
        role: "Co-Executive Director",
        bio: "A West Windsor resident for 14 years and student at the Lawrenceville School. Parth is a runner for the Lawrenceville School as part of their cross-country and track and field teams. Parth has been playing piano for 10 years and has co-organized piano Performathons to raise money for the Children's Hospital of Philadelphia.",
        image: "/parth.png",
      },
      {
        name: "Darshan Chidambaram",
        role: "Co-Executive Director",
        bio: "A West Windsor resident for 8 years and a student at the Lawrenceville School. Darshan is an active tennis player for the Lawrenceville School and debater on the national debate circuit.",
        image: "/darshan.png",
      },
    ],
    []
  );

  return (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-8 sm:mb-10 md:mb-12 text-center">
        {" "}
        About West Windsor Forward{" "}
      </h1>
      <Card className="bg-slate-50 p-0" hasDotPattern>
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-3 sm:mb-4">
            {" "}
            About Us{" "}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-md md:text-lg">
            {" "}
            West Windsor Forward was founded by Parth Gupta and Darshan
            Chidambaram, dedicated West Windsor residents and students at the
            Lawrenceville School. Driven by a shared belief that our community
            can achieve even greater progress, they established this coalition
            to ignite positive change and work collaboratively towards a better
            future for all.{" "}
          </p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-md md:text-lg">
            {" "}
            We are committed to empowering our neighbors, advocating for
            impactful projects, and injecting fresh energy and innovation into
            community initiatives. Our approach is rooted in demanding
            responsiveness, accountability, and transparency from local leaders,
            and in fostering strong partnerships to maximize our collective
            impact.{" "}
          </p>
        </div>
      </Card>
      <Card className="p-0">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-6 sm:mb-8 text-center">
            {" "}
            Meet the Founders{" "}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-slate-50 p-4 sm:p-6 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full mx-auto mb-4 sm:mb-5 border-4 border-sky-500 shadow-sm"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (
                      e.target as HTMLImageElement
                    ).src = `https://placehold.co/150x150/E0F2FE/0C4A6E?text=${member.name.substring(
                      0,
                      1
                    )}${
                      member.name.split(" ")[1]
                        ? member.name.split(" ")[1].substring(0, 1)
                        : ""
                    }&font=Lora`;
                  }}
                />
                <h3 className="text-md sm:text-lg md:text-xl font-semibold text-slate-800">
                  {member.name}
                </h3>
                <p className="text-sky-600 font-medium mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">
                  {member.role}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card className="bg-slate-50 p-0" hasDotPattern>
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-4 sm:mb-6">
            {" "}
            Our Guiding Principles{" "}
          </h2>
          <p className="text-sm sm:text-md md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
            {" "}
            Our work is driven by an unwavering passion to create a West Windsor
            where every resident has the opportunity to thrive, where voices are
            valued, and where tangible progress can be observed. This is
            reflected in our core commitments:{" "}
          </p>
          <ul className="grid md:grid-cols-1 gap-y-3 sm:gap-y-4 text-gray-700 text-sm sm:text-md md:text-lg leading-relaxed">
            {[
              {
                title: "Empowering Neighbors",
                detail:
                  "Providing tools, knowledge, and opportunities for active participation in shaping our community's future.",
              },
              {
                title: "Impactful Advocacy",
                detail:
                  "Championing projects that improve quality of life, build community, and foster growth, while demanding responsive leadership.",
              },
              {
                title: "Innovation & Energy",
                detail:
                  "Addressing long-neglected needs and enhancing civic engagement through targeted, fresh initiatives.",
              },
              {
                title: "Strategic Mobilization",
                detail:
                  "Uniting residents, organizations, and resources for sustainable, far-reaching collective impact through strong partnerships.",
              },
              {
                title: "Non-Partisanship & Inclusivity",
                detail:
                  "Operating independently and ensuring all voices are valued in our pursuit of a better West Windsor.",
              },
            ].map((value) => (
              <li key={value.title} className="flex">
                {" "}
                <span>
                  {" "}
                  <strong>{value.title}:</strong> {value.detail}{" "}
                </span>{" "}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
});

const ProjectCard: FC<ProjectCardProps> = memo(({ project, setActivePage }) => {
  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      if (project.redirectTo) setActivePage(project.redirectTo);
      else setActivePage("ProjectDetails", project);
    },
    [project, setActivePage]
  );

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (project.redirectTo) setActivePage(project.redirectTo);
      else setActivePage("ProjectDetails", project);
    },
    [project, setActivePage]
  );

  const statusColor =
    project.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : project.status === "Completed"
      ? "bg-green-100 text-green-700"
      : "bg-sky-100 text-sky-700";

  return (
    <Card
      onClick={handleCardClick}
      className="flex flex-col h-full group p-0"
      hasDotPattern
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (
            e.target as HTMLImageElement
          ).src = `https://placehold.co/600x400/CCCCCC/FFFFFF?text=Project+Image&font=Lora`;
        }}
      />
      <div className="flex-grow flex flex-col p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-sky-700 group-hover:text-sky-600 transition-colors mb-2 min-h-[3.5rem] line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="mb-4">
          {" "}
          <span
            className={`inline-block text-xs font-medium px-2 py-1 ${statusColor} rounded-full`}
          >
            {project.status}
          </span>{" "}
        </div>
        <div className="flex-grow">
          {project.partnerOrganizations &&
            project.partnerOrganizations.length > 0 && (
              <>
                <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  {" "}
                  Partners:{" "}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {" "}
                  {project.partnerOrganizations.map((org) => (
                    <span
                      key={org}
                      className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                    >
                      {org}
                    </span>
                  ))}{" "}
                </div>
              </>
            )}
          {project.supportingOrganizations &&
            project.supportingOrganizations.length > 0 && (
              <>
                <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  {" "}
                  Supported By:{" "}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {" "}
                  {project.supportingOrganizations.map((org) => (
                    <span
                      key={org}
                      className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                    >
                      {org}
                    </span>
                  ))}{" "}
                </div>
              </>
            )}
        </div>
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
        <Button
          onClick={handleButtonClick}
          type="secondary"
          className="w-full text-xs"
        >
          {" "}
          {project.redirectTo ? "View Details" : "View Project Details"}{" "}
        </Button>
      </div>
    </Card>
  );
});

const ProjectsPage: FC<PageProps> = ({ setActivePage }) => (
  <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
    <div className="text-center mb-10 sm:mb-12 md:mb-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-3">
        {" "}
        Our Initiatives{" "}
      </h1>
      <p className="text-sm sm:text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
        {" "}
        Explore the projects West Windsor Forward is undertaking to enhance our
        community.{" "}
      </p>
      <div className="mt-4 sm:mt-6 inline-block relative">
        {" "}
        <DotPattern dotColor="text-sky-500 opacity-10" rows={2} cols={8} />{" "}
      </div>
    </div>
    <div className="my-8 sm:my-10 h-1.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 rounded-full"></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
      {projectsData.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          setActivePage={setActivePage}
        />
      ))}
    </div>
  </div>
);

const ProjectDetailPage: FC<ProjectDetailPageProps> = ({
  project,
  setActivePage,
}) => {
  if (!project) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p className="text-xl text-red-500">Project not found.</p>
        <Button onClick={() => setActivePage("Projects")} className="mt-4">
          {" "}
          Back to Projects{" "}
        </Button>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
      <Button
        onClick={() => setActivePage("Projects")}
        type="secondary"
        className="mb-6 sm:mb-8 text-xs sm:text-sm"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        {" "}
        Back to All Projects{" "}
      </Button>
      <Card noHoverEffect className="overflow-visible p-0">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="lg:flex lg:space-x-6 md:space-x-8">
            <div className="lg:w-2/5 mb-6 lg:mb-0">
              {" "}
              <img
                src={project.image}
                alt={project.title}
                className="rounded-lg shadow-md w-full h-auto object-cover aspect-video"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (
                    e.target as HTMLImageElement
                  ).src = `https://placehold.co/600x338/CCCCCC/FFFFFF?text=Project+Image&font=Lora`;
                }}
              />{" "}
            </div>
            <div className="lg:w-3/5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-700 mb-2">
                {project.title}
              </h1>
              <div className="flex items-center text-xs sm:text-sm md:text-md text-gray-500 mb-2">
                {" "}
                {project.status.toLowerCase().includes("upcoming") ? (
                  <IconClock className="mr-2 text-amber-600 h-5 w-5 flex-shrink-0" />
                ) : (
                  <IconCheckCircle className="mr-2 text-green-600 h-5 w-5 flex-shrink-0" />
                )}{" "}
                <span>
                  {" "}
                  <strong>Status:</strong> {project.status}{" "}
                </span>{" "}
              </div>
              <p className="text-xs sm:text-sm md:text-md text-gray-600 mb-4">
                {" "}
                <strong>Goal:</strong> {project.goal}{" "}
              </p>
            </div>
          </div>
          <div className="prose max-w-none mt-6 sm:mt-8 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mb-3 sm:mb-4">
              {" "}
              Project Overview{" "}
            </h2>{" "}
            <p>{project.description}</p>
            {project.initiatives && (
              <>
                {" "}
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
                  {" "}
                  Project Initiatives{" "}
                </h2>{" "}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {" "}
                  {project.initiatives.map((initiative, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-sky-50 to-slate-50 p-4 rounded-lg border border-sky-200"
                    >
                      {" "}
                      <div className="flex items-center mb-2">
                        {" "}
                        <div className="text-sky-600 mr-3 flex justify-center items-center">
                          {initiative.icon}
                        </div>{" "}
                        <h3 className="font-semibold text-slate-800 text-sm">
                          {initiative.title}
                        </h3>{" "}
                      </div>{" "}
                      <p className="text-xs text-slate-600 mb-2">
                        {initiative.description}
                      </p>{" "}
                      <span className="text-xs font-medium px-2 py-1 bg-sky-100 text-sky-700 rounded">
                        {initiative.status}
                      </span>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </>
            )}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
              {" "}
              Project Timeline & Milestones{" "}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {" "}
              {project.timeline?.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start p-2.5 sm:p-3 md:p-4 rounded-lg border-l-4 ${
                    item.completed
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-sky-500 bg-sky-50 text-sky-800"
                  }`}
                >
                  {" "}
                  <div className="mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">
                    {item.completed ? (
                      <IconCheckCircle className="text-green-500 h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <IconClock className="text-sky-500 h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                  </div>{" "}
                  <div>
                    {" "}
                    <h4 className="font-semibold text-sm sm:text-md md:text-lg">
                      {item.stage}
                    </h4>{" "}
                    <p className="text-xs sm:text-sm opacity-90">
                      {item.details}
                    </p>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
              {" "}
              Envisioned Impact{" "}
            </h2>{" "}
            <p>{project.impact}</p>
            {project.partnerOrganizations &&
              project.partnerOrganizations.length > 0 && (
                <>
                  {" "}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
                    {" "}
                    Our Partners{" "}
                  </h2>{" "}
                  <ul className="list-none p-0 flex flex-wrap gap-2 sm:gap-3">
                    {" "}
                    {project.partnerOrganizations.map((org) => (
                      <li
                        key={org}
                        className="bg-slate-100 text-slate-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-sm flex items-center"
                      >
                        {org}
                      </li>
                    ))}{" "}
                  </ul>{" "}
                </>
              )}
            {project.supportingOrganizations &&
              project.supportingOrganizations.length > 0 && (
                <>
                  {" "}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
                    {" "}
                    Supported By{" "}
                  </h2>{" "}
                  <ul className="list-none p-0 flex flex-wrap gap-2 sm:gap-3">
                    {" "}
                    {project.supportingOrganizations.map((org) => (
                      <li
                        key={org}
                        className="bg-slate-100 text-slate-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-sm flex items-center"
                      >
                        {org}
                      </li>
                    ))}{" "}
                  </ul>{" "}
                </>
              )}
            <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-sky-50 rounded-lg border border-sky-200">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-3">
                {" "}
                How You Can Contribute{" "}
              </h2>{" "}
              <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm md:text-base">
                {project.getInvolved}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setActivePage("Contact")}
                  icon={<IconUsers />}
                  className="text-xs sm:text-sm"
                >
                  {" "}
                  Volunteer or Offer Support{" "}
                </Button>
                {project.id === 2 && (
                  <Button
                    onClick={() =>
                      window.open("/WWF_Station_Proposal[V1].pdf", "_blank")
                    }
                    type="secondary"
                    icon={<IconDocument />}
                    className="text-xs sm:text-sm"
                  >
                    {" "}
                    Read Full Proposal{" "}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Countdown: FC<{ targetDate: string; title: string }> = ({
  targetDate,
  title,
}) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timeParts = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="p-2">
      <h4 className="text-center text-sm font-semibold mb-2">{title}</h4>
      <div className="flex justify-center space-x-2 sm:space-x-4">
        {timeParts.map((part) => (
          <div key={part.label} className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl font-bold tracking-tight">
              {String(part.value).padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest">
              {part.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BioCard: FC<{
  candidate: (typeof electionData.candidates)[0];
  borderColor: string;
  textColor: string;
}> = ({ candidate, borderColor, textColor }) => {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      // Check if user is within 5px of the bottom
      const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 5;
      if (isAtBottom) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      // Check immediately if scrolling is needed
      const isScrollable = el.scrollHeight > el.clientHeight;
      setShowScrollHint(isScrollable);

      el.addEventListener("scroll", handleScroll);
    }
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div key={candidate.id} className="text-center">
      <img
        src={candidate.image}
        alt={candidate.name}
        className={`w-28 h-28 rounded-full mx-auto mb-4 border-4 ${borderColor} object-cover object-center shadow-sm`}
      />
      <h4 className="font-bold text-lg text-slate-800">{candidate.name}</h4>
      <p
        className={`text-sm ${textColor} font-semibold`}
      >{`For ${candidate.office}`}</p>
      <div
        ref={scrollRef}
        className="relative mt-3 h-40 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
      >
        {" "}
        {/* Added scrollbar styling */}
        <p className="text-sm text-slate-600 text-left leading-relaxed whitespace-pre-wrap pb-4">
          {candidate.bio}
        </p>
        {showScrollHint && (
          <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none flex flex-col justify-end items-center pb-1 transition-opacity">
            <span className="text-xs text-slate-400 font-semibold animate-pulse">
              Scroll down
            </span>
            <IconChevronDown className="h-4 w-4 text-slate-400 animate-bounce" />{" "}
            {/* Added bounce */}
          </div>
        )}
      </div>
    </div>
  );
};

const ElectionPage: FC<PageProps> = ({ setActivePage }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // Start with all collapsed
  const [activeTab, setActiveTab] = useState("mail");
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isRasmussenBioOpen, setIsRasmussenBioOpen] = useState(false);
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>({});
  const filterBarRef = useRef<HTMLDivElement>(null); // Ref for the filter bar
  const headerRef = useRef<HTMLElement>(null); // Ref for the sticky header/filter bar
  const [activeOffice, setActiveOffice] = useState<OfficeType | null>(null); // Use OfficeType
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopyLink = useCallback((questionId: string) => {
    // Guard against environments where clipboard API is not available
    // Use execCommand as a fallback for iframe environments
    try {
      const url = `${window.location.origin}${window.location.pathname}#${questionId}`;
      const textArea = document.createElement("textarea");
      textArea.value = url;
      // Style it to be invisible
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';

      document.body.appendChild(textArea);

      // --- THIS IS THE FIX ---
      // Calling focus() can scroll the page. preventScroll stops this.
      textArea.focus({ preventScroll: true });
      // --- END OF FIX ---

      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedLinks((prev) => ({ ...prev, [questionId]: true }));
      setTimeout(() => {
        setCopiedLinks((prev) => ({ ...prev, [questionId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  }, []);


  const handleJumpTo = useCallback(
    (targetId: string) => {
      const element = document.getElementById(targetId);
      if (element) {
        // Calculate offset if you have a sticky header/filter bar
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const filterBarHeight = filterBarRef.current?.offsetHeight || 0;
        // Adjust offset based on which element is sticky at the time of jump
        // --- INCREASED OFFSET FROM 20 TO 30 ---
        const offset = Math.max(headerHeight, filterBarHeight) + 30; // Add 30px padding

        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        console.warn(`Element with ID "${targetId}" not found for jump link.`);
      }
    },
    [headerRef, filterBarRef]
  ); // Add refs to dependency array

  const officeStyles: { [key: string]: string } = {
    Mayor: "bg-blue-100 text-blue-800",
    "Township Council": "bg-green-100 text-green-800",
  };

  const mayorMaratheVideoId = "nrW--rMjDXc";
  const mayorSinghVideoId = "OdMCwdJfdJk";
  const councilGeeversCharlesVideoId = "nZ1YuORz3Ug";
  const councilTomarWintersVideoId = "76l6GSE4lkU";

  const responsesData = {
    marathe: {
      // Mayor - Proven Leaders
      "q0-opening": {
        time: "0:31",
        summary:
          "Mayor Marate introduces himself as a 31-year resident of West Windsor, viewing the town as his home. He outlines his extensive history of public service, including nine years as school board president and his current tenure as mayor since 2017, emphasizing his commitment to making the best, albeit sometimes difficult, decisions for the community.",
      },
      "q1-vision": {
        time: "2:18",
        summary:
          "The mayor describes the role as being the 'face of the township' and setting the community's tone. He asserts that his 25-year record of service on the school board, council, and as mayor is his primary qualification, and he asks voters to judge him on his history of making tough decisions for the town's long-term benefit.",
      },
      "q2-vision": {
        time: "4:19",
        summary:
          "Mayor Marathe states that the township is performing very well, citing eight consecutive years of flat municipal taxes as an objective measure of success. He highlights his administration's effective management of significant challenges, including the COVID-19 pandemic and the state's affordable housing mandates.",
      },
      "q3-vision": {
        time: "5:32",
        summary:
          "He identifies the town's top three appealing attributes as its excellent school district, busy train station, and a family-friendly atmosphere where leadership is based on merit, not politics. He notes that the primary frustrations residents express are related to taxes, the condition of sidewalks, and a desire for more street lighting.",
      },
      "q1-future": {
        time: "7:27",
        summary:
          "In his first 100 days, he would continue to prioritize key resident concerns, including taxes, sidewalk repairs, increasing street lighting, and resurfacing roads. He emphasizes that his approach to governing is consistent throughout his term and not confined to a specific timeframe.",
      },
      "q2-future": {
        time: "9:33",
        summary:
          "His primary long-term goal is to continue making decisions that ensure the future prosperity of West Windsor, even if they are politically difficult in the short term. A specific project he hopes to advance is attracting an indoor sports facility to meet demand for year-round athletic activities.",
      },
      "q1-warehouse": {
        time: "11:24",
        summary:
          "The mayor explains that the decision to approve warehouses on the Howard Hughes site was a strategic choice to avoid a lawsuit that could have forced the township to build approximately 2,000 homes. This action, he argues, fulfills affordable housing obligations while preventing a massive increase in residential density and school enrollment.",
      },
      "q2-warehouse": {
        time: "13:24",
        summary:
          "He frames the development choice as one between warehouses or 2,000 new homes, arguing the homes would create far more traffic on local roads. He contends that warehouse traffic will be largely outbound with direct access to Route 1, minimally impacting local streets, similar to the traffic patterns of nearby shopping malls.",
      },
      "q3-warehouse": {
        time: "15:52",
        summary:
          "Mayor Marathe states that he has not received any new proposals for warehouses and does not anticipate any due to market saturation. He would, however, support a warehouse-style structure if it were repurposed for a community use, such as the indoor sports facility he hopes to attract.",
      },
      "q1-taxes": {
        time: "17:05",
        summary:
          "To keep West Windsor affordable for young families, his strategy is to maintain low municipal taxes, foster a strong sense of community, and enhance local amenities. He plans to continue attracting new small businesses and improving sports facilities to preserve the town's appeal.",
      },
      "q2-taxes": {
        time: "18:16",
        summary:
          "He points out that the municipal portion of property taxes has risen by only 2.7% cumulatively over eight years while maintaining all town services. The mayor attributes overall tax increases to school and county levies and highlights that his administration has grown the town's surplus to $10 million through prudent financial management.",
      },
      "q3-taxes": {
        time: "20:00",
        summary:
          "He compares West Windsor to Robbinsville, noting that Robbinsville's fiscal stability is due in large part to its Amazon warehouse. He argues that West Windsor's approval of warehouses will provide similar long-term tax stability by preventing costly residential development, contrasting the township's minimal tax increases with the county's significant hikes.",
      },
      "q1-infra": {
        time: "21:47",
        summary:
          "The mayor asserts that controlling new housing development is the most effective way to manage traffic, which is why his administration is legally challenging the state's affordable housing numbers. He also notes that the township dedicates over $2 million annually to a systematic road resurfacing program based on objective condition assessments.",
      },
      "q2-infra": {
        time: "23:36",
        summary:
          "He affirms that West Windsor is a bicycle-friendly community and that safety for pedestrians and cyclists is a priority in all road projects. He cites the completion of the Cranberry Road sidewalk and safety upgrades on Alexander Road as examples of his commitment and notes his close collaboration with the West Windsor Bicycle and Pedestrian Alliance.",
      },
      "q3-infra": {
        time: "25:56",
        summary:
          "The mayor assesses the police department as 'excellent' and notes that fire and EMS services are continuously improving. A key goal for his next term is to expand the dedicated ambulance service to provide 24/7 coverage for the community.",
      },
      "q1-gov": {
        time: "26:45",
        summary:
          "He refutes any claims of a lack of transparency, stating he is one of the most accessible and responsive mayors in the region through platforms like Facebook, email, and phone. He asserts that both he and the township council are consistently available to address resident concerns.",
      },
      "q2-gov": {
        time: "28:17",
        summary:
          "Mayor Marathe deems a 311-style system unnecessary, as residents can already report issues like potholes and missed garbage pickups efficiently through the township website. He states that the current system works well, with most issues being resolved within a day.",
      },
      "q3-gov": {
        time: "29:03",
        summary:
          "He highlights the township's strong record of preserving open space, including purchasing the Hall Farm to prevent a large housing development. On sustainability, he believes in a shared responsibility between the town and its residents, encouraging personal actions like reducing online deliveries alongside municipal efforts.",
      },
      "q4-gov": {
        time: "30:52",
        summary:
          "While he would prefer no new large-scale housing, he acknowledges it is mandated by the state. His focus is on supporting small businesses to ensure local commercial centers remain vibrant and fully occupied.",
      },
      "q5-gov": {
        time: "33:04",
        summary:
          "He confirms that creating a walkable downtown area between the train station and High School South is a feasible goal that will be achieved in the next four years. The plan includes redesigning Route 571 with new lanes, sidewalks, and bike paths to foster a vibrant town center.",
      },
      "q6-gov": {
        time: "35:10",
        summary:
          "The mayor clarifies that the library is part of the Mercer County system, which controls its funding and operations, not the township. He states that his administration continues to work with the county to advocate for improvements to the West Windsor branch.",
      },
      "q1-regional": {
        time: "36:28",
        summary:
          "He describes his relationship with other local and state leaders as excellent and collaborative. He provides the example of working with the mayors of Princeton and Hamilton during the pandemic to successfully advocate for local control over vaccination efforts.",
      },
      "q1-closing": {
        time: "37:53",
        summary:
          "Expressing disappointment over the lack of a live debate, the mayor says he would ask his opponent why he declined to participate in a face-to-face forum. He believes such an event is critical for voters to directly compare candidates.",
      },
      "q2-closing": {
        time: "38:37",
        summary:
          "His favorite thing about West Windsor is that it is his home. Having lived in the same house for 31 years and raised his family there, he feels a deep, personal connection to the town.",
      },
      "q3-closing": {
        time: "39:18",
        summary:
          "Declining to name a single favorite, he says he made an effort to support every restaurant in town during the pandemic. He encourages residents to shop and dine locally to strengthen the community's economy.",
      },
      "q4-closing": {
        time: "40:04",
        summary:
          "A perfect weekend for him consists of spending time with family and friends and attending community events. He stresses the importance of fostering a strong sense of community and neighborliness as the town continues to grow.",
      },
    },
    singh: {
      // Mayor - WW Together (UPDATED SUMMARIES)
      "q0-opening": {
        time: "0:34",
        summary:
          "Mr. Singh introduces himself as a resident since 2011, a father of three, and a tech consultant for 30 years. He highlights his community involvement, including connecting residents with elected officials and serving on the board of a nonprofit that supports adults with disabilities, stating he wants to make a positive impact as mayor.",
      },
      "q1-vision": {
        time: "2:03",
        summary:
          "He views the mayor's role as crucial for addressing the town's infrastructure issues and dense development through collaboration with county and state officials. He emphasizes a \"community first\" attitude to ensure future development is suburban and safe, not a repeat of the high-density Transit Village.",
      },
      "q2-vision": {
        time: "3:40",
        summary:
          'Mr. Singh gives the current administration an "F" grade, citing the 900+ unit Transit Village development, which he says has no open space and was built without supporting sidewalks. He states the administration has failed to invest in basic infrastructure like roads, despite residents paying high taxes.',
      },
      "q3-vision": {
        time: "5:05",
        summary:
          "He states that based on speaking with thousands of residents, the main frustrations are public safety (citing tragic accidents), high property taxes, and dense development that doesn't fit the town's suburban character. He also notes the \"pathetic state\" of the library and missing sidewalk links as key infrastructure frustrations.",
      },
      "q1-future": {
        time: "7:03",
        summary:
          "His three main priorities for the first 100 days are to approve flashing beacon lights for accident-prone intersections, initiate discussions with the warehouse developer (Bridge Point) to explore a mixed-use alternative, and identify new services for seniors and empty nesters.",
      },
      "q2-future": {
        time: "8:49",
        summary:
          'His long-term goals are to pause dense development by actively acquiring and preserving open space, implement a "Vision Zero" framework to improve public safety on roads, and work to get the township\'s library upgraded and improved.',
      },
      "q1-warehouse": {
        time: "11:01",
        summary:
          'Mr. Singh characterizes the current administration\'s approval of the 5.5 million-square-foot warehouse project as a "colossal" decision made against the wishes of 90% of residents. He states this was done without collaborating with neighboring towns and is not good for West Windsor.',
      },
      "q2-warehouse": {
        time: "12:27",
        summary:
          "He argues that the project will be a low-ratable distribution center that will not generate the $14 million in revenue the administration claims, but will create significant traffic and safety issues. He believes a mixed-use development, like those in other towns, would provide four to eight times the ratables and be more beneficial for the community.",
      },
      "q3-warehouse": {
        time: "14:51",
        summary:
          "He is unequivocally opposed to any new warehouse proposals, stating they do not fit the suburban, green character of West Windsor. He argues that such development negatively impacts not just the township but the entire greater Princeton area.",
      },
      "q1-taxes": {
        time: "15:55",
        summary:
          "Mr. Singh's plan for affordability focuses on stabilizing property taxes, which he says are making the town unaffordable for many, including seniors and young families. He plans to achieve this by preserving open space to limit new development mandates, attracting more commercial revenue, and improving the township's operational efficiency.",
      },
      "q2-taxes": {
        time: "17:49",
        summary:
          "He plans to conduct a full audit of the budget to find savings and will ensure that money already appropriated for infrastructure is actually spent. He also aims to improve the productivity of township staff using better technology to control operational costs and maintain fiscal discipline.",
      },
      "q3-taxes": {
        time: "19:13",
        summary:
          'Mr. Singh argues that West Windsor\'s fund balance has "ballooned" to $13 million because the current administration is not investing appropriated money into services and infrastructure, which is why residents don\'t see returns on their high taxes. He also suggests exploring shared services with neighboring towns to avoid "shortsighted" service cuts, such as the reduction in summer garbage collection.',
      },
      "q1-infra": {
        time: "20:56",
        summary:
          'His plan to improve roads and traffic centers on implementing the "Vision Zero" framework, a public safety initiative used by other towns to add traffic calming measures, better signage, and flashing beacons. He also makes it a high priority to fill in the gaps in the town\'s sidewalk network so people are not forced to walk in the street.',
      },
      "q2-infra": {
        time: "22:22",
        summary:
          "He supports creating safer, more connected bike paths and sidewalks, stating they are essential for both physical and mental well-being. He plans to invest funds that have already been approved—but not spent—on this infrastructure, starting with projects to make areas like the Windsor Plaza more walkable.",
      },
      "q3-infra": {
        time: "23:58",
        summary:
          'Mr. Singh states that he supports the police and EMS staff and that they are doing a "wonderful job." His plan is to ensure there is better coordination between departments and to work with them to see if any process improvements or additional resources are needed.',
      },
      "q1-gov": {
        time: "24:31",
        summary:
          "To improve transparency, he pledges to upgrade the township website to provide quarterly snapshots of project statuses and budgets. He also plans to implement a Civic App (a 311-style application) for residents to submit and track service tickets, and he will hold regular town halls to answer resident questions.",
      },
      "q2-gov": {
        time: "26:01",
        summary:
          'He "absolutely" supports implementing a Civic App for service requests, stating the township is currently using "19th-century tools." He believes this technology will make reporting issues more efficient for residents and improve the township\'s internal productivity and workflow.',
      },
      "q3-gov": {
        time: "26:49",
        summary:
          "He positions himself as a strong proponent of open space, pledging to proactively identify and purchase private land to preserve it from development, similar to what Princeton has done. He also states that all future development must include green space and exceed state stormwater management guidelines to prevent flooding.",
      },
      "q4-gov": {
        time: "28:26",
        summary:
          "He would like to attract mixed-use developments, potentially on the warehouse site, that include a public-private wellness center, restaurants, and clean energy or AI startups. He also wants to support existing small businesses by making strip malls more walkable so residents can shop and dine locally.",
      },
      "q5-gov": {
        time: "30:12",
        summary:
          'Mr. Singh believes West Windsor needs a "heart" or town center, which he says the Transit Village failed to become. He proposes a two-part plan: first, make existing shopping plazas more walkable, and second, explore creating a new town center with a wellness center, hospitality, and parks, possibly by working with developers on a mixed-use project.',
      },
      "q6-gov": {
        time: "32:30",
        summary:
          'He criticizes the current administration for blaming the county for the library\'s poor, "leaking" condition. He promises to personally take charge, seek grants, and work with county officials to secure funding to expand, upgrade, and properly maintain the library.',
      },
      "q1-regional": {
        time: "33:56",
        summary:
          'He states that he has strong, pre-existing relationships with county and state elected officials, with whom he already connects the community annually. He will leverage these relationships to collaborate on regional solutions for West Windsor, always taking a "community first" approach.',
      },
      "q1-closing": {
        time: "35:14",
        summary:
          "Mr. Singh would ask his opponent: Why did you approve the 5.5 million-square-foot warehouse project instead of investing in and taking care of our township's public safety infrastructure?",
      },
      "q2-closing": {
        time: "35:43",
        summary:
          "He loves that West Windsor is a close, thriving community with beautiful schools and a strategic location near Princeton, New York City, and Philadelphia, all centered around the train station.",
      },
      "q3-closing": {
        time: "36:23",
        summary: "His favorite restaurant in town is Tommy's Tavern.",
      },
      "q4-closing": {
        time: "36:34",
        summary:
          "His perfect weekend involves going to the farmer's market and enjoying lunch or dinner at a local restaurant, such as one in the U.S. 1 Market Fair.",
      },
    },
    geeversCharles: {
      // Council - Proven Leaders (Embeds from MpSLuk4TBQg)
      "q0-opening": {
        time: "0:30",
        summary:
          "Councilwoman Geevers highlights her 30 years in town and extensive experience, including six years on the school board, 20 years on the council, and nine years on the Planning Board. Mr. Charles introduces himself as a 17-year resident and a CPA with 29 years of financial experience, noting his community involvement in youth sports and fostering rescue dogs.",
      },
      "q1-council-vision": {
        time: "2:20",
        summary:
          "Mr. Charles describes the role as a serious public service commitment to make thoughtful, independent decisions for the long-term benefit of all residents, citing his CPA background. Councilwoman Geevers explains the council's functional role as the legislative branch in the town's strong-mayor government, with primary responsibilities for approving the annual budget, passing ordinances, and serving as liaisons to township committees.",
      },
      "q2-vision": {
        time: "4:32",
        summary:
          "Both candidates give the administration an 'A,' stating that the mayor and council have done a great job managing the constant challenge of growth. They specifically note that this growth is largely driven by state-mandated affordable housing obligations, which the administration has handled well.",
      },
      "q4-council-vision": {
        time: "5:55",
        summary:
          "Councilwoman Geevers describes her philosophy as collaborative, using her good relationship with the mayor to discuss disagreements, while Mr. Charles emphasizes his independence, stating he is not a 'rubber stamp' and will always study issues thoughtfully. Both candidates highlight their recent successful campaign to keep West Windsor's elections nonpartisan as proof of their focus on local issues.",
      },
      "q1-future": {
        time: "8:12",
        summary:
          "Mr. Charles states his priority is to incorporate resident feedback into the upcoming budget, specifically by increasing funding for street lighting and sidewalk repairs. Councilwoman Geevers notes the first 100 days are dominated by the start of the annual budget season, and her priority is managing the council's open and public review of the operating and capital budgets.",
      },
      "q2-future": {
        time: "10:21",
        summary:
          "Both candidates identify managing growth as the primary long-term goal. Councilwoman Geevers emphasizes doing so in a fiscally responsible way to keep municipal taxes flat, while Mr. Charles highlights the strategy of legally challenging the state's affordable housing mandates and preserving open space to limit residential development.",
      },
      "q1-warehouse": {
        time: "12:41",
        summary:
          "Both candidates explain the situation as a choice between two outcomes, stating the developer was pursuing litigation to build 2,000 residential units, which would have severely impacted schools and traffic. They support the administration's decision to reach a settlement agreement that instead zoned the land for commercial warehouses, avoiding the high-density housing.",
      },
      "q2-warehouse": {
        time: "14:29",
        summary:
          "Mr. Charles addresses traffic concerns by highlighting that the Planning Board's approval includes over 80 conditions, one of which prohibits trucks from turning onto Clarksville Road, directing them to Route 1. Councilwoman Geevers adds that all towns are competing for ratables, and this project provides necessary ratables to keep the township affordable.",
      },
      "q4-council-warehouse": {
        time: "16:46",
        summary:
          "Councilwoman Geevers states the goal is to maintain a balance between residential and commercial zoning, while also ensuring open space and recreational parks are developed throughout town. Mr. Charles emphasizes that a key planning priority should be proactively preserving open space by using the town's open space list and tax fund to acquire land.",
      },
      "q2-taxes": {
        time: "18:36",
        summary:
          "Mr. Charles emphasizes that the council controls only 14-15% of the total tax bill and has kept that portion flat, with increases coming from the county and schools. Councilwoman Geevers adds that the council manages this budget through an open process and, based on resident feedback, will likely increase funding for street lights and sidewalk repairs.",
      },
      "q4-council-taxes": {
        time: "21:21",
        summary:
          "Both candidates agree on the need to increase the capital budget for road repaving. Councilwoman Geevers also suggests investing in a more interactive township website, while Mr. Charles defends the council's unanimous decision to reduce summer garbage pickup as a fiscally responsible choice that saved over $1.1 million.",
      },
      "q1-infra": {
        time: "24:43",
        summary:
          "Mr. Charles explains that the township has a systematic plan for road improvement, using a study that rates every road from one to five. This allows the engineering department to prioritize repaving the roads that are in the worst condition first.",
      },
      "q2-infra": {
        time: "25:46",
        summary:
          "Both candidates affirm their close collaboration with the West Windsor Bicycle and Pedestrian Alliance. Councilwoman Geevers highlights budgeting for safety items like crosswalks and working with police to combat speeding, while Mr. Charles points to the upcoming county project on Route 571 that will add continuous sidewalks and bike lanes.",
      },
      "q3-infra": {
        time: "28:17",
        summary:
          "Both candidates state that West Windsor is a very safe community with outstanding public safety services. Mr. Charles praises the police, fire, and EMS departments, while Councilwoman Geevers, a fire police officer herself, expresses pride in the high level of training and professionalism from both paid and volunteer staff.",
      },
      "q2-gov": {
        time: "30:11",
        summary:
          "Both candidates are open to discussing a 311-style app. Councilwoman Geevers notes that a similar online system for potholes already exists and could be expanded, while Mr. Charles states he would want to see a cost-benefit analysis before committing.",
      },
      "q7-council-gov": {
        time: "31:13",
        summary:
          "Councilwoman Geevers clarifies the process, noting that the council appoints to the Zoning Board and Parking Authority, and she looks for residents with relevant backgrounds. Mr. Charles states his primary criteria would be the candidate's qualifications and their ability to bring a 'diversity of thought' to the boards.",
      },
      "q8-council-disagreement": {
        time: "33:42",
        summary:
          "Councilwoman Geevers states that she handles disagreements by fostering good communication and relationships, which allows council members to learn from each other. Mr. Charles emphasizes that he and his running mates are independent thinkers who resolve differences through healthy debate, noting they each wrote their own responses to a newspaper, unlike their opponents.",
      },
      "q3-gov": {
        time: "35:49",
        summary:
          "Both candidates support using the town's open space tax to preserve land. Councilwoman Geevers cites the successful purchase of the Hall property to prevent 400 townhouses, while Mr. Charles points to a recent warehouse deal that blocked 600 homes and resulted in 25 acres of farmland being preserved.",
      },
      "q4-gov": {
        time: "38:09",
        summary:
          "Councilwoman Geevers expresses support for the new commercial developments and restaurants along Route 1, which provide strong ratables and new dining options. Mr. Charles highlights the successful attraction of small businesses to the redeveloped Route 571 area and the potential for new growth from tech businesses like the new AI hub.",
      },
      "q5-gov": {
        time: "40:46",
        summary:
          "Both candidates agree this is a feasible and active goal. Councilwoman Geevers points to the 30,000 sq. ft. of retail in the train station plan and the revitalization of Windsor Plaza, while Mr. Charles highlights the upcoming Route 571 redesign and the replacement of derelict buildings with new mixed-use developments.",
      },
      "q6-gov": {
        time: "43:23",
        summary:
          "Both candidates agree that the library is a county responsibility and that collaborating with the county is the best approach. Councilwoman Geevers is hopeful the new county executive will finally fund needed physical repairs, while Mr. Charles adds that building a separate town library would likely not be financially sensible.",
      },
      "q1-closing": {
        time: "45:18",
        summary:
          "Councilwoman Geevers would ask her opponents why they decided to run, given that they have not previously participated in any township boards or committees. Mr. Charles would ask what their actual plan is, why they don't offer alternatives when they criticize, and why they block residents who ask questions on social media.",
      },
      "q2-closing": {
        time: "46:26",
        summary:
          "Councilwoman Geevers says her favorite thing is the town's dynamic range of amenities, including the Senior Center, the schools, and the parks, which offer something for all ages. Mr. Charles states his favorite thing is the sense of community and the diverse, long-term friendships his family has made.",
      },
      "q3-closing": {
        time: "47:40",
        summary:
          "Mr. Charles names Aljon's as a favorite, calling it a 'pillar of the community.' Councilwoman Geevers states she has many favorites depending on the occasion, including Aljon's, PJ's Pancake House, and Seasons 52.",
      },
      "q4-closing": {
        time: "49:02",
        summary:
          "Mr. Charles describes a perfect weekend as hiking on a town trail with his dogs, followed by smoking meats in his backyard and having friends over. Councilwoman Geevers describes her perfect weekend as exercising by walking in a park and spending time with her family, including her new grandchild.",
      },
    },
    tomarWinters: {
      // Council - WW Together (Placeholders)
      "q0-opening": {
        time: "0:37",
        summary:
          "Mr. Tomar introduces himself as an 18-year resident who wants to give back to the community that gave his family opportunities. Mr. Winters, a newcomer who moved here for the schools, aims to bring fresh ideas and outside perspectives from other towns to West Windsor.",
      },
      "q1-council-vision": {
        time: "2:08",
        summary:
          "Mr. Winters defines the role as a fiduciary for town spending, with a broader responsibility to market the town; he cites his corporate strategy background as his main qualification. Mr. Tomar views the council as 'guardians' to hold the administration accountable, qualifying himself with 30 years of corporate experience and 15 years in nonprofit management.",
      },
      "q2-vision": {
        time: "5:36",
        summary:
          "Mr. Tomar gives a failing assessment, stating he cannot point to a single success and criticizes the administration for the 'worst roads' in the county and underinvesting in infrastructure. Mr. Winters, as a newcomer, states that he sees many areas that 'could be better' and that he wants to facilitate stronger connections within the community.",
      },
      "q4-council-vision": {
        time: "7:25",
        summary:
          "Both candidates state that while collaboration with the mayor is important, their primary duty is to be an independent voice for the residents. Mr. Winters notes council should not just 'appease a mayor,' and Mr. Tomar affirms he will not be a 'rubber stamp' for the administration.",
      },
      "q1-future": {
        time: "9:42",
        summary:
          "Mr. Tomar's immediate goals are installing flashing beacons at dangerous crosswalks and launching a Civic App. Mr. Winters also prioritizes the Civic App for streamlining resident services and wants to immediately pass a resolution to adopt the 'Vision Zero' pedestrian safety framework.",
      },
      "q2-future": {
        time: "12:08",
        summary:
          "Mr. Winters's long-term goal is to find sustainable, 'community first' development models, such as 100% affordable housing projects, to avoid the 'band-aid' solution of warehouses. Mr. Tomar's primary goal is to 'materially improve' the town's infrastructure, particularly the roads, and to ensure all new projects are built with thoughtful planning.",
      },
      "q1-warehouse": {
        time: "14:39",
        summary:
          "Both candidates strongly oppose the project, calling it 'inappropriate' for the community. Mr. Tomar highlights the 'tens of thousands' of trucks and pollution it will bring, while Mr. Winters argues it doesn't fit the town's character and won't deliver the promised tax revenue.",
      },
      "q2-warehouse": {
        time: "16:57",
        summary:
          "Mr. Winters doubts the project will be financially positive, arguing the ratables will be low while the traffic from delivery vans and employees will be high. Mr. Tomar argues the project is an environmental threat, calculating 'tens of thousands' of new truck trips daily and warning that paving 650 acres will cause 'really bad flooding problems.'",
      },
      "q4-council-warehouse": {
        time: "19:30",
        summary:
          "Mr. Tomar states that any new zoning must be strictly evaluated on its alignment with suburban values, its ratable value, and its impact on infrastructure. Mr. Winters adds that the town needs a comprehensive long-term master plan and must be 'bold' in negotiating with developers to achieve community-focused goals.",
      },
      "q2-taxes": {
        time: "21:46",
        summary:
          "Both candidates argue the key to stabilizing municipal and school taxes is to stop approving high-density residential developments. Mr. Winters stresses the need to actually spend the money appropriated in the budget on improvements, while Mr. Tomar advocates for attracting more commercial ratables.",
      },
      "q4-council-taxes": {
        time: "25:32",
        summary:
          "Mr. Tomar criticizes the budget's lack of transparency and says his priority is to create clear, trackable project plans while increasing investment in roads and safety. Mr. Winters would add specific investments for a Civic App and a new town composting program to lead on sustainability.",
      },
      "q1-infra": {
        time: "28:55",
        summary:
          "Mr. Winters states that since roads can't be widened, the plan must be traffic optimization and better traffic studies for new developments. Mr. Tomar's plan is to use the town's budget surplus and seek grants to 'heavily invest' in repairing the existing roads, which he says are in a state of despair.",
      },
      "q2-infra": {
        time: "31:06",
        summary:
          "Both candidates strongly advocate for adopting the 'Vision Zero' framework, which they say is a proven plan for implementing traffic-calming measures and improving pedestrian safety. They criticize the current administration for failing to invest in infrastructure and pledge to work with the local Bicycle and Pedestrian Alliance to connect communities.",
      },
      "q3-infra": {
        time: "34:47",
        summary:
          "Both candidates praise the town's police, fire, and EMS departments as 'very good' and 'fortunate.' Mr. Tomar adds a specific goal of supporting the volunteer fire companies to improve recruitment and ensure they remain strong.",
      },
      "q2-gov": {
        time: "36:12",
        summary:
          "Both candidates 'absolutely' and 'wholeheartedly' support implementing a Civic App (311 system) immediately. Mr. Tomar states the town is '10 years behind' on this, and Mr. Winters notes it will provide clear benefits to the community.",
      },
      "q7-council-gov": {
        time: "37:01",
        summary:
          "Mr. Winters states he would evaluate appointees based on their expertise and alignment with the community's values. Mr. Tomar adds that he will be an 'independent evaluator' to ensure the mayor appoints qualified residents, not just political allies.",
      },
      "q8-council-disagreement": {
        time: "38:49",
        summary:
          "Both candidates state their approach to disagreement is professional and collaborative, based on their corporate backgrounds. Mr. Tomar says he will 'look for common grounds,' and Mr. Winters notes their daily job is to manage relationships between people with competing views.",
      },
      "q3-gov": {
        time: "40:18",
        summary:
          "Mr. Winters focuses on proactively acquiring open space using grants and developer offsets, as well as implementing new sustainability initiatives like composting. Mr. Tomar also supports preserving land and suggests re-evaluating farming practices on preserved land to be more environmentally friendly.",
      },
      "q4-gov": {
        time: "43:00",
        summary:
          "Mr. Tomar wants to focus on development that serves young residents (like cafes) and seniors, ensuring infrastructure can support it. Mr. Winters adds that the council should act as 'chief marketing officers' to proactively attract desirable businesses, such as a winery, to town.",
      },
      "q5-gov": {
        time: "45:08",
        summary:
          "Both candidates agree a vibrant town center is 'absolutely needed' but express concerns about whether the train station area can still support it after recent high-density development. They state that any plan must be 'very thoughtful' and first confirm that the infrastructure can handle it.",
      },
      "q6-gov": {
        time: "47:24",
        summary:
          "Both candidates strongly support improving the 'not very good' library. Their primary strategy is to collaborate more forcefully with the county to get a better return on the taxes West Windsor pays, and they are also open to exploring grants for a new facility.",
      },
      "q1-closing": {
        time: "48:51",
        summary:
          "Both candidates would ask their incumbent opponents a similar question: Why should voters trust that you will suddenly make improvements now, like fixing the roads, when you have failed to do so for the many years you have already been in office?",
      },
      "q2-closing": {
        time: "49:58",
        summary:
          "Mr. Tomar's favorite thing is the abundant open space available for walking. Mr. Winters says his favorite thing is the 'special' and diverse people who live in the community.",
      },
      "q3-closing": {
        time: "51:20",
        summary:
          "Mr. Winters names Capuano's pizza as a favorite. Mr. Tomar says his go-to place for lunch is First Wok.",
      },
      "q4-closing": {
        time: "51:57",
        summary:
          "Mr. Tomar describes a perfect weekend as playing golf at the local course. Mr. Winters's perfect weekend involves visiting the farmer's market and enjoying the town's open spaces with his family.",
      },
    },
  };

  const questionOrder = useMemo(
    () => [
      "q0-opening",
      // Vision
      "q1-vision",
      "q1-council-vision",
      "q2-vision",
      "q3-vision",
      "q4-council-vision",
      // Future
      "q1-future",
      "q2-future",
      // Warehouses
      "q1-warehouse",
      "q2-warehouse",
      "q3-warehouse",
      "q4-council-warehouse",
      // Taxes
      "q1-taxes",
      "q2-taxes",
      "q3-taxes",
      "q4-council-taxes",
      // Infra
      "q1-infra",
      "q2-infra",
      "q3-infra",
      // Governance
      "q1-gov",
      "q2-gov",
      "q7-council-gov",
      "q8-council-disagreement",
      "q3-gov",
      "q4-gov",
      "q5-gov",
      "q6-gov",
      // Regional
      "q1-regional",
      // Closing
      "q1-closing",
      "q2-closing",
      "q3-closing",
      "q4-closing",
    ],
    []
  );

  const keyDates = [
    {
      date: "Oct. 14, 2025",
      event: "Voter Registration Deadline",
      target: "2025-10-14T23:59:59",
    },
    { date: "Oct. 25 - Nov. 2", event: "Early In-Person Voting Period" },
    { date: "Oct. 28", event: "Deadline to Apply for a Mail-In Ballot" },
    {
      date: "Nov. 4, 2025",
      event: "General Election Day",
      target: "2025-11-04T20:00:00",
    },
  ];

  const fullCancellationStatement = `West Windsor, NJ – September 18, 2025 – It is with deep regret and disappointment that West Windsor Forward must announce the cancellation of our 2025 Candidate Forum, which was scheduled for September 25th. The forum has been cancelled because the campaigns for Mayor and Council were unable to agree on a format.

This cancellation represents a significant loss for West Windsor residents, who were anticipating a direct and unbiased opportunity to hear from all certified candidates on the issues that matter most. The West Windsor Forward team invested ten months of effort, countless hours, and a great deal of resources into restoring this vital civic tradition.

We extend our deepest gratitude to all who supported our efforts. We are especially thankful for the unwavering support of the League of Women Voters of the Greater Princeton Area (lwvprinceton.org), and we encourage everyone in West Windsor to support their longstanding commitment to informing voters in Central Jersey. We also thank our panelists, Micah Rasmussen and David Matthau, for their immense trust in us and their invaluable assistance. We would also like to express our sincere appreciation to Mercer County Community College and the Kelsey Theatre for their generosity in offering their venue and their patience throughout our planning process. To everyone who offered to volunteer, your commitment to our town and its residents was a true inspiration. Finally, to the community, your words of encouragement privately, on our social media, and at our tabling events reaffirmed our efforts throughout this process.

While this is a disappointing outcome, it does not mark the end of West Windsor Forward's commitment to civic engagement. We will remain actively involved in this year's Municipal election through other non-partisan projects focused on informing voters, including working with both campaigns to set up informative interviews for the community. We will also continue our other community-focused projects, such as pushing for our adoption of the Princeton Junction Train Station. We encourage residents to submit ideas for further civic and community initiatives. We are looking for High Schoolers who want to join us and make a difference in West Windsor to sign up to volunteer by emailing at contact@westwindsorforward.org.

The last Mayoral and Council forums were held in 2017. The cancellation of this event—after coming so close to reinstating this tradition—is a worrying development for the health of the democratic process in West Windsor. Our town deserves and needs constructive, productive, and fair dialogue. It is on all of us, as a community, to advocate for that standard in subsequent election cycles. The future of our town's civic health depends on the collective voice of its citizens demanding accountability.

Sincerely,
Parth Gupta and Darshan Chidambaram
Co-Executive Directors @ West Windsor Forward`;

  const rasmussenBio = forumData.panelists.find(
    (p) => p.id === "micah-rasmussen"
  )?.bio;

  const convertTimeToSeconds = (time: string | undefined): number => {
    if (!time) return 0;
    // --- FIX for invalid time strings ---
    if (typeof time !== 'string' || !time.match(/^[\d:]+$/)) {
      console.warn(`Invalid time format received: ${time}`);
      return 0; // Return 0 for invalid formats
    }
    const parts = time.split(":").map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };


  const doesQuestionApply = (
    question: ElectionQuestion,
    office: OfficeType
  ): boolean => {
    return Array.isArray(question.office)
      ? question.office.includes(office)
      : question.office === office;
  };

  const filteredIssues = useMemo(() => {
    return electionData.issues
      .map((issue) => {
        const matchingQuestions = issue.questions.filter((question) => {
          const officeMatch =
            !activeOffice ||
            (Array.isArray(question.office)
              ? question.office.includes(activeOffice)
              : question.office === activeOffice);
          const searchMatch =
            !searchQuery ||
            question.text.toLowerCase().includes(searchQuery.toLowerCase());
          return officeMatch && searchMatch;
        });
        return { ...issue, questions: matchingQuestions };
      })
      .filter((issue) => issue.questions.length > 0);
  }, [activeOffice, searchQuery]);

  const handleTopicToggle = (issueId: string, questionCount: number) => {
    // If there's a hash in the URL, remove it.
    // This "clears" the hash and gives control back to the user.
    if (window.location.hash) {
      // Use replaceState to remove the hash without reloading or adding to history
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const isCurrentlySelected = selectedTopic === issueId;
    setSelectedTopic(isCurrentlySelected ? null : issueId);

    // Scroll logic when collapsing a large topic
    if (isCurrentlySelected && questionCount > 3) {
      const topicButton = document.querySelector(`button[data-topic-id="${issueId}"]`);
      if (topicButton) {
        setTimeout(() => {
          topicButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100); // Small delay to allow collapse animation
      } else if (filterBarRef.current) {
        // Fallback: Scroll to filter bar if button not found
        filterBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };


  // --- EFFECT FOR HANDLING HASH SCROLLING & EXPANSION ---
  useEffect(() => {
    const processHash = () => {
      // --- FIX: Strip trackers AND encoded junk from hash ---
      const hash = window.location.hash.substring(1).split('?')[0].split('&')[0].split('%')[0];
      if (!hash) return; // No hash, do nothing

      // Find the topic ID associated with the question hash
      let targetTopicId: string | null = null;

      for (const issue of electionData.issues) {
        if (issue.questions.some(q => q.id === hash)) {
          targetTopicId = issue.id;
          break; // Found the topic
        }
      }

      // --- Core Logic Change ---
      // Only set the topic state IF the hash points to a question within a topic
      // AND that topic is NOT already the currently selected one.
      if (targetTopicId && targetTopicId !== selectedTopic) {
        setSelectedTopic(targetTopicId);
        // State is set, exit function. The effect will re-run after render.
        // Scrolling will happen in the subsequent run when selectedTopic matches.
        return;
      }

      // --- Scrolling Logic ---
      // This part runs ONLY IF:
      // 1. The hash doesn't correspond to a question within a topic (e.g., #finance) OR
      // 2. The hash corresponds to a topic that IS ALREADY OPEN (selectedTopic === targetTopicId)
      requestAnimationFrame(() => {
        // Re-check for the element *inside* rAF, as it might have just rendered
        const elementToScrollTo = document.getElementById(hash);
        if (elementToScrollTo) {
          const headerHeight = headerRef.current?.offsetHeight || 0;
          const filterBarHeight = filterBarRef.current?.offsetHeight || 0;
          // --- INCREASED OFFSET FROM 20 TO 30 ---
          const offset = Math.max(headerHeight, filterBarHeight) + 30; // Use same offset as jump links

          const elementPosition = elementToScrollTo.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth" // Use smooth scroll on initial load/hash change too
          });

          // --- Optional: Briefly highlight the element ---
          // Only highlight if it's a question, not a main section
          if (targetTopicId) {
            elementToScrollTo.style.transition = 'outline 0.1s ease-in-out';
            elementToScrollTo.style.outline = '3px solid #38bdf8'; // sky-400
            setTimeout(() => {
              elementToScrollTo.style.outline = 'none';
            }, 1500); // Remove highlight after 1.5 seconds
          }

        } else if (targetTopicId && targetTopicId === selectedTopic) {
          // console.warn(`Element "${hash}" not found for scrolling even though topic "${targetTopicId}" is selected.`);
        } else if (!targetTopicId) {
          // console.warn(`Element "${hash}" not found, and it doesn't belong to a known topic.`);
        }
      });
    };

    // Run on mount and when hash changes
    processHash(); // Initial check
    window.addEventListener('hashchange', processHash);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', processHash);
    };
  }, [selectedTopic, headerRef, filterBarRef]); // Add refs to dependency array

  // **** UPDATE FINANCE FIGURES HERE ****
  const financeData = {
    provenLeaders: {
      raised: 30380.19, // Cumulative Receipts (3897753.pdf, Table I, Line 10, Col B)
      spent: 29008.10,  // Cumulative Expenditures (3897753.pdf, Table II, Line 6, Col B)
      cashOnHand: 7736.83, // Closing Balance (3897753.pdf, Receipts & Expenditures Summary)
      percentUnder200: 20.12, // Calculated: (6032.03 / (6032.03 + 23948.16)) * 100
      percentOver200: 79.88, // Calculated: (23948.16 / (6032.03 + 23948.16)) * 100
      reportLink: "/3897753.pdf", // 11-Day Report
      reportDate: "October 24, 2025"
    },
    wwTogether: {
      raised: 43959.31, // Cumulative Receipts (3897543.pdf, Table I, Line 10, Col B)
      spent: 24059.66, // Cumulative Expenditures (3897543.pdf, Table II, Line 6, Col B)
      cashOnHand: 19899.65, // Closing Balance (3897543.pdf, Receipts & Expenditures Summary)
      percentUnder200: 11.71, // Calculated: (4459.00 / (4459.00 + 33605.00)) * 100
      percentOver200: 88.29, // Calculated: (33605.00 / (4459.00 + 33605.00)) * 100
      reportLink: "/3897543.pdf", // 11-Day Report
      reportDate: "October 24, 2025"
    }
  };
  // **** END FINANCE UPDATE ****


  return (
    <>
      <Modal
        isOpen={isStatementModalOpen}
        onClose={() => setIsStatementModalOpen(false)}
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Official Statement on Forum Cancellation
        </h2>
        <div className="prose prose-sm sm:prose-base max-w-none text-slate-700 whitespace-pre-wrap">
          {fullCancellationStatement}
        </div>
      </Modal>
      <Modal
        isOpen={isRasmussenBioOpen}
        onClose={() => setIsRasmussenBioOpen(false)}
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Thank you Micah Rasmussen for developing the questions for this
          interview series!
        </h2>
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <img
            src="/micah.png"
            alt="Micah Rasmussen"
            className="w-24 h-24 rounded-full mr-0 sm:mr-4 mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold">Micah Rasmussen</h3>
            <p className="text-slate-600">
              Director, Rebovich Institute for NJ Politics
            </p>
          </div>
        </div>
        <div className="prose prose-sm sm:prose-base max-w-none text-slate-700 whitespace-pre-wrap">
          {rasmussenBio}
        </div>
      </Modal>

      <div className="min-h-screen bg-slate-100 font-body text-slate-700 animate-fadeIn">
        <header ref={headerRef} className="relative bg-gradient-to-br from-slate-900 via-sky-800 to-indigo-900 text-white py-12 sm:py-16 px-4 rounded-b-2xl shadow-2xl overflow-hidden">
          <DotPattern dotColor="text-sky-700 opacity-10" rows={8} cols={10} />
          <div className="relative z-10 container mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              West Windsor 2025 Municipal Election
            </h1>
            <p className="text-lg sm:text-xl text-sky-200 max-w-3xl mx-auto mb-8">
              Your non-partisan hub for the upcoming election, featuring
              candidate interviews, financial data, and key voter information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto bg-black bg-opacity-20 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
              <div className="text-center">
                <Countdown
                  targetDate="2025-11-04T20:00:00"
                  title="Countdown to Election Day"
                />
              </div>
              <div className="text-center border-y-2 border-white/20 md:border-y-0 md:border-x-2 md:border-white/20 py-6 md:py-0 px-4 flex flex-col justify-center">
                <h4 className="text-sm font-semibold mb-2">
                  Seats Up for Election
                </h4>
                <div className="flex justify-center md:flex-col gap-4">
                  <div>
                    <div className="text-3xl lg:text-4xl font-bold">1</div>
                    <div className="text-xs uppercase">Mayoral Seat</div>
                  </div>
                  <div>
                    <div className="text-3xl lg:text-4xl font-bold">2</div>
                    <div className="text-xs uppercase">
                      Township Council Seats
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center flex flex-col justify-center">
                <h4 className="text-sm font-semibold mb-2">
                  Voter Registration Deadline
                </h4>
                <p className="text-2xl font-bold">October 14, 2025</p>
                <p className="text-sm text-amber-300">
                  This deadline has passed.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* --- This is the new jump button div --- */}
        <div className="container mx-auto px-4">
          <div className="mt-8 mb-4 flex flex-col sm:flex-row justify-center gap-3">
            <Button onClick={() => handleJumpTo('interviews')} type="secondary" size="md" icon={<IconMicrophone />}>
              Jump to Interviews
            </Button>
            <Button onClick={() => handleJumpTo('finance')} type="secondary" size="md" icon={<IconDocument />}>
              Jump to Campaign Finance
            </Button>
            <Button onClick={() => handleJumpTo('voter-tools')} type="secondary" size="md" icon={<IconBallotBox />}>
              Jump to Voter Tools
            </Button>
          </div>
        </div>

        {/* --- This is the main content div --- */}
        <div className="container mx-auto px-4 py-8 sm:py-12 space-y-12">
          <Card
            noHoverEffect
            className="p-0 -mb-6 border-amber-300 bg-amber-50"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">
                An Update on the 2025 Candidate Forum
              </h2>
              <div className="prose prose-sm sm:prose-base max-w-none text-slate-700">
                <p>
                  <strong>West Windsor, NJ – September 18, 2025</strong> – It is
                  with deep regret and disappointment that{" "}
                  <strong>
                    West Windsor Forward must announce the cancellation of our
                    2025 Candidate Forum...
                  </strong>
                </p>
              </div>
              <Button
                onClick={() => setIsStatementModalOpen(true)}
                type="secondary"
                size="sm"
                className="mt-4"
                icon={<IconDocument />}
              >
                Read Full Statement
              </Button>
            </div>
          </Card>
          {/* --- Meet the Candidates (Grouped) --- */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mt-12 mb-8 text-center">
              Meet the Slates
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Proven Leaders for West Windsor */}
              <div className="flex flex-col">
                <div className="p-4 rounded-t-xl border-t-4 border-blue-600 bg-slate-200 shadow-lg flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-blue-800 text-center tracking-wide">
                    Proven Leaders for West Windsor
                  </h3>
                  <Button
                    size="sm"
                    type="secondary"
                    href="http://teammarathe4ww.com"
                    icon={<IconExternalLink />}
                    className="mt-2"
                  >
                    Visit Slate Website
                  </Button>
                </div>
                <div className="p-6 bg-white border-x border-b border-gray-200 rounded-b-xl shadow-lg flex-grow">
                  <div className="space-y-8">
                    {electionData.candidates
                      .filter(
                        (c) => c.slate === "Proven Leaders for West Windsor"
                      )
                      .map((candidate) => (
                        <BioCard
                          key={candidate.id}
                          candidate={candidate}
                          borderColor="border-blue-500"
                          textColor="text-blue-700"
                        />
                      ))}
                  </div>
                </div>
              </div>

              {/* West Windsor Together */}
              <div className="flex flex-col">
                <div className="p-4 rounded-t-xl border-t-4 border-green-600 bg-slate-200 shadow-lg flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-green-800 text-center tracking-wide">
                    West Windsor Together
                  </h3>
                  <Button
                    size="sm"
                    type="secondary"
                    href="https://www.wwtogether.org/"
                    icon={<IconExternalLink />}
                    className="mt-2"
                  >
                    Visit Slate Website
                  </Button>
                </div>
                <div className="p-6 bg-white border-x border-b border-gray-200 rounded-b-xl shadow-lg flex-grow">
                  <div className="space-y-8">
                    {electionData.candidates
                      .filter((c) => c.slate === "West Windsor Together")
                      .map((candidate) => (
                        <BioCard
                          key={candidate.id}
                          candidate={candidate}
                          borderColor="border-green-500"
                          textColor="text-green-700"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* --- Interview Series & Comparison Tool --- */}
          <section id="interviews" className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">
              West Windsor Forward Interview Series
            </h2>
            <Card noHoverEffect className="p-0">
              <div className="p-4 sm:p-6">
                <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">
                  To help voters make an informed choice, we conducted a series
                  of non-partisan interviews (on October 12th and 19th). We
                  asked identical questions to each slate to allow for direct
                  comparisons. Some questions differ between council and mayoral
                  candidates. Explore the full recordings or use the tool below
                  to compare candidate responses on key topics.
                </p>
                <p className="text-center text-sm italic text-slate-500 max-w-3xl mx-auto mb-8">
                  All interviews conducted by{" "}
                  <span className="font-semibold">Parth Gupta</span>,
                  Co-Executive Director of West Windsor Forward.
                </p>
                <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
                  Full Interview Recordings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {/* Mayor Marathe */}
                  <div className="lg:col-span-1">
                    <h4 className="font-bold text-lg text-blue-800 mb-2 text-center">
                      Mayoral Candidate: <br /> Hemant Marathe{" "}
                    </h4>
                    <div className="aspect-video bg-slate-200 rounded-lg mb-2 flex items-center justify-center">
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${mayorMaratheVideoId}`}
                        title="YouTube video player: Mayoral Candidate Hemant Marathe"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                  {/* Mayor Singh */}
                  <div className="lg:col-span-1">
                    <h4 className="font-bold text-lg text-green-800 mb-2 text-center">
                      Mayoral Candidate: <br /> Sujit Singh{" "}
                    </h4>
                    <div className="aspect-video bg-slate-200 rounded-lg mb-2 flex items-center justify-center">
                      {mayorSinghVideoId ? (
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${mayorSinghVideoId}`}
                          title="YouTube video player: Mayoral Candidate Sujit Singh"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        ></iframe>
                      ) : (
                        <IconVideoCamera className="text-slate-400 h-10 w-10" />
                      )}
                    </div>
                  </div>
                  {/* Council Geevers/Charles */}
                  <div className="lg:col-span-1">
                    <h4 className="font-bold text-lg text-blue-800 mb-2 text-center">
                      Council Candidates: <br /> Geevers & Charles{" "}
                    </h4>
                    <div className="aspect-video bg-slate-200 rounded-lg mb-2 flex items-center justify-center">
                      {councilGeeversCharlesVideoId ? (
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${councilGeeversCharlesVideoId}`}
                          title="YouTube video player: Council Candidates Geevers & Charles"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        ></iframe>
                      ) : (
                        <IconVideoCamera className="text-slate-400 h-10 w-10" />
                      )}
                    </div>
                  </div>
                  {/* Council Tomar/Winters */}
                  <div className="lg:col-span-1">
                    <h4 className="font-bold text-lg text-green-800 mb-2 text-center">
                      Council Candidates: <br /> Tomar & Winters{" "}
                    </h4>
                    <div className="aspect-video bg-slate-200 rounded-lg mb-2 flex items-center justify-center">
                      {councilTomarWintersVideoId ? (
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${councilTomarWintersVideoId}`}
                          title="YouTube video player: Council Candidates Tomar & Winters"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        ></iframe>
                      ) : (
                        <IconVideoCamera className="text-slate-400 h-10 w-10" />
                      )}
                    </div>
                  </div>
                </div>

                <hr className="my-10 border-t-2 border-slate-200" />

                <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">
                  Interview Question Explorer
                </h3>
                <div className="text-center text-slate-500 text-sm mb-6 max-w-3xl mx-auto">
                  <p className="mb-4">
                    Use the filters to find responses by topic, question, or
                    office. Click on a topic to expand questions. Click the <IconClipboard className="inline h-4 w-4 text-slate-600 -mt-1" /> icon to copy a direct link to a specific question.
                  </p>
                </div>
                <div
                  ref={filterBarRef}
                  className="sticky top-[calc(4rem)] md:top-[calc(4.5rem)] bg-white/80 backdrop-blur-sm z-10 py-4 mb-6 -mx-6 px-6 border-b border-gray-200"
                >
                  <div className="space-y-4 max-w-4xl mx-auto">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <IconSearch />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm font-semibold text-slate-600 mr-2">
                        Filter by Office:
                      </span>
                      <button
                        onClick={() => setActiveOffice(null)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${!activeOffice
                            ? "bg-sky-600 text-white shadow"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setActiveOffice("Mayor")}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${activeOffice === "Mayor"
                            ? "bg-sky-600 text-white shadow"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                      >
                        Mayor
                      </button>
                      <button
                        onClick={() => setActiveOffice("Township Council")}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${activeOffice === "Township Council"
                            ? "bg-sky-600 text-white shadow"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                      >
                        Council
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredIssues.map((issue) => (
                    <div
                      key={issue.id}
                      data-topic-section-id={issue.id}
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm" // Added bg-white and shadow-sm
                    >
                      <button
                        data-topic-id={issue.id}
                        onClick={() =>
                          handleTopicToggle(issue.id, issue.questions.length)
                        }
                        className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors border-b border-gray-200" // Added border-b
                      >
                        {/* --- FIX: Kept text-left --- */}
                        <span className="text-lg font-bold text-slate-800 text-left flex-1">
                          {issue.title}
                        </span>
                        {selectedTopic === issue.id ? (
                          <IconChevronUp className="text-gray-500 ml-2" />
                        ) : (
                          <IconChevronDown className="text-gray-500 ml-2" />
                        )}
                      </button>
                      {selectedTopic === issue.id && (
                        <div className="p-4 space-y-6">
                          {issue.questions.map((question, index) => { // Added index
                            // @ts-ignore
                            const maratheResponse =
                              responsesData.marathe[question.id];
                            // @ts-ignore
                            const singhResponse =
                              responsesData.singh[question.id];
                            // @ts-ignore
                            const geeversCharlesResponse =
                              responsesData.geeversCharles[question.id];
                            // @ts-ignore
                            const tomarWintersResponse =
                              responsesData.tomarWinters[question.id];

                            const showMayor =
                              !activeOffice || activeOffice === "Mayor";
                            const showCouncil =
                              !activeOffice ||
                              activeOffice === "Township Council";
                            const questionIsMayor = doesQuestionApply(
                              question,
                              "Mayor"
                            );
                            const questionIsCouncil = doesQuestionApply(
                              question,
                              "Township Council"
                            );

                            const renderResponseBlock = (
                              slateName: string,
                              slateColorClass: string,
                              responseData: any,
                              fullVideoId: string | null,
                              currentQuestionId: string
                            ) => {
                              const hasData =
                                responseData &&
                                responseData.time &&
                                responseData.summary;

                              let nextQuestionTimeSeconds = 0;
                              const currentQuestionIndex =
                                questionOrder.indexOf(currentQuestionId);

                              if (
                                currentQuestionIndex !== -1 &&
                                currentQuestionIndex < questionOrder.length - 1
                              ) {
                                for (
                                  let i = currentQuestionIndex + 1;
                                  i < questionOrder.length;
                                  i++
                                ) {
                                  const nextQuestionId = questionOrder[i];
                                  const nextQuestion =
                                    electionData.issues
                                      .flatMap((iss) => iss.questions)
                                      .find((q) => q.id === nextQuestionId) ||
                                    null;

                                  if (!nextQuestion) continue;

                                  let nextResponseForCurrentSlate: any;

                                  // Determine which dataset to check based on slateName
                                  let dataSetToCheck: keyof typeof responsesData | null = null;
                                  let officeToCheck: OfficeType | null = null;

                                  if (slateName.includes("Marathe")) {
                                    dataSetToCheck = "marathe";
                                    officeToCheck = "Mayor";
                                  } else if (slateName.includes("Singh")) {
                                    dataSetToCheck = "singh";
                                    officeToCheck = "Mayor";
                                  } else if (slateName.includes("Geevers & Charles")) {
                                    dataSetToCheck = "geeversCharles";
                                    officeToCheck = "Township Council";
                                  } else if (slateName.includes("Tomar & Winters")) {
                                    dataSetToCheck = "tomarWinters";
                                    officeToCheck = "Township Council";
                                  }

                                  if (dataSetToCheck && officeToCheck && doesQuestionApply(nextQuestion, officeToCheck)) {
                                    // @ts-ignore - Indexing with string variable
                                    nextResponseForCurrentSlate = responsesData[dataSetToCheck]?.[nextQuestionId];
                                  }

                                  if (
                                    nextResponseForCurrentSlate &&
                                    nextResponseForCurrentSlate.time
                                  ) {
                                    nextQuestionTimeSeconds =
                                      convertTimeToSeconds(
                                        nextResponseForCurrentSlate.time
                                      );
                                    break; // Found the next relevant time, exit loop
                                  }
                                }
                              }

                              return (
                                <div className="mb-4">
                                  {/* --- FIX: Centered Candidate Name --- */}
                                  <h5
                                    className={`font-bold ${slateColorClass} mb-2 text-center`}
                                  >
                                    {slateName}
                                  </h5>
                                  {hasData && fullVideoId ? (
                                    <>
                                      <div className="aspect-video bg-slate-200 rounded-lg mb-2 shadow-inner overflow-hidden"> {/* Added overflow-hidden */}
                                        {(() => {
                                          const startSeconds =
                                            convertTimeToSeconds(
                                              responseData.time
                                            );
                                          let videoSrc = `https://www.youtube.com/embed/${fullVideoId}?start=${startSeconds}`;

                                          // Add end time only if the next question starts *after* this one
                                          if (
                                            nextQuestionTimeSeconds >
                                            startSeconds
                                          ) {
                                            // Add a small buffer (e.g., 2 seconds) to avoid cutting off too early
                                            videoSrc += `&end=${nextQuestionTimeSeconds + 2
                                              }`;
                                          }

                                          return (
                                            <iframe
                                              className="w-full h-full rounded-lg"
                                              src={videoSrc}
                                              title={`${slateName}'s response to: ${question.text}`}
                                              frameBorder="0"
                                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                              allowFullScreen
                                            ></iframe>
                                          );
                                        })()}
                                      </div>
                                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                                        <strong>Summary:</strong>{" "}
                                        {responseData.summary}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <div className="aspect-video bg-slate-200 rounded-lg mb-2 flex items-center justify-center shadow-inner">
                                        <IconVideoCamera className="text-slate-400 h-8 w-8" />
                                      </div>
                                      <p className="text-xs text-slate-500 italic text-center">
                                        Response pending or clip unavailable.
                                      </p>
                                    </>
                                  )}
                                </div>
                              );
                            };

                            return (
                              <div
                                key={question.id}
                                id={question.id}
                                className={`relative bg-white shadow-md rounded-xl border-2 border-gray-300 p-4 sm:p-6 scroll-mt-[10rem] ${index > 0 ? 'mt-6' : '' // Add margin-top to separate questions visually
                                  }`}
                              >
                                <button
                                  onClick={() => handleCopyLink(question.id)}
                                  className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 rounded-full transition-colors duration-200 ${copiedLinks[question.id]
                                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                                    }`}
                                  aria-label="Copy link to this question"
                                  title={copiedLinks[question.id] ? "Link Copied!" : "Copy link to this question"}
                                >
                                  {copiedLinks[question.id] ? <IconCheckCircle className="h-4 w-4 sm:h-5 sm:w-5" /> : <IconClipboard className="h-4 w-4 sm:h-5 sm:w-5" />}
                                </button>

                                {/* --- FIX FOR CHIP SPACING & CENTERING --- */}
                                <div className="text-center mb-6">
                                  {/* This div now controls spacing with flex and gap */}
                                  <div className="mb-3 flex flex-wrap justify-center gap-x-2 gap-y-3">
                                    {Array.isArray(question.office) ? (
                                      question.office.map((off) => (
                                        <span
                                          key={off}
                                          // Note: mr-2 is REMOVED
                                          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${officeStyles[off] || "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                          {off} Question
                                        </span>
                                      ))
                                    ) : question.office ? (
                                      <span
                                        // Note: mr-2 is REMOVED
                                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${officeStyles[question.office] || "bg-gray-100 text-gray-800"
                                          }`}
                                      >
                                        {question.office} Question
                                      </span>
                                    ) : (
                                      <span
                                        // Note: mr-2 is REMOVED
                                        className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
                                        General Question
                                      </span>
                                    )}
                                  </div>
                                  {/* FIX: Use px-8 sm:px-0 and text-center */}
                                  <p className="font-semibold text-slate-700 italic max-w-2xl mx-auto px-8 sm:px-0 text-center">
                                    "{question.text}"
                                  </p>
                                </div>
                                {/* --- END FIX --- */}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                  {showMayor &&
                                    questionIsMayor &&
                                    renderResponseBlock(
                                      "Mayoral Candidate: Hemant Marathe",
                                      "text-blue-700",
                                      maratheResponse,
                                      mayorMaratheVideoId,
                                      question.id
                                    )}
                                  {showMayor &&
                                    questionIsMayor &&
                                    renderResponseBlock(
                                      "Mayoral Candidate: Sujit Singh",
                                      "text-green-700",
                                      singhResponse,
                                      mayorSinghVideoId,
                                      question.id
                                    )}
                                  {showCouncil &&
                                    questionIsCouncil &&
                                    renderResponseBlock(
                                      "Council Candidates: Geevers & Charles",
                                      "text-blue-700",
                                      geeversCharlesResponse,
                                      councilGeeversCharlesVideoId,
                                      question.id
                                    )}
                                  {showCouncil &&
                                    questionIsCouncil &&
                                    renderResponseBlock(
                                      "Council Candidates: Tomar & Winters",
                                      "text-green-700",
                                      tomarWintersResponse,
                                      councilTomarWintersVideoId,
                                      question.id
                                    )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredIssues.length === 0 &&
                  (searchQuery || activeOffice) && (
                    <p className="text-slate-500 italic col-span-full text-center py-8">
                      No results match your filters.
                    </p>
                  )}
              </div>
            </Card>
          </section>

          {/* --- Campaign Finance Section --- */}
          <section id="finance" className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">
              Campaign Finance & Transparency
            </h2>
            <Card noHoverEffect className="p-0">
              <div className="p-4 sm:p-6">
                {/* **** UPDATED DISCLAIMER **** */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <IconInfo className="text-amber-600 mr-3 flex-shrink-0 mt-1 sm:mt-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800">
                      Important Disclaimer
                    </h3>
                    <p className="text-sm text-amber-700">
                      The financial data presented below is sourced from the
                      11-Day Pre-Election R-1 reports filed with NJ ELEC on
                      October 24, 2025. This is a snapshot in time and may not
                      reflect the most current fundraising or expenditure
                      totals. Final figures will be available in the post-election
                      reports.
                    </p>
                  </div>
                </div>
                {/* **** END DISCLAIMER UPDATE **** */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* --- PROVEN LEADERS (UPDATED) --- */}
                  <div className="p-4 sm:p-6 bg-slate-50 rounded-xl border-2 border-slate-200 h-full flex flex-col">
                    <h4 className="font-bold text-xl text-blue-800 mb-4 text-center">
                      Proven Leaders for West Windsor
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6 text-center">
                      <div><div className="text-xs text-slate-500">Total Raised</div><div className="font-bold text-2xl sm:text-lg">${financeData.provenLeaders.raised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
                      <div><div className="text-xs text-slate-500">Total Spent</div><div className="font-bold text-2xl sm:text-lg">${financeData.provenLeaders.spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
                      <div className="col-span-1 sm:col-span-2 mt-2"><div className="text-xs text-slate-500">Cash on Hand</div><div className="font-bold text-2xl text-green-700">${financeData.provenLeaders.cashOnHand.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
                    </div>

                    <div className="space-y-8 flex-grow flex flex-col">
                      <div className="relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5 animate-pulse"></span>
                            Only includes donations &gt; $200
                          </span>
                        </div>
                        <div className="bg-white border-2 border-slate-400 rounded-lg p-4 pt-10 space-y-8">
                          <div>
                            <div className="text-center mb-2"><h5 className="font-semibold text-slate-700 text-sm">Funding Sources¹</h5></div>
                            <div className="flex flex-wrap justify-center gap-2 mb-2">
                              {/* NOTE: Data from 11-day report doesn't change this breakdown */}
                              <span className="text-xs font-medium bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">100% from Individuals</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5"><div className="bg-sky-500 h-2.5 rounded-full" style={{ width: "100%" }}></div></div>
                          </div>
                          <div>
                            <div className="text-center mb-2"><h5 className="font-semibold text-slate-700 text-sm">Donation Origin (by $ Amount)²</h5></div>
                            <div className="flex flex-wrap justify-center gap-2 mb-2">
                              {/* NOTE: Data from 11-day report doesn't change this breakdown */}
                              <span className="text-xs font-medium bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">29.4% from In-Town</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5"><div className="bg-sky-500 h-2.5 rounded-full" style={{ width: "29.4%" }}></div></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-center mb-2"><h5 className="font-semibold text-slate-700 text-sm">Donation Size (% of Total Monetary Raised)</h5></div>
                        <div className="flex flex-wrap justify-center gap-2 mb-2 text-center">
                          <span className="text-xs font-medium bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">{financeData.provenLeaders.percentUnder200.toFixed(1)}% $200 or less</span>
                          <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">{financeData.provenLeaders.percentOver200.toFixed(1)}% over $200</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 flex"><div className="bg-sky-500 h-2.5 rounded-l-full" style={{ width: `${financeData.provenLeaders.percentUnder200}%` }}></div><div className="bg-slate-400 h-2.5 rounded-r-full" style={{ width: `${financeData.provenLeaders.percentOver200}%` }}></div></div>
                      </div>
                    </div>
                    <Button size="sm" type="secondary" className="w-full mt-10" href={financeData.provenLeaders.reportLink} icon={<IconExternalLink />}>View 11-Day ELEC Report</Button>
                  </div>

                  {/* --- WW TOGETHER (UPDATED) --- */}
                  <div className="p-4 sm:p-6 bg-slate-50 rounded-xl border-2 border-slate-200 h-full flex flex-col">
                    <h4 className="font-bold text-xl text-green-800 mb-4 text-center">West Windsor Together</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6 text-center">
                      <div><div className="text-xs text-slate-500">Total Raised</div><div className="font-bold text-2xl sm:text-lg">${financeData.wwTogether.raised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
                      <div><div className="text-xs text-slate-500">Total Spent</div><div className="font-bold text-2xl sm:text-lg">${financeData.wwTogether.spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
                      <div className="col-span-1 sm:col-span-2 mt-2"><div className="text-xs text-slate-500">Cash on Hand</div><div className="font-bold text-2xl text-green-700">${financeData.wwTogether.cashOnHand.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div></div>
                    </div>

                    <div className="space-y-8 flex-grow flex flex-col">
                      <div className="relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5 animate-pulse"></span>
                            Only includes donations &gt; $200
                          </span>
                        </div>
                        <div className="bg-white border-2 border-slate-400 rounded-lg p-4 pt-10 space-y-8">
                          <div>
                            <div className="text-center mb-2"><h5 className="font-semibold text-slate-700 text-sm">Funding Sources¹</h5></div>
                             <div className="flex flex-wrap justify-center gap-2 mb-2 text-center">
                               {/* NOTE: Data from 11-day report doesn't change this breakdown */}
                               <span className="text-xs font-medium bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">98% Individuals</span>
                               <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">2% Committees</span>
                             </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5 flex"><div className="bg-sky-500 h-2.5 rounded-l-full" style={{ width: "98%" }}></div><div className="bg-slate-400 h-2.5 rounded-r-full" style={{ width: "2%" }}></div></div>
                          </div>
                          <div>
                            <div className="text-center mb-2"><h5 className="font-semibold text-slate-700 text-sm">Donation Origin (by $ Amount)²</h5></div>
                            <div className="flex flex-wrap justify-center gap-2 mb-2">
                               {/* NOTE: Data from 11-day report doesn't change this breakdown */}
                              <span className="text-xs font-medium bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">30.5% from In-Town</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5"><div className="bg-sky-500 h-2.5 rounded-full" style={{ width: "30.5%" }}></div></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-center mb-2"><h5 className="font-semibold text-slate-700 text-sm">Donation Size (% of Total Monetary Raised)</h5></div>
                        <div className="flex flex-wrap justify-center gap-2 mb-2 text-center">
                          <span className="text-xs font-medium bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">{financeData.wwTogether.percentUnder200.toFixed(1)}% $200 or less</span>
                          <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">{financeData.wwTogether.percentOver200.toFixed(1)}% over $200</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 flex"><div className="bg-sky-500 h-2.5 rounded-l-full" style={{ width: `${financeData.wwTogether.percentUnder200}%` }}></div><div className="bg-slate-400 h-2.5 rounded-r-full" style={{ width: `${financeData.wwTogether.percentOver200}%` }}></div></div>
                      </div>
                    </div>
                    <Button size="sm" type="secondary" className="w-full mt-10" href={financeData.wwTogether.reportLink} icon={<IconExternalLink />}>View 11-Day ELEC Report</Button>
                  </div>
                </div>

                <div className="mt-6 text-xs text-slate-600 space-y-2">
                  <p><strong>¹ About 'Funding Sources'</strong><br />The breakdown of funding sources only includes itemized monetary contributions (typically those over $200) as reported on Schedule 1 of the ELEC R-1 filing and all loans recieved. It categorizes these contributions based on the type of donor (Individual, Committee, Corporation, etc.). It excludes loans and in-kind contributions.</p>
                  <p><strong>² About 'Donation Origin' (In-Town Percentage)</strong><br />The "In-Town" percentage is calculated based on the dollar amount of itemized monetary contributions (typically those over $200) where the donor's address listed on the ELEC R-1 filing is within West Windsor (Zip Code 08550 or Zip Code 08540 with a verified West Windsor Township Address). This calculation does not include smaller, non-itemized donations, loans, or in-kind contributions as address information is not typically reported for those.</p>
                </div>
              </div>
            </Card>
          </section>

          {/* --- Voter Information Hub --- */}
          <section id="voter-tools" className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">
              Voter Toolkit
            </h2>
            <Card noHoverEffect className="p-0">
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div><div className="flex items-center mb-3"><IconCalendar className="h-6 w-6 text-sky-600 mr-2" /><h3 className="text-lg font-semibold text-slate-800">Key Dates</h3></div><ul className="space-y-2">{keyDates.map((item) => (<li key={item.event} className="text-sm"><strong className="text-sky-700">{item.date}:</strong> {item.event}</li>))}</ul></div>
                <div><div className="flex items-center mb-3"><IconUserCheck className="h-6 w-6 text-sky-600 mr-2" /><h3 className="text-lg font-semibold text-slate-800">Voter Tools</h3></div><div className="space-y-3"><Button type="secondary" href="https://voter.svrs.nj.gov/registration-check" icon={<IconExternalLink />} className="w-full justify-center">Check Status</Button><Button type="primary" href="https://voter.svrs.nj.gov/register" icon={<IconUserCheck />} className="w-full justify-center">Register Online</Button><Button type="secondary" href="https://voter.svrs.nj.gov/polling-place-search" icon={<IconMapMarker className="h-4 w-4" />} className="w-full justify-center">Find Polling Place</Button></div></div>
                <div><div className="flex items-center mb-3"><IconBallotBox className="h-6 w-6 text-sky-600 mr-2" /><h3 className="text-lg font-semibold text-slate-800">Three Ways to Vote</h3></div><div className="flex border-b border-gray-200"><button onClick={() => setActiveTab("mail")} className={`flex-1 py-2 text-sm font-medium ${activeTab === "mail" ? "border-b-2 border-sky-600 text-sky-600" : "text-gray-500 hover:text-gray-700"} transition-colors`}>By Mail</button><button onClick={() => setActiveTab("early")} className={`flex-1 py-2 text-sm font-medium ${activeTab === "early" ? "border-b-2 border-sky-600 text-sky-600" : "text-gray-500 hover:text-gray-700"} transition-colors`}>Early</button><button onClick={() => setActiveTab("electionDay")} className={`flex-1 py-2 text-sm font-medium ${activeTab === "electionDay" ? "border-b-2 border-sky-600 text-sky-600" : "text-gray-500 hover:text-gray-700"} transition-colors`}>Election Day</button></div><div className="mt-3 text-sm animate-fadeIn">{activeTab === "mail" && (<div> <p> Apply for your mail-in ballot by Oct. 28. Return it via USPS or a secure ballot drop box. </p> <Button size="sm" type="secondary" href="https://www.nj.gov/state/elections/vote-by-mail.shtml" icon={<IconExternalLink />} className="mt-2">Learn More</Button></div>)}{activeTab === "early" && (<div> <p> From Oct. 25 to Nov. 2, vote at any designated early voting location in Mercer County. </p> <Button size="sm" type="secondary" href="https://www.nj.gov/state/elections/vote-early-voting.shtml" icon={<IconExternalLink />} className="mt-2">Find Locations</Button></div>)}{activeTab === "electionDay" && (<div> <p> Go to your assigned polling place on Tuesday, Nov. 4, between 6:00 AM and 8:00 PM. </p> <Button size="sm" type="secondary" href="https://voter.svrs.nj.gov/polling-place-search" icon={<IconExternalLink />} className="mt-2">Find Polling Place</Button></div>)}</div></div>
              </div>
            </Card>
          </section>

          {/* --- Section Divider --- */}
          <div className="py-10 my-6">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full h-1.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-100 px-6 text-lg font-bold text-slate-700">
                  Forum Initiative Archive
                </span>
              </div>
            </div>
          </div>
          {/* --- Forum Archive --- */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">
              2025 Candidate Forum Initiative (Cancelled)
            </h2>
            <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">
              The following sections contain archival information regarding the
              planning and unfortunate cancellation of the 2025 candidate forum.
              This is preserved for transparency.
            </p>
            <div className="space-y-8">
              <PanelistSection />
              <DocumentComparisonSection />
              <StatementsSection />
              <ForumFormatSection />
              <KeyInformationSection />
              <PressCoverageSection />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

// --- LEAVE ALL OTHER COMPONENTS (ContactPage, App, etc.) AS THEY ARE ---

const ContactPage: FC = () => {
  const initialFormData = { name: "", email: "", message: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const web3FormsAccessKey = "ccb9ef54-31b7-4397-9eb8-ff8d3b587265";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");
    const formElement = event.target as HTMLFormElement;
    const web3FormData = new FormData(formElement);
    web3FormData.append("access_key", web3FormsAccessKey);
    web3FormData.append(
      "subject",
      `New Contact from ${formData.name || "Website Visitor"}`
    );

    if (!formData.name || !formData.email || !formData.message) {
      setResult("Please fill in all required fields.");
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 6000);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setResult("Please enter a valid email address.");
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 6000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData,
      });
      const data = await response.json();
      if (data.success) {
        setResult("Message sent successfully! We'll get back to you soon.");
        formElement.reset();
        setFormData(initialFormData);
      } else {
        console.log("Error from web3forms", data);
        setResult(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult(
        "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 8000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 relative overflow-hidden">
      <DotPattern dotColor="text-sky-400 opacity-10" rows={12} cols={15} />

      <div className="relative z-10 container mx-auto py-12 sm:py-16 md:py-20 px-4 animate-fadeIn">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Contact{" "}
            <span className="text-sky-600" style={{ color: "#0284c7" }}>
              West Windsor Forward
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to make a difference in our community? We'd love to hear from
            you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <Card
              className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-0 transform hover:scale-105 transition-all duration-300"
              noHoverEffect
            >
              <div className="relative p-4 sm:p-6 lg:p-8">
                <DotPattern
                  dotColor="text-white opacity-10"
                  rows={6}
                  cols={8}
                />
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                    {" "}
                    Let's Connect{" "}
                  </h2>
                  <p className="text-sky-100 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    We welcome your questions, ideas, and partnership
                    opportunities. Together, we can create positive change in
                    West Windsor.
                  </p>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start group">
                      <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                        <IconMail className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                          Email Us
                        </h3>
                        <a
                          href="mailto:contact@westwindsorforward.org"
                          className="text-sky-100 hover:text-white transition-colors text-sm sm:text-base break-all"
                        >
                          contact@westwindsorforward.org
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                        <IconUsers className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                          Join Our Community
                        </h3>
                        <p className="text-sky-100 mb-3 text-sm sm:text-base">
                          Follow us for updates and events
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href="https://www.facebook.com/profile.php?id=61575121893868"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 group text-sm sm:text-base"
                          >
                            <IconFacebook className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                            <span> Facebook</span>
                            <IconExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </a>
                          <a
                            href="https://instagram.com/westwindsorforward"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 group text-sm sm:text-base"
                          >
                            <IconInstagram className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                            <span> Instagram</span>
                            <IconExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </a>
                          <a
                            href="https://x.com/westwindsorfwd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 group text-sm sm:text-base"
                          >
                            <IconX className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                            <span> Twitter/X</span>
                            <IconExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                        <IconLightBulb className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                          Get Involved
                        </h3>
                        <p className="text-sky-100 text-sm sm:text-base">
                          Volunteer opportunities, events, and ways to make an
                          impact in our community.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20">
                    <div className="flex items-center">
                      <IconClock className="h-4 w-4 sm:h-5 sm:w-5 mr-3 sm:mr-2 text-sky-200 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-sky-100">
                        We typically respond within 24-48 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card
              className="bg-white p-0 border-2 border-transparent hover:border-sky-200 transition-all duration-300"
              hasDotPattern
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-sky-100 p-3 rounded-lg mr-4">
                    <IconDocument className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                      {" "}
                      Send Us a Message{" "}
                    </h2>
                    <p className="text-gray-600">
                      Share your thoughts, questions, or ideas with us
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start">
                    <IconInfo className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium mb-1">
                        Secure & Private
                      </p>
                      <p className="text-sm text-blue-700">
                        This form is powered by Web3Forms, ensuring your data
                        privacy and reliable message delivery.
                      </p>
                    </div>
                  </div>
                </div>

                {result && (
                  <div
                    className={`mb-6 p-4 rounded-xl border text-sm font-medium ${
                      result.includes("successfully")
                        ? "bg-green-50 text-green-800 border-green-200"
                        : result.includes("Sending")
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : "bg-red-50 text-red-800 border-red-200"
                    }`}
                  >
                    <div className="flex items-center">
                      {result.includes("successfully") && (
                        <IconCheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      )}
                      {result.includes("Sending") && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      )}
                      <span>{result}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-gray-400"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-gray-400"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-gray-400 resize-none"
                      placeholder="Tell us about your questions, ideas, or how you'd like to get involved..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500 px-6 py-4 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <IconMail className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-slate-50 to-sky-50 border-sky-200 p-0 max-w-4xl mx-auto">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our community of engaged residents working together to
                create positive change in West Windsor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/profile.php?id=61575121893868",
                      "_blank"
                    )
                  }
                  type="secondary"
                  icon={<IconFacebook />}
                >
                  Follow on Facebook
                </Button>
                <Button
                  onClick={() =>
                    (window.location.href =
                      "mailto:contact@westwindsorforward.org?subject=Volunteer%20Interest")
                  }
                  icon={<IconUsers />}
                >
                  Volunteer With Us
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [activePage, setActivePage] = useState<PageName>("Home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const navigateToPage = (page: PageName, project: Project | null = null) => {
    let path = "/";
    let title = "West Windsor Forward";

    switch (page) {
      case "Home":
        path = "/";
        break;
      case "About":
        path = "/about";
        title = "About Us - West Windsor Forward";
        break;
      case "Projects":
        path = "/projects";
        title = "Our Initiatives - West Windsor Forward";
        break;
      case "Election":
        path = "/election";
        title = "2025 Election Hub - West Windsor Forward";
        break;
      case "Contact":
        path = "/contact";
        title = "Contact Us - West Windsor Forward";
        break;
      case "ProjectDetails":
        if (project) {
          path = `/projects/${project.slug}`;
          title = `${project.title} - West Windsor Forward`;
        }
        break;
      default:
        path = "/";
    }

    if (typeof window !== "undefined" && window.location.pathname !== path) {
      const historyState = { page, projectId: project?.id || null };
      window.history.pushState(historyState, title, path);
    }

    setActivePage(page);
    setSelectedProject(project);
    if (typeof document !== "undefined") {
      document.title = title;
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname;
      const parts = path.split("/").filter(Boolean);

      if (parts[0] === "about") {
        setActivePage("About");
        setSelectedProject(null);
        document.title = "About Us - West Windsor Forward"; // <-- ADD THIS
      } else if (parts[0] === "projects") {
        if (parts[1]) {
          const project = projectsData.find((p) => p.slug === parts[1]);
          setActivePage("ProjectDetails");
          setSelectedProject(project || null);
          document.title = `${project?.title || 'Project'} - West Windsor Forward`; // <-- ADD THIS
        } else {
          setActivePage("Projects");
          setSelectedProject(null);
          document.title = "Our Initiatives - West Windsor Forward"; // <-- ADD THIS
        }
      } else if (parts[0] === "election") {
        setActivePage("Election");
        setSelectedProject(null);
        document.title = "2025 Election Hub - West Windsor Forward"; // <-- ADD THIS
      } else if (parts[0] === "contact") {
        setActivePage("Contact");
        setSelectedProject(null);
        document.title = "Contact Us - West Windsor Forward"; // <-- ADD THIS
      } else {
        setActivePage("Home");
        setSelectedProject(null);
        document.title = "West Windsor Forward"; // <-- ADD THIS
      }
    };

    window.addEventListener("popstate", handlePopState);
    // Initial load check
    handlePopState({} as PopStateEvent);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderPage = () => {
    if (activePage === "ProjectDetails" && selectedProject)
      return (
        <ProjectDetailPage
          project={selectedProject}
          setActivePage={navigateToPage}
        />
      );
    switch (activePage) {
      case "Home":
        return <HomePage setActivePage={navigateToPage} />;
      case "About":
        return <AboutPage />;
      case "Projects":
        return <ProjectsPage setActivePage={navigateToPage} />;
      case "Election":
        return <ElectionPage setActivePage={navigateToPage} />;
      case "Contact":
        return <ContactPage />;
      default:
        return <HomePage setActivePage={navigateToPage} />;
    }
  };

  return (
    <div
      id="app"
      className="flex flex-col min-h-screen bg-slate-100 font-body text-slate-700"
    >
      <Navbar
        setActivePage={navigateToPage}
        activePage={activePage}
        selectedProject={selectedProject}
      />
      <main className="flex-grow">{renderPage()}</main>
      <Footer setActivePage={navigateToPage} />
    </div>
  );
}

export default App;

// --- Style injection ---
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
      body { font-family: 'Lora', Georgia, serif !important; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; scroll-behavior: smooth; } /* Added smooth scroll */
      .font-body { font-family: 'Lora', Georgia, serif !important; }
      h1, h2, h3, h4, h5, h6 { font-family: 'Lora', Georgia, serif !important; }
      .prose { font-family: 'Lora', Georgia, serif !important; }
      .prose p { margin-bottom: 1.25em; line-height: 1.75; }
      .prose strong { color: inherit; }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }

      @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-slideDown {
        animation: slideDown 0.3s ease-out forwards;
      }

      @keyframes pulse-slow {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.15; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        will-change: opacity;
      }

      @keyframes bounce { /* Added bounce animation */
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
      }
      .animate-bounce {
          animation: bounce 1s infinite;
      }


      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Thin scrollbar for Webkit browsers */
      .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
      }
      .scrollbar-thin::-webkit-scrollbar-track {
        background: #f1f5f9; /* slate-100 */
        border-radius: 10px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background: #cbd5e1; /* slate-300 */
        border-radius: 10px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: #94a3b8; /* slate-400 */
      }
      /* Thin scrollbar for Firefox */
      .scrollbar-thin {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e1 #f1f5f9; /* thumb track */
      }
    `;
  document.head.appendChild(styleSheet);

  const fontLinkLora = document.createElement("link");
  fontLinkLora.rel = "stylesheet";
  fontLinkLora.href =
    "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
  document.head.appendChild(fontLinkLora);
}
