import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="
                flex
                flex-col
                md:flex-row
                justify-between
                pt-16
                pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold">Shop Categories</h3>
                        <Link href='#'>Phones</Link>
                        <Link href='#'>Laptops</Link>
                        <Link href='#'>Desktops</Link>
                        <Link href='#'>Watches</Link>
                        <Link href='#'>TV</Link>
                        <Link href='#'>Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold">Customer Services</h3>
                        <Link href='#'>Contact Us</Link>
                        <Link href='#'>Shipping Policy</Link>
                        <Link href='#'>Returns & Exchanges</Link>
                        <Link href='#'>FAQs</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold">
                            About Us
                        </h3>
                        <br></br>
                        <p className="mb-2">Welcome to E-Shop, your one-stop shop for all your electronic needs. 
                        We are committed to providing high-quality 
                        electronics at competitive prices, ensuring a seamless shopping experience for our customers. 
                        From the latest smartphones and laptops to cutting-edge home 
                        appliances and accessories, we offer a wide range of products to meet your every need.
                        <br></br><br></br>
                        At E-Shop, customer satisfaction is our top priority. Our dedicated 
                        team works tirelessly to ensure your shopping experience is smooth, from browsing to delivery.
                         We are here to answer your questions, assist with your orders, 
                        and make sure you are delighted with your purchase.                              

                        </p>
                        <p>&copy;{new Date().getFullYear()}</p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Follow Us</h3>
                        <div>
                            <Link href='#'><MdFacebook size={24}/></Link>
                            <Link href='#'><AiFillTwitterCircle size={24}/></Link>
                            <Link href='#'><AiFillYoutube size={24}/></Link>
                            <Link href='#'><AiFillInstagram size={24}/></Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;