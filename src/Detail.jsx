// Detail.jsx
import { styled } from 'styled-components';
import { useLocation } from "react-router-dom";

const Back = styled.section`
  display: flex;
  height:600px;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  height: 500px;
  width: 700px;
  background-color: white;
  color: black;
  border-radius: 10px;
  padding : 30px 50px
`;

const Header=styled.div`
  font-weight: 600;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`


const ColorBox = styled.div`
  height: 200px;
  width: 100%;
  background-color: ${({ color }) => color};
  color: white;
  font-weight: 600;
  font-size: 30px;
  text-align: center;
  padding:50px 20px;
  margin-bottom: 20px;
  color: black;
`;


const Content = styled.div`
  margin-bottom: 20px;
  font-size: 23px; 
`;

const Detail = () => {
  const location = useLocation();
  const { weatherData } = location.state;

  const pmColor = IDEX_NM => {
    if (IDEX_NM === '좋음') {
      return { color: "green", text: IDEX_NM };
    } else if (IDEX_NM === '점검 중') {
      return { color: '', text: '-' };
    } else if (IDEX_NM === '나쁨') {
      return { color: "red", text: IDEX_NM };
    } else if (IDEX_NM === '보통'){
      return { color: '', text: IDEX_NM };
    }
  };

  const colorResult = pmColor(weatherData.IDEX_NM).color;

  return (
    <Back>
      <Box>
        <Header>
        <p>{weatherData.MSRRGN_NM} | {weatherData.MSRSTE_NM}</p>{weatherData.MSRDT}
        </Header>
        <Content>오존(ppm) : {weatherData.O3}</Content>
        <Content>미세먼지 농도: {weatherData.PM10}</Content>
        <Content>초미세먼지 농도: {weatherData.PM25}</Content>
        <Content>통합대기 환경지수: {weatherData.IDEX_MVL}</Content>
        <ColorBox color={colorResult} >
          통합대기 환경등급 <br/> {weatherData.IDEX_NM}
        </ColorBox>
      </Box>
    </Back>
  );
};

export default Detail;