import { loginEndpoint } from '../..//spotify'
import spotifylogo from '/spotifylogo.png'

const Login = () => {

  //const imgplaceholder = "https://via.placeholder.com/150"

  return (
    <div className='bg-[#1f1f1f] h-[100vh] w-[100vw] flex items-center justify-center overflow-hidden flex-col'>
      <img src={spotifylogo} alt="login-spotify" className='w-[30%]' />
      <a href={loginEndpoint}>
        <div className='w-[200px] py-[15px] px-[0px] text-center bg-[#fefefe] rounded-[50px] text-[#1f1f1f] mt-[20%]'>LOG IN</div>
      </a>
    </div>
  )
}

export default Login