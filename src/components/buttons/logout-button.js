import './styles.css';
export const LogoutButton = () => {
  return (
    <a className='button__logout' href='/api/auth/logout'>
      Log out
    </a>
  );
};
