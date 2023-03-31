import axios from "axios";

interface ILoginService {
  checkEmail: (email: string) => Promise<boolean>;
  loginUser: (email: string, password: string) => Promise<boolean>;
}

const LoginService: ILoginService = {
  checkEmail: async(email) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.trycrypto.pl/user/check/email',
        data: {
          email: email
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response)
      return response.status === 200 ? true : false
    } catch (error) {
      console.log(error)
      return false;
    }
  },
  loginUser: async(email, password) => {
    try {
      const response = await axios.post('https://api.trycrypto.pl/user/login', {
        email: email,
        password: password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.status === 200 ? true : false
    } catch (error) {
      console.log(error)
      return false;
    }
  }

}

export default LoginService;