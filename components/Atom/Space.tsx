import styled from "styled-components"

/**
 * Creates a Space
 * @param width {number} The width of the Element x*4px 
 * @param height {number} The height of the Element x*4px 
 * @param displayMobile {number} Disables the Space at a specific width 
 */

interface SpaceProps {
  width?: number;
  height?: number;
  disableMobile?: number;
}

const SpaceP = styled.div`
  min-width: ${props => props.theme.w}px;
  min-height: ${props => props.theme.h}px;
  width: ${props => props.theme.w}px;
  height: ${props => props.theme.h}px;
  @media only screen and (max-width: ${props => props.theme.dM}px) {
    display: ${props => props.theme.dM ? 'none' : 'unset'}
  }
`;

const Space = ({ width, height, disableMobile }: SpaceProps) => {
  const thisWidth = width ? width : 0;
  const thisHeight = height ? height : 0;

  return (
    <SpaceP theme={{ w:thisWidth*4, h:thisHeight*4, dM:disableMobile }}>
    </SpaceP>
  );
};

export default Space;
