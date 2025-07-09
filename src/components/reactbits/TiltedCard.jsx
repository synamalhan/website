import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  containerHeight = "300px",
  containerWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  overlayHeader = "Project Title",
  overlayText = "This is a featured AI project. Learn more at",
  overlayLink = "https://example.com",
  overlayLinkText = "Project Link",
  gradientColors = ["#3A0CA3", "#7209B7", "#4361EE"],
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  const gradient = `linear-gradient(135deg, ${gradientColors.join(", ")})`;

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-[15px] overflow-hidden text-white [transform-style:preserve-3d]"
        style={{
          width: "100%",
          height: "100%",
          background: gradient,
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Header Overlay */}
        <motion.div
          className="absolute top-4 left-4 z-[2] bg-white/10 px-4 py-1 text-sm font-semibold rounded-md backdrop-blur-md"
          style={{ transform: "translateZ(30px)" }}
        >
          {overlayHeader}
        </motion.div>

        {/* Text/Link Overlay */}
        <motion.div
          className="absolute bottom-0 left-0 z-[1] w-full px-4 py-3 text-sm bg-black/40 backdrop-blur-sm"
          style={{ transform: "translateZ(20px)" }}
        >
          {overlayText}
          <a
            href={overlayLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-cyan-300 hover:underline"
          >
            {overlayLinkText}
          </a>
        </motion.div>
      </motion.div>
    </figure>
  );
}
