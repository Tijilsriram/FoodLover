import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToSection() {
  const { pathname } = useLocation();

  useEffect(() => {
    const id = pathname === "/" ? "showcase" : pathname.substring(1);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default ScrollToSection;