import { BodySection, HeadSection, HeadText, HomeContainer, TableTh, DataTable} from "./components/BodyStyle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const Home = () => {
  const navigate=useNavigate();
  const[weatherData,setweatherData]=useState([]);
  const API_KEY=import.meta.env;
  const{VITE_APP_API_KEY}=import.meta.env;
  

//데이터 불러오기
  const fetchData= async()=> {
    try{
      const response = await axios.get(`http://openAPI.seoul.go.kr:8088/${VITE_APP_API_KEY}/json/RealtimeCityAir/1/40/`);
      setweatherData(response.data.RealtimeCityAir.row);
    } catch(error){
      console.log(error)
      console.log("데이터불러오는데 실패");
    }

  };
  
  console.log(weatherData)
  
  useEffect(()=>{
    fetchData();
  },[]);

  const homeData = weatherData.filter((weatherData) => weatherData.MSRSTE_NM === "영등포구");


  return(
    <HomeContainer>
      <HeadSection>
        <HeadText>서울시 권역별 실시간 대기환경 현황</HeadText>
      </HeadSection>
      <BodySection>
        <DataTable>
          <thead>
            <tr>
              <TableTh>측정일</TableTh>
              <TableTh>측정소</TableTh>
              <TableTh>미세먼지</TableTh>
              <TableTh>초미세먼지농도</TableTh>
              <TableTh>통합대기환경등급</TableTh>
              <TableTh>통합대기환경지수</TableTh>
              <TableTh>오존</TableTh>
              <TableTh>이산화질소농도</TableTh>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((weatherData, idx) => (
              <tr style={{ color: homeData.includes(weatherData) ? "orange" : "" }} key={idx}>
                <td>{weatherData.MSRDT}</td>
                <td onClick={() => navigate(`/detail/${weatherData.MSRSTE_NM}`, { state: { weatherData: weatherData} })}>
                  {weatherData.MSRSTE_NM}
                </td>
                <td>{weatherData.PM10}</td>
                <td>{weatherData.PM25}</td>
                <td>{weatherData.IDEX_NM}</td>
                <td>{weatherData.IDEX_MVL}</td>
                <td>{weatherData.O3}</td>
                <td>{weatherData.CO}</td>
              </tr>
            ))}
          </tbody>

        </DataTable>
      </BodySection>
    </HomeContainer>
  );
};

export default Home;
