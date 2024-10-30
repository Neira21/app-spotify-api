import { Link, useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'
import propTypes from 'prop-types'

const SidebarButton = (props) => {
  SidebarButton.propTypes = {
    title: propTypes.string.isRequired,
    icons: propTypes.element.isRequired,
    to: propTypes.string,
    logout: propTypes.func
  }

  const location = useLocation();

  const isActive = location.pathname === props.to;

  const btnClass = isActive ? 'bg-[#000] text-[#1A1A1A]' : 'hover:bg-[#F8D9C0] hover:text-[#1A1A1A]'


  return (
    isActive ? (
      <div className={`h-[70px] w-[70px] rounded-[20px] text-[#F8D9C0] flex items-center justify-center flex-col my-[10px] mx-auto ${btnClass}`}>
        <IconContext.Provider value={{ size: '24px', className: '' }}>
          {props.icons}
          <p className='my-[4px] mx-auto'>{props.title}</p>
        </IconContext.Provider>
      </div>
    ) : (
      <Link to={props.to} onClick={props.logout}>
        <div className={`h-[70px] w-[70px] rounded-[20px] text-[#F8D9C0] flex items-center justify-center flex-col my-[10px] mx-auto ${btnClass}`}>
          <IconContext.Provider value={{ size: '24px', className: '' }}>
            {props.icons}
            <p className='my-[4px] mx-auto'>{props.title}</p>
          </IconContext.Provider>
        </div>
      </Link>
    )
  );
}

export default SidebarButton