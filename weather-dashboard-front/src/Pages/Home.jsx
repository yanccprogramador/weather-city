import { useEffect, useState } from "react";
import {
  createCity,
  getAllCities,
  searchCity,
  deleteCity
} from "../Services/citiesService";
import { Col, Card, Modal, Row, Select, Button, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState();
  const [cities, setCities] = useState([]);
  const [citiesSearched, setCitiesSearched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const create = async () => {
    setSearching(true);
    let result = await createCity(city);
    alert(
      result == 201 ? "Cidade adicionada" : "Não conseguimos adicionar"
    );
    handleCancel();
    getCities();
    setSearching(false);
  };
  const removeCity = async (currentCity) => {
    setSearching(true);
    console.log(currentCity);
    let result = await deleteCity(currentCity.id);
    alert(result == 200 ? "Cidade apagada" : "Não conseguimos apagar");
    getCities();
    setSearching(false);
  };
  const onSearch = async (value) => {
    console.log(value);
    if (!value || value.length < 3) {
      return;
    }
    setSearching(true);
    let result = await searchCity(value);
    let cities = [];
    result.map((city) => {
      return cities.push({
        label: city.name,
        value: JSON.stringify({
          name: city.name,
          lat: city.lat,
          lon: city.lon,
        }),
      });
    });
    setCitiesSearched(cities);
    setSearching(false);
  };
  const getCities = async () => {
    setLoading(true);
      setCities([]);
      const allCities = await getAllCities();
      setCities(allCities);
      setLoading(false);
  }
  useEffect(() => {
    getCities();
    setInterval(async () => {
      await getCities()
    }, 900000);
  }, []);
  const signOut= () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div style={{marginLeft: `10rem`,marginRight: `10rem`, marginTop:'5rem'}}>
      <Row >
        <Col span={18}>
          <h1>Dashboard</h1>
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={showModal}>
            Adicionar Cidade
          </Button>
          <Button type="primary" danger onClick={()=>signOut()}>
            Deslogar
          </Button>
        </Col>
      </Row>
      {loading && (
        <Row>
          <Col span={24}>
            <Spin size={"large"} />
          </Col>
        </Row>
      )}
      <Row>
        {cities &&
          cities.map((currentCity) => (
            <Col span={6}>
              <Card
                title={currentCity.name}
                extra={
                  <div onClick={() => removeCity(currentCity)}>
                    <DeleteOutlined />
                  </div>
                }
              >
                Temperatura atual: {currentCity.weather.main.temp}º | Humidade{" "}
                {currentCity.weather.main.humidity}% | Estado do tempo{" "}
                {currentCity.weather.weather[0].description}
              </Card>
            </Col>
          ))}
      </Row>
      <Modal
        title="Adicionar Cidade"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Select
            style={{ width: "100%" }}
            title="Cidade"
            defaultValue={city}
            loading={isSearching}
            onSearch={onSearch}
            showSearch={true}
            options={citiesSearched}
            onSelect={(e) => setCity(JSON.parse(e))}
          />
        </Row>
        <Button type="primary" onClick={create}>
          Salvar
        </Button>
      </Modal>
    </div>
  );
}

export default Home;
