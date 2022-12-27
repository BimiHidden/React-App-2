import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../context/ContexProvider';


const NavButton = ({title, customFunc, color, icon, dotColor}) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <botton type='button' onClick={ customFunc } style={{ color }} className='relative text-xl rounded-full p-3 cursor-pointer hover:bg-light-gray'>
      <span style={{ background: dotColor}} className='absolute inline-flex rounded-full w-2 h-2 right-2 top-2'/>
      {icon}
    </botton>
  </TooltipComponent>
)

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setscreenSize } = useStateContext();

  useEffect (() => {
    const handleResize = () => setscreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if(screenSize <= 900) {
      setActiveMenu(false);
    }else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  
  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title='Menu' customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} 
      color="gray" icon={<AiOutlineMenu />} />

      <div className='flex'>
      <NavButton title='Cart' customFunc={() => handleClick('cart')} 
      color="gray" icon={<FiShoppingCart />} />

      <NavButton title='Chat' customFunc={() => handleClick('chat')} 
      color="gray" dotColor='#e76f51' icon={<BsChatLeft />} />

      <NavButton title='Notification' customFunc={() => handleClick('notification')} 
      color="gray" dotColor='#e76f51' icon={<RiNotification3Line />} />

      <TooltipComponent content='Profile' position='BottomCenter'>
        <div className='flex items-center gap-2 rounded-lg p-1 hover:bg-light-gray' onClick={() => handleClick('userProfile')}>
          <img src={avatar} alt='avatar' className='rounded-full w-8 h-8'/>
          <p>
            <span className='text-14 text-gray-600'>Hi,</span> {' '} <span className='text-14 text-gray-600 font-bold '>Michael</span>
          </p>
          <MdKeyboardArrowDown className='text-14 text-gray-600' />
        </div>
      </TooltipComponent>

      {isClicked.cart && <Cart />}
      {isClicked.chat && <Chat />}
      {isClicked.notification && <Notification />}
      {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar