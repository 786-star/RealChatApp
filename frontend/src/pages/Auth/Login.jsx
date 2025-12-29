import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../api/apiInstance'

const Login = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const [userForm, setUserForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const InputStyle = `w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]`
    const btnStyle = `px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner cursor-pointer`

    const handleFormChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await baseUrl.post('/auth/login', userForm)
            console.log(res)
            setUserForm({ email: "", password: "" })
            setLoading(false)
            setError('')
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error?.response?.data?.message)
        }
    }


    return (
        <div className='w-full h-screen bg-slate-200 flex items-center justify-center'>
            <div className='w-full max-w-125 h-150 bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-7.5'>
                <div className='w-full h-50 bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
                    <h1 className='text-gray-600 font-bold text-[30px]'>Login to <span className='text-white'>Chatly</span></h1>
                </div>
                <form className='flex items-center w-full flex-col gap-5' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter email' className={InputStyle} value={userForm.email} onChange={handleFormChange} name="email" />
                    <div className='w-[90%] h-12.5 border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
                        <input type={`${show ? 'text' : 'password'}`} placeholder='Enter password' className='w-full h-full outline-none px-5 py-2.5 bg-white text-gray-700 text-[19px]'
                            value={userForm.password} onChange={handleFormChange} name="password" />
                        <span className='absolute top-2.5 right-5 text-[19px] text-[#20c7ff] font-semibold cursor-pointer'
                            onClick={() => setShow(prev => !prev)}>{`${show ? "hidden" : "show"}`}</span>
                    </div>
                    {error && <p className='text-red-500'>{"*" + error}</p>}
                    <button className={btnStyle}>{loading ? "Loading..." : "Login"}</button>
                    <p className='cursor-pointer' onClick={() => navigate('/signup')}>Want to create a new Account ? <span className='text-[#20c7ff] text-bold'>sign up</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login