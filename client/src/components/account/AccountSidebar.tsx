import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  LogOut 
} from 'lucide-react';

/**
 * مكون الشريط الجانبي للحساب - AccountSidebar
 * تم تصميمه ليكون مطابقاً للصور المرفقة مع استخدام Tailwind CSS
 */
const AccountSidebar = () => {
  // قائمة الروابط الموجودة في التصميم
  const menuItems = [
    { name: "My Profile", path: "/account/profile", icon: User },
    { name: "Address", path: "/account/address", icon: MapPin },
    { name: "My List", path: "/account/wishlist", icon: Heart },
    { name: "My Orders", path: "/account/orders", icon: ShoppingBag },
    { name: "Logout", path: "/logout", icon: LogOut },
  ];

  return (
    <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      
      {/* قسم رأس الصفحة (الشعار، الاسم، البريد الإلكتروني) */}
      <div className="flex flex-col items-center p-8 border-b border-gray-50 bg-white">
        {/* حاوية الشعار */}
        <div className="w-20 h-20 mb-4 flex items-center justify-center border border-gray-100 rounded-xl p-2 shadow-sm overflow-hidden bg-white">
          <img 
            src="https://img.freepik.com/free-vector/computer-repair-logo-template_23-2148176471.jpg" 
            alt="User Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* بيانات المستخدم */}
        <h3 className="text-[17px] font-bold text-gray-800 tracking-tight uppercase text-center leading-tight">
          RINKU VERMA
        </h3>
        <p className="text-[11px] text-gray-400 mt-2 break-all text-center">
          advanceduetechniques@gmail.com
        </p>
      </div>

      {/* قائمة الروابط بخلفية رمادية خفيفة كما في الصورة */}
      <nav className="bg-[#f9f9f9] py-2">
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li key={item.path} className="w-full">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-8 py-4 text-[14.5px] transition-all duration-200 border-l-[4px] ${
                    isActive
                      ? "bg-white text-[#10b981] border-[#10b981] font-semibold"
                      : "text-gray-600 border-transparent hover:bg-white hover:text-[#10b981]"
                  }`
                }
              >
                {/* الأيقونة المستوردة من lucide-react */}
                <item.icon className="w-5 h-5 opacity-80" strokeWidth={2} />
                
                {/* اسم الرابط */}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AccountSidebar;