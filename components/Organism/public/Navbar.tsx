import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage";
import AnimatedHeadline from "components/Atom/AnimatedHeadline";
import Space from "components/Atom/Space";
import Text from "components/Atom/Text";

const NavWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContengtWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 80px;
`;

const DAMobile = styled.div`
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const SBS = styled.div`
  display: flex;
  align-items: center;
`;

const transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`;


const MenuItem = styled.li``;

const Navbar: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > 10) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isScrolling && (
        <NavWrapper
          initial={{ y: -120 }}
          animate={{ y: 0 }}
          exit={{ y: -120 }}
          transition={{ duration: 0.3 }}
        >
          <ContengtWrapper>

          <SBS>
            <motion.div
              whileTap={{ scale: 0.9, rotate: 10 }}
              whileHover={{ scale: 1.1 }}
              transition={transition}
            >
              <ResponsiveImage
                alt="Louis Christ"
                src="/tobedeleted/LouisMain.jpg"
                borderRadius="999px"
                width={'60px'}
              />
            </motion.div>
            <Space width={5} />
            <DAMobile>
              <AnimatedHeadline small text="Louis Christ"/>
            </DAMobile>
          </SBS>

          <Menu>
            <MenuItem>
              <Link href={"#Lebenslauf"}>
                <Text>Lebenslauf</Text>
              </Link></MenuItem>
            <MenuItem><Link href={'#Kontakt'}><Text>Kontakt</Text></Link></MenuItem>
          </Menu>
          </ContengtWrapper>
          
        </NavWrapper>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
