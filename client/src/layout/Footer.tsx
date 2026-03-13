import { Link } from "react-router-dom";

import truck from "../assets/Icons/footer/delivery-icon.svg";
import returnItems from "../assets/Icons/footer/return-icon.svg";
import wallet from "../assets/Icons/footer/wallet-icon.svg";
import gift from "../assets/Icons/footer/gift-icon.svg";
import support from "../assets/Icons/footer/support-icon.svg";
import chat from "../assets/Icons/footer/chat-icon.svg";

import facebook from "../assets/Icons/footer/facebook-svgrepo-com.svg";
import youtube from "../assets/Icons/footer/youtube-svgrepo-com.svg";
import pinterest from "../assets/Icons/footer/pinterest-svgrepo-com.svg";
import instagram from "../assets/Icons/footer/instagram-svgrepo-com.svg";

import visa from "../assets/Icons/footer/visa-classic-svgrepo-com.svg";
import mastercard from "../assets/Icons/footer/mastercard-svgrepo-com.svg";
import paypal from "../assets/Icons/footer/paypal-svgrepo-com.svg";
import type { CardItem, FooterLink } from "../types/footer";

function Footer() {
  const cardItems: CardItem[] = [
    { name: "Free Shipping", desc: "For all Orders Over 100$", icon: truck },
    {
      name: "30 Days Returns",
      desc: "For an Exchange Product",
      icon: returnItems,
    },
    { name: "Secured Payment", desc: "Payment Cards Accepted", icon: wallet },
    { name: "Special Gifts", desc: "Our First Product Order", icon: gift },
    { name: "Support 24/7", desc: "Contact us Anytime", icon: support },
  ];

  const productLinks: FooterLink[] = [
    { name: "Price drop", path: "/" },
    { name: "New products", path: "/" },
    { name: "Best sales", path: "/" },
    { name: "Contact us", path: "/" },
    { name: "Sitemap", path: "/" },
    { name: "Stores", path: "/" },
  ];

  const companyLinks: FooterLink[] = [
    { name: "Delivery", path: "/" },
    { name: "Legal Notice", path: "/" },
    { name: "Terms and conditions of use", path: "/" },
    { name: "About us", path: "/" },
    { name: "Secure payment", path: "/" },
    { name: "Login", path: "/" },
  ];

  return (
    <footer className="w-full">
      <div className="bg-[#fafafa] h-full p-10 border-b">
        <section className="flex justify-center py-7">
          <ul className="grid grid-cols-1 lg:grid-cols-5 justify-center gap-10 text-center">
            {cardItems.map((c: CardItem, i: number) => (
              <li key={i} className="flex flex-col gap-2">
                <img src={c.icon} alt={c.name} className="w-10 h-10 mx-auto" />
                <p className="font-bold text-[#3d3d3d]">{c.name}</p>
                <p className="text-xs font-semibold text-[#3d3d3d]">{c.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <hr className="my-5" />

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-5 h-full">
          <div className="flex justify-between">
            <div className="flex flex-col gap-5 w-[200px]">
              <p className="font-bold text-[#3d3d3d]">Contact us</p>

              <p className="text-[#3d3d3d] text-sm">
                Classyshop - Mega Super Store 507-Union Trade Center France
              </p>

              <p className="text-[#3d3d3d] text-sm">sales@yourcompany.com</p>

              <p className="text-xl text-emerald-500 font-bold">
                (+91) 9876-543-210
              </p>

              <div className="flex items-center gap-2">
                <img src={chat} alt="chat" className="w-10 h-10" />

                <p className="text-[#3d3d3d] font-bold">
                  Online Chat Get Expert Help
                </p>
              </div>
            </div>

            <div className="h-full w-px bg-[#d9d9d9]" />
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-bold text-[#3d3d3d]">Products</p>

            <ul className="text-[#3d3d3d] text-sm flex flex-col gap-2">
              {productLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="cursor-pointer hover:text-[#07b091] duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-semibold text-[#3d3d3d]">Our company</p>

            <ul className="text-[#3d3d3d] text-sm flex flex-col gap-2">
              {companyLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="cursor-pointer hover:text-[#07b091] duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-semibold text-[#3d3d3d]">Newsletter</p>

            <p className="text-sm text-[#3d3d3d]">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>

            <form className="flex flex-col gap-5 items-start">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full px-2 py-1 placeholder:text-sm border"
                required
              />

              <button
                type="submit"
                className="px-4 py-2 bg-[#07b091] text-white rounded-md text-sm font-semibold"
              >
                SUBSCRIBE
              </button>

              <div className="flex gap-2">
                <input type="checkbox" name="terms" id="terms" required />

                <label htmlFor="terms" className="text-xs">
                  I agree to the terms and conditions and the privacy policy
                </label>
              </div>
            </form>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between items-center py-3 px-10">
        <ul className="flex gap-2">
          <li>
            <Link to="/">
              <img
                src={facebook}
                alt="facebook"
                className="w-7 h-7 border rounded-full p-1"
              />
            </Link>
          </li>

          <li>
            <Link to="/">
              <img
                src={youtube}
                alt="youtube"
                className="w-7 h-7 border rounded-full p-1"
              />
            </Link>
          </li>

          <li>
            <Link to="/">
              <img
                src={pinterest}
                alt="pinterest"
                className="w-7 h-7 border rounded-full p-1"
              />
            </Link>
          </li>

          <li>
            <Link to="/">
              <img
                src={instagram}
                alt="instagram"
                className="w-7 h-7 border rounded-full p-1"
              />
            </Link>
          </li>
        </ul>

        <p className="text-xs text-[#3d3d3d]">@ 2024 - Ecommerce Template</p>

        <ul className="flex gap-2">
          <li>
            <img src={visa} alt="visa" className="w-7 h-7" />
          </li>

          <li>
            <img src={mastercard} alt="mastercard" className="w-7 h-7" />
          </li>

          <li>
            <img src={paypal} alt="paypal" className="w-7 h-7" />
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
