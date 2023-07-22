import styled from 'styled-components';

const StyledDiv = styled.div`
  position: relative;
  text-align: center;
  color: white;

  img {
    width: 100%;
    height: auto;
  }

  .label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1vw;
    color: black;
    background-color: rgba(255, 255, 255, 0.7);  // semi-transparent white background
    padding: 0.5em;  // padding around the text
    border-radius: 5px;  // rounded corners
  }
`;

interface LabelledImageProps {
  imageSrc: string;
  altText: string;
  label: string;
}

function LabelledImage({ imageSrc, altText, label }: LabelledImageProps): JSX.Element {
  return (
    <StyledDiv>
      <img src={imageSrc} alt={altText} />
      <div className="label">{label}</div>
    </StyledDiv>
  );
}

export default LabelledImage;
