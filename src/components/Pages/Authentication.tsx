import { useSelector } from 'react-redux';
import AuthForm from '../Auth/AuthForm'
import { RootState } from '../../redux';

const Authentication = () => {
  const authState = useSelector((state : RootState) => state.authReducer.isAuthenticated);

  return (
    <AuthForm authState={authState}/>
  )
}

export default Authentication;