import Image from 'next/image';
import logo from '@/assets/wxad-design.svg';

const Header: React.FC = () => {
  return (
    <div className="sticky top-0 mb-10 z-50 bg-white border-b border-solid border-neutral-200 bg-opacity-95 backdrop-blur-sm">
      <div className="px-12 h-16 mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center font-semibold">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M9.225 18.412A1.6 1.6 0 0 1 8 19c-.468 0-.914-.214-1.225-.588l-4.361-5.248a1.844 1.844 0 0 1 0-2.328l4.361-5.248A1.6 1.6 0 0 1 8 5c.468 0 .914.214 1.225.588l4.361 5.248a1.844 1.844 0 0 1 0 2.328zM17 5l4.586 5.836a1.844 1.844 0 0 1 0 2.328L17 19"></path>
              <path d="m13 5l4.586 5.836a1.844 1.844 0 0 1 0 2.328L13 19"></path>
            </g>
          </svg>
          序列帧播放组件
        </div>
        <a href="https://wxad.design">
          <Image className="block w-24" src={logo} alt="wxad.design" />
        </a>
      </div>
    </div>
  );
};

export default Header;
