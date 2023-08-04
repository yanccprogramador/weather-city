import { Result } from "antd";
import { createCity, deleteCity, getAllCities, searchCity } from "./citiesService";

describe('Cities service', ()=> {
  const mockResponse = {
    name: 'Sao Paulo',
    lat: '-49',
    lon: '-10',
    username: 'test',
  }; 
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
      status:200
    })
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeAll(()=> localStorage.setItem('token', test))
  it('should return all cities',async ()=> {
    expect(await getAllCities()).toBe(mockResponse)
  })
  it('should create city',async ()=> {
    expect(await createCity(mockResponse)).toBe(200)
  })
  it('should delete a cities',async ()=> {
    let result = await deleteCity(1);
    expect(result).toBe(200)
  })
  it('should search cities',async ()=> {
    expect(await searchCity('London')).toBe(mockResponse)
  })
})