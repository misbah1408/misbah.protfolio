import { useRef } from "react";
import { projectList } from "../../utils/Constants";
import "./Projects.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Single = ({ item }) => {
  const ref = useRef();
  const { title, img, description, link } = item || "default";
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  return (
    <section ref={ref}>
      <div className="container">
        <div className="wrapper">
          <motion.div className="imgContainer" style={{ y: y1 }}>
            <img src={img} alt={title} />
          </motion.div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>{title}</h2>
            <p>{description}</p>
            <a href={link} rel="noreferrer">
              <button>
                <i className="fa-solid fa-arrow-up-right-from-square text-[15px]"></i>
                <i className="fa-brands fa-github"></i>
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function Project() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  return (
    <div className="projects" ref={ref}>
      <div className="progress">
        <h1>Featured Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
        {projectList.map((item) => (
          <Single item={item} key={item.id} />
        ))}
    </div>
  );
}

export default Project;
