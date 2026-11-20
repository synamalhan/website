import { motion, useReducedMotion } from "framer-motion";

// Fades and lifts a section into view the first time it scrolls on screen.
export default function Reveal({ children }) {
    const still = useReducedMotion();
    return (
        <motion.div style={{ position: "relative", zIndex: 10 }} initial={still ? false : { opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
            {children}
        </motion.div>
    );
}
