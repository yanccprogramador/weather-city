import { login, register } from "./userService";

describe('Users service', ()=> {
  const mockResponse = {
    username: 'test',
    password: '149',
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
  it('should create a user',async ()=> {
    expect(await register(mockResponse)).toBe(mockResponse)
  })
  it('should login',async ()=> {
    expect(await login(mockResponse)).toBe(true)
  })
})